import type { StaticInfoReq, StaticInfoRes, UsageInfoRes, DeviceReportRes } from './types';

/**
 * @description 获取静态信息
 */
export const getStaticInfo = (data: StaticInfoReq) => {
    return useClientRequest<ResPonseType<StaticInfoRes>>('/api/report/statistics', {
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
