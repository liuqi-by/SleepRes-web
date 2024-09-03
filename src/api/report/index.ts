import type { StaticInfoReq, UsageInfoRes, DeviceReportRes, BarChartReq, BarChartRes } from './types';

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
        method: 'GET',
        params: data,
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
