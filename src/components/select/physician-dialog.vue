<!-- 添加医生 -->
<template>
    <div>
        <base-dialog
            v-model="dialogVisible"
            title=""
            width="700"
            @close="close"
            class="form-dialog from"
            append-to-body
        >
            <div class="form-title">SleepRes Physician List</div>
            <div class="search-module-item">
                <div class="search-module-item-label">{{ $t('form.Search') }}</div>
                <el-input
                    v-model="searchOption"
                    :placeholder="$t('patients.searchPlaceholderDoctor')"
                    @input="search"
                />
            </div>
            <div class="search-list">
                <table-module
                    ref="tableModule"
                    :data="data"
                    border
                    v-loading="loading"
                    v-model:currentPage="pageOption.page"
                    v-model:pageSize="pageOption.pageSize"
                    :total="pageOption.total"
                    height="300px"
                    :show-header="false"
                    highlight-current-row
                    @select-row-change="handleCurrentChange"
                >
                    <el-table-column align="left">
                        <template #default="{ row }">
                            {{ nameFormat(row) ? nameFormat(row) : '' }}
                            {{ row.institution_name ? ' / ' + row.institution_name : '' }}
                            {{ row.account_id ? ' / ' + row.account_id : '' }} {{ row.state ? ' / ' + row.state : '' }}
                        </template>
                    </el-table-column>
                </table-module>
                <div class="footer-btn">
                    <base-button
                        type="primary"
                        @click="selectPhy"
                        class="m-r-[50px]"
                        :disabled="!currentRow"
                        >SELECT
                    </base-button>
                    <base-button @click="close">CANCEL </base-button>
                </div>
            </div>
        </base-dialog>
    </div>
</template>

<script setup lang="ts">
    import { useThrottleFn } from '@vueuse/core';
    import type { TableModule } from '#build/components';
    import { getDoctor } from '~/api/patient';

    const dialogVisible = defineModel<boolean>();

    const close = () => {
        dialogVisible.value = false;
        searchOption.value = '';
        data.value = [];
        pageOption.value = {
            page: 1,
            pageSize: 10,
            total: 0,
        };
        currentRow.value = null;
    };

    const searchOption = ref('');

    const search = useThrottleFn(() => {
        pageOption.value.page = 1;
        getData();
    }, 300);
    const data = ref<any>([]);

    const pageOption = ref({
        page: 1,
        pageSize: 10,
        total: 0,
    });

    const loading = ref(false);
    const getData = () => {
        loading.value = true;
        getDoctor({
            page: pageOption.value.page - 1,
            pagesize: pageOption.value.pageSize,
            val: searchOption.value || '',
            type: 1,
        })
            .then(res => {
                if (res.code === 1) {
                    data.value = res.data;
                    pageOption.value.total = res.data_other.num;
                } else {
                    data.value = [];
                    pageOption.value.total = 0;
                }
            })
            .finally(() => {
                loading.value = false;
            });
    };

    watch(dialogVisible, val => {
        if (val) {
            getData();
        }
    });

    const currentRow = ref();
    const handleCurrentChange = (val: any) => {
        console.log(val);
        currentRow.value = val;
    };

    const emit = defineEmits(['change']);
    const selectPhy = () => {
        emit('change', {
            label: nameFormat(currentRow.value),
            id: currentRow.value.id,
        });
        close();
    };

    // const tableModule = ref<InstanceType<typeof TableModule>>();

    // const setCurrent = (row?: any) => {
    //     nextTick(() => {
    //         tableModule.value?.tableRef.value?.setCurrentRow(row);
    //     });
    // };
    // const loadMore = () => {
    //     if (pageOption.value.page * pageOption.value.pageSize >= pageOption.value.total) {
    //         return;
    //     }
    //     pageOption.value.page += 1;
    //     getData();
    // };

    // const rowClick = (row: any) => {
    //     console.log(row);
    // };
</script>

<style lang="scss" scoped>
    .search-module-item {
        display: flex;
        flex: 1;
        align-items: center;
        min-width: 400px;
        max-width: 600px;
        margin-right: 30px;

        .search-module-item-label {
            width: 60px;
            margin-right: 20px;
            font-weight: bold;
            white-space: nowrap;
        }
    }

    .search-list {
        margin-top: 30px;
    }

    .footer-btn {
        display: flex;
        justify-content: center;
        margin-top: 30px;
    }
</style>
