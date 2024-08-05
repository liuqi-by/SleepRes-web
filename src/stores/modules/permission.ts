import type { RouteRecordRaw } from 'vue-router';
import { useUserStore } from './user';
import { routes } from '@/app/router.options';

export const usePermissionStore = defineStore('permission', () => {
    const permissionRoutes = ref<RouteRecordRaw[]>([]);

    // 设置权限路由
    const setPermissionRoutes = (routes: any) => {
        permissionRoutes.value = routes;
    };

    const userStore = useUserStore();
    /**
     * 获取菜单
     */
    const getPermissionRoutes = () => {
        // let res = await useClientRequest<ResPonseType<RouteRecordRaw[]>>('/api/menu');

        if (routes.length > 0) {
            let route = routes.filter(item => {
                return (
                    (item.meta?.roles && haveRoles(item.meta.roles, userStore.loginStatus.roles)) || !item.meta?.roles
                );
            });

            console.log(route);
            permissionRoutes.value = JSON.parse(JSON.stringify(route));
            return permissionRoutes.value;
        }

        // permissionRoutes.value = routes.filter(item => {
        //     return (
        //         item.meta?.title &&
        //         ((item.meta?.roles &&
        //             !haveRoles(
        //                 item.meta.roles,
        //                 userStore.loginStatus.roles.map(item => item.value),
        //             )) ||
        //             !item.meta?.roles)
        //     );
        // });
    };

    return {
        permissionRoutes,
        setPermissionRoutes,
        getPermissionRoutes,
    };
});
