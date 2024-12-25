<template>
    <div
        class="page-container min-w-[600px]"
        @click="handleClickOutside"
    >
        <!-- 表格模块 -->
        <div class="table-module">
            <table-module
                border
                :data="showTableListPaient"
                v-loading="loading"
                :height="route.name !== 'adherence' ? 'calc(100vh - 340px)' : 'calc(100vh - 260px)'"
                v-model:current-page="pageOption.currentPage"
                v-model:page-size="pageOption.pageSize"
                :total="pageOption.total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :pageSizes="[25, 50, 100]"
                :isExport="true"
                :exportFileName="title"
                :columns="columnSelection"
            >
                <template #header-left>
                    <div v-if="route.name !== 'adherence'">
                        <base-button
                            type="primary"
                            @click="$router.go(-1)"
                            v-auth="[RoleType.DMETherapist]"
                            width="120px"
                            >Back
                        </base-button>
                        <div class="action m-t-[10px]">
                            <span class="flex items-center">
                                Remove patients greater then
                                <select-number
                                    v-model="removeLimit"
                                    :min="2"
                                    :max="200"
                                />
                                days since last therapy upload
                            </span>
                            <base-button type="primary">Go</base-button>
                        </div>
                        <div class="action">
                            <span>Remove all patients</span>
                            <base-button type="primary">Go</base-button>
                        </div>
                    </div>
                    <base-button
                        type="primary"
                        @click="$router.go(-1)"
                        v-auth="[RoleType.DMETherapist]"
                        width="120px"
                        v-else
                    >
                        Back
                    </base-button>
                </template>
                <template #header-right>
                    <div class="flex">
                        <select-options
                            v-model="option.selectModel"
                            :options="getApiOption.selectConfig.option"
                            :label="getApiOption.selectConfig.label"
                            v-if="route.name === 'adherence'"
                        />
                    </div>
                </template>

                <el-table-column
                    v-for="item in showColumns"
                    :key="item.prop"
                    :prop="item.prop"
                    :label="item.label"
                    :min-width="item.width"
                    align="center"
                    :sortable="item.noFilter ? false : true"
                >
                    <template
                        #default="{ row }"
                        v-if="item.defaultTemplate"
                    >
                        <div>
                            <span
                                class="link"
                                @click="showPatientReport(row)"
                                v-if="item.prop === 'nickname'"
                            >
                                {{ nameFormat(row) }}
                            </span>
                            <!-- 日期 -->
                            <span v-else-if="item.type && item.type === 'date'">
                                {{ dateFormat(getNestedProperty(row, item.prop)) }}
                            </span>
                            <!-- 百分比 -->
                            <span v-else-if="item.type === 'percent'">
                                {{ row[item.prop] || row[item.prop] === 0 ? row[item.prop] + '%' : '' }}
                            </span>

                            <!-- action操作 -->
                            <el-select
                                v-else-if="item.label === t('tasks.Action')"
                                v-model="row.action"
                                @change="handleActionChange(row)"
                            >
                                <el-option
                                    v-for="action in actionOptions"
                                    :key="action.value"
                                    :label="action.label"
                                    :value="action.value"
                                />
                            </el-select>
                        </div>
                    </template>
                    <template #header="{ column }">
                        <table-filter-header
                            :column="column"
                            v-if="!item.type && !item.noFilter"
                        />
                        <table-filter-header
                            :column="column"
                            type="date"
                            v-if="item.type === 'date'"
                        />
                        <table-filter-header
                            :column="column"
                            type="select"
                            :customOptions="item.selectOptions"
                            v-if="item.type === 'select'"
                        />
                    </template>
                </el-table-column>
            </table-module>
        </div>
        <client-only>
            <!-- 筛选弹窗 -->
            <table-filter-popover
                :visible="visible"
                :virtual-ref="showKeyRef[showKey]"
                :key="showKeyRef[showKey]"
                :filterType="filterType"
                v-model:filterInput="filterInput"
                v-model:selectFilter="selectFilter"
                @search-filter="searchFilter"
                @cancel-filter="cancelFilter"
                :filterList="filterList"
                :filterCustomOptions="filterCustomOptions"
            />

            <!-- 患者记录 -->
            <patient-record
                ref="patientRecordRef"
                @show-upload-files="showUploadFiles"
                v-if="showUploadFiles"
            />
            <!-- 上传SD -->
            <lazy-upload-files
                ref="uploadFilesRef"
                @show-patient-report="showPatientReport"
                @upload-down="uploadDown"
            />
        </client-only>
    </div>
</template>

<script setup lang="ts">
    import { RoleType } from '~/enums/RolesEnum';
    import { getPatientInfo } from '~/api/patient';

    import { getAdherenceProportionUserList } from '~/api/dashboard';
    import type { UserInfo } from '~/api/login/types';
    import type { UploadFiles } from '#build/components';

    const PatientRecord = defineAsyncComponent(() => import('../patients/compononets/patient-record.vue'));

    // import type { FilterType } from '~/components/table-filter/header.vue';

    const tableListPaient = computed(() => {
        return tableList.value?.map((item: any) => {
            return {
                ...item,
                patient: JSON.parse(item.patient),
                action: 6,
            };
        });
    });

    const uploadFilesRef = ref<InstanceType<typeof UploadFiles>>();
    const showUploadFiles = (userId?: string) => {
        uploadFilesRef.value?.showDialog(userId);
    };

    // 表格筛选
    const {
        showKey,
        showKeyRef,
        visible,
        filterInput,
        selectFilter,
        filterType,
        filterCustomOptions,
        filterList,
        showTableListPaient,
        handleClickOutside,
        cancelFilter,
        searchFilter,
    } = useFilterTableHeader(tableListPaient);

    const route = useRoute();

    const option = ref({
        selectModel: (route.query.type as unknown as number) || '2',
    });

    const title = computed(() => {
        switch (route.name) {
            case 'adherence':
                return 'Adherence';
        }
    });

    type Config = {
        option: { label: string; value: number }[];
        label: string;
    };

    const adherenceOptions = [
        {
            label: 'Good',
            value: 0,
        },
        {
            label: 'Caution',
            value: 1,
        },
        {
            label: 'At Risk',
            value: 2,
        },
        {
            label: 'Adherent',
            value: 3,
        },
    ];

    const actionOptions = [
        {
            label: 'Blank',
            value: 0,
        },
        {
            label: 'Contacted Patient',
            value: 1,
        },
        {
            label: 'Left Voicemail',
            value: 2,
        },
        {
            label: 'Sent SMS',
            value: 3,
        },
        {
            label: 'Sent Email',
            value: 4,
        },
        {
            label: 'N/A',
            value: 6,
        },
    ];

    const removeLimit = ref('');

    const getApiOption = ref(
        (() => {
            let apiOption: {
                api: (data: any & PageQuery) => Promise<ResPonseType<UserInfo[]>>;
                selectConfig: Config;
            } = {
                api: getAdherenceProportionUserList,
                selectConfig: { option: adherenceOptions, label: 'Status' },
            };

            switch (route.name) {
                case 'adherence':
                    apiOption = {
                        api: getAdherenceProportionUserList,
                        selectConfig: {
                            option: adherenceOptions,
                            label: 'Status',
                        },
                    };

                    break;

                default:
                    break;
            }
            return apiOption;
        })(),
    );

    const params = computed(() => {
        let params: any = {
            type: option.value.selectModel,
        };

        switch (route.name) {
            case 'adherence':
                params = {};
                break;

            default:
                break;
        }
        return params;
    });

    const { pageOption, loading, tableList, getData, handleSizeChange, handleCurrentChange, search } = usePageTable(
        getApiOption.value.api,
        params.value,
    );

    watch(
        params,
        () => {
            search({
                ...params.value,
            });
        },
        {
            deep: true,
        },
    );

    // 查看患者信息
    const patientRecordRef = ref<InstanceType<typeof PatientRecord>>();
    const showPatientReport = (row: UserInfo) => {
        patientRecordRef.value?.showDialog(row);
    };

    const uploadDown = async (id: string) => {
        await getData();
        if (id) {
            getPatientInfo({ user_id: id }).then(res => {
                if (res.data) {
                    let userInfo = { ...res.data, patient: JSON.parse(res.data.patient) };
                    patientRecordRef.value?.showDialog(userInfo);
                }
            });
        }
    };

    provide('update', getData);

    // 表格自定义
    const { t } = useI18n();
    const columnsInit = [
        {
            label: t('users.FullName'),
            prop: 'nickname',
            width: 120,
            defaultTemplate: true,
        },
        {
            label: t('patients.PatientID'),
            prop: 'patient.patientid',
            width: 120,
        },
        {
            label: t('patients.Office'),
            prop: 'institution_name',
            width: 120,
        },
        {
            label: t('login.PhoneNumber'),
            prop: 'mobile',
            width: 130,
        },
        {
            label: t('patients.TherapyStartDate'),
            prop: 'patient.setup_date',
            width: 125,
            defaultTemplate: true,
            type: 'date',
        },
        {
            label: 'Days Since Setup',
            prop: 'patient.use_end_time',
            width: 120,
            listType: ['Long-term-adherence', 'Cellular-Connectivity', 'Wi-Fi-Connectivity'],
        },
        {
            label: t('patients.LastUpdateDate'),
            prop: 'patient.use_end_time',
            width: 120,
            defaultTemplate: true,
            type: 'date',
        },
        {
            label: 'Days Since Last Upload',
            prop: 'con_days',
            width: 120,
            listType: ['Long-term-adherence', 'Cellular-Connectivity', 'Wi-Fi-Connectivity'],
        },
        {
            label: 'Days > 4 hrs Last 10 Days',
            prop: 'last10',
            width: 120,
            listType: ['High-Leak'],
        },
        {
            label: '% of days >4 hours',
            prop: 'last30',
            width: 120,
            type: 'percent',
            defaultTemplate: true,
            listType: ['adherence'],
        },

        {
            label: 'Task Day',
            prop: 'last30_time',
            width: 100,
            listType: ['adherence'],
        },
        {
            label: 'Average Leak',
            prop: 'last30_leak',
            width: 100,
            listType: ['High-Leak'],
        },
        {
            label: 'Average AHI',
            prop: 'last30_ahi',
            width: 100,
            listType: ['High-AHI'],
        },
        {
            label: t('tasks.Action'),
            prop: '',
            width: 120,
            noFilter: true,
            defaultTemplate: true,
        },
    ];

    // 不同类型列表对应的初始值
    const listTypeColumns: ColumnsInit[] = columnsInit
        .filter(item => {
            if (item.listType) {
                return item.listType.includes(route.name as string);
            } else {
                return true;
            }
        })
        .map((item, index) => {
            return {
                ...item,
                isShow: true,
                orderIndex: index + 1,
            };
        });

    const { columnSelection, showColumns } = useTableSetting(listTypeColumns, useRoute().path);

    // 选择操作
    const handleActionChange = (row: UserInfo & { action: number }) => {
        console.log(row.id, row.action);
    };
</script>
<style lang="scss" scoped>
    :deep(.table-header) {
        align-items: flex-end;
    }

    .action {
        display: flex;
        align-items: center;
        font-size: $font-small;
        font-weight: bold;

        span {
            margin-right: 20px;
        }
    }

    :deep(.select-number) {
        margin: 0 10px;
    }
</style>
