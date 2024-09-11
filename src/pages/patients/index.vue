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
                :data="tableListPaient"
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
                        <div class="table-header">
                            <span>{{ column.label }}</span>
                            <el-icon
                                :ref="
                                    el => {
                                        showKeyRef[column.property] = el;
                                    }
                                "
                                @click.stop="toggleNameFilter(column.property)"
                                class="filter-icon"
                                :class="searchDate[column.property] ? 'active' : ''"
                            >
                                <base-svg-icon icon="filter" />
                            </el-icon>
                        </div>
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
                        <div class="table-header">
                            <span>{{ column.label }}</span>
                            <el-icon
                                :ref="
                                    el => {
                                        showKeyRef[column.property] = el;
                                    }
                                "
                                @click.stop="toggleNameFilter(column.property)"
                                class="filter-icon"
                                :class="searchDate[column.property] ? 'active' : ''"
                            >
                                <base-svg-icon icon="filter" />
                            </el-icon>
                        </div>
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
                </el-table-column>
                <el-table-column
                    prop="sn"
                    :label="$t('patients.SerialNumber')"
                    min-width="120"
                    align="center"
                    sortable
                >
                    <template #header="{ column }">
                        <div class="table-header">
                            <span>{{ column.label }}</span>
                            <el-icon
                                :ref="
                                    el => {
                                        showKeyRef[column.property] = el;
                                    }
                                "
                                @click.stop="toggleNameFilter(column.property)"
                                class="filter-icon"
                                :class="searchDate[column.property] ? 'active' : ''"
                            >
                                <base-svg-icon icon="filter" />
                            </el-icon>
                        </div>
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
                        <div class="table-header">
                            <span>{{ column.label }}</span>
                            <el-icon
                                :ref="
                                    el => {
                                        showKeyRef[column.property] = el;
                                    }
                                "
                                @click.stop="toggleNameFilter(column.property)"
                                class="filter-icon"
                                :class="searchDate[column.property] ? 'active' : ''"
                            >
                                <base-svg-icon icon="filter" />
                            </el-icon>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="patient.setup_date"
                    :label="$t('patients.TherapyStartDate')"
                    min-width="120"
                    align="center"
                    sortable
                />
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
                        <div class="table-header">
                            <span>{{ column.label }}</span>
                            <el-icon
                                :ref="
                                    el => {
                                        showKeyRef[column.property] = el;
                                    }
                                "
                                @click.stop="toggleNameFilter(column.property)"
                                class="filter-icon"
                                :class="searchDate[column.property] ? 'active' : ''"
                            >
                                <base-svg-icon icon="filter" />
                            </el-icon>
                        </div>
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
                        <div class="table-header">
                            <span>{{ column.label }}</span>
                            <el-icon
                                :ref="
                                    el => {
                                        showKeyRef[column.property] = el;
                                    }
                                "
                                @click.stop="toggleNameFilter(column.property)"
                                class="filter-icon"
                                :class="searchDate[column.property] ? 'active' : ''"
                            >
                                <base-svg-icon icon="filter" />
                            </el-icon>
                        </div>
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
                        <div class="table-header">
                            <span>{{ column.label }}</span>
                            <el-icon
                                :ref="
                                    el => {
                                        showKeyRef[column.property] = el;
                                    }
                                "
                                @click.stop="toggleNameFilter(column.property)"
                                class="filter-icon"
                                :class="searchDate[column.property] ? 'active' : ''"
                            >
                                <base-svg-icon icon="filter" />
                            </el-icon>
                        </div>
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

            <el-popover
                :visible="visible"
                :virtual-ref="showKeyRef[showKey]"
                placement="bottom"
                :width="'fit-content'"
                trigger="click"
                ref="popoverRef"
                :key="showKeyRef[showKey]"
            >
                <div class="filter-popover">
                    <el-input
                        v-model="filterInput"
                        placeholder="输入框"
                        clearable
                        style="width: 150px; margin-top: 10px"
                    />
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
            </el-popover>
        </client-only>
    </div>
</template>

<script setup lang="ts">
    import { Filter } from '@element-plus/icons-vue';
    // import AddUserDialog from './compononets/add.vue';
    // import PatientRecord from './compononets/patient-record.vue';

    import { getPatient } from '~/api/patient';
    import type { UserInfo } from '~/api/login/types';
    import type { UploadFiles } from '#build/components';

    const PatientRecord = defineAsyncComponent(() => import('./compononets/patient-record.vue'));
    const AddUserDialog = defineAsyncComponent(() => import('./compononets/add.vue'));

    const { searchOption, pageOption, loading, tableList, getData, handleSizeChange, handleCurrentChange, search } =
        usePageTable(getPatient);

    const tableListPaient = computed(() => {
        return tableList.value
            ?.map(item => {
                return {
                    ...item,
                    patient: JSON.parse(item.patient),
                };
            })
            .filter(item => {
                let flag = true;
                console.log(searchDate);
                for (const key in searchDate.value) {
                    let itemValue = '';
                    if (key && key.includes('patient.')) {
                        itemValue = item.patient[key.split('.')[1]] || '';
                    } else {
                        itemValue = item[key] || '';
                    }

                    if (searchDate.value[key] && !itemValue.includes(searchDate.value[key])) {
                        flag = false;
                    }
                }
                return flag;
            });
    });

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

    const showKey = ref(); // 当前展示哪个筛选窗
    const visible = ref(false); // 手动控制筛选窗显隐

    const showKeyRef = ref<any>({}); // 当前展示哪个筛选窗

    const searchDate = ref<any>({}); // 查询参数
    const filterInput = ref<any>(); // 筛选框输入值
    // 全局重置
    const resetFilters = () => {
        searchDate.value = {};
    };

    const popoverRef = ref();
    // 触发筛选
    const toggleNameFilter = (key: string) => {
        if (showKey.value !== key) {
            visible.value = false;
        }

        showKey.value = key;
        filterInput.value = searchDate.value[key] || '';
        setTimeout(() => {
            visible.value = !visible.value;
        }, 0);
    };

    // 点击其他元素
    const handleClickOutside = () => {
        visible.value = false;
    };

    // 重置
    const cancelFilter = () => {
        searchDate.value[showKey.value] = '';
        visible.value = false;
    };
    // 筛选
    const searchFilter = () => {
        visible.value = false;
        searchDate.value[showKey.value] = filterInput.value;
    };

    provide('update', getData);
</script>

<style lang="scss" scoped>
    .filter-icon {
        position: relative;
        top: 2px;
        margin-right: 2px;

        /* transform: translateY(-50%); */
        margin-left: 10px;
        font-weight: bold;

        /* top: 50%;
        right: 15px; */
        cursor: pointer;

        &:hover,
        &.active {
            color: var(--el-color-primary);
        }

        svg {
            stroke-width: 10px;
        }
    }

    .table-header {
        display: inline;
    }
</style>
