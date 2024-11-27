import type { UserInfo } from '../login/types';
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
    AdherenceMonthList,
    UseMonthList,
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
export const getAdherenceProportionUserList = (data: AdherenceList & PageQuery) => {
    return useClientRequest<ResPonseType<UserInfo[]>>('/api/index/Adherence_List', {
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
 * 按月份获取依从性的用户列表
 */
export const getAdherenceProportionByMonthUserList = (data: AdherenceMonthList & PageQuery) => {
    return useClientRequest<ResPonseType<UserInfo[]>>('/api/index/Adherence_Month_List', {
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
 *  获取使用时长的患者列表
 */
export const getUseMonthUserList = (data: UseMonthList & PageQuery) => {
    return useClientRequest<ResPonseType<UserInfo[]>>('/api/index/Use_Month_List', {
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
 *  获取长时间未连接云平台的用户列表
 * @param data 0=<3D,1=3-5D,2=6-10D,3=11-15D,4=16-20D,5=>21D
 */
export const getNoConnectUserList = (data: { type: number } & PageQuery) => {
    return useClientRequest<ResPonseType<UserInfo[]>>('/api/index/Unconnected_Network_List', {
        method: 'GET',
        params: data,
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
 * 获取高漏气量的用户列表 0=<10,1=10-19,2=20-29,3=30-39,4=>40
 */
export const getHighLeakageUserList = (data: { type: number } & PageQuery) => {
    return useClientRequest<ResPonseType<UserInfo[]>>('/api/index/Hign_Leak_List', {
        method: 'GET',
        params: data,
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

/**
 *  获取高AHI的用户列表 0=<10,1=10-19,2=20-29,3=30-39,4=>40
 */
export const getHighAHIUserList = (data: { type: number } & PageQuery) => {
    return useClientRequest<ResPonseType<UserInfo[]>>('/api/index/Hign_AHI_List', {
        method: 'GET',
        params: data,
    });
};
