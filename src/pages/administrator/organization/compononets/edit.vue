<!-- 新增/编辑 机构 -->
<template>
    <div>
        <base-dialog
            v-model="dialogVisible"
            title=""
            width="600"
            @close="close"
            class="form form-dialog"
        >
            <div class="form-title">{{ formData.id ? 'Edit Office Information' : $t('office.CreateOffice') }}</div>
            <el-form
                ref="formRef"
                :model="formData"
                :rules="formRules"
                class="form line-form"
                label-width="130"
                label-position="left"
            >
                <!-- OfficeName -->
                <el-form-item
                    prop="name"
                    :label="$t('office.OfficeName')"
                >
                    <div class="form-item">
                        <el-input
                            v-model="formData.name"
                            class="form-input"
                            :placeholder="$t('office.OfficeName')"
                            :maxlength="inputLength.office_name"
                            ref="focusRef"
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
                            v-model="formData.city"
                            class="form-input"
                            :placeholder="$t('office.City')"
                            :maxlength="inputLength.city"
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
                            :maxlength="inputLength.zipCode"
                            @input="filterNumberAndChart('zip_code')"
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
                            :maxlength="inputLength.address"
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
                            :maxlength="inputLength.mobile"
                            @input="filterMobile('mobile')"
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
                            :maxlength="inputLength.email"
                            @input="filterChart('email')"
                        />
                    </div>
                </el-form-item>

                <!-- status -->
                <el-form-item
                    prop="status"
                    :label="$t('message.Status')"
                    v-if="formData.id"
                >
                    <div class="form-item">
                        <el-switch
                            v-model="formData.status"
                            :active-value="0"
                            :inactive-value="1"
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
                    <base-button @click="close">{{ $t('form.Cancel') }}</base-button>
                </div>
            </template>
        </base-dialog>
    </div>
</template>

<script setup lang="ts">
    import type { FormInstance, InputInstance } from 'element-plus';
    import { addOrganization, editOrganization } from '~/api/organization';
    import type { EditOrganizationReq, Organization } from '~/api/organization/types';

    const dialogVisible = ref(false);

    const formRef = ref<FormInstance>(); // 登录表单ref
    // const { t } = useI18n(); // 国际化

    const formData = ref<EditOrganizationReq>({
        name: '',
        email: '',
        mobile: '',
        city: '',
        state: '',
        zip_code: '',
        address: '',
        id: '',
        status: '',
    });
    const { officeName, email } = useFormRules();
    const { filterMobile, filterNumberAndChart, filterChart } = useFilterInput(formData);
    // 表单规则
    const formRules = computed(() => {
        return {
            name: officeName,
            email,
        };
    });

    const loading = ref(false); // 按钮loading
    const emit = defineEmits(['refresh']);
    /**
     * 注册
     */
    const submit = () => {
        formRef.value?.validate((valid: boolean) => {
            if (!valid) {
                return;
            }
            loading.value = true;

            const submitSuccess = (msg: string) => {
                ElMessage.success(msg);
                dialogVisible.value = false;
                emit('refresh');
                formRef.value?.resetFields();
            };

            if (formData.value.id) {
                // 编辑
                console.log(formData.value);
                editOrganization({
                    ...formData.value,
                })
                    .then(res => {
                        if (res.code === 1) {
                            // ElMessage.success('Office saved successfully');
                            // dialogVisible.value = false;
                            // emit('refresh');
                            // formRef.value?.resetFields();
                            submitSuccess('Office saved successfully');
                        }
                    })
                    .finally(() => {
                        loading.value = false;
                    });
            } else {
                // 新增
                addOrganization({
                    ...formData.value,
                })
                    .then(res => {
                        if (res.code === 1) {
                            // ElMessage.success('Office created successfully');
                            // dialogVisible.value = false;
                            // emit('refresh');
                            // formRef.value?.resetFields();
                            submitSuccess('Office created successfully');
                        }
                    })
                    .finally(() => {
                        loading.value = false;
                    });
            }
        });
    };

    const close = () => {
        dialogVisible.value = false;
        formRef.value?.clearValidate();

        formRef.value?.resetFields();
        formData.value = {
            name: '',
            email: '',
            mobile: '',
            city: '',
            state: '',
            zip_code: '',
            address: '',
            id: '',
            status: '',
        };
    };

    const focusRef = ref<InputInstance>();
    const showDialog = (item?: Organization) => {
        if (item) {
            formData.value = { ...item };
        }

        dialogVisible.value = true;

        setTimeout(() => {
            focusRef.value?.focus();
        }, 0);
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
