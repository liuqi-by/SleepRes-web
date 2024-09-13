import type { UserInfo } from '../login/types';
import type { AddNoteReq, AddPatientReq, editPatientReq, GetLogsReq, GetPatientReq, Log } from './types';

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

/**
 * @description 修改患者
 */
export const editPatient = (data: Partial<editPatientReq>) => {
    return useClientRequest<ResPonseType<UserInfo>>('/api/patient/edit', {
        method: 'POST',
        body: queryString(data),
    });
};

/**
 * @description 添加患者Note信息
 */
export const addNote = (data: AddNoteReq) => {
    return useClientRequest<ResPonseType<UserInfo>>('/api/patient/note_add', {
        method: 'POST',
        body: queryString(data),
    });
};

/**
 * @description 获取患者log信息
 */
export const getLogs = (data: GetLogsReq & PageQuery) => {
    return useClientRequest<ResPonseType<Log[]>>('/api/device/remote_log_list', {
        method: 'GET',
        query: data,
    });
};
