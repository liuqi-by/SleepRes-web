<!-- 用户详情 -->
<template>
    <div class="patient-details">
        <edit-btn v-model="isEdit" />
        <el-form
            ref="formRef"
            :model="formData"
            :rules="formRules"
            class="form"
            inline
            label-width="140px"
            :disabled="!isEdit"
        >
            <!-- first_name -->
            <el-form-item
                prop="first_name"
                :label="$t('login.FirstName')"
            >
                <div class="form-item">
                    <el-input
                        v-model="formData.first_name"
                        class="form-input"
                        :maxlength="inputLength.first_name"
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
                        :maxlength="inputLength.last_name"
                    />
                </div>
            </el-form-item>
            <!-- birthdate -->
            <el-form-item
                prop="birthdate"
                :label="$t('patients.DateOfBirth')"
            >
                <div class="form-item">
                    <date-picker
                        v-model="formData.birthdate"
                        type="date"
                        :disabled-date="disabledDateFun"
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
                        :maxlength="inputLength.patientID"
                        @input="filterChart('patientid')"
                        @blur="checkId"
                    />
                </div>
            </el-form-item>
            <el-form-item
                prop="institution_id"
                :label="$t('patients.Office')"
            >
                <div class="min-w-[192px]">
                    <select-office
                        :model-value="
                            formData.institution_id
                                ? {
                                      id: formData.institution_id,
                                      name: formData.institution_name,
                                  }
                                : ''
                        "
                        @change="handleChangeSelect('institution', 'name', $event)"
                        ref="selectOfficeRef"
                        :key="formData.institution_id"
                    />
                </div>
            </el-form-item>
            <br /><br />
            <el-form-item
                prop="setup_date"
                :label="$t('patients.SetupDate')"
            >
                <div class="form-item">
                    <date-picker
                        v-model="formData.setup_date"
                        type="date"
                    />
                </div>
            </el-form-item>
            <el-form-item
                prop="therapist_id"
                :label="$t('patients.Therapist')"
            >
                <div class="min-w-[192px]">
                    <select-physician
                        :model-value="
                            formData.therapist_id
                                ? {
                                      id: Number(formData.therapist_id),
                                      nickname: formData.therapist_name,
                                  }
                                : ''
                        "
                        @change="handleChangeSelect('therapist', 'nickname', $event)"
                        :key="formData.therapist_id"
                        :type="1"
                    />
                </div>
            </el-form-item>
            <br />
            <el-form-item
                prop="physician_id"
                :label="$t('patients.Physician')"
            >
                <div class="min-w-[200px] form-item">
                    <!-- <select-physician
                        :model-value="
                            formData.physician_id
                                ? {
                                      id: Number(formData.physician_id),
                                      nickname: formData.physician_name,
                                  }
                                : ''
                        "
                        :disabled="!isEdit"
                        @change="handleChangeSelect('physician', 'nickname', $event)"
                        :key="formData.physician_id"
                        clearable
                    /> -->

                    <el-input
                        v-model="formData.physician_name"
                        readonly
                        class="form-input"
                        @click="showAddPhysician"
                        :key="formData.physician_name"
                        clearable
                    />
                </div>
                <span
                    class="link m-l-[10px]"
                    @click="showAddPhysician"
                    v-show="isEdit"
                    >Add Physician</span
                >
                <select-physician-dialog
                    v-model="showSelectPhysician"
                    @change="handleChangeSelect('physician', 'label', $event)"
                />
            </el-form-item>
            <!-- <br /><br />
            <el-form-item
                prop="sn"
                :label="$t('patients.DeviceSerialNumber')"
            >
                <div class="form-item w-[300px]!">
                    <el-input
                        v-model="formData.sn"
                        class="form-input"
                        :maxlength="inputLength.sn"
                        :readonly="!isEdit"
                    />
                </div>
            </el-form-item> -->
            <br /><br />
            <el-form-item
                prop="city"
                :label="$t('office.City')"
            >
                <div class="form-item">
                    <el-input
                        v-model="formData.city"
                        class="form-input"
                        :maxlength="inputLength.city"
                    />
                </div>
            </el-form-item>
            <el-form-item
                prop="state"
                :label="$t('login.State')"
            >
                <div class="min-w-[192px]">
                    <select-state v-model="formData.state" />
                </div>
            </el-form-item>
            <el-form-item
                prop="address"
                :label="$t('login.Address')"
            >
                <div class="form-item">
                    <el-input
                        v-model="formData.address"
                        class="form-input"
                        :maxlength="inputLength.address"
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
                        :maxlength="inputLength.email"
                        @input="filterChart('email')"
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
                        :maxlength="inputLength.mobile"
                        @input="filterMobile('mobile')"
                    />
                </div>
            </el-form-item>
        </el-form>
        <div class="footer-btn">
            <base-button
                type="primary"
                @click="save"
                :loading="loading"
                :disabled="!isEdit"
            >
                {{ $t('form.Save') }}
            </base-button>
            <base-button
                @click="cancel"
                :disabled="!isEdit"
            >
                {{ $t('form.Cancel') }}
            </base-button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import type { FormInstance } from 'element-plus';
    import editBtn from './components/edit-btn.vue';
    import { editPatient } from '~/api/patient';
    import type { UserInfo } from '~/api/login/types';

    const isEdit = ref(false);

    const formData = ref({
        first_name: '',
        last_name: '',
        birthdate: '',
        patientid: '',
        institution_id: '',
        institution_name: '',
        setup_date: '',
        therapist_id: '',
        therapist_name: '',
        physician_id: '',
        physician_name: '',
        sn: '',
        city: '',
        state: '',
        address: '',
        email: '',
        mobile: '',
        user_id: '',
    });

    const saveDate = ref({
        ...formData.value,
    });
    const { filterMobile, filterChart } = useFilterInput(formData);
    const patient = inject<Ref<UserInfo>>('patient');

    watch(
        () => patient?.value,
        val => {
            if (val) {
                formData.value = {
                    first_name: val.first_name || '',
                    last_name: val.last_name || '',
                    birthdate: val.patient.birthdate || '',
                    patientid: val.patient.patientid || '',
                    institution_id: val.institution_id || '',
                    institution_name: val.institution_name || '',
                    setup_date: val.patient.setup_date || '',
                    therapist_id: val.patient.therapist_id || '',
                    therapist_name:
                        nameFormat({
                            first_name: val.patient.therapist_first_name,
                            last_name: val.patient.therapist_last_name,
                        }) || '',
                    physician_id: val.patient.physician_id || '',
                    physician_name:
                        nameFormat({
                            first_name: val.patient.physician_first_name,
                            last_name: val.patient.physician_last_name,
                        }) || '',
                    sn: val.sn || '',
                    city: val.patient.city || '',
                    state: val.state || '',
                    address: val.address || '',
                    email: val.email || '',
                    mobile: val.mobile || '',
                    user_id: val.id || '',
                };

                saveDate.value = {
                    ...formData.value,
                };
            }
        },
        {
            immediate: true,
            deep: true,
        },
    );

    const { firstName, lastName, emailNoRequired } = useFormRules();
    const formRules = computed(() => {
        return {
            first_name: firstName,
            last_name: lastName,
            email: emailNoRequired,
            // sn,
        };
    });

    // const emit = defineEmits(['update']);
    const update = inject<Function>('update');
    const updatePatient = inject<Function>('updatePatient');
    const formRef = ref<FormInstance>();
    const loading = ref(false);
    const save = () => {
        formRef.value?.validate(valid => {
            if (valid) {
                // 如果没有选择医生
                // if (!formData.value.physician_id) {
                //     ElMessageBox.alert(
                //         `<p class="msg">By not adding a physician to the patient record the phsycian will not be able to access the patients account in the SleepRes cloud platform.</p>
                // <p class="msg">Would you like to add a physician?</p>`,
                //         'Warning: A physician has not been added to the patient record',
                //         {
                //             // if you want to disable its autofocus
                //             // autofocus: false,
                //             showConfirmButton: true,
                //             showCancelButton: true,
                //             confirmButtonText: 'Yes',
                //             cancelButtonText: 'No',
                //             center: true,
                //             dangerouslyUseHTMLString: true,
                //             customClass: 'message-dialog',
                //             closeOnClickModal: true,
                //             closeOnPressEscape: true,
                //         },
                //     )
                //         .then(() => {
                //             return showAddPhysician();
                //         })
                //         .catch(() => {
                //             loading.value = true;
                //             editPatient({ ...formData.value })
                //                 .then(res => {
                //                     loading.value = false;
                //                     if (res.code === 1) {
                //                         ElMessage.success('Update success');
                //                         isEdit.value = false;
                //                         emit('update', { ...res.data, patient: JSON.parse(res.data.patient) });
                //                         update && update();
                //                     }
                //                 })
                //                 .finally(() => {
                //                     loading.value = false;
                //                 });
                //         });
                // } else {
                loading.value = true;
                editPatient({ ...formData.value })
                    .then(res => {
                        loading.value = false;
                        if (res.code === 1) {
                            ElMessage.success('Update successful');
                            isEdit.value = false;
                            // emit('update', { ...res.data, patient: JSON.parse(res.data.patient) });
                            update && update();
                            updatePatient && updatePatient({ ...res.data, patient: JSON.parse(res.data.patient) });
                        }
                    })
                    .finally(() => {
                        loading.value = false;
                    });
                // }
            }
        });
    };

    watch(isEdit, () => {
        if (!isEdit.value) {
            let val = patient!.value;

            formData.value = {
                first_name: val.first_name || '',
                last_name: val.last_name || '',
                birthdate: val.patient.birthdate || '',
                patientid: val.patient.patientid || '',
                institution_id: val.institution_id || '',
                institution_name: val.institution_name || '',
                setup_date: val.patient.setup_date || '',
                therapist_id: val.patient.therapist_id || '',
                therapist_name:
                    nameFormat({
                        first_name: val.patient.therapist_first_name,
                        last_name: val.patient.therapist_last_name,
                    }) || '',
                physician_id: val.patient.physician_id || '',
                physician_name:
                    nameFormat({
                        first_name: val.patient.physician_first_name,
                        last_name: val.patient.physician_last_name,
                    }) || '',
                sn: val.sn || '',
                city: val.patient.city || '',
                state: val.state || '',
                address: val.address || '',
                email: val.email || '',
                mobile: val.mobile || '',
                user_id: val.id || '',
            };
        }
    });

    const cancel = () => {
        isEdit.value = false;
    };

    const handleChangeSelect = (key: string, label: string, val: any) => {
        if (val) {
            formData.value[(key + '_id') as keyof typeof formData.value] = val.id;
            formData.value[(key + '_name') as keyof typeof formData.value] = val[label];
        } else {
            formData.value[(key + '_id') as keyof typeof formData.value] = '';
            formData.value[(key + '_name') as keyof typeof formData.value] = '';
        }
    };

    // 选择医生
    const showSelectPhysician = ref(false);
    const showAddPhysician = () => {
        if (isEdit.value) {
            showSelectPhysician.value = true;
        }
    };

    // 校验ID
    const checkId = () => {
        if (formData.value.patientid) {
            if (formData.value.patientid === patient!.value.patient.patientid) {
                return;
            }
            checkPatientIdFn(formData.value.patientid, showDetail);
        }
    };

    const emit = defineEmits(['showDialog']);
    const showDetail = (userInfo: any) => {
        emit('showDialog', userInfo);
    };
</script>

<style lang="scss" scoped>
    .patient-details {
        padding: 20px;

        .form-item {
            max-width: 200px;
        }

        .el-form-item {
            margin-bottom: 15px;
        }

        :deep(.el-form-item__label) {
            justify-content: flex-end;
            min-width: 101px;
        }
    }
</style>
