import type {
    AdherenceProportion,
    AdherenceProportionResponse,
    AdherenceProportionByMonth,
    AdherenceProportionByMonthResponse,
    UseMonth,
    UseMonthResponse,
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
