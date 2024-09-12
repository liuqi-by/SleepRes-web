import type { FilterType } from '~/components/table-filter/header.vue';

export default function useFilterTableHeader(tableData: any) {
    const showKey = ref<string>(''); // 当前展示哪个筛选窗
    const visible = ref(false); // 手动控制筛选窗显隐

    const showKeyRef = ref<any>({}); // 当前展示哪个筛选窗

    const searchData = ref<any>({}); // 查询参数
    const filterInput = ref<string>(''); // 筛选框输入值
    const selectFilter = ref<any[]>([]); // 筛选框选中值

    // 全局重置
    const resetFilters = () => {
        searchData.value = {};
    };

    const filterType = ref<FilterType>('input');
    const filterCustomOptions = ref<any[]>([]);

    const showTableListPaient = computed(() => {
        return tableData.value?.filter((item: any) => {
            let flag = true;

            for (const key in searchData.value) {
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
                const searchValue = searchData.value[key];

                // 如果key是数组
                if (Array.isArray(searchValue)) {
                    if (searchValue.length > 0 && !searchValue.includes(itemValue)) {
                        flag = false;
                    }
                } else if (searchValue && !String(itemValue).includes(searchValue.toLocaleLowerCase())) {
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
        filterInput.value = searchData.value[key] || '';
        selectFilter.value = searchData.value[key] || [];
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
        searchData.value[showKey.value] = '';
        visible.value = false;
    };
    // 筛选
    const searchFilter = () => {
        visible.value = false;
        if (filterType.value === 'select') {
            searchData.value[showKey.value] = selectFilter.value || '';
        } else {
            searchData.value[showKey.value] = filterInput.value || '';
        }
    };

    provide('showKeyRef', showKeyRef);
    provide('searchData', searchData);
    provide('toggleNameFilter', toggleNameFilter);

    return {
        showKey,
        showKeyRef,
        searchData,
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
