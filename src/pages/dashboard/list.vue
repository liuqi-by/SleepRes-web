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
        <div class="function-module m-b-[20px] flex justify-between">
            <base-button
                type="primary"
                @click="navigateTo('/dashboard')"
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
                    v-model="date"
                    class="m-r-[40px]"
                    v-if="listType < 4"
                />
                <select-adherent
                    v-model:status="status"
                    v-if="listType < 3"
                />
                <select-hours
                    v-model="hours"
                    v-if="listType === 3"
                />
                <select-days
                    v-model="days"
                    v-if="listType === 4"
                />
                <select-leak
                    v-model="leak"
                    v-if="listType === 5"
                />
                <select-ahi
                    v-model="ahi"
                    v-if="listType === 6"
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
                    :label="`Average Hrs of Use ${moment(date).format('MMM YYYY')}`"
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
                    label="Modem Type"
                    min-width="120"
                    align="center"
                    sortable
                    v-if="listType === 4"
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
                    prop="patient.compliant"
                    label="Mask"
                    min-width="120"
                    align="center"
                    sortable
                    v-if="listType === 5"
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
                    prop="patient.compliant"
                    :label="$t('patients.Compliant')"
                    min-width="120"
                    align="center"
                    sortable
                    v-if="listType < 3"
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
                    label="Avg Leak Last 5 Days"
                    min-width="120"
                    align="center"
                    sortable
                    v-if="listType === 5"
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
                    label="Avg AHI Last 5 Days"
                    min-width="120"
                    align="center"
                    sortable
                    v-if="listType === 6"
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
    import selectAdherent from './components/select-adherent.vue';
    import selectMonthYear from './components/select-month-year.vue';
    import selectHours from './components/select-hours.vue';
    import selectDays from './components/select-days.vue';
    import selectLeak from './components/select-leak.vue';
    import selectAhi from './components/select-ahi.vue';
    import { RoleType } from '~/enums/RolesEnum';
    import { getPatient } from '~/api/patient';

    // import type { FilterType } from '~/components/table-filter/header.vue';

    const { searchOption, pageOption, loading, tableList, _getData, handleSizeChange, handleCurrentChange, search } =
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

    const compliantOptions = [
        { label: 'Adherent', value: 0 },
        { label: 'Monitoring', value: 1 },
        { label: 'Non-Adherent', value: 2 },
    ];

    const status = ref(0);
    const route = useRoute();
    const date = ref();
    const listType = ref(1);
    const setupDate = ref();
    const hours = ref();
    const days = ref();
    const leak = ref();
    const ahi = ref();
    onMounted(() => {
        console.log(route.query);
        listType.value = Number(route.query.type as unknown as number) || 1;
        status.value = (route.query.status as unknown as number) || 0;
        date.value = (route.query.date as unknown as string) || '';
        hours.value = route.query.hours || '';
        days.value = route.query.days || '';
        leak.value = route.query.leak || '';
        ahi.value = route.query.ahi || '';
    });
</script>
