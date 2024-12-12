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
        path: '/tasks',
        component: () => import('@/pages/tasks/index.vue'),
        name: '任务管理',
        meta: {
            title: 'tasks',
            keepalive: false,
            roles: [RoleType.DMETherapist, RoleType.Physician, RoleType.Clinician],
            parent: 'tasks',
            parentTitle: 'tasks',
            isParent: true,
        },
    },
    {
        path: '/tasks/adherence',
        component: () => import('@/pages/tasks/list.vue'),
        name: 'adherence',
        meta: {
            title: 'adherence',
            keepalive: false,
            roles: [RoleType.DMETherapist, RoleType.Physician, RoleType.Clinician],
            parent: 'tasks',
            parentTitle: 'tasks',
        },
    },
    {
        path: '/tasks/Long-term-adherence',
        component: () => import('@/pages/tasks/list.vue'),
        name: 'Long-term-adherence',
        meta: {
            title: 'Long-term-adherence',
            keepalive: false,
            roles: [RoleType.DMETherapist, RoleType.Physician, RoleType.Clinician],
            parent: 'tasks',
            parentTitle: 'tasks',
        },
    },
    {
        path: '/tasks/High-Leak',
        component: () => import('@/pages/tasks/list.vue'),
        name: 'High-Leak',
        meta: {
            title: 'High-Leak',
            keepalive: false,
            roles: [RoleType.DMETherapist, RoleType.Physician, RoleType.Clinician],
            parent: 'tasks',
            parentTitle: 'tasks',
        },
    },
    {
        path: '/tasks/High-AHI',
        component: () => import('@/pages/tasks/list.vue'),
        name: 'High-AHI',
        meta: {
            title: 'High-AHI',
            keepalive: false,
            roles: [RoleType.DMETherapist, RoleType.Physician, RoleType.Clinician],
            parent: 'tasks',
            parentTitle: 'tasks',
        },
    },
    {
        path: '/tasks/Cellular-Connectivity',
        component: () => import('@/pages/tasks/list.vue'),
        name: 'Cellular-Connectivity',
        meta: {
            title: 'Cellular-Connectivity',
            keepalive: false,
            roles: [RoleType.DMETherapist, RoleType.Physician, RoleType.Clinician],
            parent: 'tasks',
            parentTitle: 'tasks',
        },
    },
    {
        path: '/tasks/Wi-Fi-Connectivity',
        component: () => import('@/pages/tasks/list.vue'),
        name: 'Wi-Fi-Connectivity',
        meta: {
            title: 'Wi-Fi-Connectivity',
            keepalive: false,
            roles: [RoleType.DMETherapist, RoleType.Physician, RoleType.Clinician],
            parent: 'tasks',
            parentTitle: 'tasks',
        },
    },

    {
        path: '/administrator/users',
        component: () => import('@/pages/administrator/users/index.vue'),
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
        component: () => import('@/pages/administrator/organization/index.vue'),
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
        path: '/administrator/rules',
        component: () => import('@/pages/administrator/rules/index.vue'),
        name: '规则',
        meta: {
            title: 'rules',
            keepalive: false,
            roles: [RoleType.DMEAdmin, RoleType.PhysicianAdmin],
            parent: 'administrator',
            parentTitle: 'Administrator',
        },
    },
    {
        path: '/administrator/settings',
        component: () => import('@/pages/administrator/settings/index.vue'),
        name: '设置',
        meta: {
            title: 'settings',
            keepalive: false,
            roles: [RoleType.DMEAdmin, RoleType.PhysicianAdmin],
            parent: 'administrator',
            parentTitle: 'Administrator',
        },
    },
    {
        path: '/dashboard',
        component: () => import('@/pages/dashboard/dashboard.vue'),
        name: 'Dashboard',
        meta: {
            title: 'dashboard',

            keepalive: true,
            roles: [RoleType.DMETherapist],
        },
    },
    {
        path: '/dashboard/list',
        component: () => import('@/pages/dashboard/list.vue'),
        name: '仪表盘列表',
        meta: {
            title: 'dashboard',
            keepalive: false,
            roles: [RoleType.DMETherapist],
            hidden: true,
        },
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
