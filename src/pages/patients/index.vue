<template>
    <div class="page-container min-w-[600px]">
        <!-- 搜索模块 -->
        <search-module
            @search="search"
            v-model="searchOption"
            class="m-b-[20px]"
            :placeholder="$t('users.searchPlaceholder')"
        />
        <!-- 功能模块 -->
        <div class="function-module m-b-[20px] flex justify-between">
            <el-button
                type="primary"
                @click="createUser"
                >{{ $t('patients.AddPatient') }}
            </el-button>
            <el-button
                type="primary"
                @click="createUser"
                >{{ $t('patients.SDCardUpload') }}
            </el-button>
        </div>
        <!-- 表格模块 -->
        <div class="table-module">
            <table-module
                border
                :data="accountList"
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
                />

                <el-table-column
                    prop="Patient ID"
                    :label="$t('patients.PatientID')"
                    min-width="120"
                    align="center"
                />
                <el-table-column
                    prop="Birthdate"
                    :label="$t('patients.Birthdate')"
                    min-width="120"
                    align="center"
                />
                <el-table-column
                    prop="institution_name"
                    :label="$t('users.OfficeLocation')"
                    min-width="120"
                    align="center"
                />
                <el-table-column
                    prop="SerialNumber"
                    :label="$t('patients.SerialNumber')"
                    min-width="120"
                    align="center"
                />
                <el-table-column
                    prop="Office"
                    :label="$t('patients.Office')"
                    min-width="120"
                    align="center"
                />
                <el-table-column
                    prop="TherapyStartDate"
                    :label="$t('patients.TherapyStartDate')"
                    min-width="120"
                    align="center"
                />
                <el-table-column
                    prop="PercentUsage"
                    :label="$t('patients.PercentUsage')"
                    min-width="120"
                    align="center"
                />
                <el-table-column
                    prop="LastUpdateDate"
                    :label="$t('patients.LastUpdateDate')"
                    min-width="120"
                    align="center"
                />
                <el-table-column
                    prop="Compliant"
                    :label="$t('patients.Compliant')"
                    min-width="120"
                    align="center"
                />
            </table-module>
        </div>
        <!-- 重置密码弹窗 -->
        <LazyResetPasswordForm ref="resetPasswordForm" />
        <!-- 新增/编辑用户 -->
        <EditUserDialog
            ref="editUserDialog"
            @refresh="getAccountList"
        />
    </div>
</template>

<script setup lang="ts">
    import EditUserDialog from './compononets/edit.vue';
    import { frozenUser, getUserlist } from '~/api/admin';
    import type { UserInfo } from '~/api/login/types';

    const LazyResetPasswordForm = defineAsyncComponent(() => import('../login/components/reset-password.vue'));

    const searchOption = ref('');

    const pageOption = ref({
        currentPage: 1,
        pageSize: 25,
        total: 0,
    });
    const loading = ref(false);
    const accountList = ref<UserInfo[]>([]);

    // 获取用户列表
    const getAccountList = useDebounceFn(() => {
        loading.value = true;

        getUserlist({
            page: pageOption.value.currentPage - 1,
            pagesize: pageOption.value.pageSize,
            val: searchOption.value,
        })
            .then(res => {
                if (res.code === 1) {
                    accountList.value = res.data;
                    pageOption.value.total = res.data_other.num;
                }
            })
            .finally(() => {
                loading.value = false;
            });
    }, 300);

    // 搜索
    const search = () => {
        pageOption.value.currentPage = 1;
        getAccountList();
    };

    const handleSizeChange = () => {
        getAccountList();
    };
    const handleCurrentChange = () => {
        getAccountList();
    };
    onActivated(() => {
        getAccountList();
    });

    // 创建用户
    const editUserDialog = ref<InstanceType<typeof EditUserDialog>>();
    const createUser = () => {
        editUserDialog.value?.showDialog();
    };

    // 编辑
    const editUser = (row: UserInfo) => {
        editUserDialog.value?.showDialog(row);
    };
</script>

<style lang="scss" scoped></style>
