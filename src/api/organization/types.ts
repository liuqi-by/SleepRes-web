// 组织机构列表
export interface OrganizationListReq {
    /**
     * 搜索内容，组织机构列表则传空，对名称+邮箱+手机号+State+地址,模糊搜索
     */
    val: string;
}

export interface Organization {
    id: string;
    number: string;
    name: string;
    mobile: string;
    address: string;
    status: string;
    createtime: number;
    city: string;
    state: string;
    zip_code: string;
    email: string;
}

// 添加组织机构
export interface AddOrganizationReq {
    name: string;
    email: string;
    mobile: string;
    city: string;
    state: string;
    zip_code: string;
    address: string;
}

// 编辑组织机构
export interface EditOrganizationReq {
    id: string;
    name: string;
    email: string;
    mobile: string;
    city: string;
    state: string;
    zip_code: string;
    address: string;
    status: string;
}
