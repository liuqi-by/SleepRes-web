import type { UserInfo } from '../login/types';
import type { AddPatientReq, GetPatientReq } from './types';

/**
 * @description 搜索患者列表&患者列表搜索
 */
export const getPatient = (data: GetPatientReq & PageQuery) => {
    return useClientRequest<ResPonseType<UserInfo[]>>('/api/patient/search', {
        method: 'GET',
        query: data,
    });
};

/**
 * @description 添加患者
 */
export const addPatient = (data: Partial<AddPatientReq>) => {
    return useClientRequest<ResPonseType<void>>('/api/patient/add', {
        method: 'POST',
        body: queryString(data),
    });
};

/**
 * @description 医生/治疗师列表&搜索
 */
export const getDoctor = (data: GetPatientReq & PageQuery) => {
    return useClientRequest<ResPonseType<UserInfo[]>>('/api/patient/pySearch', {
        method: 'GET',
        query: data,
    });
};
