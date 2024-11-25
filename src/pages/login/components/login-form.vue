<!-- 登录表单 -->
<template>
    <div>
        <div class="form-title">{{ $t('login.accountLogin') }}</div>
        <el-form
            ref="formRef"
            :model="formData"
            :rules="formRules"
            class="login-form"
            label-width="110px"
            label-position="left"
        >
            <!-- 账号 -->
            <el-form-item
                prop="username"
                :label="$t('login.username')"
                class="no-required"
            >
                <div class="form-item">
                    <el-input
                        v-model="formData.username"
                        class="form-input"
                        :placeholder="`${$t('login.username')}`"
                        type="text"
                        @keyup.enter="nextInput"
                        ref="focusRef"
                    >
                        <template #prefix>
                            <base-svg-icon
                                icon="account"
                                color="rgba(0, 0, 0, 0.25)"
                                size="16px"
                            />
                        </template>
                    </el-input>
                </div>
            </el-form-item>
            <!-- 密码 -->
            <el-form-item
                prop="password"
                :label="$t('login.password')"
                class="no-required"
            >
                <div class="form-item">
                    <el-input
                        v-model.trim="formData.password"
                        :placeholder="$t('login.password')"
                        type="password"
                        name="password"
                        class="form-input"
                        show-password
                        @keyup.enter="handleLogin"
                    >
                        <template #prefix>
                            <base-svg-icon
                                icon="pwd"
                                color="rgba(0, 0, 0, 0.25)"
                                size="16px"
                            />
                        </template>
                    </el-input>
                </div>
            </el-form-item>

            <p>Sleep Res Admin: admin a654321</p>
            <p>dme-admin:dme-admin 123456</p>
            <p>dme-therapist : dme-therapist@qq.com 123456</p>
            <p>dme-admin+therapist: admin-therapist@qq.com 123456</p>
            <p>Physician admin: 10267696@qq.com 123456</p>
            <p>Physician: Physician@qq.com 123456</p>
            <p>Clinician: Clinician@qq.com 123456</p>
            <p>Physician + Physician admin: Physician-PhysicianAdmin@qq.com 123456</p>
            <p>Clinician+ Physician admin :Clinician-admin@qq.com 123456</p>
            <div class="m-t-[48px]">
                <div class="form-bottom">
                    <!-- 注册DME -->
                    <span
                        class="link"
                        @click="linkTo('registerDme')"
                        >{{ $t('login.registerDme') }}</span
                    >
                    <!-- 注册医生 -->
                    <span
                        class="link"
                        @click="linkTo('registerPhysician')"
                        >{{ $t('login.registerPhysician') }}
                    </span>
                </div>
                <base-button
                    class="m-t-[70px]"
                    height="40px"
                    width="100%"
                    @click="handleLogin"
                    type="primary"
                    :loading="loading"
                >
                    {{ $t('login.login') }}
                </base-button>
                <p
                    class="link text-center m-t-[50px] block!"
                    @click="linkTo('resetPwd')"
                >
                    {{ $t('login.resetPwd') }}
                </p>
            </div>
        </el-form>
    </div>
</template>

<script setup lang="ts">
    import type { FormInstance, InputInstance } from 'element-plus';
    // import type { LocationQuery, LocationQueryValue } from 'vue-router';
    import type { TabType } from '../index.vue';
    import { useUserStore } from '@/stores/modules/user';
    import { usePermissionStore } from '~/stores/modules/permission';

    const userStore = useUserStore();

    const loading = ref(false); // 按钮loading
    const formRef = ref<FormInstance>(); // 登录表单ref
    const { t } = useI18n(); // 国际化

    const formData = ref({
        username: '',
        password: '',
    });

    const { usernameRequired, passwordRequired } = useFormRules();

    // 表单规则
    const formRules = computed(() => {
        return {
            username: usernameRequired,
            password: passwordRequired,
        };
    });

    // const route = useRoute();
    // const router = useRouter();
    const permissionStore = usePermissionStore();
    /**
     * 登录
     */
    const handleLogin = () => {
        formRef.value?.validate((valid: boolean) => {
            if (!valid) {
                return;
            }

            loading.value = true;
            let queryData = {
                account: formData.value.username,
                password: formData.value.password,
            };
            userStore
                .login(queryData)
                .then(async () => {
                    ElMessage.success(t('login.loginSuccess'));
                    // 登录成功后，获取用户信息
                    await userStore.getUserInfo();

                    // const query: LocationQuery = route.query;

                    // const redirect = (query.redirect as LocationQueryValue) || '/';

                    // const otherQueryParams = Object.keys(query).reduce((acc: any, cur: string) => {
                    //     if (cur !== 'redirect') {
                    //         acc[cur] = query[cur];
                    //     }
                    //     return acc;
                    // }, {});

                    let menuRoute = permissionStore.menuRoute;

                    // 如果跳转的路由不在权限路由中，跳转到第一个菜单路由
                    console.log(menuRoute);
                    nextTick(() => {
                        setTimeout(() => {
                            if (menuRoute.length > 0) {
                                // if (menuRoute.findIndex(route => route.path === redirect) === -1) {
                                return navigateTo(menuRoute[0].path);
                                // }
                            } else {
                                return navigateTo('/');
                            }
                        }, 200);
                    });

                    // navigateTo({ path: redirect, query: otherQueryParams });
                    // router.push({ path: redirect, query: otherQueryParams });
                })
                .finally(() => {
                    loading.value = false;
                });
        });
    };

    const emit = defineEmits(['linkTo']);
    // 跳转
    const linkTo = (path: TabType) => {
        emit('linkTo', path);
    };

    // 聚焦第一个输入框
    const focusRef = ref<InputInstance>();
    onMounted(() => {
        nextTick(() => {
            focusRef.value?.focus();
        });
    });
</script>

<style lang="scss" scoped>
    .form-bottom {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-family: var(--font-family);
        font-weight: 500;
        line-height: 22px;

        span {
            cursor: pointer;
        }
    }
</style>
