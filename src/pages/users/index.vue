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
            :placeholder="$t('users.searchPlaceholder')"
        />
        <!-- 功能模块 -->
        <div class="function-module m-b-[20px]">
            <base-button
                type="primary"
                @click="createUser"
                >{{ userSotre.userInfo?.group_id !== 4 ? $t('users.CreateUser') : $t('users.CreateUserAccount') }}
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
                :page-sizes="[25, 50, 100]"
            >
                <el-table-column
                    :label="$t('message.NO')"
                    min-width="60"
                    align="center"
                    type="index"
                    v-if="userSotre.userInfo?.group_id === 4"
                />
                <el-table-column
                    prop="nickname"
                    :label="$t('users.FullName')"
                    min-width="120"
                    align="center"
                    sortable
                >
                    <template #default="{ row }">
                        <span>
                            {{ nameFormat(row) }}
                        </span>
                    </template>
                    <template #header="{ column }">
                        <table-filter-header :column="column" />
                    </template>
                </el-table-column>
                <el-table-column
                    prop="email"
                    :label="$t('login.Email')"
                    min-width="120"
                    align="center"
                    sortable
                >
                    <template #header="{ column }">
                        <table-filter-header :column="column" />
                    </template>
                </el-table-column>
                <el-table-column
                    prop="mobile"
                    :label="$t('login.PhoneNumber')"
                    min-width="120"
                    align="center"
                    sortable
                >
                    <template #header="{ column }">
                        <table-filter-header :column="column" />
                    </template>
                </el-table-column>
                <el-table-column
                    prop="institution_name"
                    :label="$t('users.OfficeLocation')"
                    min-width="120"
                    align="center"
                    sortable
                >
                    <template #header="{ column }">
                        <table-filter-header :column="column" />
                    </template>
                </el-table-column>
                <el-table-column
                    prop="group_name"
                    :label="$t('users.Role')"
                    min-width="120"
                    align="center"
                    sortable
                >
                    <template #header="{ column }">
                        <table-filter-header
                            :column="column"
                            type="select"
                        />
                    </template>
                    <!-- <template #default="{ row }">
                        {{ getRolesName(row.group_id) }}
                    </template> -->
                </el-table-column>
                <el-table-column
                    prop="account_id"
                    :label="$t('users.NPI')"
                    min-width="120"
                    align="center"
                    v-if="userSotre.userInfo?.group_id === 4"
                    sortable
                >
                    <template #header="{ column }">
                        <table-filter-header :column="column" />
                    </template>
                </el-table-column>
                <el-table-column
                    prop="frozen"
                    :label="$t('users.AccountStatus')"
                    min-width="120"
                    align="center"
                    sortable
                >
                    <template #default="{ row }">
                        <base-switch
                            v-model="row.frozen"
                            :active-value="0"
                            :inactive-value="1"
                            @change="frozenAccount(row)"
                        />
                    </template>

                    <template #header="{ column }">
                        <table-filter-header
                            :column="column"
                            type="select"
                            :custom-options="statusOptions"
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
                            >{{ $t('users.Modify') }}</span
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
        <ResetPasswordForm ref="resetPasswordForm" />
        <!-- 新增/编辑用户 -->
        <EditUserDialog
            ref="editUserDialog"
            @refresh="getData"
        />
        <!-- 筛选弹窗 -->
        <client-only>
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
    import EditUserDialog from './compononets/edit.vue';
    import { frozenUser, getUserlist } from '~/api/admin';
    import type { UserInfo } from '~/api/login/types';
    import { useUserStore } from '~/stores/modules/user';
    // import { getRolesName } from '~/enums/RolesEnum';

    const userSotre = useUserStore();

    const ResetPasswordForm = defineAsyncComponent(() => import('../login/components/reset-password-admin.vue'));

    const { searchOption, pageOption, loading, tableList, getData, handleSizeChange, handleCurrentChange, search } =
        usePageTable(getUserlist);

    // 重置密码
    const resetPasswordForm = ref<InstanceType<typeof ResetPasswordForm> | null>(null);
    const resetPwd = (row: any) => {
        resetPasswordForm.value?.showResetPassword(row);
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

    // 创建用户
    const editUserDialog = ref<InstanceType<typeof EditUserDialog>>();
    const createUser = () => {
        editUserDialog.value?.showDialog();
    };

    // 编辑
    const editUser = (row: UserInfo) => {
        editUserDialog.value?.showDialog(row);
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
    } = useFilterTableHeader(tableList);

    const statusOptions = [
        { label: 'Off', value: 1 },
        { label: 'On', value: 0 },
    ];
</script>

<style lang="scss" scoped></style>
