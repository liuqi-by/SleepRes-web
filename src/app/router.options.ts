// 自定义路由配置
// 页面内使用 definePageMeta({layout: 'main'}) 会失效
import type { RouteRecordRaw } from 'vue-router';
import Layout from '@/components/Layout/index.vue';
export const routes: RouteRecordRaw[] = [
    {
        path: '/redirect',
        meta: { hidden: true },
        component: Layout,
        children: [
            {
                path: '/redirect/:path(.*)',
                component: () => import('@/pages/redirect/index.vue'),
            },
        ],
    },
    {
        path: '/login',
        component: () => import('@/pages/login/index.vue'),
        name: '登录',
        meta: { title: 'login', hidden: true, layout: 'custom' },
    },

    {
        path: '/',
        component: () => import('@/pages/home/index.vue'),
        name: '主页',
        meta: { title: 'home', affix: true, icon: 'homepage', keepalive: true, roles: ['superAdmin'] },
    },
    {
        path: '/patients',
        component: () => import('@/pages/patients/index.vue'),
        name: '患者',
        meta: { title: 'menu', icon: 'homepage', keepalive: true, roles: ['patients'] },
    },
    {
        path: '/users',
        component: () => import('@/pages/users/index.vue'),
        name: '用户',
        meta: { title: 'users', icon: 'homepage', keepalive: true, roles: ['users'] },
    },
    {
        path: '/organization',
        component: () => import('@/pages/organization/index.vue'),
        name: '机构',
        meta: { title: 'organization', icon: 'homepage', keepalive: true, roles: ['organization'] },
    },
];

export default {
    routes: (_routes: any) => {
        return routes;
    },
    // 路由滚动行为
    scrollBehavior: () => ({ left: 0, top: 0 }),
};
