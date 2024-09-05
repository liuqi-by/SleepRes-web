<template>
    <div class="module-table">
        <div
            class="table-title"
            v-if="title"
        >
            {{ title }}
        </div>
        <client-only>
            <el-table
                :data="tableData"
                style="width: 100%"
                class="m-b-[20px] flex-1"
                v-bind="$attrs"
                ref="tableRef"
                @wheel="handleMouseWheel"
            >
                <slot></slot>
            </el-table>
        </client-only>
        <base-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="pageSizes"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            v-if="isPagination"
        />
    </div>
</template>

<script setup lang="ts">
    import type { TableInstance } from 'element-plus';

    interface Props {
        title?: string;
        tableData?: Array<any>;
        isPagination?: boolean;
        pageSizes?: Array<number>;
    }

    withDefaults(defineProps<Props>(), {
        title: '',
        tableData: () => [],
        isPagination: true,
        pageSizes: () => [10, 20, 30, 40, 50, 100],
    });

    // const pageOption = defineModel('pageOption', {
    //     type: Object,
    //     default: {
    //         currentPage: 0,
    //         pageSize: 2,
    //         total: 0,
    //     },
    // });
    const currentPage = defineModel('currentPage', {
        type: Number,
        default: 1,
    });

    const pageSize = defineModel('pageSize', {
        type: Number,
        default: 10,
    });
    const total = defineModel('total', {
        type: Number,
        default: 0,
    });

    const emit = defineEmits(['size-change', 'current-change']);

    const handleSizeChange = (val: number) => {
        emit('size-change', val);
    };

    const handleCurrentChange = (val: number) => {
        emit('current-change', val);
    };

    const tableRef = ref<TableInstance>();
    // 鼠标滚动
    const handleMouseWheel = (event: any) => {
        event.preventDefault(); // 阻止事件发生时浏览器默认的行为
        if (tableRef.value) {
            const table = (tableRef.value.$refs.scrollBarRef as any).wrapRef;
            if (table) {
                // 判断是横向还是纵向有滚动条,同时有则纵向优先
                if (table.scrollHeight > table.clientHeight) {
                    table.scrollTop += event.deltaY;
                } else if (table.scrollWidth > table.clientWidth) {
                    table.scrollLeft += event.deltaY;
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    .module-table {
        display: flex;
        flex-direction: column;
        background-color: #fff;

        .table-title {
            margin-bottom: 25px;
            font-size: $font-middle;
            font-weight: 500;
            line-height: 20px;
            letter-spacing: 0;
        }
    }
</style>
