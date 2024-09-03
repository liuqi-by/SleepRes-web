// 静态信息
export interface StaticInfoReq {
    sn: string;
    start_date: string;
    end_date: string;
}

export interface BarChartRes {
    dates: string[];
    sumtime: number[];
    usetime: string[];
    usetimes: (null | number)[][];
    pressure_max: (number | string)[];
    pressure_95: (number | string)[];
    pressure_avg: (number | string)[];
    leak_max: number[];
    leak_avg: number[];
    ahi: number[];
    hi: number[];
    ai: number[];
    spo_avg: number[];
    spo_min: number[];
    pulse_avg: number[];
    pulse_min: number[];
}

// 参数信息
export interface ParamInfoReq {
    sn: string;
    start_date: string;
    end_date: string;
}

export interface ParamInfoRes {
    [key: string]: string[];
}

// 柱状图表数据
export interface BarChartReq {
    sn: string;
    start_date: string;
    end_date: string;
}

export interface BarChartRes {
    dates: string[];
    sumtime: number[];
    usetime: string[];
    usetimes: (null | number)[][];
    pressure_max: (number | string)[];
    pressure_95: (number | string)[];
    pressure_avg: (number | string)[];
    leak_max: number[];
    leak_avg: number[];
    ahi: number[];
    hi: number[];
    ai: number[];
    spo_avg: number[];
    spo_min: number[];
    pulse_avg: number[];
    pulse_min: number[];
}

// 曲线图表数据
// 请求参数
export interface ConnectChartReq {
    sn: string;
    hapdate: string;
    startValue: string;
    endValue: string;
}

export type ConnectChartRes = [number, string][];

// tips
type TipsType =
    // 压力
    | 'Pressure'
    // 流量
    | 'Flow'
    // 漏气
    | 'Leak'
    // 血氧
    | 'Spo'
    // 脉率
    | 'PR'
    // 事件
    | EventType;

export type TipsProps = {
    [key in TipsType]: string | number;
};

type EventType =
    // 报警事件
    | 'alarm_event'
    // 气流受限事件
    | 'ar_event'
    // 中枢性事件
    | 'central_event'
    // 低通气事件
    | 'hypopnea_event'
    // 混合性事件
    | 'mixed_events'
    // 阻塞性事件
    | 'ob_event'
    // 氧减事件
    | 'ore_str'
    // 参数改变事件
    | 'pm_event'
    // 鼾声事件
    | 'sr_event';

export type EventRes = {
    [key in EventType]: ConnectChartRes;
};

type ConnectChart = 'pressure' | 'flow' | 'leak' | 'spo' | 'pulse';

export type AllDataRes = {
    [key in ConnectChart]: ConnectChartRes;
};

export interface UsageInfoRes {}

export interface DeviceReportRes {
    start_date: string;
    end_date: string;
    sn: string;
    select_days: string;
    usage_days_use_not: string;
    usage_days_select_not: string;
    usage_days_use: string;
    usage_days_select: string;
    usetime_avg_use: string;
    usetime_avg_select: string;
    usetime: string;
    not_use_days: string;
    use_days: string;
    pulse_avg: string;
    spo_avg: string;
    rr_avg: string;
    rr_max: string;
    tv_avg: string;
    tv_max: string;
    leak_avg: string;
    leak_max: string;
    pressure_95: string;
    pressure_avg: string;
    pressure_max: string;
    odi: string;
    ahi: string;
    hi: string;
    ai: string;
    apnea: string;
    usetimes: string;
}
