<template>
    <div
        class="page-container min-w-[600px]"
        @click="handleClickOutside"
    >
        <!-- 搜索模块 -->
        <search-module
            @search="search"
            v-model="searchOption"
            class="m-b-[20px]"
            :placeholder="$t('dashboard.searchPlaceholder')"
        />
        <!-- 功能模块 -->
        <div class="function-module m-b-[20px] flex justify-between">
            <base-button
                type="primary"
                @click="$router.go(-1)"
                v-auth="[RoleType.DMETherapist]"
                width="120px"
                >Back
            </base-button>
            <div class="flex">
                <div
                    v-if="listType === 3"
                    class="flex"
                >
                    <select-month-year
                        v-model="option.setupDate"
                        class="m-r-[40px]"
                        label="Setup Month"
                        :disabledDate="disabledMonth"
                        readonly
                    />
                    <select-month-year
                        v-model="option.date"
                        class="m-r-[40px]"
                        :disabledDate="disabledRange"
                    />
                </div>
                <select-month-year
                    v-model="option.date"
                    class="m-r-[40px]"
                    v-if="listType < 3 && listType > 1"
                />
                <select-options
                    v-model="option.selectModel"
                    :options="getApiOption.selectConfig.option"
                    :label="getApiOption.selectConfig.label"
                />
            </div>
        </div>
        <!-- 表格模块 -->
        <div class="table-module">
            <table-module
                border
                :data="showTableListPaient"
                v-loading="loading"
                height="calc(100vh - 340px)"
                v-model:current-page="pageOption.currentPage"
                v-model:page-size="pageOption.pageSize"
                :total="pageOption.total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :pageSizes="[25, 50, 100]"
            >
                <el-table-column
                    prop="nickname"
                    :label="$t('users.FullName')"
                    min-width="120"
                    align="center"
                    sortable
                >
                    <template #default="{ row }">
                        <span
                            class="link"
                            @click="showPatientReport(row)"
                        >
                            {{ nameFormat(row) }}
                        </span>
                    </template>
                    <template #header="{ column }">
                        <table-filter-header :column="column" />
                    </template>
                </el-table-column>

                <el-table-column
                    prop="patient.patientid"
                    :label="$t('patients.PatientID')"
                    min-width="120"
                    align="center"
                    sortable
                >
                    <template #header="{ column }">
                        <table-filter-header :column="column" />
                    </template>
                </el-table-column>
                <el-table-column
                    prop="patient.birthdate"
                    :label="$t('patients.Birthdate')"
                    min-width="120"
                    align="center"
                    sortable
                >
                    <template #default="{ row }">
                        <span>{{ row.patient.birthdate && dateFormat(row.patient.birthdate) }}</span>
                    </template>
                    <template #header="{ column }">
                        <table-filter-header
                            :column="column"
                            type="date"
                        />
                    </template>
                </el-table-column>

                <el-table-column
                    prop="institution_name"
                    :label="$t('patients.Office')"
                    min-width="120"
                    align="center"
                    sortable
                >
                    <template #header="{ column }">
                        <table-filter-header :column="column" />
                    </template>
                </el-table-column>
                <el-table-column
                    prop="patient.setup_date"
                    :label="$t('patients.TherapyStartDate')"
                    min-width="125"
                    align="center"
                    sortable
                >
                    <template #default="{ row }">
                        <span>{{ row.patient.setup_date && dateFormat(row.patient.setup_date) }}</span>
                    </template>
                    <template #header="{ column }">
                        <table-filter-header
                            :column="column"
                            type="date"
                        />
                    </template>
                </el-table-column>
                <el-table-column
                    prop="best30"
                    label="Best 30 Days"
                    min-width="120"
                    align="center"
                    sortable
                    v-if="listType < 3"
                >
                    <template #default="{ row }">
                        <span>{{ row.best30 }}</span>
                    </template>
                    <template #header="{ column }">
                        <table-filter-header :column="column" />
                    </template>
                </el-table-column>
                <el-table-column
                    prop="adherence_date"
                    label="Adherence Date"
                    min-width="120"
                    align="center"
                    sortable
                    v-if="listType < 3"
                >
                    <template #default="{ row }">
                        <span>{{ row.adherence_date }}</span>
                    </template>
                    <template #header="{ column }">
                        <table-filter-header :column="column" />
                    </template>
                </el-table-column>

                <el-table-column
                    prop="patient.percent_usage"
                    label="Last 30 Days"
                    min-width="120"
                    align="center"
                    sortable
                    v-if="listType >= 4"
                >
                    <template #default="{ row }">
                        <span></span>
                    </template>
                    <template #header="{ column }">
                        <table-filter-header :column="column" />
                    </template>
                </el-table-column>
                <el-table-column
                    prop="patient.percent_usage"
                    :label="`Average Hrs of Use ${moment(option.date).format('MMM YYYY')}`"
                    min-width="120"
                    align="center"
                    sortable
                    v-if="listType === 3"
                >
                    <template #default="{ row }">
                        <span></span>
                    </template>
                    <template #header="{ column }">
                        <table-filter-header :column="column" />
                    </template>
                </el-table-column>
                <el-table-column
                    prop="patient.compliant"
                    :label="listType === 4 ? 'Modem Type' : 'Mask'"
                    min-width="120"
                    align="center"
                    sortable
                    v-if="listType === 4 || listType === 5"
                >
                    <template #default="{ row }">
                        <span></span>
                    </template>
                    <template #header="{ column }">
                        <table-filter-header
                            :column="column"
                            type="select"
                            :customOptions="compliantOptions"
                        />
                    </template>
                </el-table-column>

                <el-table-column
                    prop="patient.use_end_time"
                    :label="$t('patients.LastUpdateDate')"
                    min-width="120"
                    align="center"
                    sortable
                >
                    <template #default="{ row }">
                        <span>{{ row.patient.use_end_time && dateFormat(row.patient.use_end_time) }}</span>
                    </template>
                    <template #header="{ column }">
                        <table-filter-header
                            :column="column"
                            type="date"
                        />
                    </template>
                </el-table-column>
                <el-table-column
                    prop="patient.compliant"
                    label="Days Since Last Upload"
                    min-width="120"
                    align="center"
                    sortable
                    v-if="listType === 4"
                >
                    <template #default="{ row }">
                        <span></span>
                    </template>
                    <template #header="{ column }">
                        <table-filter-header
                            :column="column"
                            type="date"
                        />
                    </template>
                </el-table-column>
                <el-table-column
                    prop="compliant"
                    :label="$t('patients.Compliant')"
                    min-width="120"
                    align="center"
                    sortable
                    v-if="listType < 3"
                >
                    <template #default="{ row }">
                        <compliant-status :compliant="Number(row.compliant)" />
                    </template>
                    <template #header="{ column }">
                        <table-filter-header
                            :column="column"
                            type="select"
                            :customOptions="compliantOptions"
                        />
                    </template>
                </el-table-column>

                <el-table-column
                    prop="patient.percent_usage"
                    label="% of days >4 hours last 30 days"
                    min-width="120"
                    align="center"
                    sortable
                    v-if="listType === 3"
                >
                    <template #default="{ row }">
                        <span></span>
                    </template>
                    <template #header="{ column }">
                        <table-filter-header :column="column" />
                    </template>
                </el-table-column>
                <el-table-column
                    prop="patient.percent_usage"
                    label="Avg Hours Last 30 Days"
                    min-width="120"
                    align="center"
                    sortable
                    v-if="listType === 3"
                >
                    <template #default="{ row }">
                        <span></span>
                    </template>
                    <template #header="{ column }">
                        <table-filter-header :column="column" />
                    </template>
                </el-table-column>

                <el-table-column
                    prop="patient.percent_usage"
                    :label="listType === 5 ? 'Avg Leak Last 5 Days' : 'Avg AHI Last 5 Days'"
                    min-width="120"
                    align="center"
                    sortable
                    v-if="listType >= 5"
                >
                    <template #default="{ row }">
                        <span></span>
                    </template>
                    <template #header="{ column }">
                        <table-filter-header :column="column" />
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
    // import AddUserDialog from './compononets/add.vue';
    // import PatientRecord from './compononets/patient-record.vue';
    import moment from 'moment';
    import selectMonthYear from './components/select-month-year.vue';
    import { RoleType } from '~/enums/RolesEnum';
    import { getPatientInfo } from '~/api/patient';

    import {
        getAdherenceProportionByMonthUserList,
        getAdherenceProportionUserList,
        getHighAHIUserList,
        getHighLeakageUserList,
        getNoConnectUserList,
        getUseMonthUserList,
    } from '~/api/dashboard';
    import type { UserInfo } from '~/api/login/types';
    import type { UploadFiles } from '#build/components';

    const PatientRecord = defineAsyncComponent(() => import('../patients/compononets/patient-record.vue'));

    // import type { FilterType } from '~/components/table-filter/header.vue';

    const tableListPaient = computed(() => {
        return tableList.value?.map((item: any) => {
            return {
                ...item,
                patient: JSON.parse(item.patient),
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
        selectModel: (route.query.type as unknown as number) || 0,
        dateType: (route.query.type as unknown as number) || 1,
        date: (route.query.date as unknown as string) || '',
        setupDate: (route.query.setupDate as unknown as string) || '',
        dateRange: [route.query.startDate, route.query.endDate],
    });
    const listType = ref(Number(route.query.listType as unknown as number) || 1);

    const disabledMonth = (time: Record<string, any>): boolean => {
        return time.getTime() > new Date().getTime();
    };

    const disabledRange = (time: Record<string, any>): boolean => {
        let dateRange = option.value.dateRange;
        return (
            (dateRange[0] ? time.getTime() < new Date(dateRange[0] as string).getTime() : true) ||
            (dateRange[1]
                ? time.getTime() > new Date(dateRange[1] as string).getTime()
                : time.getTime() > new Date().getTime())
        );
    };

    type Config = {
        option: { label: string; value: number }[];
        label: string;
    };

    const compliantOptions = [
        { label: 'Adherent', value: 0 },
        { label: 'Monitoring', value: 1 },
        { label: 'Non-Adherent', value: 2 },
    ];

    const hoursOptions = [
        {
            label: '0 (Zero)',
            value: 0,
        },
        {
            label: '0.1 - 2.0',
            value: 1,
        },
        {
            label: '2.1 - 4.0',
            value: 2,
        },
        {
            label: '4.1 - 6.0',
            value: 3,
        },
        {
            label: '6.1 - 8.0',
            value: 4,
        },
        {
            label: 'Greater than 8.0',
            value: 5,
        },
    ];

    const daysOptions = [
        {
            label: '3-5 Days',
            value: 1,
        },
        {
            label: '6-10 Days',
            value: 2,
        },
        {
            label: '11-15 Days',
            value: 3,
        },
        {
            label: '16-20 Days',
            value: 4,
        },
        {
            label: '21 Days or Greater',
            value: 5,
        },
    ];

    const leakOptions = [
        {
            label: '10 - 19 LPM',
            value: 1,
        },
        {
            label: '20 - 29 LPM',
            value: 2,
        },
        {
            label: '30 - 39 LPM',
            value: 3,
        },
        {
            label: '40 LPM or greater',
            value: 4,
        },
    ];

    const ahiOptions = [
        {
            label: '10 - 19',
            value: 1,
        },
        {
            label: '20 - 29',
            value: 2,
        },
        {
            label: '30 - 39',
            value: 3,
        },
        {
            label: '40 or greater',
            value: 4,
        },
    ];

    const getApiOption = ref(
        (() => {
            let apiOption: {
                api: (data: any & PageQuery) => Promise<ResPonseType<UserInfo[]>>;
                selectConfig: Config;
            } = {
                api: getAdherenceProportionUserList,
                selectConfig: { option: compliantOptions, label: 'Status' },
            };
            switch (listType.value) {
                case 1:
                    apiOption = {
                        api: getAdherenceProportionUserList,
                        selectConfig: {
                            option: compliantOptions,
                            label: 'Status',
                        },
                    };

                    break;
                case 2:
                    apiOption = {
                        api: getAdherenceProportionByMonthUserList,
                        selectConfig: {
                            option: compliantOptions.filter(item => item.value !== 1),
                            label: 'Status',
                        },
                    };

                    break;
                case 3:
                    apiOption = {
                        api: getUseMonthUserList,
                        selectConfig: {
                            option: hoursOptions,
                            label: 'Hours',
                        },
                    };
                    break;
                case 4:
                    apiOption = {
                        api: getNoConnectUserList,
                        selectConfig: {
                            option: daysOptions,
                            label: 'Days',
                        },
                    };
                    break;
                case 5:
                    apiOption = {
                        api: getHighLeakageUserList,
                        selectConfig: {
                            option: leakOptions,
                            label: 'Leak',
                        },
                    };
                    break;
                case 6:
                    apiOption = {
                        api: getHighAHIUserList,
                        selectConfig: {
                            option: ahiOptions,
                            label: 'AHI',
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
        switch (listType.value) {
            case 1:
                params = {
                    type: option.value.dateType,
                    compliant: option.value.selectModel,
                    date: option.value.date,
                };
                break;
            case 2:
                params = {
                    compliant: option.value.selectModel,
                    hapdate: option.value.date,
                };
                break;
            case 3:
                params = {
                    date: option.value.setupDate,
                    time: option.value.selectModel,
                    month: option.value.date,
                };
                break;

            default:
                break;
        }
        return params;
    });

    const { searchOption, pageOption, loading, tableList, getData, handleSizeChange, handleCurrentChange, search } =
        usePageTable(getApiOption.value.api, params.value);

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
</script>
