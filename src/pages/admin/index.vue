<template>
    <div class="page-container">
        <!-- 搜索模块 -->
        <div class="search-module">
            <div class="search-module-item">
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
            </div>
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
                :tableData="accountList"
                v-loading="loading"
                height="calc(100vh - 280px)"
                v-model:pageOption="pageOption"
            >
                <el-table-column
                    prop="account"
                    label="Account #"
                    min-width="120"
                    align="center"
                />
                <el-table-column
                    prop="lastName"
                    label="Last Name"
                    min-width="120"
                    align="center"
                />
                <el-table-column
                    prop="firstName"
                    label="First Name"
                    min-width="120"
                    align="center"
                />
                <el-table-column
                    prop="accountType"
                    label="Account Type"
                    min-width="120"
                    align="center"
                />
                <el-table-column
                    prop="status"
                    label="Account Status"
                    min-width="120"
                    align="center"
                >
                    <template #default="{ row }">
                        <el-switch v-model="row.status" />
                    </template>
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="Address"
                    min-width="120"
                    align="center"
                />
                <el-table-column
                    prop="state"
                    label="State"
                    min-width="120"
                    align="center"
                />
                <el-table-column
                    prop="zipCode"
                    label="Zip Code"
                    min-width="120"
                    align="center"
                />
                <el-table-column
                    label="Password Reset"
                    min-width="120"
                    align="center"
                >
                    <template #default="{ row }">
                        <span
                            class="link"
                            @click="resetPwd(row)"
                            >Reset Password</span
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
    const LazyResetPasswordForm = defineAsyncComponent(() => import('../login/components/reset-password.vue'));

    const searchOption = ref({
        name: '',
        account: '',
        state: '',
    });

    const pageOption = ref({
        currentPage: 1,
        pageSize: 10,
        total: 0,
    });
    const loading = ref(false);
    const accountList = ref([]);

    // 重置密码
    const resetPasswordForm = ref<InstanceType<typeof LazyResetPasswordForm> | null>(null);
    const resetPwd = (row: any) => {
        resetPasswordForm.value?.showResetPassword(row);
    };

    // 搜索
    const search = () => {};

    console.log(1234);
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
