import { usePermissionStore } from './permission';
import { useTagsViewStore } from './tagsView';
import { getMessage } from '~/api/admin';

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
        // 用户信息
        const userInfo = ref<UserInfo | null>(userInfoInit);
        // 角色权限
        const roles = ref<string[]>([]);

        const rolesOption = [
            {
                value: 2,
                label: 'DME',
                roles: ['SleepRes'],
            },
            {
                value: 3,
                label: 'DME User',
                roles: ['DME'],
            },
            {
                value: 3,
                label: 'Physician',
                roles: ['SleepRes'],
            },
            {
                value: 4,
                label: 'Physician User',
                roles: ['Physician'],
            },
        ];

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
                            switch (userInfo.value?.group_id) {
                                case 1:
                                    roles.value = ['SleepRes'];
                                    break;
                                case 2:
                                    roles.value = ['DME'];
                                    break;
                                case 3:
                                    roles.value = ['DME User'];
                                    break;
                                case 4:
                                    roles.value = ['Physician'];
                                    break;
                                case 5:
                                    roles.value = ['Physician User'];
                                    break;
                                default:
                                    roles.value = [];
                                    break;
                            }
                            // roles.value = userInfo.value?.group_id === 1 ? ['SleepRes'] : [];
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
                    roles.value = [];
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

        const messageCount = ref<number>(0); // 消息数量
        /**
         * 获取消息
         */
        function getAdminMessage() {
            return new Promise<void>((resolve, reject) => {
                getMessage({
                    page: 0,
                    pagesize: 1,
                    status: 1,
                })
                    .then(res => {
                        if (res.code === 1) {
                            setMessageCount(res.data_other.num);
                            resolve();
                        }
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        }

        function setMessageCount(count: number) {
            console.log(count);
            messageCount.value = count;
        }

        return {
            loginStatus,
            roles,
            userInfo,
            messageCount,
            rolesOption, // 角色选项
            login,
            logout,
            getUserInfo,
            getAdminMessage,
            setMessageCount,
        };
    },
    {
        persist: import.meta.client && {
            storage: localStorage,
        },
    },
);
