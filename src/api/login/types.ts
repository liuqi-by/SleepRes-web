// 登录
export interface LoginReq {
    account: string;
    password: string;
}

export interface LoginRes {
    userinfo: {
        id: number;
        token: string;
        roles: Roles[];
        username: string;
    };
}

export interface Roles {
    label: string;
    value: string;
}

export interface UserInfo {
    username: string;
    parentid: number;
}
