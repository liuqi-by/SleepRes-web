import type { OrganizationListReq, Organization, AddOrganizationReq, EditOrganizationReq } from './types';

/**
 * @description 组织机构列表
 */
export const getOrganization = (data: OrganizationListReq & PageQuery) => {
    return useClientRequest<ResPonseType<Organization[]>>('/api/institution/list', {
        method: 'GET',
        query: data,
    });
};

/**
 * @description 添加组织机构
 */
export const addOrganization = (data: AddOrganizationReq) => {
    return useClientRequest<ResPonseType<void>>('/api/institution/add', {
        method: 'POST',
        query: data,
    });
};

/**
 * @description 修改组织机构
 */
export const editOrganization = (data: EditOrganizationReq) => {
    return useClientRequest<ResPonseType<void>>('/api/institution/edit', {
        method: 'POST',
        query: data,
    });
};