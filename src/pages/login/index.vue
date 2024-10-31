<!-- 登录页面 -->
<template>
    <div class="login-container">
        <!-- logo -->
        <base-svg-icon
            icon="logo"
            color="#fff"
            width="210px"
            height="68px"
            class="login-logo"
        />
        <!-- 表单 -->
        <div class="login-card">
            <div class="tab-content">
                <div>
                    <!-- 登录表单 -->
                    <login-form @link-to="switchTab" />
                </div>
            </div>
        </div>

        <!-- 注册弹窗 -->
        <client-only>
            <RegisterForm
                v-model="showRegisterForm"
                :tabType="tabType"
                :key="tabType"
            />
        </client-only>

        <!-- 重置密码弹窗 -->
        <client-only>
            <ResetPasswordForm ref="resetPasswordForm" />
        </client-only>
    </div>
</template>

<script setup lang="ts">
    // import { ArrowDown } from '@element-plus/icons-vue';
    import LoginForm from './components/login-form.vue';

    const RegisterForm = defineAsyncComponent(() => import('./components/register-form.vue'));
    const ResetPasswordForm = defineAsyncComponent(() => import('./components/reset-password.vue'));

    export type TabType = '' | 'registerDme' | 'registerPhysician' | 'resetPwd';

    const tabType = ref<TabType>('');

    const showRegisterForm = ref(false); // 是否显示注册表单
    const resetPasswordForm = ref<InstanceType<typeof ResetPasswordForm> | null>(null);
    const switchTab = (type: TabType) => {
        if (type === 'registerDme' || type === 'registerPhysician') {
            showRegisterForm.value = true;
            tabType.value = type;
            return;
        }
        if (type === 'resetPwd') {
            tabType.value = type;

            resetPasswordForm.value?.showResetPassword();
        }
    };
</script>

<style lang="scss" scoped>
    .login-container {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        min-width: 1200px;
        min-height: 100vh;
        background: url('@/assets/images/login-bg.png') no-repeat;
        background-size: 100% 100%;

        .login-logo {
            position: absolute;
            top: 3%;
            left: 2%;
            z-index: 1;
            filter: drop-shadow(0 4px 10px rgb(0 0 0 / 30%));
        }

        .header-lang-right {
            position: fixed;
            top: 20px;
            right: 20px;
            color: #fff;
        }

        .tab-header {
            display: flex;

            .tab-title {
                flex: 1;
                font-family: $font-family;
                font-size: 24px;
                font-weight: 500;
                line-height: 36px;
                text-align: center;
                cursor: pointer;
                border-bottom: 2px solid #f0f0f0;

                &.is-active {
                    color: $menu-background;
                    border-bottom: 2px solid $menu-background;
                }

                &:hover {
                    color: $menu-background;
                }
            }
        }

        .login-card {
            position: relative;
            width: 500px;
            min-height: 500px;
            padding: 40px;
            padding-top: 30px;
            background-color: #fff;
            border-radius: 0 2px 2px 0;
            box-shadow:
                0 4px 8px 0 rgb(0 0 0 / 5%),
                0 8px 28 px 8px rgb(0 0 0 / 7%);

            @media screen and (width <= 900px) {
                left: 0;
            }

            .scan-text {
                @include font($font-small);

                font-weight: 350;
                line-height: 22px;
            }
        }
    }
</style>
