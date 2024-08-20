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
        let route = routes.filter(item => {
            return (item.meta?.roles && haveRoles(item.meta.roles, userStore.roles)) || !item.meta?.roles;
        });

        // function getRoutes(routes: any[], result: RouteRecordRaw[] = []) {
        //     routes.forEach(item => {
        //         if (item.meta?.roles && haveRoles(item.meta.roles, userStore.roles)) {
        //             result.push({ ...item, children: undefined });

        //             if (item.children) {
        //                 getRoutes(item.children, result);
        //             }
        //         }
        //     });
        //     return result;
        // }

        permissionRoutes.value = JSON.parse(JSON.stringify(route));
        return permissionRoutes.value;

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
