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
        <div class="function-module m-b-[20px]">
            <el-button
                type="primary"
                @click="createUser"
                >{{ $t('users.CreateUser') }}
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
            >
                <el-table-column
                    prop="nickname"
                    :label="$t('users.FullName')"
                    min-width="120"
                    align="center"
                />

                <el-table-column
                    prop="email"
                    :label="$t('login.Email')"
                    min-width="120"
                    align="center"
                />
                <el-table-column
                    prop="mobile"
                    :label="$t('login.PhoneNumber')"
                    min-width="120"
                    align="center"
                />
                <el-table-column
                    prop="group_name"
                    :label="$t('users.OfficeLocation')"
                    min-width="120"
                    align="center"
                />
                <el-table-column
                    prop="group_name"
                    :label="$t('users.Role')"
                    min-width="120"
                    align="center"
                />
                <el-table-column
                    prop="frozen"
                    :label="$t('message.Status')"
                    min-width="120"
                    align="center"
                >
                    <template #default="{ row }">
                        <el-switch
                            v-model="row.frozen"
                            :active-value="0"
                            :inactive-value="1"
                            @click="frozenAccount(row)"
                        />
                    </template>
                </el-table-column>
                <el-table-column
                    :label="$t('users.EditUser')"
                    min-width="120"
                    align="center"
                    fixed="right"
                >
                    <template #default="{ row }">
                        <span
                            class="link"
                            @click="editUser(row)"
                            >{{ $t('users.EditUser') }}</span
                        >
                    </template>
                </el-table-column>
                <el-table-column
                    :label="$t('login.pwdReset')"
                    min-width="120"
                    align="center"
                    fixed="right"
                >
                    <template #default="{ row }">
                        <span
                            class="link"
                            @click="resetPwd(row)"
                            >{{ $t('login.resetPwd') }}</span
                        >
                    </template>
                </el-table-column>
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
        pageSize: 10,
        total: 0,
    });
    const loading = ref(false);
    const accountList = ref<UserInfo[]>([]);

    // 重置密码
    const resetPasswordForm = ref<InstanceType<typeof LazyResetPasswordForm> | null>(null);
    const resetPwd = (row: any) => {
        resetPasswordForm.value?.showResetPassword(row);
    };

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

    // 冻结/解冻
    const frozenAccount = useDebounceFn((row: UserInfo) => {
        frozenUser({
            user_id: row.id,
            frozen: row.frozen,
        })
            .then(res => {
                if (res.code === 1) {
                    // ElMessage.success('操作成功');
                }
            })
            .catch(() => {
                row.frozen = row.frozen === 1 ? 0 : 1;
            });
    }, 300);

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
