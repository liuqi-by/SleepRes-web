import type { AdminRulesReq, AdminRulesRes } from './types';

/**
 * @description 管理员规则查询
 */
export const getAdminRules = () => {
    return useClientRequest<ResPonseType<AdminRulesRes>>('/api/admin/rules', {
        method: 'POST',
        body: queryString({
            type: 0,
        }),
    });
};

/**
 * @description 管理员规则修改
 */
export const updateAdminRules = (data: AdminRulesReq) => {
    return useClientRequest<ResPonseType<AdminRulesRes>>('/api/admin/rules', {
        method: 'POST',
        body: queryString({ ...data, type: 1 }),
    });
};

/**
 * @description 管理员规则删除
 */
export const deleteAdminRules = (data: AdminRulesReq) => {
    return useClientRequest<ResPonseType<AdminRulesRes>>('/api/admin/rules', {
        method: 'POST',
        params: data,
    });
};
