import { usePermissionStore } from './permission';
import { useTagsViewStore } from './tagsView';
import { getMessage } from '~/api/admin';

import { loginAccount, getUserDetailInfo, loginOut } from '~/api/login';
import type { LoginReq, UserInfo } from '~/api/login/types';
import { getRoles, RoleType } from '~/enums/RolesEnum';

export const useUserStore = defineStore(
    'user',
    () => {
        // 登录状态保持
        const loginStatus = useCookie<UserInfo | null>('loginData', {
            maxAge: 60 * 60 * 24,
        });

        const userInfoInit = null;
        // 用户信息
        const userInfo = ref<UserInfo | null>(userInfoInit);
        // 角色权限
        const roles = ref<string[]>([]);

        // 角色下拉选择框的选项
        const rolesOption = [
            {
                value: 3,
                label: RoleType.DMEAdmin,
                roles: [RoleType.DMEAdmin],
            },
            {
                value: 7,
                label: RoleType.DMETherapist,
                roles: [RoleType.DMEAdmin],
            },
            {
                value: 8,
                label: RoleType.DMEAdminTherapist,
                roles: [RoleType.DMEAdmin],
            },
            {
                value: 5,
                label: RoleType.PhysicianAdmin,
                roles: [RoleType.PhysicianAdmin],
            },
            {
                value: 13,
                label: RoleType.Physician,
                roles: [RoleType.PhysicianAdmin],
            },
            {
                value: 14,
                label: RoleType.Clinician,
                roles: [RoleType.PhysicianAdmin],
            },
            {
                value: 15,
                label: RoleType.PhysicianAdminPhysician,
                roles: [RoleType.PhysicianAdmin],
            },
            {
                value: 16,
                label: RoleType.PhysicianAdminClinician,
                roles: [RoleType.PhysicianAdmin],
            },
        ];

        /**
         * 登录
         * @param loginData
         * @returns Promise
         */
        function login(loginData: LoginReq) {
            return new Promise<UserInfo>((resolve, reject) => {
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
                            if (userInfo.value?.group_id) {
                                roles.value = getRoles(Number(userInfo.value.group_id));
                            } else {
                                roles.value = [];
                            }
                            console.log('roles', roles.value);
                            if (import.meta.client) {
                                startInactivityTimer();
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
                    userInfo.value = null;
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

        const setMessageCount = (count: number) => {
            console.log(count);
            messageCount.value = count;
        };

        const lastActiveTime = ref(Date.now());
        const logTimer = ref<any>(null);

        const startInactivityTimer = () => {
            // 初始化最后的活动时间为当前时间
            lastActiveTime.value = Date.now();
            // 监听键盘和鼠标事件来更新最后活动时间
            window.addEventListener('mousemove', resetTimer);
            window.addEventListener('keydown', resetTimer);
            window.addEventListener('click', resetTimer);
            if (!logTimer.value) {
                clearInterval(logTimer.value);
            }
            // 创建定时器检查是否30分钟过去
            logTimer.value = setInterval(checkInactivity, 60000); // 每分钟检查一次
        };

        const resetTimer = () => {
            lastActiveTime.value = Date.now();
        };

        const checkInactivity = () => {
            // 如果超过30分钟没有操作，执行注销逻辑
            if (Date.now() - lastActiveTime.value > 15 * 60 * 1000) {
                // 执行注销操作，例如调用API或者进行页面跳转
                logout();
                // this.$auth.logout(); // 假设有一个logout方法用于注销
            }
        };

        return {
            loginStatus,
            roles,
            userInfo,
            messageCount,
            rolesOption, // 角色选项
            lastActiveTime,
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
