<template>
    <!-- 路由 -->
    <ElConfigProvider
        :size="size"
        :z-index="3000"
        :locale="locale"
    >
        <!-- 进度条 -->
        <NuxtLoadingIndicator :throttle="0" />

        <NuxtLayout>
            <!-- 页面 -->
            <NuxtPage />
        </NuxtLayout>
        <div class="version">v{{ version }}</div>
    </ElConfigProvider>
</template>
<script setup lang="ts">
    import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
    import en from 'element-plus/dist/locale/en.mjs';
    import { version } from '../package.json';
    import { DeviceEnum } from './enums/AppSettingsEnum';
    import { useAppStore } from '@/stores/modules/app';
    import { useUserStore } from '@/stores/modules/user';

    const { t } = useI18n();
    const appStore = useAppStore();
    const userStore = useUserStore();

    const size = computed(() => appStore.size);
    // zh-CN或者 en-US
    const language = computed(() => appStore.language);
    const locale = computed(() => (language.value === 'zh-CN' ? zhCn : en));

    const versionStorage = useLocalStorage('version', version);

    if (versionStorage.value !== version) {
        versionStorage.value = version;
        // 重置本地存储
        localStorage.clear();
        // 清空所有cookie
        let cookies = document.cookie.split(';');

        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i];
            let eqPos = cookie.indexOf('=');
            let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
        }
    }

    // 监听语言变化
    watch(
        () => language.value,
        () => {
            // SEO 优化
            useSeoMeta({
                title: t('title'),
                description: t('title'),
                author: t('title'),
            });
        },
        {
            immediate: true,
        },
    );

    // 如果是server,在服务端通过userAgent判断设备类型
    if (process.server) {
        const headers = useRequestHeaders();
        const userAgent = headers['user-agent'];
        const isMobile = /(Android|webOS|iPhone|iPod|tablet|BlackBerry|Mobile)/i.test(userAgent);
        appStore.toggleDevice(isMobile ? DeviceEnum.MOBILE : DeviceEnum.DESKTOP);
        appStore.closeSideBar(false);
    }

    // 如果登录了，获取用户信息
    if (userStore.loginStatus) {
        userStore.getUserInfo(process.server);
    }

    if (appStore.themeColor) {
        useHead({
            htmlAttrs: {
                style: `--menu-bg-color: ${appStore.themeColor}`,
            },
        });
    }
</script>
<style lang="scss">
    @import '@/assets/css/index';

    // 页面过度动画
    .page-enter-active,
    .page-leave-active {
        transition: opacity 0.2s;
    }

    .page-enter-from,
    .page-leave-to {
        opacity: 0;
    }

    .version {
        position: fixed;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100vw;
        height: 40px;
        line-height: 40px;
        text-align: center;
    }

    .release-logs {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        line-height: normal;
        cursor: pointer;
    }
</style>
