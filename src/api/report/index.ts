import type { StaticInfoReq, StaticInfoRes, UsageInfoRes } from './types';

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
