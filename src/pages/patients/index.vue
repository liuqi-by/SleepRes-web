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
                @click="create"
                >{{ $t('patients.AddPatient') }}
            </base-button>
            <base-button
                type="primary"
                @click="showUploadFiles"
                >{{ $t('patients.SDCardUpload') }}
            </base-button>
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
                        <!-- <nuxt-link
                            class="link"
                            :to="`/patientReport?id=` + row.id"
                            >{{ row.nickname }}
                        </nuxt-link> -->
                        <span
                            class="link"
                            @click="showPatientReport(row)"
                        >
                            {{ row.nickname }}
                        </span>
                    </template>
                    <template #header="{ column }">
                        <!-- <div class="table-header">
                            <span>{{ column.label }}</span>
                            <el-icon
                                :ref="
                                    el => {
                                        showKeyRef[column.property] = el;
                                    }
                                "
                                @click.stop="toggleNameFilter(column.property)"
                                class="filter-icon"
                                :class="{
                                    active: Array.isArray(searchDate[column.property])
                                        ? searchDate[column.property].length > 0
                                        : searchDate[column.property],
                                }"
                            >
                                <base-svg-icon icon="filter" />
                            </el-icon>
                        </div> -->
                        <table-filter-header
                            :column="column"
                            @toggle-name-filter="toggleNameFilter"
                            :showKeyRef="showKeyRef"
                            :searchDate="searchDate"
                        />
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
                        <!-- <div class="table-header">
                            <span>{{ column.label }}</span>
                            <el-icon
                                :ref="
                                    el => {
                                        showKeyRef[column.property] = el;
                                    }
                                "
                                @click.stop="toggleNameFilter(column.property)"
                                class="filter-icon"
                                :class="{
                                    active: Array.isArray(searchDate[column.property])
                                        ? searchDate[column.property].length > 0
                                        : searchDate[column.property],
                                }"
                            >
                                <base-svg-icon icon="filter" />
                            </el-icon>
                        </div> -->
                        <table-filter-header
                            :column="column"
                            @toggle-name-filter="toggleNameFilter"
                            :showKeyRef="showKeyRef"
                            :searchDate="searchDate"
                            type="input"
                        />
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
                        <!-- <div class="table-header">
                            <span>{{ column.label }}</span>
                            <el-icon
                                :ref="
                                    el => {
                                        showKeyRef[column.property] = el;
                                    }
                                "
                                @click.stop="toggleNameFilter(column.property, 'date')"
                                class="filter-icon"
                                :class="{
                                    active: Array.isArray(searchDate[column.property])
                                        ? searchDate[column.property].length > 0
                                        : searchDate[column.property],
                                }"
                            >
                                <base-svg-icon icon="filter" />
                            </el-icon>
                        </div> -->
                        <table-filter-header
                            :column="column"
                            @toggle-name-filter="toggleNameFilter"
                            :showKeyRef="showKeyRef"
                            :searchDate="searchDate"
                            type="date"
                        />
                    </template>
                </el-table-column>
                <el-table-column
                    prop="sn"
                    :label="$t('patients.SerialNumber')"
                    min-width="120"
                    align="center"
                    sortable
                >
                    <template #header="{ column }">
                        <!-- <div class="table-header">
                            <span>{{ column.label }}</span>
                            <el-icon
                                :ref="
                                    el => {
                                        showKeyRef[column.property] = el;
                                    }
                                "
                                @click.stop="toggleNameFilter(column.property)"
                                class="filter-icon"
                                :class="{
                                    active: Array.isArray(searchDate[column.property])
                                        ? searchDate[column.property].length > 0
                                        : searchDate[column.property],
                                }"
                            >
                                <base-svg-icon icon="filter" />
                            </el-icon>
                        </div> -->
                        <table-filter-header
                            :column="column"
                            @toggle-name-filter="toggleNameFilter"
                            :showKeyRef="showKeyRef"
                            :searchDate="searchDate"
                            type="input"
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
                        <!-- <div class="table-header">
                            <span>{{ column.label }}</span>
                            <el-icon
                                :ref="
                                    el => {
                                        showKeyRef[column.property] = el;
                                    }
                                "
                                @click.stop="toggleNameFilter(column.property)"
                                class="filter-icon"
                                :class="{
                                    active: Array.isArray(searchDate[column.property])
                                        ? searchDate[column.property].length > 0
                                        : searchDate[column.property],
                                }"
                            >
                                <base-svg-icon icon="filter" />
                            </el-icon>
                        </div> -->
                        <table-filter-header
                            :column="column"
                            @toggle-name-filter="toggleNameFilter"
                            :showKeyRef="showKeyRef"
                            :searchDate="searchDate"
                            type="input"
                        />
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
                        <!-- <div class="table-header">
                            <span>{{ column.label }}</span>
                            <el-icon
                                :ref="
                                    el => {
                                        showKeyRef[column.property] = el;
                                    }
                                "
                                @click.stop="toggleNameFilter(column.property, 'select')"
                                class="filter-icon"
                                :class="{
                                    active: Array.isArray(searchDate[column.property])
                                        ? searchDate[column.property].length > 0
                                        : searchDate[column.property],
                                }"
                            >
                                <base-svg-icon icon="filter" />
                            </el-icon>
                        </div> -->
                        <table-filter-header
                            :column="column"
                            @toggle-name-filter="toggleNameFilter"
                            :showKeyRef="showKeyRef"
                            :searchDate="searchDate"
                            type="date"
                        />
                    </template>
                </el-table-column>
                <el-table-column
                    prop="patient.percent_usage"
                    :label="$t('patients.PercentUsage')"
                    min-width="120"
                    align="center"
                    sortable
                >
                    <template #default="{ row }">
                        <span>{{ row.patient.percent_usage || 0 }}%</span>
                    </template>
                    <template #header="{ column }">
                        <!-- <div class="table-header">
                            <span>{{ column.label }}</span>
                            <el-icon
                                :ref="
                                    el => {
                                        showKeyRef[column.property] = el;
                                    }
                                "
                                @click.stop="toggleNameFilter(column.property)"
                                class="filter-icon"
                                :class="{
                                    active: Array.isArray(searchDate[column.property])
                                        ? searchDate[column.property].length > 0
                                        : searchDate[column.property],
                                }"
                            >
                                <base-svg-icon icon="filter" />
                            </el-icon>
                        </div> -->
                        <table-filter-header
                            :column="column"
                            @toggle-name-filter="toggleNameFilter"
                            :showKeyRef="showKeyRef"
                            :searchDate="searchDate"
                            type="input"
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
                    <template #header="{ column }">
                        <!-- <div class="table-header">
                            <span>{{ column.label }}</span>
                            <el-icon
                                :ref="
                                    el => {
                                        showKeyRef[column.property] = el;
                                    }
                                "
                                @click.stop="toggleNameFilter(column.property, 'select')"
                                class="filter-icon"
                                :class="{
                                    active: Array.isArray(searchDate[column.property])
                                        ? searchDate[column.property].length > 0
                                        : searchDate[column.property],
                                }"
                            >
                                <base-svg-icon icon="filter" />
                            </el-icon>
                        </div> -->
                        <table-filter-header
                            :column="column"
                            @toggle-name-filter="toggleNameFilter"
                            :showKeyRef="showKeyRef"
                            :searchDate="searchDate"
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
                >
                    <template #default="{ row }">
                        <!-- <Select
                            size="6"
                            color="var(--el-color-success)"
                            v-if="row.patient.compliant === 0"
                        />
                        <CloseBold
                            size="6"
                            color="var(--el-color-danger)"
                            v-else-if="row.patient.compliant === 2"
                        />
                        <span v-else-if="row.patient.compliant === 1">Monitoring</span> -->
                        <compliant-status :compliant="Number(row.patient.compliant)" />
                    </template>
                    <template #header="{ column }">
                        <!-- <div class="table-header">
                            <span>{{ column.label }}</span>
                            <el-icon
                                :ref="
                                    el => {
                                        showKeyRef[column.property] = el;
                                    }
                                "
                                @click.stop="toggleNameFilter(column.property, 'select', compliantOptions)"
                                class="filter-icon"
                                :class="{
                                    active: Array.isArray(searchDate[column.property])
                                        ? searchDate[column.property].length > 0
                                        : searchDate[column.property],
                                }"
                            >
                                <base-svg-icon icon="filter" />
                            </el-icon>
                        </div> -->
                        <table-filter-header
                            :column="column"
                            @toggle-name-filter="toggleNameFilter"
                            :showKeyRef="showKeyRef"
                            :searchDate="searchDate"
                            type="select"
                            :customOptions="compliantOptions"
                        />
                    </template>
                </el-table-column>
            </table-module>
        </div>

        <!-- 新增用户 -->
        <client-only>
            <add-user-dialog
                ref="addUserDialogRef"
                @refresh="getData"
                v-model="isShowAddUserDialog"
            />
            <!-- 患者记录 -->
            <patient-record
                ref="patientRecordRef"
                @show-upload-files="showUploadFiles"
            />

            <!-- 上传SD -->
            <lazy-upload-files ref="uploadFilesRef" />

            <!-- <el-popover
                :visible="visible"
                :virtual-ref="showKeyRef[showKey]"
                placement="bottom"
                :width="'fit-content'"
                trigger="click"
                ref="popoverRef"
                :key="showKeyRef[showKey]"
            >
                <div class="filter-popover">
                    <div v-if="filterType === 'input'">
                        <el-input
                            v-model="filterInput"
                            placeholder="输入框"
                            clearable
                            style="width: 150px; margin-top: 10px"
                            @keydown.enter="searchFilter"
                        />
                    </div>
                    <div v-else-if="filterType === 'select'">
                        <el-checkbox-group
                            v-model="selectFilter"
                            class="select-checkbox"
                            v-if="filterCustomOptions.length === 0"
                        >
                            <el-checkbox
                                v-for="item in filterList"
                                :key="item"
                                :label="item"
                                :value="item"
                            >
                                {{ item }}
                            </el-checkbox>
                        </el-checkbox-group>
                        <el-checkbox-group
                            v-model="selectFilter"
                            class="select-checkbox"
                            v-else
                        >
                            <el-checkbox
                                v-for="item in filterCustomOptions"
                                :key="item"
                                :label="item.label"
                                :value="item.value"
                            >
                                {{ item.label }}
                            </el-checkbox>
                        </el-checkbox-group>
                    </div>
                    <div v-else-if="filterType === 'date'">
                        <date-picker
                            v-model="filterInput"
                            type="date"
                            clearable
                            @change="searchFilter"
                        />
                    </div>
                    <div
                        class="mt"
                        style="text-align: right"
                    >
                        <el-button
                            type="info"
                            link
                            @click="cancelFilter"
                            >重置</el-button
                        >
                        <el-button
                            type="primary"
                            link
                            @click="searchFilter"
                            >筛选</el-button
                        >
                    </div>
                </div>
            </el-popover> -->
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

    import { getPatient } from '~/api/patient';
    import type { UserInfo } from '~/api/login/types';
    import type { UploadFiles } from '#build/components';
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

    const {
        showKey,
        showKeyRef,
        searchDate,
        visible,
        filterInput,
        selectFilter,
        filterType,
        filterCustomOptions,
        filterList,
        showTableListPaient,
        toggleNameFilter,
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
        { label: 'Compliance', value: 0 },
        { label: 'Monitoring', value: 1 },
        { label: 'Non-compliance', value: 2 },
    ];

    provide('update', getData);
</script>
