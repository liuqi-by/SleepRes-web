export interface DeviceModelRes {
    log_time: any[];
    model_name: string[];
    model_type: number[];
    par_show: Parshow;
    model_type_default: number;
    par_show_val: Parshowval;
    device_type_id: number;
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
