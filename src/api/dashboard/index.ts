import type { AdherenceProportion, AdherenceProportionResponse } from './types';

/**
 * 获取患者依从性比例
 */
export const getAdherenceProportion = (data: AdherenceProportion) => {
    return useClientRequest<ResPonseType<AdherenceProportionResponse>>('/api/index/Adherence', {
        method: 'GET',
        params: data,
    });
};
