<template>
    <div
        class="page-container min-w-[600px]"
        @click="handleClickOutside"
    >
        <!-- 搜索模块 -->
        <search-module
            @search="search"
            v-model="searchOption"
            :placeholder="$t('admin.searchPlaceholder')"
            class="m-b-[20px]"
        />
        <!-- 表格模块 -->
        <div class="table-module">
            <table-module
                border
                :data="showTableListPaient"
                v-loading="loading"
                height="calc(100vh - 280px)"
                v-model:current-page="pageOption.currentPage"
                v-model:page-size="pageOption.pageSize"
                :total="pageOption.total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-sizes="[25, 50, 100]"
            >
                <el-table-column
                    prop="account_num"
                    :label="$t('admin.AccountNumber')"
                    min-width="120"
                    align="center"
                    sortable
                >
                    <template #header="{ column }">
                        <table-filter-header :column="column" />
                    </template>
                </el-table-column>

                <el-table-column
                    prop="last_name"
                    :label="$t('login.LastName')"
                    min-width="120"
                    align="center"
                    sortable
                >
                    <template #header="{ column }">
                        <table-filter-header :column="column" />
                    </template>
                </el-table-column>
                <el-table-column
                    prop="first_name"
                    :label="$t('login.FirstName')"
                    min-width="120"
                    align="center"
                    sortable
                >
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
                    prop="group_name"
                    :label="$t('admin.AccountType')"
                    min-width="120"
                    align="center"
                    sortable
                >
                    <template #header="{ column }">
                        <table-filter-header
                            :column="column"
                            type="select"
                            :custom-options="accountOptions"
                        />
                    </template>
                </el-table-column>
                <el-table-column
                    prop="frozen"
                    :label="$t('admin.AccountStatus')"
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
                    prop="address"
                    :label="$t('login.Address')"
                    min-width="120"
                    align="center"
                    sortable
                >
                    <template #header="{ column }">
                        <table-filter-header :column="column" />
                    </template>
                </el-table-column>
                <el-table-column
                    prop="state"
                    :label="$t('admin.State')"
                    min-width="120"
                    align="center"
                    sortable
                >
                    <template #header="{ column }">
                        <table-filter-header :column="column" />
                    </template>
                </el-table-column>
                <el-table-column
                    prop="zip_code"
                    :label="$t('login.ZipCode')"
                    min-width="120"
                    align="center"
                    sortable
                >
                    <template #header="{ column }">
                        <table-filter-header :column="column" />
                    </template>
                </el-table-column>
                <el-table-column
                    :label="$t('admin.Operate')"
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
    import { frozenUser, getUserlist } from '~/api/admin';
    import type { UserInfo } from '~/api/login/types';
    import { useUserStore } from '~/stores/modules/user';

    const ResetPasswordForm = defineAsyncComponent(() => import('../login/components/reset-password.vue'));

    const { searchOption, pageOption, loading, tableList, getData, handleSizeChange, handleCurrentChange, search } =
        usePageTable(getUserlist);

    // 重置密码
    const resetPasswordForm = ref<InstanceType<typeof ResetPasswordForm> | null>(null);
    const resetPwd = (row: UserInfo) => {
        resetPasswordForm.value?.showResetPassword(row);
    };

    // 删除
    // const { t } = useI18n();
    // const deleteItem = (row: UserInfo) => {
    //     let msg = t('admin.ConfirmDelete');
    //     ElMessageBox.confirm(' ', msg, {
    //         confirmButtonText: t('form.Confirm'),
    //         cancelButtonText: t('form.Cancel'),
    //         type: 'warning',
    //         customStyle: { minHeight: 0 },
    //         dangerouslyUseHTMLString: true,
    //     }).then(res => {});
    // };

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

    // 获取消息
    const getMessageNum = () => {
        useUserStore().getAdminMessage();
    };

    onMounted(() => {
        getMessageNum();
    });

    watch(
        () => useUserStore().messageCount,
        () => {
            getData();
        },
    );

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

    const accountOptions = [
        { label: 'DME', value: 'DME' },
        { label: 'Physician', value: 'Physician' },
    ];
</script>

<style lang="scss" scoped></style>
