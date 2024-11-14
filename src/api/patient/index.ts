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
 * @description 医生列表&搜索
 */
export const getDoctor = (data: GetPatientReq & PageQuery & { type: number }) => {
    return useClientRequest<ResPonseType<UserInfo[]>>('/api/patient/pySearch', {
        method: 'GET',
        query: {
            ...data,
            type: 0,
        },
    });
};
/**
 * @description 治疗师列表&搜索
 */
export const getTherapist = (data: GetPatientReq & PageQuery & { type: number }) => {
    return useClientRequest<ResPonseType<UserInfo[]>>('/api/patient/pySearch', {
        method: 'GET',
        query: {
            ...data,
            type: 1,
        },
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

/**
 * @description 获取SD卡文件处理进度
 */
export const getProgress = (data: { user_id: number | string }) => {
    return useClientRequest<ResPonseType<void>>('/api/common/sd_upload_speed', {
        method: 'GET',
        query: data,
    });
};

/**
 * @description 添加患者时对序列号对校验
 */
export const checkSerial = (data: { sn: string }) => {
    return useClientRequest<ResPonseType<UserInfo>>('/api/patient/sn_check', {
        method: 'GET',
        query: data,
    });
};

/**
 * @description 添加患者时对患者ID校验
 */
export const checkPatientId = (data: { patientid: string }) => {
    return useClientRequest<ResPonseType<UserInfo>>('/api/patient/patientid_check', {
        method: 'GET',
        query: data,
    });
};
