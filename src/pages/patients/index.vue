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
            :placeholder="$t('patients.searchPlaceholder')"
        />
        <!-- 功能模块 -->
        <!-- <div class="function-module m-b-[20px] flex justify-between">
            <base-button
                type="primary"
                @click="create"
                v-auth="[RoleType.DMETherapist]"
                >{{ $t('patients.AddPatient') }}
            </base-button>

            <base-button
                type="primary"
                @click="showUploadFiles"
                class="m-l-auto"
                >{{ $t('patients.SDCardUpload') }}
            </base-button>
        </div> -->
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
                :isExport="true"
                ref="tableModuleRef"
                :columns="columnSelection"
            >
                <template #header-left>
                    <base-button
                        type="primary"
                        @click="create"
                        v-auth="[RoleType.DMETherapist]"
                        >{{ $t('patients.AddPatient') }}
                    </base-button>
                </template>
                <template #header-right>
                    <base-button
                        type="primary"
                        @click="showUploadFiles"
                        class="m-l-auto"
                        >{{ $t('patients.SDCardUpload') }}
                    </base-button>
                </template>
                <!-- <el-table-column
                    prop="nickname"
                    :label="$t('users.FullName')"
                    min-width="120"
                    align="center"
                    sortable
                    v-if="isShowColumn($t('users.FullName'))"
                    :order="getColumnOrder($t('users.FullName'))"
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
                </el-table-column> -->

                <el-table-column
                    v-for="item in showColumns"
                    :key="item.prop"
                    :prop="item.prop"
                    :label="item.label"
                    :min-width="item.width"
                    align="center"
                    sortable
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

                            <span v-else-if="item.type && item.type === 'date'">
                                {{ dateFormat(getNestedProperty(row, item.prop)) }}
                            </span>

                            <span v-else-if="item.prop === 'percent_usage'">{{ row.percent_usage || 0 }}%</span>

                            <compliant-status
                                :compliant="Number(row.compliant)"
                                v-else-if="item.prop === 'compliant'"
                            />
                        </div>
                    </template>
                    <template #header="{ column }">
                        <table-filter-header
                            :column="column"
                            v-if="!item.type"
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

                <!-- <el-table-column
                    prop="patient.patientid"
                    :label="$t('patients.PatientID')"
                    min-width="100"
                    align="center"
                    sortable
                    v-if="isShowColumn($t('patients.PatientID'))"
                    
                >
                    <template #header="{ column }">
                        <table-filter-header :column="column" />
                    </template>
                </el-table-column> -->
                <!-- <el-table-column
                    prop="patient.birthdate"
                    :label="$t('patients.Birthdate')"
                    min-width="120"
                    align="center"
                    sortable
                    v-if="isShowColumn($t('patients.Birthdate'))"
                   
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
                </el-table-column> -->
                <!-- <el-table-column
                    prop="sn"
                    :label="$t('patients.SerialNumber')"
                    min-width="120"
                    align="center"
                    sortable
                    v-if="isShowColumn($t('patients.SerialNumber'))"
                    :order="getColumnOrder($t('patients.SerialNumber'))"
                >
                    <template #header="{ column }">
                        <table-filter-header :column="column" />
                    </template>
                </el-table-column> -->
                <!-- <el-table-column
                    prop="institution_name"
                    :label="$t('patients.Office')"
                    min-width="120"
                    align="center"
                    sortable
                    v-if="isShowColumn($t('patients.Office'))"
                    :order="getColumnOrder($t('patients.Office'))"
                >
                    <template #header="{ column }">
                        <table-filter-header :column="column" />
                    </template>
                </el-table-column> -->
                <!-- <el-table-column
                    prop="patient.setup_date"
                    :label="$t('patients.TherapyStartDate')"
                    min-width="125"
                    align="center"
                    sortable
                    v-if="isShowColumn($t('patients.TherapyStartDate'))"
                    :order="getColumnOrder($t('patients.TherapyStartDate'))"
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
                </el-table-column> -->
                <!-- <el-table-column
                    prop="percent_usage"
                    :label="$t('patients.PercentUsage')"
                    min-width="120"
                    align="center"
                    sortable
                    v-if="isShowColumn($t('patients.PercentUsage'))"
                    :order="getColumnOrder($t('patients.PercentUsage'))"
                >
                    <template #default="{ row }">
                    
                    </template>
                    <template #header="{ column }">
                        <table-filter-header :column="column" />
                    </template>
                </el-table-column> -->
                <!-- <el-table-column
                    prop="patient.use_end_time"
                    :label="$t('patients.LastUpdateDate')"
                    min-width="120"
                    align="center"
                    sortable
                    v-if="isShowColumn($t('patients.LastUpdateDate'))"
                    :order="getColumnOrder($t('patients.LastUpdateDate'))"
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
                </el-table-column> -->
                <!-- <el-table-column
                    prop="compliant"
                    :label="$t('patients.Compliant')"
                    min-width="120"
                    align="center"
                    sortable
                    v-if="isShowColumn($t('patients.Compliant'))"
                    :order="getColumnOrder($t('patients.Compliant'))"
                >
                    <template #default="{ row }">
                        <compliant-status :compliant="Number(row.patient.compliant)" />
                    </template>
                    <template #header="{ column }">
                        <table-filter-header
                            :column="column"
                            type="select"
                            :customOptions="compliantOptions"
                        />
                    </template>
                </el-table-column>-->
            </table-module>
        </div>

        <!-- 新增用户 -->
        <client-only>
            <add-user-dialog
                ref="addUserDialogRef"
                @refresh="getData"
                v-model="isShowAddUserDialog"
                @show-patient-report="showPatientReport"
                v-if="showPatientReport"
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
        </client-only>
    </div>
</template>

<script setup lang="ts">
    // import AddUserDialog from './compononets/add.vue';
    // import PatientRecord from './compononets/patient-record.vue';
    import { useLocalStorage } from '@vueuse/core';
    import { RoleType } from '~/enums/RolesEnum';
    import { getPatient, getPatientInfo } from '~/api/patient';
    import type { UserInfo } from '~/api/login/types';
    import type { TableModule, UploadFiles } from '#build/components';

    // import type { FilterType } from '~/components/table-filter/header.vue';

    const PatientRecord = defineAsyncComponent(() => import('./compononets/patient-record.vue'));
    const AddUserDialog = defineAsyncComponent(() => import('./compononets/add.vue'));

    const { searchOption, pageOption, loading, tableList, getData, handleSizeChange, handleCurrentChange, search } =
        usePageTable(getPatient);

    const tableListPaient = computed(() => {
        return tableList.value?.map(item => {
            return {
                ...item,
                patient: JSON.parse(item.patient),
            };
        });
    });

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

    // 创建
    const addUserDialogRef = ref<InstanceType<typeof AddUserDialog>>();
    const isShowAddUserDialog = ref(false);
    const create = () => {
        isShowAddUserDialog.value = true;
    };

    // 查看患者信息
    const patientRecordRef = ref<InstanceType<typeof PatientRecord>>();
    const showPatientReport = (row: UserInfo) => {
        patientRecordRef.value?.showDialog(row);
    };

    const uploadFilesRef = ref<InstanceType<typeof UploadFiles>>();
    const showUploadFiles = (userId?: string) => {
        uploadFilesRef.value?.showDialog(userId);
    };

    const compliantOptions = [
        { label: 'Adherent', value: 0 },
        { label: 'Monitoring', value: 1 },
        { label: 'Non-Adherent', value: 2 },
    ];

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

    const tableModuleRef = ref<InstanceType<typeof TableModule>>();

    const { t } = useI18n();
    // 初始数据
    const columnsInit = [
        {
            label: t('users.FullName'),
            prop: 'nickname',
            width: 120,
            defaultTemplate: true,
            isShow: true,
            orderIndex: 1,
        },
        {
            label: t('patients.PatientID'),
            prop: 'patient.patientid',
            width: 100,
            isShow: true,
            orderIndex: 2,
        },
        {
            label: t('patients.Birthdate'),
            prop: 'patient.birthdate',
            width: 120,
            defaultTemplate: true,
            type: 'date',
            isShow: true,
            orderIndex: 3,
        },
        {
            label: t('patients.SerialNumber'),
            prop: 'sn',
            width: 120,
            isShow: true,
            orderIndex: 4,
        },
        {
            label: t('patients.Office'),
            prop: 'institution_name',
            width: 120,
            isShow: true,
            orderIndex: 5,
        },
        {
            label: t('patients.TherapyStartDate'),
            prop: 'patient.setup_date',
            width: 125,
            defaultTemplate: true,
            type: 'date',
            isShow: true,
            orderIndex: 6,
        },
        {
            label: t('patients.PercentUsage'),
            prop: 'percent_usage',
            width: 120,
            defaultTemplate: true,
            isShow: true,
            orderIndex: 7,
        },
        {
            label: t('patients.LastUpdateDate'),
            prop: 'patient.use_end_time',
            width: 120,
            defaultTemplate: true,
            type: 'date',
            isShow: true,
            orderIndex: 8,
        },

        {
            label: t('patients.Compliant'),
            prop: 'compliant',
            width: 120,
            defaultTemplate: true,
            type: 'select',
            selectOptions: compliantOptions,
            isShow: true,
            orderIndex: 9,
        },
    ];

    const columnSelection = useCookie(useRoute().path + 'columnSelection', {
        default: () => [...columnsInit],
    });

    const showColumns = computed(() => {
        return columnSelection.value
            .slice()
            .filter(item => item.isShow)
            .sort((a, b) => a.orderIndex - b.orderIndex);
    });
    // const isShowColumn = (label: string) => {
    //     return columnSelection.value.length > 0
    //         ? columnSelection.value.find((item: any) => item.label === label)?.isShow
    //         : true;
    // };

    // const getColumnOrder = (label: string) => {
    //     return columnSelection.value.length > 0
    //         ? columnSelection.value.find((item: any) => item.label === label)?.orderIndex
    //         : 0;
    // };

    provide('update:columns', (saveData: any) => {
        columnSelection.value = saveData;
    });
</script>
