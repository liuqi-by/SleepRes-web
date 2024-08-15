<!-- 新增患者 -->
<template>
    <div>
        <el-dialog
            v-model="dialogVisible"
            title=""
            width="1250"
            @close="close"
            class="form form-dialog"
        >
            <div class="form-title">
                {{ formData.id ? $t('users.EditUserInfo') : $t('patients.AddPatient') }}
            </div>
            <el-form
                ref="formRef"
                :model="formData"
                :rules="formRules"
                class="form"
                label-position="left"
                inline
            >
                <div class="form-module">
                    <div class="module-title">{{ $t('patients.PatientDetails') }}</div>
                    <div class="module-content">
                        <el-form-item
                            prop="first_name"
                            :label="$t('login.FirstName')"
                        >
                            <div class="form-item">
                                <el-input
                                    v-model="formData.first_name"
                                    class="form-input"
                                    :placeholder="$t('login.FirstName')"
                                    :maxlength="inputLength.name"
                                />
                            </div>
                        </el-form-item>
                        <el-form-item
                            prop="last_name"
                            :label="$t('login.LastName')"
                        >
                            <div class="form-item">
                                <el-input
                                    v-model="formData.last_name"
                                    class="form-input"
                                    :placeholder="$t('login.LastName')"
                                    :maxlength="inputLength.name"
                                />
                            </div>
                        </el-form-item>
                        <el-form-item
                            prop="BirthDate"
                            :label="$t('patients.DateOfBirth')"
                        >
                            <div class="form-item">
                                <el-date-picker
                                    v-model="formData.last_name"
                                    type="date"
                                    :placeholder="$t('patients.DateOfBirth')"
                                    :disabled-date="disabledDateFun"
                                />
                            </div>
                        </el-form-item>
                        <el-form-item
                            prop="PatientID"
                            :label="$t('patients.PatientID')"
                        >
                            <div class="form-item">
                                <el-input
                                    v-model="formData.last_name"
                                    class="form-input"
                                    :placeholder="$t('patients.PatientID')"
                                    :maxlength="inputLength.name"
                                />
                            </div>
                        </el-form-item>
                        <el-form-item
                            prop="institution_id"
                            :label="$t('patients.Office')"
                        >
                            <div class="form-item">
                                <select-office
                                    v-model="formData.institution_id"
                                    placeholder="Please select"
                                    filterable
                                />
                            </div>
                        </el-form-item>
                        <el-form-item
                            prop="Gender"
                            :label="$t('patients.Gender')"
                        >
                            <div class="form-item">
                                <el-input
                                    v-model="formData.last_name"
                                    class="form-input"
                                    :placeholder="$t('patients.Gender')"
                                    :maxlength="inputLength.name"
                                />
                            </div>
                        </el-form-item>
                    </div>
                </div>
                <!-- Setup Details -->
                <div class="form-module">
                    <div class="module-title">{{ $t('patients.SetupDetails') }}</div>
                    <div class="module-content">
                        <el-form-item
                            prop="setupDate"
                            :label="$t('patients.SetupDate')"
                        >
                            <div class="form-item">
                                <el-date-picker
                                    v-model="formData.last_name"
                                    type="date"
                                    :placeholder="$t('patients.SetupDate')"
                                />
                            </div>
                        </el-form-item>
                        <el-form-item
                            prop="Therapist"
                            :label="$t('patients.Therapist')"
                        >
                            <div class="form-item">
                                <el-input
                                    v-model="formData.last_name"
                                    class="form-input"
                                    :placeholder="$t('patients.Therapist')"
                                    :maxlength="inputLength.name"
                                />
                            </div>
                        </el-form-item>
                        <el-form-item
                            prop="Physician"
                            :label="$t('patients.Physician')"
                        >
                            <div class="form-item">
                                <el-input
                                    v-model="formData.last_name"
                                    class="form-input"
                                    :placeholder="$t('patients.Physician')"
                                    :maxlength="inputLength.name"
                                />
                            </div>
                        </el-form-item>
                    </div>
                </div>
                <!-- Equipment -->
                <div class="form-module m-t-20px">
                    <div class="module-title">{{ $t('patients.Equipment') }}</div>
                    <div class="module-content">
                        <el-form-item
                            prop="DeviceSerialNumber"
                            :label="$t('patients.DeviceSerialNumber')"
                        >
                            <div class="form-item">
                                <el-input
                                    v-model="formData.first_name"
                                    class="form-input"
                                    :placeholder="$t('patients.DeviceSerialNumber')"
                                    :maxlength="inputLength.name"
                                />
                            </div>
                        </el-form-item>
                        <br />
                        <el-form-item
                            prop="Mode"
                            :label="$t('patients.Mode')"
                        >
                            <div class="form-item">
                                <el-input
                                    v-model="formData.last_name"
                                    class="form-input"
                                    :placeholder="$t('patients.Mode')"
                                    :maxlength="inputLength.name"
                                />
                            </div>
                        </el-form-item>
                        <el-form-item
                            prop="Pressure"
                            :label="$t('patients.Pressure')"
                        >
                            <div class="form-item">
                                <el-input
                                    v-model="formData.last_name"
                                    class="form-input"
                                    :placeholder="$t('patients.Pressure')"
                                    :maxlength="inputLength.name"
                                />
                            </div>
                        </el-form-item>
                        <el-form-item
                            prop="Ramp"
                            :label="$t('patients.Ramp')"
                        >
                            <div class="form-item">
                                <el-input
                                    v-model="formData.last_name"
                                    class="form-input"
                                    :placeholder="$t('patients.Ramp')"
                                    :maxlength="inputLength.name"
                                />
                            </div>
                        </el-form-item>
                        <br />
                        <el-form-item
                            prop="Mask"
                            :label="$t('patients.Mask')"
                        >
                            <div class="form-item">
                                <el-input
                                    v-model="formData.last_name"
                                    class="form-input"
                                    :placeholder="$t('patients.Mask')"
                                    :maxlength="inputLength.name"
                                />
                            </div>
                        </el-form-item>
                    </div>
                </div>
                <!-- Demographics & Contact details -->
                <div class="form-module m-t-20px">
                    <div class="module-title">
                        {{ `${$t('patients.Demographics')} & ${$t('patients.ContactDetails')}` }}
                    </div>
                    <div class="module-content">
                        <el-form-item
                            prop="Address"
                            :label="$t('login.Address')"
                        >
                            <div class="form-item">
                                <el-input
                                    v-model="formData.first_name"
                                    class="form-input"
                                    :placeholder="$t('login.Address')"
                                    :maxlength="inputLength.name"
                                />
                            </div>
                        </el-form-item>
                        <el-form-item
                            prop="City"
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
                        <el-form-item
                            prop="State"
                            :label="$t('login.State')"
                        >
                            <div class="form-item">
                                <el-input
                                    v-model="formData.last_name"
                                    class="form-input"
                                    :placeholder="$t('login.State')"
                                    :maxlength="inputLength.name"
                                />
                            </div>
                        </el-form-item>
                        <el-form-item
                            prop="ZipCode"
                            :label="$t('login.ZipCode')"
                        >
                            <div class="form-item">
                                <el-input
                                    v-model="formData.last_name"
                                    class="form-input"
                                    :placeholder="$t('login.ZipCode')"
                                    :maxlength="inputLength.name"
                                />
                            </div>
                        </el-form-item>
                        <el-form-item
                            prop="Email"
                            :label="$t('login.Email')"
                        >
                            <div class="form-item">
                                <el-input
                                    v-model="formData.last_name"
                                    class="form-input"
                                    :placeholder="$t('login.Email')"
                                    :maxlength="inputLength.name"
                                />
                            </div>
                        </el-form-item>
                        <el-form-item
                            prop="mobile"
                            :label="$t('login.PhoneNumber')"
                        >
                            <div class="form-item">
                                <el-input
                                    v-model="formData.last_name"
                                    class="form-input"
                                    :placeholder="$t('login.PhoneNumber')"
                                    :maxlength="inputLength.name"
                                />
                            </div>
                        </el-form-item>
                    </div>
                </div>
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
    import type { FormInstance } from 'element-plus';
    import type { AddUserReq } from '~/api/users/types';
    import { addUser, updateUser } from '~/api/users';
    import { useUserStore } from '~/stores/modules/user';
    import type { UserInfo } from '~/api/login/types';

    const userStore = useUserStore();

    const dialogVisible = ref(false);

    const formRef = ref<FormInstance>(); // 登录表单ref

    const formDataInit: AddUserReq = {
        email: '',
        mobile: '',
        first_name: '',
        last_name: '',
        // 账户类型:2=DME User,4=Physician User
        group_id: '',
        institution_id: userStore.userInfo?.institution_id || '',

        username: '',
        account_id: '',
        zip_code: '',
        state: '',
    };

    const formData = ref<any>({
        ...formDataInit,
    });
    const { firstName, lastName, email, role, office, setupDate } = useFormRules();
    // 表单规则
    const formRules = computed(() => {
        return {
            first_name: firstName,
            last_name: lastName,
            email,
            group_id: role,
            institution_id: office,
            setupDate,
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
        formRef.value?.clearValidate();

        formData.value = {
            ...formDataInit,
        };
    };

    const showDialog = (item?: UserInfo) => {
        if (item) {
            formData.value = { ...item };
        }

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

    :deep(.el-dialog) {
        margin-top: 2vh !important;
        margin-bottom: 20px;
    }

    .form-module {
        margin-bottom: 10px;

        .form-item {
            flex: 1;
            width: 150px;
        }

        .module-title {
            padding-bottom: 15px;
            margin-bottom: 10px;
            font-size: $font-middle;
            font-weight: bold;
            color: #333;
            border-bottom: 1px solid #eee;
        }

        :deep(.el-form-item__label) {
            justify-content: flex-end;
            min-width: 101px;
            font-size: $font-standard;
        }

        :deep(.el-form-item__content) {
            max-width: 150px;
        }
    }
</style>
