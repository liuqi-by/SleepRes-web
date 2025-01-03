export const uploadFile = (file: FormData) => {
    return useClientRequest<
        ResPonseType<{
            url: string;
        }>
    >('/api/common/upload', {
        method: 'post',
        body: file,
        headers: {},
    });
};
