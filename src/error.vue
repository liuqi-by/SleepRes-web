<template>
    <div class="error-content wh-fullscreen flex-center bg-white">
        <div class="flex">
            <img
                src="@/assets/images/404.png"
                alt=""
            />
            <div class="m-l-[40px] error-text">
                <p class="title">{{ props.error?.statusCode }}</p>
                <p class="des">{{ currentError?.message }}</p>
                <base-button
                    type="primary"
                    height="32px"
                    @click="$router.go(-1)"
                    v-if="currentError?.statusCode !== 401"
                    >{{ $t('errors.goBack') }}
                </base-button>
                <base-button
                    type="primary"
                    height="32px"
                    @click="goBack"
                    v-else
                    >{{ $t('errors.goBack') }}
                </base-button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { usePermissionStore } from './stores/modules/permission';

    // import { useUserStore } from './stores/modules/user';

    const props = defineProps({
        error: Object,
    });

    const currentError = computed(() => {
        let statusCode = props.error?.statusCode;

        switch (statusCode) {
            case 404:
                return errorList[0];
            case 500:
                return errorList[1];
            case 401:
                return errorList[2];
            default:
                return {
                    statusCode,
                    message: props.error?.message,
                    imgSrc: '@/assets/images/505.png',
                };
        }
    });

    const { t } = useI18n();
    const errorList = [
        {
            statusCode: 404,
            message: t('errors.404'),
            imgSrc: '@/assets/images/404.png',
        },
        {
            statusCode: 505,
            message: t('errors.505'),
            imgSrc: '@/assets/images/505.png',
        },
        {
            statusCode: 401,
            message: t('errors.401'),
            imgSrc: '@/assets/images/401.png',
        },
    ];

    const permissionStore = usePermissionStore();

    const goBack = () => {
        let menuRoute = permissionStore.permissionRoutes.filter(route => !route.meta?.hidden);

        // 如果跳转的路由不在权限路由中，跳转到第一个菜单路由
        if (menuRoute.length > 0) {
            return navigateTo(menuRoute[0].path);
        } else {
            return navigateTo({ path: '/' });
        }
    };
</script>

<style lang="scss" scoped>
    .error-text {
        font-family: var(--font-family);
    }

    .title {
        margin-bottom: 8px;
        font-size: 56px;
        font-weight: 500;
        line-height: 64px;
        color: #000;
    }

    .des {
        margin-bottom: 32px;

        @include font($font-small);

        font-weight: normal;
        line-height: 24px;
    }
</style>
