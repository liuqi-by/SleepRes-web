<!-- 日志 -->
<template>
    <div
        class="logs"
        @click="handleClickOutside"
    >
        <table-module
            border
            v-loading="loading"
            :data="showTableListPaient"
            height="100%"
            v-model:current-page="pageOption.currentPage"
            v-model:page-size="pageOption.pageSize"
            :total="pageOption.total"
            @size-change="getData"
            @current-change="getData"
            :pageSizes="[25, 50, 100]"
        >
            <el-table-column
                type="index"
                :label="$t('message.NO')"
                min-width="60"
                align="center"
            />
            <el-table-column
                prop="title"
                :label="$t('patients.revision')"
                min-width="200"
                align="center"
                sortable
            >
                <template #header="{ column }">
                    <table-filter-header :column="column" />
                </template>
            </el-table-column>
            <el-table-column
                prop="updatetime"
                :label="$t('patients.modifyTime')"
                min-width="100"
                align="center"
                sortable
            >
                <template #default="{ row }">
                    {{ row.updatetime && moment(row.updatetime * 1000).format(dateFormatReg + ' HH:mm:ss') }}
                </template>
                <template #header="{ column }">
                    <table-filter-header
                        :column="column"
                        type="date"
                    />
                </template>
            </el-table-column>
            <el-table-column
                prop="admin_name"
                :label="$t('patients.RevisionPersonnel')"
                min-width="100"
                align="center"
                sortable
            >
                <template #header="{ column }">
                    <table-filter-header :column="column" />
                </template>
            </el-table-column>
        </table-module>
        <!-- 筛选弹窗 -->
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
    </div>
</template>

<script setup lang="ts">
    import moment from 'moment';
    import type { UserInfo } from '~/api/login/types';
    import { getLogs } from '~/api/patient';
    import type { Log } from '~/api/patient/types';

    const pageOption = ref({
        currentPage: 1,
        pageSize: 25,
        total: 0,
    });

    const patient = inject<Ref<UserInfo>>('patient');

    const loading = ref(false);
    const tableList = ref<Log[]>([]);
    const getData = () => {
        if (!patient?.value.sn) {
            return;
        }
        loading.value = true;

        getLogs({
            page: pageOption.value.currentPage - 1,
            pagesize: pageOption.value.pageSize,
            sn: patient.value.sn,
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
    };
    getData();

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
</script>

<style lang="scss" scoped>
    .logs {
        height: 100%;
        padding: 40px;

        :deep(.el-pagination) {
            padding: 0 20px 20px;

            .el-select {
                width: 120px;
                height: 32px;
            }
        }

        :deep(.module-table) {
            height: 500px;
        }
    }
</style>
