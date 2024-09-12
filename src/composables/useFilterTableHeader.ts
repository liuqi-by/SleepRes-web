import type { FilterType } from '~/components/table-filter/header.vue';

export default function useFilterTableHeader(tableData: any) {
    const showKey = ref<string>(''); // 当前展示哪个筛选窗
    const visible = ref(false); // 手动控制筛选窗显隐

    const showKeyRef = ref<any>({}); // 当前展示哪个筛选窗

    const searchDate = ref<any>({}); // 查询参数
    const filterInput = ref<string>(''); // 筛选框输入值
    const selectFilter = ref<any[]>([]); // 筛选框选中值

    // 全局重置
    const resetFilters = () => {
        searchDate.value = {};
    };

    const filterType = ref<FilterType>('input');
    const filterCustomOptions = ref<any[]>([]);

    const showTableListPaient = computed(() => {
        return tableData.value?.filter((item: any) => {
            let flag = true;
            console.log(searchDate);

            for (const key in searchDate.value) {
                let itemValue: string | number = '';
                if (key && key.includes('patient.')) {
                    itemValue = item.patient[key.split('.')[1]];
                } else {
                    itemValue = item[key];
                }

                if (itemValue && typeof itemValue === 'string') {
                    itemValue = itemValue.toLocaleLowerCase();
                } else if (!itemValue && itemValue !== 0) {
                    itemValue = '';
                }

                // 如果key是数组
                if (Array.isArray(searchDate.value[key])) {
                    if (searchDate.value[key].length > 0 && !searchDate.value[key].includes(itemValue)) {
                        flag = false;
                    }
                } else if (
                    searchDate.value[key] &&
                    !String(itemValue).includes(searchDate.value[key].toLocaleLowerCase())
                ) {
                    flag = false;
                }
            }
            return flag;
        });
    });

    const filterList = computed<any[]>(() => {
        if (filterType.value === 'select') {
            return Array.from(
                new Set(
                    tableData.value?.map((item: any) => {
                        let itemValue = '';
                        let key = showKey.value;

                        if (key && key.includes('patient.')) {
                            itemValue = item.patient[key.split('.')[1]] || '';
                        } else {
                            itemValue = item[key] || '';
                        }
                        return itemValue;
                    }),
                ),
            );
        } else {
            return [];
        }
    });

    // 触发筛选
    const toggleNameFilter = ({
        key,
        type = 'input',
        options,
    }: {
        key: string;
        type: FilterType;
        options?: Array<any>;
    }) => {
        if (showKey.value !== key) {
            visible.value = false;
        }

        showKey.value = key;
        filterInput.value = searchDate.value[key] || '';
        selectFilter.value = searchDate.value[key] || [];
        filterType.value = type;

        filterCustomOptions.value = options || [];

        setTimeout(() => {
            visible.value = !visible.value;
            console.log(showKey.value);
        }, 0);
    };

    // 点击其他元素
    const handleClickOutside = () => {
        visible.value = false;
    };

    // 重置
    const cancelFilter = () => {
        searchDate.value[showKey.value] = '';
        visible.value = false;
    };
    // 筛选
    const searchFilter = () => {
        visible.value = false;
        if (filterType.value === 'select') {
            searchDate.value[showKey.value] = selectFilter.value || '';
        } else {
            searchDate.value[showKey.value] = filterInput.value || '';
        }
    };

    return {
        showKey,
        showKeyRef,
        searchDate,
        visible,
        filterInput,
        selectFilter,
        filterType,
        filterCustomOptions,
        filterList,
        showTableListPaient,
        toggleNameFilter,
        handleClickOutside,
        cancelFilter,
        searchFilter,
        resetFilters,
    };
}
