<!-- 登录页面 -->
<template>
    <div class="login-container">
        <!-- 表单 -->
        <div class="login-card">
            <div class="tab-content">
                <div class="card-title">Enter a New Password</div>
                <el-form
                    ref="formRef"
                    :model="formData"
                    :rules="formRules"
                    class="login-form"
                    label-width="110px"
                    label-position="top"
                >
                    <el-form-item
                        label="New Password"
                        prop="password"
                        class="no-required"
                    >
                        <div class="form-item">
                            <el-input
                                v-model="formData.password"
                                type="password"
                                placeholder="Please enter a new password"
                                class="form-input"
                                show-password
                            />
                        </div>
                    </el-form-item>
                    <el-form-item
                        label="Confirm Password"
                        prop="confirmPassword"
                        class="no-required"
                    >
                        <div class="form-item">
                            <el-input
                                v-model="formData.confirmPassword"
                                type="password"
                                placeholder="Please enter a new password"
                                class="form-input"
                                show-password
                            />
                        </div>
                    </el-form-item>
                    <base-button
                        type="primary"
                        @click="updatePassword"
                        >Update Password</base-button
                    >
                </el-form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import type { FormInstance } from 'element-plus';
    import { resetPasswordByToken } from '~/api/admin';

    const formData = ref({
        password: '',
        confirmPassword: '',
    });

    const { confirmPassword, password } = useFormRules(formData);

    const formRules = computed(() => ({
        password,
        confirmPassword,
    }));

    const formRef = ref<FormInstance>();
    const updatePassword = () => {
        formRef.value?.validate(valid => {
            if (valid) {
                resetPasswordByToken({
                    newpassword: formData.value.password,
                    pwd_token: useRoute().query.token as string,
                }).then(res => {
                    if (res.code === 1) {
                        ElMessage.success('Password reset successfully');
                        setTimeout(() => {
                            navigateTo('/login');
                        }, 500);
                    }
                });
            }
        });
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

        .login-card {
            position: relative;
            width: 500px;
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
        }
    }

    .card-title {
        margin-bottom: 40px;
        font-size: $font-huge;
        font-weight: bold;
    }
</style>
