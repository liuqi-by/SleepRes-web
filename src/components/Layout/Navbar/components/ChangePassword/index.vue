<!-- 修改密码 -->
<template>
    <div>
        <el-dialog
            v-model="editVisible"
            width="520"
            :title="$t('layout.ChangePassword')"
            @close="closeEdit"
            destroy-on-close
            :close-on-click-modal="false"
            modal-class="edit-password-dialog"
        >
            <el-form
                ref="editForm"
                :model="editFormData"
                :rules="editFormRules"
                class="edit-form form line-form m-t-[20px]"
            >
                <!-- 旧密码 -->
                <el-form-item prop="oldPassword">
                    <div class="form-item">
                        <el-input
                            v-model.trim="editFormData.oldPassword"
                            :placeholder="$t('layout.oldPasswordPlaceHolder')"
                            type="password"
                            class="form-input"
                            show-password
                        />
                    </div>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item prop="password">
                    <div class="form-item">
                        <el-input
                            v-model.trim="editFormData.password"
                            :placeholder="$t('layout.newPasswordPlaceHolder')"
                            type="password"
                            name="password"
                            class="form-input"
                            show-password
                        />
                    </div>
                </el-form-item>
                <!-- 确认密码 -->
                <el-form-item prop="confirmPassword">
                    <div class="form-item">
                        <el-input
                            v-model.trim="editFormData.confirmPassword"
                            :placeholder="$t('layout.confirmPassword')"
                            type="password"
                            name="confirmPassword"
                            class="form-input"
                            show-password
                        />
                    </div>
                </el-form-item>

                <div class="bottom-btn">
                    <base-button @click="closeEdit">
                        {{ $t('form.Cancel') }}
                    </base-button>
                    <base-button
                        class="active-btn"
                        type="primary"
                        @click="submit"
                    >
                        {{ $t('form.Save') }}
                    </base-button>
                </div>
            </el-form>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
    import type { FormInstance } from 'element-plus';
    import { changePassword } from '~/api/login';
    import { useUserStore } from '~/stores/modules/user';

    const { t } = useI18n();
    const userStore = useUserStore();

    const editVisible = defineModel<boolean>();

    const initEditFormData = {
        oldPassword: '',
        password: '',
        confirmPassword: '',
    };
    const editFormData = ref({ ...initEditFormData });

    const { password, confirmPassword, oldPassword } = useFormRules(editFormData);
    const editFormRules = computed(() => {
        return {
            password,
            confirmPassword,
            oldPassword,
        };
    });

    const editForm = ref<FormInstance>();

    const submit = () => {
        editForm.value?.validate(valid => {
            if (valid) {
                if (editFormData.value.password === editFormData.value.oldPassword) {
                    ElMessage.warning(t('layout.NewPasswordCannotBeSameAsOldPassword'));
                    return;
                }
                let msg = t('layout.ConfirmChangePassword');
                ElMessageBox.confirm(' ', msg, {
                    confirmButtonText: t('form.Confirm'),
                    cancelButtonText: t('form.Cancel'),
                    type: 'warning',
                    customStyle: { minHeight: 0 },
                    dangerouslyUseHTMLString: true,
                })
                    .then(() => {
                        changePassword({
                            password: editFormData.value.oldPassword,
                            newpassword: editFormData.value.password,
                        })
                            .then(res => {
                                if (res.code === 1) {
                                    ElMessage.success(t('layout.PasswordChangedSuccessfully'));
                                    setTimeout(() => {
                                        closeEdit();
                                        userStore.logout();
                                    }, 600);
                                }
                            })
                            .catch();
                    })
                    .catch();
            }
        });
    };

    const closeEdit = () => {
        editVisible.value = false;
        editForm.value?.clearValidate();
        editFormData.value = {
            ...initEditFormData,
        };
    };
</script>

<style lang="scss" scoped>
    :deep(.el-dialog) {
        padding: 24px;
    }

    :deep(.edit-form) {
        .form-item {
            width: 100%;

            .el-input__wrapper {
                height: 34px;
                padding: 0;
                border-bottom: 1px solid #f0f0f0;
                box-shadow: none;

                &.is-focus {
                    border-bottom: 1px solid #f0f0f0;
                }
            }

            .el-input__inner {
                line-height: 22px;
            }
        }
    }

    :deep(.edit-password-dialog) {
        z-index: 999 !important;
    }

    .bottom-btn {
        margin-top: 40px;
        text-align: right;

        .button {
            height: 32px;
            font-weight: 350;
            line-height: 22px;
            border-radius: 2px;
        }
    }
</style>
