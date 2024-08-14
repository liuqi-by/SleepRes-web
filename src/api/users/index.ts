import type { AddUserReq, UpdateUserReq } from './types';

/**
 * @description 添加用户
 */
export const addUser = (data: AddUserReq) => {
    return useClientRequest<ResPonseType<void>>('/api/admin/UserAdd', {
        method: 'POST',
        body: queryString(data),
    });
};

/**
 * @description 修改用户
 */
export const updateUser = (data: UpdateUserReq) => {
    return useClientRequest<ResPonseType<void>>('/api/admin/UserEdit', {
        method: 'POST',
        body: queryString(data),
    });
};
