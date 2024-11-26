import type {
    AdherenceProportion,
    AdherenceProportionResponse,
    AdherenceProportionByMonth,
    AdherenceProportionByMonthResponse,
    UseMonth,
    UseMonthResponse,
    NoConnectResponse,
    HighLeakageResponse,
    HignAHIResponse,
    AdherenceList,
} from './types';

/**
 * 获取患者依从性比例
 */
export const getAdherenceProportion = (data: AdherenceProportion) => {
    return useClientRequest<ResPonseType<AdherenceProportionResponse>>('/api/index/Adherence', {
        method: 'GET',
        params: data,
    });
};

/**
 *  患者依从性比例的用户列表
 */
export const getAdherenceProportionUserList = (data: AdherenceList) => {
    return useClientRequest<ResPonseType<AdherenceListResponse>>('/api/index/Adherence_List', {
        method: 'GET',
        params: data,
    });
};

/**
 * 按月份获取患者依从性比例
 */
export const getAdherenceProportionByMonth = (data: AdherenceProportionByMonth) => {
    return useClientRequest<ResPonseType<AdherenceProportionByMonthResponse>>('/api/index/Adherence_Month', {
        method: 'GET',
        params: data,
    });
};

/**
 * 获取患者使用时长
 */
export const getUseMonth = (data: UseMonth) => {
    return useClientRequest<ResPonseType<UseMonthResponse>>('/api/index/Use_Month', {
        method: 'GET',
        params: data,
    });
};

/**
 *  获取长时间未连接云平台的用户
 */
export const getNoConnect = () => {
    return useClientRequest<ResPonseType<NoConnectResponse>>('/api/index/Unconnected_Network', {
        method: 'GET',
    });
};

/**
 * 获取高漏气量的用户
 */
export const getHighLeakage = () => {
    return useClientRequest<ResPonseType<HighLeakageResponse>>('/api/index/Hign_Leak', {
        method: 'GET',
    });
};

/**
 * 获取高AHI的用户
 */
export const getHighAHI = () => {
    return useClientRequest<ResPonseType<HignAHIResponse>>('/api/index/Hign_AHI', {
        method: 'GET',
    });
};
