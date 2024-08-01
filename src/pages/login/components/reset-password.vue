<!-- 重置密码 -->
<template>
    <div>
        <el-dialog
            v-model="dialogVisible"
            title=""
            width="500"
        >
            <div class="title">
                {{ $t('login.resetPwd') }}
            </div>
            <el-form
                ref="formRef"
                :model="formData"
                :rules="formRules"
                class="login-form"
                label-width="80px"
                label-position="left"
            >
                <!-- Email -->
                <el-form-item
                    prop="account"
                    :label="$t('login.Email')"
                >
                    <div class="form-item">
                        <el-input
                            v-model.trim="formData.account"
                            class="form-input"
                            :placeholder="`${$t('login.Email')}`"
                            name="username"
                            type="text"
                        />
                    </div>
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button
                        type="primary"
                        @click="handleLogin"
                        class="m-r-[10px]"
                    >
                        {{ $t('form.Confirm') }}
                    </el-button>
                    <el-button @click="dialogVisible = false">{{ $t('form.Cancel') }}</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
    import type { FormInstance } from 'element-plus';
    import type { LocationQuery, LocationQueryValue } from 'vue-router';
    import { useUserStore } from '@/stores/modules/user';

    const dialogVisible = defineModel({ type: Boolean, default: true });

    const userStore = useUserStore();

    const loading = ref(false); // 按钮loading
    const formRef = ref<FormInstance>(); // 登录表单ref
    const { t } = useI18n(); // 国际化

    const formData = ref({
        account: '',
        password: '',
        verificationCode: '',
    });

    // 表单规则
    const formRules = computed(() => {
        return {};
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
                account: formData.value.account,
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
</script>

<style lang="scss" scoped>
    .el-form-item {
        margin-bottom: 12px !important;
    }

    :deep(.el-dialog) {
        margin-top: 15vh;

        .dialog-footer {
            display: flex;
            justify-content: center;
        }
    }
</style>
