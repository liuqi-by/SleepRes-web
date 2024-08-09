import type { LoginRes, LoginReq, UserInfo, RegisterReq } from './types';

/**
 * @description 用户登录
 */
export const loginAccount = (data: LoginReq) => {
    return useClientRequest<ResPonseType<LoginRes>>('/api/admin/login', {
        method: 'POST',
        body: queryString(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
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
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
    });
};
