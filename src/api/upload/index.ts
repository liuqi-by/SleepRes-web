/**
 * @description 上传文件
 */
export const uploadFile = (file: FormData) => {
    return useClientRequest<ResPonseType<void>>('/api/common/upload', {
        method: 'POST',
        body: file,
        headers: {},
    });
};
