import type { UserInfo } from '../login/types';
import type { CheckMessageReq, FrozenUserReq, MessageReq, MessageRes, UserListReq } from './types';

/**
 * @description 获取消息
 */
export const getMessage = (data: MessageReq & PageQuery) => {
    return useClientRequest<ResPonseType<MessageRes[]>>('/api/admin/Msg', {
        method: 'GET',
        query: data,
    });
};

/**
 * @description 审核用户
 */
export const checkMessage = (data: CheckMessageReq) => {
    return useClientRequest<ResPonseType<void>>('/api/admin/check', {
        method: 'GET',
        query: data,
    });
};

/**
 * @description 获取所有用户列表
 */
export const getUserlist = (data: UserListReq & PageQuery) => {
    return useClientRequest<ResPonseType<UserInfo[]>>('/api/admin/UserSearch', {
        method: 'GET',
        query: data,
    });
};

/**
 * @description 冻结用户
 */
export const frozenUser = (data: FrozenUserReq) => {
    return useClientRequest<ResPonseType<void>>('/api/admin/frozen', {
        method: 'GET',
        query: data,
    });
};
