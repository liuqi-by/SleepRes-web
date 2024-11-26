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
                <select-month-year
                    v-model="setupDate"
                    class="m-r-[40px]"
                    label="Setup Month"
                    v-if="listType === 3"
                />
                <select-month-year
                    v-model="option.date"
                    class="m-r-[40px]"
                    v-if="listType < 4 && listType > 1"
                />
                <select-options
                    v-model="selectConfig.model"
                    :options="selectConfig.option"
                    :label="selectConfig.label"
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
                        {{ nameFormat(row) }}
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
                    prop="patient.percent_usage"
                    label="Best 30 Days"
                    min-width="120"
                    align="center"
                    sortable
                    v-if="listType < 3"
                >
                    <template #default="{ row }">
                        <span>{{ row.patient.percent_usage || 0 }}%</span>
                    </template>
                    <template #header="{ column }">
                        <table-filter-header :column="column" />
                    </template>
                </el-table-column>
                <el-table-column
                    prop="patient.percent_usage"
                    label="Adherence Date"
                    min-width="120"
                    align="center"
                    sortable
                    v-if="listType < 3"
                >
                    <template #default="{ row }">
                        <span>{{ row.patient.percent_usage || 0 }}%</span>
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
                        <span>{{ row.patient.percent_usage || 0 }}%</span>
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
                        <span>{{ row.patient.percent_usage || 0 }}%</span>
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
                        <compliant-status :compliant="Number(row.patient.compliant)" />
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
                        <span>{{ row.patient.percent_usage || 0 }}%</span>
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
                        <span>{{ row.patient.percent_usage || 0 }}%</span>
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
                    v-if="listType > 5"
                >
                    <template #default="{ row }">
                        <span>{{ row.patient.percent_usage || 0 }}%</span>
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
        </client-only>
    </div>
</template>

<script setup lang="ts">
    // import AddUserDialog from './compononets/add.vue';
    // import PatientRecord from './compononets/patient-record.vue';
    import moment from 'moment';
    import selectMonthYear from './components/select-month-year.vue';
    import { RoleType } from '~/enums/RolesEnum';

    import { getAdherenceProportionUserList } from '~/api/dashboard';

    // import type { FilterType } from '~/components/table-filter/header.vue';

    const tableListPaient = computed(() => {
        return tableList.value?.map((item: any) => {
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

    const compliantOptions = [
        { label: 'Adherent', value: 0 },
        { label: 'Monitoring', value: 1 },
        { label: 'Non-Adherent', value: 2 },
    ];

    const route = useRoute();

    const option = ref({
        status: (route.query.status as unknown as number) || 0,
        dateType: (route.query.type as unknown as number) || 1,
        date: (route.query.date as unknown as string) || '',
    });
    const listType = ref(Number(route.query.listType as unknown as number) || 1);
    const setupDate = ref();
    const hours = ref();
    const days = ref();
    const leak = ref();
    const ahi = ref();

    type Config = {
        option: { label: string; value: number }[];
        model: string | number;
        label: string;
    };
    const selectConfig = ref<Config>({
        option: [],
        model: '',
        label: '',
    });

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
            value: 0,
        },
        {
            label: '6-10 Days',
            value: 1,
        },
        {
            label: '11-15 Days',
            value: 2,
        },
        {
            label: '16-20 Days',
            value: 3,
        },
        {
            label: '21 Days or Greater',
            value: 4,
        },
    ];

    const leakOptions = [
        {
            label: '10 - 19 LPM',
            value: 0,
        },
        {
            label: '20 - 29 LPM',
            value: 1,
        },
        {
            label: '30 - 39 LPM',
            value: 2,
        },
        {
            label: '40 LPM or greater',
            value: 3,
        },
    ];

    const ahiOptions = [
        {
            label: '10 - 19',
            value: 0,
        },
        {
            label: '20 - 29',
            value: 1,
        },
        {
            label: '30 - 39',
            value: 2,
        },
        {
            label: '40 or greater',
            value: 3,
        },
    ];

    selectConfig.value = (() => {
        let config: Config = { option: [], model: '', label: '' };
        switch (listType.value) {
            case 1:
                config = {
                    option: compliantOptions,
                    model: option.value.status,
                    label: 'Status',
                };
                break;
            case 2:
                config = {
                    option: compliantOptions.filter(item => item.value !== 1),
                    model: option.value.status,
                    label: 'Status',
                };
                break;
            case 3:
                config = {
                    option: hoursOptions,
                    model: hours.value,
                    label: 'Hours',
                };
                break;
            case 4:
                config = {
                    option: daysOptions,
                    model: days.value,
                    label: 'Days',
                };
                break;
            case 5:
                config = {
                    option: leakOptions,
                    model: leak.value,
                    label: 'Leak',
                };
                break;
            case 6:
                config = {
                    option: ahiOptions,
                    model: ahi.value,
                    label: 'AHI',
                };
                break;
            default:
                config = {
                    option: [],
                    model: '',
                    label: '',
                };
                break;
        }
        return config;
    })();

    const { searchOption, pageOption, loading, tableList, handleSizeChange, handleCurrentChange, search } =
        usePageTable(getAdherenceProportionUserList, {
            type: option.value.dateType,
            compliant: option.value.status,
            date: option.value.date,
        });

    onMounted(() => {
        console.log(route.query);
        hours.value = route.query.hours || '';
        days.value = route.query.days || '';
        leak.value = route.query.leak || '';
        ahi.value = route.query.ahi || '';
    });

    // const selectConfig = ref<any>({
    //     option: [],
    //     model: '',
    //     label: '',
    // });

    watch(
        () => selectConfig.value.model,
        () => {
            search({
                type: option.value.dateType,
                compliant: selectConfig.value.model as number,
                date: option.value.date,
            });
        },
        {
            deep: true,
        },
    );
</script>
