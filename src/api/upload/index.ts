import type { UploadFile } from './types';

/**
 * @description SD卡数据上传
 */
export const uploadFile = ({ file, user_id = 0 }: UploadFile) => {
    return useClientRequest<ResPonseType<void>>('/api/patient/sd_upload', {
        method: 'POST',
        body: file,
        query: { user_id },
        headers: {},
    });
};
