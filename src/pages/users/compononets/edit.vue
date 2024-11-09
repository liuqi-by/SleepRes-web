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
            <div class="form-title">
                {{ $t('users.EditUserInfo') }}
            </div>
            <el-form
                ref="formRef"
                :model="formData"
                :rules="formRules"
                class="form line-form"
                label-width="150px"
                label-position="left"
            >
                <!-- FirstName -->
                <el-form-item
                    prop="first_name"
                    :label="$t('login.FirstName')"
                >
                    <div class="form-item">
                        <el-input
                            v-model="formData.first_name"
                            class="form-input"
                            :placeholder="$t('login.FirstName')"
                            :maxlength="inputLength.first_name"
                            ref="focusRef"
                        />
                    </div>
                </el-form-item>
                <!-- LastName -->
                <el-form-item
                    prop="last_name"
                    :label="$t('login.LastName')"
                >
                    <div class="form-item">
                        <el-input
                            v-model="formData.last_name"
                            class="form-input"
                            :placeholder="$t('login.LastName')"
                            :maxlength="inputLength.last_name"
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

                <!-- NPI -->
                <el-form-item
                    prop="account_id"
                    :label="$t('users.NPI')"
                    v-if="userStore.userInfo?.group_id === 4"
                >
                    <div class="form-item">
                        <el-input
                            v-model="formData.account_id"
                            class="form-input"
                            :placeholder="$t('users.NPI')"
                            type="text"
                            :maxlength="inputLength.npi"
                            @input="filterNumberAndChart('account_id')"
                        />
                    </div>
                </el-form-item>

                <!-- Office location -->
                <el-form-item
                    prop="institution_id"
                    :label="$t('users.OfficeLocation')"
                >
                    <div class="form-item">
                        <select-office
                            :model-value="{
                                id: formData.institution_id,
                                name: formData.institution_name,
                            }"
                            ref="selectOfficeRef"
                            @change="handleChangeOffice"
                            :key="formData.institution_id"
                        />
                    </div>
                </el-form-item>
                <!-- PhoneNumber -->
                <el-form-item
                    prop="mobile"
                    :label="$t('login.PhoneNumber')"
                >
                    <div class="form-item">
                        <el-input
                            v-model="formData.mobile"
                            class="form-input"
                            :placeholder="$t('login.PhoneNumber')"
                            type="text"
                            :maxlength="inputLength.mobile"
                            @input="filterMobile('mobile')"
                        />
                    </div>
                </el-form-item>
                <!-- status -->
                <el-form-item
                    prop="frozen"
                    :label="$t('message.Status')"
                    v-if="formData.id"
                >
                    <div class="form-item">
                        <el-switch
                            v-model="formData.frozen"
                            :active-value="0"
                            :inactive-value="1"
                        />
                    </div>
                </el-form-item>

                <!-- Role -->
                <el-form-item
                    prop="group_id"
                    :label="$t('users.Role')"
                >
                    <div class="form-item">
                        <!-- <el-select
                            v-model="formData.group_id"
                            placeholder="Please select"
                            filterable
                            clearable
                        >
                            <el-option
                                v-for="item in rolesOption"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            />
                        </el-select> -->
                        <el-checkbox-group v-model="selectedRoles">
                            <el-checkbox
                                v-for="item in rolesOption"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                                :disabled="
                                    (item.value === 13 && selectedRoles.includes(14)) ||
                                    (item.value === 14 && selectedRoles.includes(13))
                                "
                            />
                        </el-checkbox-group>
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
                        {{ $t('form.Save') }}
                    </base-button>
                    <base-button @click="dialogVisible = false">{{ $t('form.Cancel') }}</base-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
    import type { FormInstance, InputInstance } from 'element-plus';
    import type { AddUserReq } from '~/api/users/types';
    import { addUser, updateUser } from '~/api/users';
    import { useUserStore } from '~/stores/modules/user';
    import type { UserInfo } from '~/api/login/types';
    import type { SelectOffice } from '#build/components';

    const userStore = useUserStore();
    const rolesOption = computed(() => {
        let arr =
            userStore.rolesOption.filter(item => {
                return haveRoles(item.roles, userStore.roles) && item.type !== 'group';
            }) || [];

        return arr;
    });

    const dialogVisible = ref(false);

    const formRef = ref<FormInstance>(); // 登录表单ref

    const formDataInit: AddUserReq = {
        email: '',
        mobile: '',
        first_name: '',
        last_name: '',
        // 账户类型:2=DME User,5=Physician User
        group_id: '',
        institution_id: '',
        institution_name: '',
        username: '',
        account_id: '',
    };

    const selectedRoles = ref<(string | number)[]>([]);

    watch(selectedRoles, val => {
        if (val.length > 1) {
            if (val.includes(3) && val.includes(7)) {
                formData.value.group_id = 8;
            } else if (val.includes(5) && val.includes(13)) {
                formData.value.group_id = 15;
            } else if (val.includes(5) && val.includes(14)) {
                formData.value.group_id = 16;
            }
        } else {
            formData.value.group_id = val[0];
        }
    });

    const formData = ref<any>({
        ...formDataInit,
    });
    const { filterMobile, filterNumberAndChart, filterChart } = useFilterInput(formData);
    const { firstName, lastName, email, role, office, npi } = useFormRules();
    // 表单规则
    const formRules = computed(() => {
        return {
            first_name: firstName,
            last_name: lastName,
            email,
            group_id: role,
            institution_id: office,
            account_id: npi,
        };
    });

    const { t } = useI18n();
    const emit = defineEmits(['refresh']);
    const loading = ref(false); // 按钮loading
    /**
     * submit
     */
    const submit = () => {
        formRef.value?.validate((valid: boolean) => {
            if (!valid) {
                return;
            }
            loading.value = true;
            if (formData.value.id) {
                // 编辑
                updateUser({
                    user_id: formData.value.id,
                    group_id: formData.value.group_id,
                    institution_id: formData.value.institution_id || '',
                    first_name: formData.value.first_name,
                    last_name: formData.value.last_name,
                    email: formData.value.email,
                    mobile: formData.value.mobile,
                    frozen: formData.value.frozen,
                    account_id: formData.value.account_id,
                })
                    .then(res => {
                        if (res.code === 1) {
                            ElMessage.success(t('form.saveSuccess'));
                            dialogVisible.value = false;
                            emit('refresh');
                            formData.value = {
                                ...formDataInit,
                            };
                        }
                    })
                    .finally(() => {
                        loading.value = false;
                    });
            } else {
                // 新增
                addUser({
                    ...formData.value,
                    username: formData.value.email,
                })
                    .then(res => {
                        if (res.code === 1) {
                            ElMessage.success(t('form.createSuccess'));
                            dialogVisible.value = false;
                            emit('refresh');
                            formRef.value?.resetFields();
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
        formRef.value?.resetFields();
        selectedRoles.value = [];
        formData.value = {
            ...formDataInit,
        };
    };

    const selectOfficeRef = ref<InstanceType<typeof SelectOffice>>();
    const focusRef = ref<InputInstance>();
    const showDialog = (item?: UserInfo) => {
        console.log(item);
        if (item) {
            formData.value = { ...item };
            switch (item.group_id) {
                case 8:
                    selectedRoles.value = [3, 7];
                    break;
                case 15:
                    selectedRoles.value = [5, 13];
                    break;
                case 16:
                    selectedRoles.value = [5, 14];
                    break;
                default:
                    selectedRoles.value = [item.group_id];
            }
        }
        // selectOfficeRef.value?.initOptions();

        dialogVisible.value = true;

        setTimeout(() => {
            focusRef.value?.focus();
        }, 0);
    };

    const handleChangeOffice = (val: { id: string; name: string }) => {
        formData.value.institution_id = val.id;
        formData.value.institution_name = val.name;
    };

    defineExpose({
        showDialog,
    });
</script>

<style lang="scss" scoped>
    .el-form-item {
        margin-bottom: 18px !important;
    }

    .el-checkbox {
        display: flex;
    }

    .el-checkbox__inner {
        border-radius: 50% !important; /* 内部容器也设置为圆形 */
    }
</style>
