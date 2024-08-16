import { useUserStore } from '~/stores/modules/user';

// 自定义指令，判断权限，没有权限则移除元素，只能用做页面的权限控制，不能用于布局menu的权限控制
export default defineNuxtPlugin(nuxtApp => {
    // 不再是 import Vue from 'vue'的写法了
    nuxtApp.vueApp.directive('auth', {
        // 不用mounted，在mounted时用户权限集还是空的
        mounted(el, value) {
            // 用户信息，这里面有属性 role | permission

            const roles = useUserStore().roles;

            console.log('roles', roles);

            if (!haveRoles(value.value, roles)) {
                removeEl(el);
            }
        },
    });
});

// 移除元素
const removeEl = (el: HTMLElement) => el && el.parentNode && el.parentNode.removeChild(el);
