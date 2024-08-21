<!-- 日志 -->
<template>
    <div class="logs">
        <table-module
            border
            :data="tableList"
            height="100%"
            v-model:current-page="pageOption.currentPage"
            v-model:page-size="pageOption.pageSize"
            :total="pageOption.total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        >
            <el-table-column
                prop="account_num"
                :label="$t('message.NO')"
                min-width="60"
                align="center"
            />
            <el-table-column
                prop="revision"
                :label="$t('patients.revision')"
                min-width="200"
                align="center"
            />
            <el-table-column
                prop="modifyTime"
                :label="$t('patients.modifyTime')"
                min-width="100"
                align="center"
            />
            <el-table-column
                prop="revisionPersonnel"
                :label="$t('patients.RevisionPersonnel')"
                min-width="100"
                align="center"
            />
        </table-module>
    </div>
</template>

<script setup lang="ts">
    const { pageOption, loading, tableList, getData, handleSizeChange, handleCurrentChange } = usePageTable();
</script>

<style lang="scss" scoped>
    .logs {
        height: 100%;
        padding: 40px;

        :deep(.el-pagination) {
            padding: 0 20px 20px;

            .el-select {
                height: 32px;
            }
        }

        :deep(.module-table) {
            height: calc(100%);
        }
    }
</style>
