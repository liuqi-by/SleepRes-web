import { usePermissionStore } from '~/stores/modules/permission';
import { useUserStore } from '~/stores/modules/user';
export default defineNuxtRouteMiddleware(to => {
    // 路由白名单
    const whiteList = ['/login'];
    // 获取用户信息
    const userStore = useUserStore();
    const isLogin = userStore.loginStatus?.token;

    // 如果登录
    if (!isLogin) {
        console.log('没有登录');
        // 如果没有登录，跳转到登录页面
        if (!whiteList.includes(to.path)) {
            return navigateTo('/login?redirect=' + to.path);
        }
    } else {
        // if (to.path === '/login') {
        //     return navigateTo('/');
        // }

        // 如果登录，获取权限路由
        let permissionRoutes = usePermissionStore().permissionRoutes;
        if (permissionRoutes.length === 0) {
            permissionRoutes = usePermissionStore().getPermissionRoutes();
        }

        // 菜单访问的路由
        let menuRoute = permissionRoutes.filter(route => !route.meta?.hidden);
        // 如果没有菜单路由，跳转到401页面
        if (menuRoute.length === 0) {
            return showError({
                statusCode: 401,
            });
        }

        // 如果跳转的路由不在权限路由中，跳转到第一个菜单路由
        if (permissionRoutes.findIndex(route => route.path === to.path) === -1) {
            return navigateTo(menuRoute[0].path);
        }
    }
});
