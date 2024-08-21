<template>
    <div class="page-container min-w-[600px]">
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
                @click="create"
                >{{ $t('patients.SDCardUpload') }}
            </base-button>
        </div>
        <!-- 表格模块 -->
        <div class="table-module">
            <table-module
                border
                :data="tableList"
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
                </el-table-column>

                <el-table-column
                    prop="patient.patientid"
                    :label="$t('patients.PatientID')"
                    min-width="120"
                    align="center"
                />
                <el-table-column
                    prop="patient.birthdate"
                    :label="$t('patients.Birthdate')"
                    min-width="120"
                    align="center"
                />
                <el-table-column
                    prop="sn"
                    :label="$t('patients.SerialNumber')"
                    min-width="120"
                    align="center"
                />
                <el-table-column
                    prop="institution_name"
                    :label="$t('patients.Office')"
                    min-width="120"
                    align="center"
                />
                <el-table-column
                    prop="patient.setup_date"
                    :label="$t('patients.TherapyStartDate')"
                    min-width="120"
                    align="center"
                />
                <el-table-column
                    prop="patient.percent_usage"
                    :label="$t('patients.PercentUsage')"
                    min-width="120"
                    align="center"
                >
                    <template #default="{ row }">
                        <span>{{ row.patient.percent_usage || 0 }}%</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="patient.use_end_time"
                    :label="$t('patients.LastUpdateDate')"
                    min-width="120"
                    align="center"
                />
                <el-table-column
                    prop="patient.compliant"
                    :label="$t('patients.Compliant')"
                    min-width="120"
                    align="center"
                >
                    <template #default="{ row }">
                        <Select
                            size="6"
                            color="var(--el-color-success)"
                            v-if="row.patient.compliant === 1"
                        />
                        <CloseBold
                            size="6"
                            color="var(--el-color-danger)"
                            v-else
                        />
                    </template>
                </el-table-column>
            </table-module>
        </div>

        <!-- 新增/编辑用户 -->
        <EditUserDialog
            ref="editUserDialog"
            @refresh="getData"
        />
        <!-- 患者记录 -->
        <patient-record ref="patientRecordRef" />
    </div>
</template>

<script setup lang="ts">
    import { Select, CloseBold } from '@element-plus/icons-vue';
    import EditUserDialog from './compononets/edit.vue';
    import PatientRecord from './compononets/patient-record.vue';
    import { getPatient } from '~/api/patient';

    const { searchOption, pageOption, loading, tableList, getData, handleSizeChange, handleCurrentChange, search } =
        usePageTable(getPatient);

    // 创建
    const editUserDialog = ref<InstanceType<typeof EditUserDialog>>();
    const create = () => {
        editUserDialog.value?.showDialog();
    };

    // 查看患者信息
    const patientRecordRef = ref<InstanceType<typeof PatientRecord>>();
    const showPatientReport = () => {
        patientRecordRef.value?.showDialog();
    };
</script>
