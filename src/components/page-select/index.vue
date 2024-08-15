<!-- 分页下拉 -->
<template>
    <el-select
        v-model="value"
        placeholder="请选择"
        remote
        :remote-method="getList"
        remote-show-suffix
        class="selectSearch"
        @filter-method="getList"
        clearable
    >
        <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.name"
            :value="item.id"
        />
        <template #footer>
            <base-pagination
                layout="prev, pager, next,->, jumper"
                v-model:current-page="pageOption.currentPage"
                v-model:page-size="pageOption.pageSize"
                :total="pageOption.total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
            />
        </template>
    </el-select>
</template>

<script setup lang="ts">
    import { getOrganization } from '~/api/organization';
    import type { Organization } from '~/api/organization/types';

    const options = ref<Organization[]>([]);
    const value = defineModel({
        type: String,
        default: '',
    });

    const pageOption = ref({
        currentPage: 1,
        pageSize: 10,
        total: 0,
    });

    const getList = (val?: string) => {
        getOrganization({
            page: pageOption.value.currentPage - 1,
            pagesize: pageOption.value.pageSize,
            val: val || '',
        }).then(res => {
            if (res.code === 1) {
                options.value = res.data;
                pageOption.value.total = res.data_other.num;
            }
        });
    };

    const handleSizeChange = () => {
        getList();
    };

    const handleCurrentChange = () => {
        getList();
    };
</script>

<style lang="scss" scoped></style>
