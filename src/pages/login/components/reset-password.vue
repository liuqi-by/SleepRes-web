<!-- 重置密码 -->
<template>
    <div>
        <el-dialog
            v-model="dialogVisible"
            title=""
            width="500"
            @close="close"
            class="form form-dialog"
        >
            <div class="form-title">
                {{ $t('login.resetPwd') }}
            </div>
            <el-form
                ref="formRef"
                :model="formData"
                :rules="formRules"
                class="login-form"
                label-width="80px"
                label-position="left"
                @submit.prevent
            >
                <!-- Email -->
                <el-form-item
                    prop="email"
                    :label="$t('login.Email')"
                    class="no-required"
                >
                    <div class="form-item">
                        <el-input
                            v-model.trim="formData.email"
                            class="form-input"
                            :placeholder="`${$t('login.Email')}`"
                            :readonly="isEdit"
                            :maxlength="inputLength.email"
                            ref="focusRef"
                            @keydown.enter="submit"
                            @input="filterChart('email')"
                        />
                    </div>
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <base-button
                        type="primary"
                        @click="submit"
                        class="m-r-[10px]"
                        :loading="loading"
                    >
                        {{ $t('form.Confirm') }}
                    </base-button>
                    <base-button @click="dialogVisible = false">{{ $t('form.Cancel') }}</base-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
    import type { FormInstance, InputInstance } from 'element-plus';
    import { resetPasswordByEmail } from '~/api/login';
    const dialogVisible = ref(false); // 弹窗显示

    const loading = ref(false); // 按钮loading
    const formRef = ref<FormInstance>(); // 登录表单ref
    // const { t } = useI18n(); // 国际化

    const formData = ref({
        email: '',
    });

    const { email } = useFormRules();
    const { filterChart } = useFilterInput(formData);
    // 表单规则
    const formRules = computed(() => {
        return {
            email,
        };
    });

    const { t } = useI18n();
    /**
     * 重置密码
     */
    const submit = () => {
        formRef.value?.validate((valid: boolean) => {
            if (!valid) {
                return;
            }
            let msg = t('login.ConfirmResetPassword');
            ElMessageBox.confirm(' ', msg, {
                confirmButtonText: t('form.Confirm'),
                cancelButtonText: t('form.Cancel'),
                type: 'warning',
                customStyle: { minHeight: 0, top: '-15vh' },
                dangerouslyUseHTMLString: true,
            })
                .then(() => {
                    loading.value = true;
                    resetPasswordByEmail(formData.value)
                        .then(res => {
                            if (res.code === 1) {
                                ElMessage.success(t('login.resetPwdSuccess'));
                                dialogVisible.value = false;
                                formData.value.email = '';
                            }
                        })
                        .finally(() => {
                            loading.value = false;
                        });
                })
                .catch();
        });
    };

    const isEdit = ref(false);
    /**
     * 打开弹窗
     */
    // 聚焦第一个输入框
    const focusRef = ref<InputInstance>();
    const showResetPassword = (item?: any) => {
        dialogVisible.value = true;

        if (item) {
            formData.value.email = item.email;
            isEdit.value = true;
        }

        setTimeout(() => {
            focusRef.value?.focus();
        }, 0);
    };

    const close = () => {
        isEdit.value = false;
        formRef.value?.resetFields();
    };

    defineExpose({
        showResetPassword,
    });
</script>

<style lang="scss" scoped>
    :deep(.el-dialog) {
        margin-top: 15vh !important;
    }
</style>
