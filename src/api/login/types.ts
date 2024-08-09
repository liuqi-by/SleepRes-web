// 登录
export interface LoginReq {
    account: string;
    password: string;
}

export interface LoginRes {
    id: number;
    username: string;
    nickname: string;
    first_name: string;
    last_name: string;
    account_id: null;
    address: null;
    state: null;
    zip_code: null;
    avatar: string;
    email: string;
    mobile: string;
    loginfailure: number;
    logintime: number;
    loginip: string;
    createtime: number;
    updatetime: number;
    token: string;
    status: string;
    parentid: number;
    group_id: number;
}

export interface UserInfo {
    id: number;
    username: string;
    nickname: string;
    first_name: string;
    last_name: string;
    account_id: null;
    address: null;
    state: null;
    zip_code: null;
    avatar: string;
    email: string;
    mobile: string;
    loginfailure: number;
    logintime: number;
    loginip: string;
    createtime: number;
    updatetime: number;
    token: string;
    status: string;
    parentid: number;
    group_id: number;
}
