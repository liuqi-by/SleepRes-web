import { usePermissionStore } from './permission';
import { useTagsViewStore } from './tagsView';

import { loginAccount, getUserDetailInfo, loginOut } from '~/api/login';
import type { LoginReq, LoginRes, UserInfo } from '~/api/login/types';

export const useUserStore = defineStore(
    'user',
    () => {
        // 登录状态保持
        const loginStatus = useCookie<LoginRes | null>('loginData', {
            maxAge: 60 * 60 * 24,
        });

        const userInfoInit = null;
        let userInfo = ref<UserInfo | null>(userInfoInit);

        const roles = ref<string[]>([]);

        /**
         * 登录
         * @param loginData
         * @returns Promise
         */
        function login(loginData: LoginReq) {
            return new Promise<LoginRes>((resolve, reject) => {
                loginStatus.value = null;
                // 登录
                loginAccount(loginData)
                    .then(res => {
                        loginStatus.value = res.data;
                        resolve(res.data);
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        }

        const permissionStore = usePermissionStore();
        /**
         * 获取信息(用户昵称、头像、角色集合、权限集合)
         * @return {Promise<UserInfo>}
         */
        function getUserInfo(isServer = false) {
            return new Promise<UserInfo>((resolve, reject) => {
                getUserDetailInfo(isServer)
                    .then((res: any) => {
                        if (res) {
                            userInfo.value = isServer ? res.data.value.data : res.data;
                            roles.value = userInfo.value?.group_id === 1 ? ['SleepRes'] : [];
                            permissionStore.getPermissionRoutes();
                            resolve(userInfo.value as UserInfo);
                        }
                    })
                    .catch((error: any) => {
                        reject(error);
                    });
            });
        }

        /**
         * 退出登录
         * @returns Promise
         */

        const tagsViewStore = useTagsViewStore();
        function logout() {
            const route = useRoute();
            return new Promise<void>((resolve, reject) => {
                setTimeout(() => {
                    console.log(route);
                    if (route.path !== '/login') {
                        if (route.fullPath !== '/') {
                            navigateTo(`/login?redirect=${route.fullPath}`);
                        } else {
                            navigateTo(`/login`);
                        }
                    }

                    resolve();
                }, 500);

                try {
                    userInfo.value = userInfoInit;

                    // useMessageStore().stopInterval();
                    usePermissionStore().setPermissionRoutes([]);
                    tagsViewStore.delAllViews();

                    if (!loginStatus.value) {
                        return;
                    }
                    loginOut();
                    loginStatus.value = null;
                } catch {
                    reject();
                }
            });
        }

        return {
            loginStatus,
            roles,
            userInfo,
            login,
            logout,
            getUserInfo,
        };
    },
    {
        persist: import.meta.client && {
            storage: localStorage,
        },
    },
);
