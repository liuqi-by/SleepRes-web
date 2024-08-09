<template>
    <div class="right-menu">
        <!-- 切换主题 -->
        <el-tooltip
            :content="$t('layout.PersonalizedSettings')"
            effect="dark"
            placement="bottom"
        >
            <switch-theme
                class="right-menu-item"
                :size="size"
            />
        </el-tooltip>

        <!-- 全屏 -->
        <el-tooltip
            :content="$t(isFullscreen ? 'layout.exitFullscreen' : 'layout.screenfull')"
            effect="dark"
            placement="bottom"
        >
            <Screenfull
                class="right-menu-item"
                :size="size"
            />
        </el-tooltip>
        <!-- 消息通知 -->
        <el-tooltip
            content="Message"
            effect="dark"
            placement="bottom"
            v-if="haveRoles(['SleepRes'])"
        >
            <MessageCenter
                class="right-menu-item"
                :size="size"
            />
        </el-tooltip>
        <!-- 用户名 -->
        <el-dropdown trigger="click">
            <div class="avatar-wrapper">
                <!-- 用户头像 -->

                <ClientOnly>
                    <base-img
                        class="user-avatar"
                        :src="avatar"
                        :error="avatar"
                    />

                    <p
                        class="user-name"
                        :title="userStore.userInfo?.nickname"
                    >
                        {{ userStore.userInfo?.nickname }}
                    </p>
                </ClientOnly>
            </div>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item
                        divided
                        @click="logout"
                    >
                        {{ $t('layout.logout') }}
                    </el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script setup lang="ts">
    import Screenfull from './components/Screenfull/index.vue';
    import MessageCenter from './components/MessageCenter/index.vue';

    import { useAppStore } from '@/stores/modules/app';
    import { useUserStore } from '@/stores/modules/user';

    import { DeviceEnum } from '~/enums/AppSettingsEnum';
    import avatar from '@/assets/images/avatar.png';

    const appStore = useAppStore();
    const userStore = useUserStore();

    const size = computed(() => {
        return appStore.device === DeviceEnum.MOBILE ? '20px' : '28px';
    });

    // const { device } = storeToRefs(appStore);
    // const { width } = useWindowSize();
    const { isFullscreen } = useFullscreen();

    const { t } = useI18n();
    /**
     * 注销
     */
    const logout = () => {
        ElMessageBox.confirm(t('login.ConfirmLogout'), t('login.logout'), {
            confirmButtonText: t('form.Confirm'),
            cancelButtonText: t('form.Cancel'),
            type: 'warning',
        }).then(() => {
            userStore.logout();
        });
    };
</script>

<style lang="scss" scoped>
    .right-menu {
        display: flex;
        align-items: center;
        justify-content: space-between;
        float: right;
        height: 100%;
        padding-right: 20px;

        &:focus {
            outline: none;
        }

        .right-menu-item {
            display: flex;
            align-items: center;
            justify-content: center;
            min-width: 40px;
            height: $navbar-height;
            padding: 0 5px;
            margin-right: 32px;
            color: $menu-text;
            text-align: center;
            cursor: pointer;

            &:hover {
                color: $menu-active-text;
                background: $menu-hover-background;
            }
        }

        :deep(.icon-container) {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
        }

        :deep(.el-switch.is-checked .el-switch__core) {
            background-color: $menu-hover-background;
        }

        :deep(.el-switch__core) {
            margin-right: 10px;
            background-color: $menu-hover-background;
            border: none;
        }

        .avatar-wrapper {
            display: flex;
            align-items: center;
            height: 100%;
            margin-right: 20px;
            cursor: pointer;

            @include font($font-middle);

            .user-avatar {
                width: 36px;
                height: 36px;
                margin-right: 14px;
                cursor: pointer;

                :deep(img) {
                    overflow: hidden;
                    border-radius: 50%;
                }
            }
        }

        .el-dropdown {
            color: $menu-active-text;
        }
    }

    .mobile {
        .right-menu {
            .right-menu-item {
                margin-right: 8px;
            }
        }
    }

    .layout-top {
        .right-menu {
            .right-menu-item {
                color: $menu-text;

                &:hover {
                    color: $menu-active-text;
                    background: $menu-hover-background;
                }
            }
        }
    }
</style>
