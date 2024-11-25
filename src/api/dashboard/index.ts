import type {
    AdherenceProportion,
    AdherenceProportionResponse,
    AdherenceProportionByMonth,
    AdherenceProportionByMonthResponse,
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
