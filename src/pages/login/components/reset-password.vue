<!-- 重置密码 -->
<template>
    <div>
        <el-dialog
            v-model="dialogVisible"
            title=""
            width="500"
            @close="close"
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
                    prop="email"
                    :label="$t('login.Email')"
                    class="no-required"
                >
                    <div class="form-item">
                        <el-input
                            v-model.trim="formData.email"
                            class="form-input"
                            :placeholder="`${$t('login.Email')}`"
                        />
                    </div>
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <base-button
                        type="primary"
                        @click="handleConfirm"
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
    import type { FormInstance } from 'element-plus';
    const dialogVisible = defineModel({ type: Boolean, default: true });

    const loading = ref(false); // 按钮loading
    const formRef = ref<FormInstance>(); // 登录表单ref
    // const { t } = useI18n(); // 国际化

    const formData = ref({
        email: '',
    });

    const { email } = useFormRules();
    // 表单规则
    const formRules = computed(() => {
        return {
            email,
        };
    });

    /**
     * 重置密码
     */
    const handleConfirm = () => {
        formRef.value?.validate((valid: boolean) => {
            if (!valid) {
                return;
            }

            loading.value = true;
        });
    };

    const close = () => {
        formRef.value?.clearValidate();
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
