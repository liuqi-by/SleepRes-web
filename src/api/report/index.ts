import type {
    StaticInfoReq,
    UsageInfoRes,
    DeviceReportRes,
    BarChartReq,
    BarChartRes,
    ParamInfoRes,
    ConnectChartReq,
    GetChartDateReq,
    GetChartDateRes,
} from './types';

/**
 * @description 获取静态信息\图表
 */
export const getBarChart = (data: BarChartReq) => {
    return useClientRequest<ResPonseType<BarChartRes>>('/api/report/statistics', {
        method: 'GET',
        params: data,
    });
};

/**
 * @description  获取使用信息
 */
export const getUsageInfo = (data: StaticInfoReq) => {
    return useClientRequest<ResPonseType<UsageInfoRes>>('/api/report/usage', {
        method: 'GET',
        params: data,
    });
};

/**
 * @description 设备报告
 */
export const getDeviceReport = (data: StaticInfoReq) => {
    return useClientRequest<ResPonseType<DeviceReportRes>>('/api/device/report', {
        method: 'POST',
        body: queryString(data),
    });
};

// /**
//  * @description 设备详情
//  */
// export const getDeviceDetail = (sn: string) => {
//     return useClientRequest<ResPonseType<DeviceDetailRes>>('/api/device/show', {
//         method: 'GET',
//         params: { sn },
//     });
// };

/**
 * @description 获取参数信息
 */
export const getParamInfo = (data: StaticInfoReq) => {
    return useClientRequest<ResPonseType<ParamInfoRes>>('/api/report/log', {
        method: 'GET',
        params: data,
    });
};

/**
 * @description 获取联动图表数据
 */
export const getConnectChartData = <T>(data: ConnectChartReq, type: string) => {
    return useClientRequest<ResPonseType<T>>('/api/report/' + type, {
        method: 'POST',
        body: queryString(data),
    });
};

/**
 * @description 获取区间时间内曲线的日期
 */
export const getChartDate = (data: GetChartDateReq) => {
    return useClientRequest<ResPonseType<GetChartDateRes>>('/api/report/getdate', {
        method: 'GET',
        params: data,
    });
};
