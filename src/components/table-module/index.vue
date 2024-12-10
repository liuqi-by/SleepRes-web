<template>
    <div class="module-table">
        <div
            class="table-header flex justify-between items-center m-b-[20px]"
            v-if="isExport"
        >
            <slot name="header-left"></slot>
            <div class="flex items-center">
                <slot name="header-right"> </slot>
                <div class="exports-btns">
                    <base-svg-icon
                        icon="table"
                        size="25px"
                        class="cursor-pointer m-r-[10px]"
                        color="#666"
                        @click="showTableColumn"
                    />
                    <base-svg-icon
                        icon="export-table"
                        size="25px"
                        class="cursor-pointer"
                        color="#666"
                        @click="exportTable"
                    />
                </div>
            </div>
        </div>

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
                @current-change="selectRowChange"
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
            :layout="layout"
        />

        <column-selection
            ref="columnSelectionRef"
            v-if="isExport"
        />
    </div>
</template>

<script setup lang="ts">
    import type { TableInstance } from 'element-plus';
    import type { ColumnSelection } from '#build/components';

    interface Props {
        title?: string;
        tableData?: Array<any>;
        isPagination?: boolean;
        pageSizes?: Array<number>;
        layout?: string;
        isExport?: boolean;
        columns?: Array<any>;
        exportFileName?: string;
    }

    const props = withDefaults(defineProps<Props>(), {
        title: '',
        tableData: () => [],
        isPagination: true,
        pageSizes: () => [10, 20, 30, 40, 50, 100],
        layout: 'prev, pager, next, jumper,->,total,,sizes',
        isExport: false,
        exportFileName: '',
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

    const emit = defineEmits(['size-change', 'current-change', 'selectRowChange']);

    const handleSizeChange = (val: number) => {
        emit('size-change', val);
    };

    const handleCurrentChange = (val: number) => {
        emit('current-change', val);
    };

    const selectRowChange = (row: any) => {
        emit('selectRowChange', row);
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

    const setCurrentRow = (row?: any) => {
        if (tableRef.value) {
            tableRef.value.setCurrentRow(row);
        }
    };

    const columnSelectionRef = ref<InstanceType<typeof ColumnSelection>>();
    const showTableColumn = () => {
        if (columnSelectionRef.value && tableRef.value) {
            columnSelectionRef.value?.show(props.columns);
        }
    };

    // 导出表格
    const exportTable = () => {
        if (tableRef.value) {
            console.log('导出表格', tableRef.value);

            // 根据节点获取每行cell的text

            const tableRefDom = tableRef.value.$el;
            const rows = tableRefDom.querySelectorAll('.el-table__row');
            const tableData: any = [];
            rows.forEach((row: any) => {
                const cells = row.querySelectorAll('.cell');
                const rowData: any = [];
                cells.forEach((cell: any) => {
                    rowData.push(cell.innerText);
                });
                tableData.push(rowData);
            });

            ExportCsv(
                tableData,
                tableRef.value.columns,
                props.exportFileName ? props.exportFileName + '.csv' : 'patients.csv',
            );
        }
    };

    defineExpose({
        setCurrentRow,
        tableRef,
    });
</script>

<style lang="scss" scoped>
    .module-table {
        position: relative;
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

    .exports-btns {
        margin-left: 20px;
    }
</style>
