// 自定义路由配置
// 页面内使用 definePageMeta({layout: 'main'}) 会失效
import type { RouteRecordRaw } from 'vue-router';
import Layout from '@/components/Layout/index.vue';
import { RoleType } from '~/enums/RolesEnum';

export const routes: RouteRecordRaw[] = [
    {
        path: '/',
        // redirect: '/admin',
        component: Layout,
        meta: { hidden: true },
    },
    {
        path: '/admin',
        component: () => import('@/pages/admin/index.vue'),
        name: '管理页',

        meta: {
            title: 'admin',
            affix: true,
            keepalive: false,
            roles: [RoleType.SleepRes],
        },
    },
    {
        path: '/patients',
        component: () => import('@/pages/patients/index.vue'),
        name: '患者',

        meta: {
            title: 'patients',
            keepalive: false,
            roles: [RoleType.DMETherapist, RoleType.Physician, RoleType.Clinician],
        },
    },

    {
        path: '/administrator/users',
        component: () => import('@/pages/users/index.vue'),
        name: '用户',
        meta: {
            title: 'users',
            keepalive: false,
            roles: [RoleType.DMEAdmin, RoleType.PhysicianAdmin],
            parent: 'administrator',
            parentTitle: 'Administrator',
        },
    },
    {
        path: '/administrator/organization',
        component: () => import('@/pages/organization/index.vue'),
        name: '机构',
        meta: {
            title: 'organization',
            keepalive: false,
            roles: [RoleType.DMEAdmin, RoleType.PhysicianAdmin],
            parent: 'administrator',
            parentTitle: 'Administrator',
        },
    },
    {
        path: '/dashboard',
        component: () => import('@/pages/dashboard/index.vue'),
        name: '仪表盘',
        meta: {
            title: 'dashboard',
            keepalive: false,
            roles: [RoleType.DMETherapist],
        },
    },
    {
        path: '/dashboard/list',
        component: () => import('@/pages/dashboard/list.vue'),
        name: '仪表盘列表',
        meta: {
            title: 'dashboardList',
            keepalive: false,
            roles: [RoleType.DMETherapist],
            hidden: true,
        },
    },
    {
        path: '/login',
        component: () => import('@/pages/login/index.vue'),
        name: '登录',
        meta: { title: 'login', hidden: true, layout: 'custom' },
    },
    {
        path: '/resetpwd',
        component: () => import('@/pages/login/resetpwd.vue'),
        name: '重置密码',
        meta: { title: 'resetpwd', hidden: true, layout: 'custom' },
    },
    // {
    //     path: '/users',
    //     component: () => import('@/pages/users/index.vue'),
    //     name: '用户',
    //     meta: {
    //         title: 'users',
    //         keepalive: false,
    //         roles: [RoleType.DMEAdmin, RoleType.PhysicianAdmin],
    //     },
    // },
    // {
    //     path: '/organization',
    //     component: () => import('@/pages/organization/index.vue'),
    //     name: '机构',
    //     meta: {
    //         title: 'organization',
    //         keepalive: false,
    //         roles: [RoleType.DMEAdmin, RoleType.PhysicianAdmin],
    //     },
    // },
    // {
    //     path: '/patientReport',
    //     component: () => import('@/pages/patients/detail.vue'),
    //     name: '患者详情',
    //     meta: {
    //         title: 'patientReport',
    //         icon: 'homepage',
    //         keepAlive: false,
    //         hidden: true,
    //         roles:
    //             process.env.NODE_ENV === 'development'
    //                 ? ['DME', 'Physician', 'SleepRes', 'DME User', 'Physician User']
    //                 : ['DME User', 'Physician User'],
    //     },
    // },
];

export default {
    routes: (_routes: any) => {
        return routes;
    },
    // 路由滚动行为
    scrollBehavior: () => ({ left: 0, top: 0 }),
};
