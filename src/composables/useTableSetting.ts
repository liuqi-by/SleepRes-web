/**
 * @description 表格自定义设置
 * @params columnsInit 表格列初始数据
 * @params path 保存key
 *
 */
import { useStorage as useVueUseLocalStorage } from '@vueuse/core';

export interface ColumnsInit {
    label: string;
    prop: string;
    width: number;
    isShow: boolean;
    orderIndex: number;
    defaultTemplate?: boolean;
    type?: string;
    selectOptions?: {
        label: string;
        value: number;
    }[];
    valid?: any;
    noFilter?: boolean;
}
export const useTableSetting = (columnsInit: ColumnsInit[], path?: string) => {
    // 表格列设置
    let columnSelection = ref<ColumnsInit[]>(columnsInit);
    if (process.client) {
        columnSelection = useVueUseLocalStorage(
            path || useRoute().path + 'columnSelection',
            [...columnsInit],
            localStorage,
        );
    }

    // 筛选和排序的表格数据
    const showColumns = computed(() => {
        return columnSelection.value
            .slice()
            .filter((item: any) => item.isShow)
            .sort((a, b) => a.orderIndex - b.orderIndex);
    });

    // 更新表格设置
    provide('update:columns', (saveData: any) => {
        columnSelection.value = saveData;
    });

    return {
        showColumns,
        columnSelection,
    };
};
