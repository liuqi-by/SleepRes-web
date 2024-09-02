/**
 * @description 获取静态信息
 */
export const addUser = (data: GetStatics) => {
    return useClientRequest<ResPonseType<void>>('/api/report/statistics', {
        method: 'GET',
        params: {},
    });
};
