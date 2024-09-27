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
            :placeholder="$t('office.searchPlaceholder')"
        />
        <!-- 功能模块 -->
        <div class="function-module m-b-[20px]">
            <base-button
                type="primary"
                @click="create"
                >{{ $t('office.CreateOffice') }}
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
                    prop="name"
                    :label="$t('office.OfficeName')"
                    min-width="120"
                    align="center"
                    sortable
                >
                    <template #header="{ column }">
                        <table-filter-header :column="column" />
                    </template>
                </el-table-column>

                <el-table-column
                    prop="city"
                    :label="$t('office.City')"
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
                    :label="$t('login.State')"
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
                    prop="mobile"
                    :label="$t('office.Telephone')"
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
                    :label="$t('office.Modify')"
                    min-width="120"
                    align="center"
                >
                    <template #default="{ row }">
                        <span
                            class="link"
                            @click="edit(row)"
                            >{{ $t('office.Edit') }}</span
                        >
                        <span
                            class="link m-l-[20px]"
                            @click="deleteItem(row)"
                            >{{ $t('admin.delete') }}</span
                        >
                    </template>
                </el-table-column>
                <el-table-column
                    prop="status"
                    :label="$t('users.AccountStatus')"
                    min-width="120"
                    align="center"
                >
                    <template #default="{ row }">
                        <base-switch
                            v-model="row.status"
                            :active-value="0"
                            :inactive-value="1"
                            @change="frozen(row)"
                            msgOn="office.statusOn"
                            msgOff="office.statusOff"
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
            </table-module>
        </div>
        <!-- 新增/编辑用户 -->
        <EditOffice
            ref="editOffice"
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
    import EditOffice from './compononets/edit.vue';
    import { deleteOrganization, editOrganization, getOrganization } from '~/api/organization';

    import type { Organization } from '~/api/organization/types';

    const { searchOption, pageOption, loading, tableList, getData, handleSizeChange, handleCurrentChange, search } =
        usePageTable(getOrganization, 2);

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

    // 删除
    const { t } = useI18n();
    const deleteItem = (row: Organization) => {
        let msg = t('admin.ConfirmDelete');
        ElMessageBox.confirm(' ', msg, {
            confirmButtonText: t('form.Confirm'),
            cancelButtonText: t('form.Cancel'),
            type: 'warning',
            customStyle: { minHeight: 0 },
            dangerouslyUseHTMLString: true,
        }).then(() => {
            deleteOrganization(row.id).then(res => {
                if (res.code === 1) {
                    ElMessage.success(t('admin.DeleteSuccess'));
                    getData();
                }
            });
        });
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
