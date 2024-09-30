export interface DeviceModelRes {
    log_time: any[];
    model_name: string[];
    model_type: number[];
    par_show: Parshow;
    model_type_default: number;
    par_show_val: Parshowval;
    device_type_id: number;
    info: DeviceInfo;
}

export interface DeviceInfo {
    id: number;
    sn: string;
    type_id: number;
    version: null;
    user_id: number;
    buy_time: null;
    buy_orderid: null;
    status_switch: number;
    admin_id: number;
    institution_id: null;
    online_switch: null;
    createtime: number;
    usetime: number;
    percent_usage: number;
    compliant: number;
    use_end_time: number;
    create_userid: number;
    start_time: number;
    end_time: number;
    Setting: string;
    address: null | string;
    default_value: number;
    updatetime: null | string;
    username: null | string;
    email: null | string;
    mobile: null | string;
    gender: null | string;
    birthday: null | string;
    source: null | string;
    nickname: null | string;
    did: number;
    sort_id: null | string;
    remark: null | string;
    tubing: null | string;
    mask: null | string;
    buy_time_text: string;
    status_switch_text: string;
    online_switch_text: string;
    usetime_text: string;
    use_end_time_text: string;
    start_time_text: string;
    end_time_text: string;
}

export interface Parshow {
    [key: string]: number[];
}

export interface Parshowval {
    [key: string]: {
        default_value: string;
        val: string;
        [key: string]: string;
    };
}

export interface UpdateDeviceModelReq {
    sn: string;
    data: string;
}

export interface UpdateTubingAndMaskReq {
    sn: string;
    tubing: string;
    mask: string;
}
