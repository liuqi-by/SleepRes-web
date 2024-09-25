/**
 * 角色权限
 */

export enum RoleType {
    SleepRes = 'SleepRes',
    DMEAdmin = 'DME Admin',
    PhysicianAdmin = 'Physician Admin',
    Patient = 'Patient',
    DMETherapist = 'DME Therapist',
    Physician = 'Physician',
    Clinician = 'Clinician',
    DMEAdminTherapist = 'DME Admin + Therapist',
    PhysicianAdminPhysician = 'Physician Admin + Physician',
    PhysicianAdminClinician = 'Physician Admin + Clinician',
}

// 使用对象来映射数字到角色数组
const roleMappings: Record<number, string[]> = {
    1: [RoleType.SleepRes],
    2: [RoleType.DMEAdmin],
    3: [RoleType.DMEAdmin],
    4: [RoleType.PhysicianAdmin],
    5: [RoleType.PhysicianAdmin],
    6: [RoleType.Patient],
    7: [RoleType.DMETherapist],
    8: [RoleType.DMETherapist, RoleType.DMEAdmin],
    13: [RoleType.Physician],
    14: [RoleType.Clinician],
    15: [RoleType.Physician, RoleType.PhysicianAdmin],
    16: [RoleType.PhysicianAdmin, RoleType.Clinician],
};

// 假设你有一个函数，根据输入的数字返回相应的角色数组
export function getRoles(roleId: number): string[] {
    return roleMappings[roleId] || [];
}
