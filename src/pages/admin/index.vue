<template>
    <div class="page-container">
        <!-- 搜索模块 -->
        <div class="search-module m-b-[20px]">
            <div class="search-module-item">
                <el-input
                    v-model="searchOption"
                    :placeholder="$t('admin.searchPlaceholder')"
                />
            </div>
            <!-- <div class="search-module-item">
                <div class="search-module-item-label">Name</div>
                <el-input
                    v-model="searchOption.name"
                    placeholder="Please input"
                />
            </div>
            <div class="search-module-item">
                <div class="search-module-item-label">Account</div>
                <el-input
                    v-model="searchOption.account"
                    placeholder="Please input"
                />
            </div>
            <div class="search-module-item">
                <div class="search-module-item-label">State</div>
                <select-state v-model="searchOption.state" />
            </div> -->
            <div class="search-module-item">
                <base-button
                    type="primary"
                    @click="search"
                >
                    <base-svg-icon
                        icon="search"
                        size="22px"
                    />
                </base-button>
            </div>
        </div>

        <!-- 表格模块 -->
        <div class="table-module">
            <table-module
                border
                :data="accountList"
                v-loading="loading"
                height="calc(100vh - 280px)"
                v-model:current-page="pageOption.currentPage"
                v-model:page-size="pageOption.pageSize"
                :total="pageOption.total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
            >
                <el-table-column
                    prop="account_num"
                    :label="$t('admin.AccountNumber')"
                    min-width="120"
                    align="center"
                />
                <el-table-column
                    prop="last_name"
                    :label="$t('login.LastName')"
                    min-width="120"
                    align="center"
                />
                <el-table-column
                    prop="first_name"
                    :label="$t('login.FirstName')"
                    min-width="120"
                    align="center"
                />
                <el-table-column
                    prop="group_name"
                    :label="$t('admin.AccountType')"
                    min-width="120"
                    align="center"
                />
                <el-table-column
                    prop="frozen"
                    :label="$t('admin.AccountStatus')"
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
                    prop="address"
                    :label="$t('login.Address')"
                    min-width="120"
                    align="center"
                />
                <el-table-column
                    prop="state"
                    :label="$t('admin.State')"
                    min-width="120"
                    align="center"
                />
                <el-table-column
                    prop="zip_code"
                    :label="$t('login.ZipCode')"
                    min-width="120"
                    align="center"
                />
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
    </div>
</template>

<script setup lang="ts">
    import { frozenUser, getUserlist } from '~/api/admin';
    import type { UserInfo } from '~/api/login/types';
    import { useUserStore } from '~/stores/modules/user';

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
        accountList.value = [];

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

    // 获取消息
    const getMessageNum = () => {
        useUserStore().getAdminMessage();
    };

    onActivated(() => {
        getMessageNum();
        getAccountList();
    });

    watch(
        () => useUserStore().messageCount,
        () => {
            getAccountList();
        },
    );
</script>

<style lang="scss" scoped>
    .search-module {
        display: flex;
        padding: 20px;
        border: 1px solid var(--el-border-color);
        border-radius: var(--el-border-radius-base);

        .search-module-item {
            display: flex;
            flex: 1;
            align-items: center;
            min-width: 200px;
            max-width: 300px;
            margin-right: 30px;

            .search-module-item-label {
                margin-right: 8px;
            }
        }

        @media screen and (width <= 768px) {
            flex-wrap: wrap;
            padding-bottom: 0;

            .search-module-item {
                margin-bottom: 20px;

                .search-module-item-label {
                    width: 80px;
                }
            }
        }
    }
</style>
