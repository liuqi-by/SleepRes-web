import { usePermissionStore } from '~/stores/modules/permission';
import { useUserStore } from '~/stores/modules/user';
export default defineNuxtRouteMiddleware(async to => {
    // 路由白名单
    const whiteList = ['/login'];
    // 获取用户信息
    const userStore = useUserStore();

    const isLogin = userStore.loginStatus?.token;
    const permissionStore = usePermissionStore();
    console.log('isLogin', isLogin);
    // 如果登录
    if (!isLogin) {
        console.log('没有登录');
        // 如果没有登录，跳转到登录页面
        if (!whiteList.includes(to.path)) {
            return navigateTo('/login?redirect=' + to.path);
        }
    } else {
        console.log(to.path);
        if (whiteList.includes(to.path)) {
            return;
        }

        try {
            // 如果登录，获取用户信息
            if (userStore.userInfo === null) {
                await userStore.getUserInfo();
            }

            let menuRoute = permissionStore.permissionRoutes.filter(route => route.meta?.title || !route.meta?.hidden);
            // 菜单访问的路由
            console.log('路由', menuRoute);

            if (menuRoute.length <= 0) {
                return showError({
                    statusCode: 401,
                });
            }
            // 如果跳转的路由不在权限路由中，跳转到第一个菜单路由
            console.log('跳转的路由', to);
            if (menuRoute.findIndex(route => route.meta?.title === to.meta.title) === -1) {
                if (to.path === '/') {
                    return navigateTo(menuRoute[0].path);
                } else {
                    return navigateTo('/');
                }
                // else {
                //     return showError({
                //         statusCode: 401,
                //     });
                // }

                // return navigateTo(menuRoute[0].path);
            }
        } catch (error) {
            console.log('error', error);
            userStore.logout();
            return navigateTo('/login?redirect=' + to.path);
        }
    }
});
