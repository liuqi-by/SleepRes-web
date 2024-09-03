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
    account_id: string;
    address: string;
    state: string;
    zip_code: string;
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
    id: string;
    username: string;
    dmename: string;
    nickname: string;
    first_name: string;
    last_name: string;
    account_id: string;
    address: string;
    state: string;
    zip_code: string;
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
    group_id: string | number;
    frozen: number;
    account_num: string;
    institution_id: string; // 医疗机构id
    institution_name: string; // 医疗机构名称
    patient?: any;
    note: string;
    sn: string;
    device_type: string;
    best30: string;
}

// 注册
export interface RegisterReq {
    username: string;
    email: string;
    mobile?: string;
    first_name: string;
    last_name: string;
    account_id?: string;
    account_num?: string;
    address?: string;
    state?: string;
    zip_code?: string;
    /**
     *  账户类型:2=DME,4=Physician
     * */
    type: number;
}

// 修改密码
export interface EditPwdReq {
    password: string;
    newpassword: string;
}
