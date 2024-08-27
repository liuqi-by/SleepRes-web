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
                {{ $t('patients.AddPatient') }}
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
                        <!-- first_name -->
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
                        <!-- last_name -->
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
                        <!-- birthdate -->
                        <el-form-item
                            prop="birthdate"
                            :label="$t('patients.DateOfBirth')"
                        >
                            <div class="form-item">
                                <el-date-picker
                                    v-model="formData.birthdate"
                                    type="date"
                                    :placeholder="$t('patients.DateOfBirth')"
                                    :disabled-date="disabledDateFun"
                                    value-format="YYYY-MM-DD"
                                />
                            </div>
                        </el-form-item>
                        <!-- patientid -->
                        <el-form-item
                            prop="patientid"
                            :label="$t('patients.PatientID')"
                        >
                            <div class="form-item">
                                <el-input
                                    v-model="formData.patientid"
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
                            <div class="min-w-[150px]">
                                <select-office
                                    :model-value="{
                                        id: formData.institution_id,
                                        name: formData.institution_name,
                                    }"
                                    @change="handleChangeOffice"
                                    ref="selectOfficeRef"
                                    :key="formData.institution_id"
                                />
                            </div>
                        </el-form-item>
                        <el-form-item
                            prop="gender"
                            :label="$t('patients.Gender')"
                        >
                            <div class="form-item">
                                <select-gender v-model="formData.gender" />
                            </div>
                        </el-form-item>
                    </div>
                </div>
                <!-- Setup Details -->
                <div class="form-module">
                    <div class="module-title">{{ $t('patients.SetupDetails') }}</div>
                    <div class="module-content">
                        <el-form-item
                            prop="setup_date"
                            :label="$t('patients.SetupDate')"
                        >
                            <div class="form-item">
                                <el-date-picker
                                    v-model="formData.setup_date"
                                    type="date"
                                    :placeholder="$t('patients.SetupDate')"
                                    value-format="YYYY-MM-DD"
                                />
                            </div>
                        </el-form-item>
                        <el-form-item
                            prop="therapist_id"
                            :label="$t('patients.Therapist')"
                        >
                            <div class="form-item">
                                <el-select
                                    v-model="formData.therapist_id"
                                    placeholder="Please select"
                                >
                                    <el-option
                                        v-if="userStore.userInfo"
                                        :label="userStore.userInfo?.nickname"
                                        :value="userStore.userInfo.id"
                                    />
                                </el-select>
                            </div>
                        </el-form-item>
                        <el-form-item
                            prop="physician_id"
                            :label="$t('patients.Physician')"
                        >
                            <div class="min-w-[150px]">
                                <select-physician v-model="formData.physician_id" />
                            </div>
                        </el-form-item>
                    </div>
                </div>
                <!-- Equipment -->
                <div class="form-module m-t-20px">
                    <div class="module-title">{{ $t('patients.Equipment') }}</div>
                    <div class="module-content">
                        <el-form-item
                            prop="sn"
                            :label="$t('patients.DeviceSerialNumber')"
                        >
                            <div class="form-item w-[300px]!">
                                <el-input
                                    v-model="formData.sn"
                                    class="form-input"
                                    :placeholder="$t('patients.DeviceSerialNumber')"
                                    :maxlength="inputLength.sn"
                                />
                            </div>
                        </el-form-item>
                        <br />
                        <el-form-item
                            prop="mode_name"
                            :label="$t('patients.Mode')"
                        >
                            <div class="form-item">
                                <el-input
                                    v-model="formData.mode_name"
                                    class="form-input"
                                    :placeholder="$t('patients.Mode')"
                                />
                            </div>
                        </el-form-item>
                        <el-form-item
                            prop="pressure"
                            :label="$t('patients.Pressure')"
                        >
                            <div class="form-item">
                                <el-input
                                    v-model="formData.pressure"
                                    class="form-input"
                                    :placeholder="$t('patients.Pressure')"
                                />
                            </div>
                        </el-form-item>
                        <el-form-item
                            prop="ramp"
                            :label="$t('patients.Ramp')"
                        >
                            <div class="form-item">
                                <el-input
                                    v-model="formData.ramp"
                                    class="form-input"
                                    :placeholder="$t('patients.Ramp')"
                                />
                            </div>
                        </el-form-item>
                        <br />
                        <el-form-item
                            prop="mask"
                            :label="$t('patients.Mask')"
                        >
                            <div class="form-item">
                                <el-input
                                    v-model="formData.mask"
                                    class="form-input"
                                    :placeholder="$t('patients.Mask')"
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
                            prop="address"
                            :label="$t('login.Address')"
                        >
                            <div class="form-item">
                                <el-input
                                    v-model="formData.address"
                                    class="form-input"
                                    :placeholder="$t('login.Address')"
                                    :maxlength="inputLength.address"
                                />
                            </div>
                        </el-form-item>
                        <el-form-item
                            prop="city"
                            :label="$t('office.City')"
                        >
                            <div class="form-item">
                                <el-input
                                    v-model="formData.city"
                                    class="form-input"
                                    :placeholder="$t('office.City')"
                                />
                            </div>
                        </el-form-item>
                        <el-form-item
                            prop="state"
                            :label="$t('login.State')"
                        >
                            <div class="form-item">
                                <select-state v-model="formData.state" />
                            </div>
                        </el-form-item>
                        <el-form-item
                            prop="zip_code"
                            :label="$t('login.ZipCode')"
                        >
                            <div class="form-item">
                                <el-input
                                    v-model="formData.zip_code"
                                    class="form-input"
                                    :placeholder="$t('login.ZipCode')"
                                    :maxlength="inputLength.zipCode"
                                />
                            </div>
                        </el-form-item>
                        <el-form-item
                            prop="email"
                            :label="$t('login.Email')"
                        >
                            <div class="form-item">
                                <el-input
                                    v-model="formData.email"
                                    class="form-input"
                                    :placeholder="$t('login.Email')"
                                    :maxlength="inputLength.email"
                                />
                            </div>
                        </el-form-item>
                        <el-form-item
                            prop="mobile"
                            :label="$t('login.PhoneNumber')"
                        >
                            <div class="form-item">
                                <el-input
                                    v-model="formData.mobile"
                                    class="form-input"
                                    :placeholder="$t('login.PhoneNumber')"
                                    :maxlength="inputLength.mobile"
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
    import { useUserStore } from '~/stores/modules/user';
    import type { AddPatientReq } from '~/api/patient/types';
    import { addPatient } from '~/api/patient';
    import type { SelectOffice } from '#build/components';

    const userStore = useUserStore();

    const dialogVisible = ref(false);

    const formRef = ref<FormInstance>(); // 表单ref

    const formData = ref<Partial<AddPatientReq>>({
        gender: 0,
        institution_id: userStore.userInfo?.institution_id || '',
        institution_name: userStore.userInfo?.institution_name || '',
        therapist_id: userStore.userInfo?.id || '',
    });

    const { firstName, lastName, email, role, office, setupDate, birthdate, sn } = useFormRules();
    // 表单规则
    const formRules = computed(() => {
        return {
            first_name: firstName,
            last_name: lastName,
            email,
            group_id: role,
            institution_id: office,
            setup_date: setupDate,
            birthdate,
            sn,
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

            // 新增
            addPatient({
                ...formData.value,
                physician_id: formData.value?.physician_id ? (formData.value?.physician_id as any).value : '',
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
        });
    };

    const close = () => {
        dialogVisible.value = false;
        formRef.value?.clearValidate();
    };

    const selectOfficeRef = ref<InstanceType<typeof SelectOffice>>();
    const showDialog = () => {
        // 初始化机构选择框默认值

        // selectOfficeRef.value?.initOptions();

        dialogVisible.value = true;
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
        margin-bottom: 15px !important;
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
    }
</style>
