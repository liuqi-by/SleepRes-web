import type { OrganizationListReq, Organization, AddOrganizationReq, EditOrganizationReq } from './types';

/**
 * @description 组织机构列表 // 状态0=正常，1=冻结，2=全部
 */
export const getOrganization = (data: OrganizationListReq & PageQuery, status?: number) => {
    return useClientRequest<ResPonseType<Organization[]>>('/api/institution/list', {
        method: 'GET',
        query: status ? { ...data, status } : data,
    });
};

/**
 * @description 添加组织机构
 */
export const addOrganization = (data: AddOrganizationReq) => {
    return useClientRequest<ResPonseType<void>>('/api/institution/add', {
        method: 'POST',
        body: queryString(data),
    });
};

/**
 * @description 修改组织机构
 */
export const editOrganization = (data: EditOrganizationReq) => {
    return useClientRequest<ResPonseType<void>>('/api/institution/edit', {
        method: 'POST',
        body: queryString(data),
    });
};

/**
 * @description 删除机构
 */
export const deleteOrganization = (id: string) => {
    return useClientRequest<ResPonseType<void>>('/api/institution/del', {
        method: 'GET',
        query: { id },
    });
};
