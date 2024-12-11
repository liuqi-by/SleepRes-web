import type { RouteRecordRaw } from 'vue-router';
import { useUserStore } from './user';
import { routes } from '@/app/router.options';

const generateRoute = (routes: any[], result: any[] = []) => {
    for (const item of routes) {
        let route = JSON.parse(JSON.stringify(item));

        if (route.meta?.title && !route.meta?.hidden) {
            if (route.meta && route.meta.parent) {
                let index = result.findIndex((item: any) => item.meta.title === route.meta.parentTitle);
                if (index === -1) {
                    result.push({
                        meta: { title: route.meta.parentTitle },
                        path: route.meta.parent,
                        children: [route],
                    });
                } else {
                    if (!result[index].children) {
                        result[index].children = [];
                    }
                    result[index].children?.push(route);
                }
            } else {
                result.push(route);
            }
        }
    }
    console.log('菜单', result);
    return result;
};

export const usePermissionStore = defineStore('permission', () => {
    const permissionRoutes = useCookie<RouteRecordRaw[]>('routes', {
        default: () => [],
    });

    const menuRoute = useCookie<RouteRecordRaw[]>('menuRoute', {
        default: () => [],
    });
    // 设置权限路由
    const setPermissionRoutes = (routes: any) => {
        permissionRoutes.value = routes;
    };

    const userStore = useUserStore();

    // const filterRoute = (routes: any[], result: RouteRecordRaw[] = []): any[] => {
    //     routes.forEach(item => {
    //         if (item.meta?.roles && haveRoles(item.meta.roles, userStore.roles)) {
    //             result.push({ ...item, children: undefined });
    //         }
    //         if (item.children) {
    //             filterRoute(item.children, result);
    //         }
    //     });
    //     return result;
    // };

    /**
     * 获取菜单
     */
    const getPermissionRoutes = () => {
        // let res = await useClientRequest<ResPonseType<RouteRecordRaw[]>>('/api/menu');
        // let route = routes.filter(item => {
        //     return (item.meta?.roles && haveRoles(item.meta.roles, userStore.roles)) || !item.meta?.roles;
        // });
        let routesAsync = routes;

        let route = getRoutes(routesAsync);

        function getRoutes(routes: any[], result: RouteRecordRaw[] = []) {
            routes.forEach(item => {
                if ((item.meta?.roles && haveRoles(item.meta.roles, userStore.roles)) || !item.meta?.roles) {
                    result.push(item);
                }
            });
            return result;
        }
        console.log('routes', route);

        permissionRoutes.value = JSON.parse(JSON.stringify(route)).filter((item: any) => item.path !== '/');
        console.log('permissionRoutes', permissionRoutes.value);
        menuRoute.value = generateRoute(permissionRoutes.value);
        console.log('menuRoute', menuRoute.value);
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

    const clearPermissionRoute = () => {
        permissionRoutes.value = [];
        menuRoute.value = [];
    };

    return {
        getPermissionRoutes,
        setPermissionRoutes,
        menuRoute,
        permissionRoutes,
        clearPermissionRoute,
    };
});
