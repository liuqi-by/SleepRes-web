import type { LoginReq, UserInfo, RegisterReq, EditPwdReq } from './types';

/**
 * @description 用户登录
 */
export const loginAccount = (data: LoginReq) => {
    return useClientRequest<ResPonseType<UserInfo>>('/api/admin/login', {
        method: 'GET',
        query: data,
    });
};

/**
 * @description 获取用户信息
 */
export const getUserDetailInfo = (isServer: boolean): any => {
    if (isServer) {
        return useServerRequest<ResPonseType<UserInfo>>('/api/admin/getUserinfo');
    } else {
        return useClientRequest<ResPonseType<UserInfo>>('/api/admin/getUserinfo');
    }
};

/**
 * @description 退出登录
 */
export const loginOut = () => {
    return useClientRequest<ResPonseType<void>>('/api/admin/logout');
};

/**
 * @description 注册
 */
export const registerAccount = (data: RegisterReq) => {
    return useClientRequest<ResPonseType<void>>('/api/admin/register', {
        method: 'POST',
        body: queryString(data),
    });
    // return useClientRequest<ResPonseType<void>>('/api/admin/register', {
    //     query: data,
    // });
};

/**
 * @description 重置密码 邮箱
 */
export const resetPasswordByEmail = (data: { email: string }) => {
    return useClientRequest<ResPonseType<void>>('/api/admin/resetpwd', {
        method: 'GET',
        query: data,
    });
};

/**
 * @description 修改密码 旧密码
 */
export const changePassword = (data: EditPwdReq) => {
    return useClientRequest<ResPonseType<void>>('/api/admin/editpwd', {
        method: 'POST',
        body: queryString(data),
    });
};
