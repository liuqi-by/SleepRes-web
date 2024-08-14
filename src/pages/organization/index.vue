<template>
    <div class="page-container min-w-[600px]">
        <!-- 搜索模块 -->
        <search-module
            @search="search"
            v-model="searchOption"
            class="m-b-[20px]"
            :placeholder="$t('office.searchPlaceholder')"
        />
        <!-- 功能模块 -->
        <div class="function-module m-b-[20px]">
            <el-button
                type="primary"
                @click="create"
                >{{ $t('office.CreateOffice') }}
            </el-button>
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
            >
                <el-table-column
                    prop="name"
                    :label="$t('office.OfficeName')"
                    min-width="120"
                    align="center"
                />

                <el-table-column
                    prop="city"
                    :label="$t('office.City')"
                    min-width="120"
                    align="center"
                />
                <el-table-column
                    prop="state"
                    :label="$t('login.State')"
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
                    prop="address"
                    :label="$t('login.Address')"
                    min-width="120"
                    align="center"
                />
                <el-table-column
                    prop="mobile"
                    :label="$t('office.Telephone')"
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
                    prop="status"
                    :label="$t('message.Status')"
                    min-width="120"
                    align="center"
                >
                    <template #default="{ row }">
                        <el-switch
                            v-model="row.status"
                            :active-value="0"
                            :inactive-value="1"
                            @click="frozen(row)"
                        />
                    </template>
                </el-table-column>
                <el-table-column
                    :label="$t('office.Modify')"
                    min-width="120"
                    align="center"
                    fixed="right"
                >
                    <template #default="{ row }">
                        <span
                            class="link"
                            @click="edit(row)"
                            >{{ $t('office.Edit') }}</span
                        >
                    </template>
                </el-table-column>
            </table-module>
        </div>
        <!-- 新增/编辑用户 -->
        <EditOffice
            ref="editOffice"
            @refresh="getList"
        />
    </div>
</template>

<script setup lang="ts">
    import EditOffice from './compononets/edit.vue';
    import { editOrganization, getOrganization as getListApi } from '~/api/organization';

    import type { Organization } from '~/api/organization/types';

    const searchOption = ref('');

    const pageOption = ref({
        currentPage: 1,
        pageSize: 10,
        total: 0,
    });
    const loading = ref(false);
    const tableList = ref<Organization[]>([]);
    // 获取机构列表
    const getList = useDebounceFn(() => {
        loading.value = true;

        getListApi({
            page: pageOption.value.currentPage - 1,
            pagesize: pageOption.value.pageSize,
            val: searchOption.value,
        })
            .then(res => {
                if (res.code === 1) {
                    tableList.value = res.data;
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
        getList();
    };

    const handleSizeChange = () => {
        getList();
    };
    const handleCurrentChange = () => {
        getList();
    };

    // 冻结/解冻
    const frozen = useDebounceFn((row: Organization) => {
        // 编辑
        editOrganization({
            ...row,
        })
            .catch(() => {
                row.status = row.status === '1' ? '0' : '1';
            })
            .finally(() => {
                loading.value = false;
            });
    }, 300);

    onActivated(() => {
        getList();
    });

    // 创建用户
    const editOffice = ref<InstanceType<typeof EditOffice>>();
    const create = () => {
        console.log('create', editOffice);
        editOffice.value?.showDialog();
    };

    // 编辑用户
    const edit = (row: Organization) => {
        editOffice.value?.showDialog(row);
    };
</script>

<style lang="scss" scoped></style>
