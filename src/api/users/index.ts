/**
 * @description 添加用户
 */
export const addUser = (data: AddUserReq) => {
    return useClientRequest<ResPonseType<void>>('/api/admin/UserAdd', {
        method: 'POST',
        body: queryString(data),
    });
};
