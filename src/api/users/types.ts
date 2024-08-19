export interface AddUserReq {
    email: string;
    mobile: string;
    first_name: string;
    last_name: string;
    /**
     * 账户类型:2=DME User,4=Physician User
     */
    group_id: number | string;
    institution_id: string;
    institution_name: string;
    username: string;
    account_id: string | number;
    zip_code: string;
    state: string;
}

export interface UpdateUserReq {
    user_id: string;
    group_id: number | string;
    institution_id: string;
    /**
     *	状态:0=正常，1=冻结
     */
    frozen: number;
    email: string;
    first_name: string;
    last_name: string;
    mobile: string;
}
