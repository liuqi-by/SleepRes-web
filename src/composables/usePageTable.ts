/**
 * @description 表格 分页 搜索
 * @param Fn 请求函数
 * @returns
 */
export const usePageTable = <T>(
    Fn: (params: { page: number; pagesize: number; val: string }) => Promise<ResPonseType<T>>,
) => {
    // 搜索条件
    const searchOption = ref('');

    // 分页
    const pageOption = ref({
        currentPage: 1,
        pageSize: 25,
        total: 0,
    });

    // 加载状态
    const loading = ref(true);

    const tableList = ref<T>();

    // 获取数据
    const getData = useDebounceFn(() => {
        loading.value = true;

        Fn({
            page: pageOption.value.currentPage - 1,
            pagesize: pageOption.value.pageSize,
            val: searchOption.value,
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
    }, 300);

    // 搜索
    const search = () => {
        pageOption.value.currentPage = 1;
        getData();
    };

    const handleSizeChange = () => {
        getData();
    };
    const handleCurrentChange = () => {
        getData();
    };

    onActivated(() => {
        getData();
    });

    return {
        /**
         * 搜索条件
         */
        searchOption,

        /**
         * 分页
         */
        pageOption,

        /**
         * 加载状态
         */
        loading,

        /**
         * 表格数据
         */
        tableList,

        /**
         * 获取数据
         */
        getData,

        /**
         * 搜索
         */
        search,
        handleSizeChange,
        handleCurrentChange,
    };
};