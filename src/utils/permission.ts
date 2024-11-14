import { useUserStore } from '~/stores/modules/user';

/**
 * 判断是否有权限
 * @param checkRoles 当前路由需要的权限
 * @param roles 当前用户权限
 * @returns
 */

export function haveRoles(checkRoles: string[], roles?: string[]) {
    const userStore = useUserStore();
    if (!roles) {
        roles = userStore.roles;
    }
    console.log('roles', roles);

    return checkRoles.some(item => roles.includes(item));
}
