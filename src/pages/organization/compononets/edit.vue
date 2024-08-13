<!-- 新增/编辑 用户 -->
<template>
    <div>
        <el-dialog
            v-model="dialogVisible"
            title=""
            width="600"
            @close="close"
            class="form form-dialog"
        >
            <div class="form-title">{{ $t('users.CreateUser') }}</div>
            <el-form
                ref="formRef"
                :model="formData"
                :rules="formRules"
                class="login-form"
                label-width="150px"
                label-position="left"
            >
                <!-- OfficeName -->
                <el-form-item
                    prop="first_name"
                    :label="$t('office.OfficeName')"
                >
                    <div class="form-item">
                        <el-input
                            v-model="formData.first_name"
                            class="form-input"
                            :placeholder="$t('office.OfficeName')"
                            :maxlength="inputLength.name"
                        />
                    </div>
                </el-form-item>
                <!-- City -->
                <el-form-item
                    prop="city"
                    :label="$t('office.City')"
                >
                    <div class="form-item">
                        <el-input
                            v-model="formData.last_name"
                            class="form-input"
                            :placeholder="$t('office.City')"
                            :maxlength="inputLength.name"
                        />
                    </div>
                </el-form-item>
                <!-- State -->
                <el-form-item
                    prop="state"
                    :label="$t('admin.State')"
                >
                    <div class="form-item">
                        <select-state
                            v-model="formData.state"
                            class="form-input"
                            :placeholder="$t('admin.State')"
                        />
                    </div>
                </el-form-item>
                <!-- ZipCode -->
                <el-form-item
                    prop="zip_code"
                    :label="$t('login.ZipCode')"
                >
                    <div class="form-item">
                        <el-input
                            v-model="formData.zip_code"
                            class="form-input"
                            :placeholder="`${$t('login.ZipCode')}`"
                            type="text"
                        />
                    </div>
                </el-form-item>
                <!-- Address -->
                <el-form-item
                    prop="address"
                    :label="$t('login.Address')"
                >
                    <div class="form-item">
                        <el-input
                            v-model="formData.address"
                            class="form-input"
                            :placeholder="`${$t('login.Address')}`"
                            type="text"
                        />
                    </div>
                </el-form-item>
                <!-- Telephone -->
                <el-form-item
                    prop="mobile"
                    :label="$t('office.Telephone')"
                >
                    <div class="form-item">
                        <el-input
                            v-model="formData.mobile"
                            class="form-input"
                            :placeholder="`${$t('office.Telephone')}`"
                            type="text"
                        />
                    </div>
                </el-form-item>

                <!-- Email -->
                <el-form-item
                    prop="email"
                    :label="$t('login.Email')"
                >
                    <div class="form-item">
                        <el-input
                            v-model="formData.email"
                            class="form-input"
                            :placeholder="$t('login.Email')"
                            type="text"
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
    import type { FormInstance } from 'element-plus';
    import { useUserStore } from '~/stores/modules/user';

    const userStore = useUserStore();
    const rolesOption = computed(() => {
        let arr =
            userStore.rolesOption.filter(item => {
                return haveRoles(item.roles, userStore.roles);
            }) || [];
        formData.value.type = arr[0]?.value as unknown as string;
        return arr;
    });

    const dialogVisible = ref(false);

    const formRef = ref<FormInstance>(); // 登录表单ref
    const { t } = useI18n(); // 国际化

    const formDataInit = {
        username: '',
        email: '',
        mobile: '',
        first_name: '',
        last_name: '',
        // 账户类型:2=DME,4=Physician
        type: '',
    };

    const formData = ref({
        ...formDataInit,
    });
    const { firstName, lastName, email, role, accountName } = useFormRules();
    // 表单规则
    const formRules = computed(() => {
        return {
            first_name: firstName,
            last_name: lastName,
            email,
            type: role,
            username: accountName,
        };
    });

    const loading = ref(false); // 按钮loading
    /**
     * 注册
     */
    const submit = () => {
        formRef.value?.validate((valid: boolean) => {
            if (!valid) {
                return;
            }
            loading.value = true;

            // 注册
            // registerAccount({
            //     ...formData.value,
            //     type: '2',
            // })
            //     .then(res => {
            //         if (res.code === 1) {
            //             ElMessage.success(t('login.RegisterSuccess'));
            //             // 重置
            //             formRef.value?.resetFields();
            //             dialogVisible.value = false;
            //         }
            //     })
            //     .finally(() => {
            //         loading.value = false;
            //     });
        });
    };

    const close = () => {
        dialogVisible.value = false;
        formRef.value?.clearValidate();
    };

    const showDialog = () => {
        dialogVisible.value = true;
    };

    defineExpose({
        showDialog,
    });
</script>

<style lang="scss" scoped>
    .el-form-item {
        margin-bottom: 18px !important;
    }
</style>
