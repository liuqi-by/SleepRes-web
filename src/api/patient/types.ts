// 获取患者
export interface GetPatientReq {
    /**
     * 搜索内容，对用户名+邮箱+手机号+Account+State+地址,模糊搜索，列表则传空a
     */
    val: string;
}

// 添加患者
export interface AddPatientReq {
    first_name: string;
    last_name: string;
    birthdate: string;
    patientid: string;
    institution_id: string;
    institution_name: string;
    /**
     * 性别，0=未知,1=男，2=女
     */
    gender: number;
    setup_date: string;
    therapist_id: string;
    physician_id: string;
    sn: string;
    mode_name: string;
    pressure: string;
    ramp: string;
    mask: string;
    address: string;
    city: string;
    state: string;
    zip_code: string;
    email: string;
    mobile: string;
}

export interface editPatientReq {
    first_name: string;
    last_name: string;
    birthdate: string;
    patientid: string;
    institution_id: string;
    institution_name: string;
    setup_date: string;
    therapist_id: string;
    therapist_name: string;
    physician_id: string;
    physician_name: string;
    sn: string;
    city: string;
    state: string;
    address: string;
    email: string;
    mobile: string;
    user_id: string;
}

export interface AddNoteReq {
    note: string;
    user_id: string;
}

export interface GetLogsReq {
    user_id: string;
}

export interface Log {
    update_content: string;
    updatetime: string;
    admin_name: string;
}
