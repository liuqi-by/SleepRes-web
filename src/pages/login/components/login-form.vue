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
                    class="link text-center m-t-[50px]"
                    @click="linkTo('resetPwd')"
                >
                    {{ $t('login.resetPwd') }}
                </p>
            </div>
        </el-form>
    </div>
</template>

<script setup lang="ts">
    import type { FormInstance } from 'element-plus';
    import type { LocationQuery, LocationQueryValue } from 'vue-router';
    import type { TabType } from '../index.vue';
    import { useUserStore } from '@/stores/modules/user';

    const userStore = useUserStore();

    const loading = ref(false); // 按钮loading
    const formRef = ref<FormInstance>(); // 登录表单ref
    const { t } = useI18n(); // 国际化

    const formData = ref({
        username: 'admin',
        password: '123456',
    });

    const { usernameRequired, passwordRequired } = useFormRules();

    // 表单规则
    const formRules = computed(() => {
        return {
            username: usernameRequired,
            password: passwordRequired,
        };
    });

    const route = useRoute();
    const router = useRouter();

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

                    const query: LocationQuery = route.query;

                    const redirect = (query.redirect as LocationQueryValue) ?? '/';

                    const otherQueryParams = Object.keys(query).reduce((acc: any, cur: string) => {
                        if (cur !== 'redirect') {
                            acc[cur] = query[cur];
                        }
                        return acc;
                    }, {});

                    router.push({ path: redirect, query: otherQueryParams });
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
