import type { UserInfo } from '../login/types';

// 消息
export interface MessageReq {
    /**
     * 	用户状态,0=获取所有，1=获取未审核消息，2=获取已审核消息
     */
    status: number;
}

export interface MessageRes {
    id: number;
    event: string;
    user_id: number;
    admin_id: number;
    isread: number;
    content: string;
    status: number;
    ip: string;
    createtime: number;
    group_name: string;
    group_id: number;
    userinfo: UserInfo;
}

// 审核用户
export interface CheckMessageReq {
    user_id: number;
    account_name: string;
    account_num: string;

    /**
     * 用户状态,1=审核通过
     */
    status: number;
}

// 获取用户列表
export interface UserListReq {
    /**
     * 用户状态,0=获取所有，1=获取已审核用户，2=获取未审核用户
     */
    // status: number;
    val: string;
}

export interface UserListRes {}

// 冻结用户
export interface FrozenUserReq {
    user_id: number;
    /**
     * 	用户状态,1=冻结,0=解冻
     */
    frozen: number;
}
