<!-- 新增患者 -->
<template>
    <div>
        <base-dialog
            v-model="dialogVisible"
            title=""
            width="1250"
            @close="close"
            class="form form-dialog add-patient-dialog"
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
                                    :maxlength="inputLength.first_name"
                                    ref="focusRef"
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
                                    :placeholder="$t('patients.DateOfBirth')"
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
                                    :placeholder="$t('patients.PatientID')"
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
                            <div class="min-w-[150px]">
                                <select-office
                                    :model-value="
                                        formData.institution_id
                                            ? {
                                                  id: formData.institution_id,
                                                  name: formData.institution_name,
                                              }
                                            : ''
                                    "
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
                                <date-picker
                                    v-model="formData.setup_date"
                                    type="date"
                                    :placeholder="$t('patients.SetupDate')"
                                />
                            </div>
                        </el-form-item>
                        <el-form-item
                            prop="therapist_id"
                            :label="$t('patients.Therapist')"
                        >
                            <div class="form-item">
                                <!-- <el-select
                                    v-model="formData.therapist_id"
                                    placeholder="Please select"
                                >
                                    <el-option
                                        v-if="userStore.userInfo"
                                        :label="userStore.userInfo?.nickname"
                                        :value="userStore.userInfo.id"
                                    />
                                </el-select> -->
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
                        <el-form-item
                            prop="physician_id"
                            :label="$t('patients.Physician')"
                        >
                            <div class="w-[150px]">
                                <!-- <select-physician
                                    v-model="formData.physician_id"
                                    clearable
                                /> -->
                                <el-input
                                    v-model="formData.physician_name"
                                    readonly
                                    class="form-input"
                                    @click="showAddPhysician"
                                    :key="formData.physician_name"
                                />
                            </div>
                            <span
                                class="link m-l-[10px]"
                                @click="showAddPhysician"
                                >Add Physician</span
                            >
                            <select-physician-dialog
                                v-model="showSelectPhysician"
                                @change="handleChangeSelect('physician', 'label', $event)"
                            />
                        </el-form-item>
                    </div>
                </div>
                <!-- Equipment -->
                <div class="form-module m-t-20px">
                    <collapse-panel v-if="dialogVisible">
                        <template #title>
                            <div class="module-title">{{ $t('patients.Equipment') }}</div>
                        </template>
                        <template #content>
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
                                            @input="filterNumberAndChart('sn')"
                                            @blur="checkSn"
                                        />
                                    </div>
                                </el-form-item>
                                <br />
                                <device-mode
                                    ref="deviceModeRef"
                                    :class="formData.sn ? 'min-h-[50px]' : ''"
                                />
                                <!-- <el-form-item
                                    prop="mode_name"
                                    :label="$t('patients.Mode')"
                                >
                                    <div class="form-item">
                                        <el-select v-model="formData.mode_name">
                                            <el-option
                                                v-for="inItem in modeOptions"
                                                :value="inItem.value"
                                                :label="inItem.label"
                                                :key="inItem.value"
                                            />
                                        </el-select>
                                    </div>
                                </el-form-item>
                                <el-form-item
                                    prop="pressure"
                                    :label="$t('patients.Pressure')"
                                >
                                    <div class="form-item">
                                        <el-select v-model="formData.pressure">
                                            <el-option
                                                v-for="inItem in pressureOptions"
                                                :value="inItem.value"
                                                :label="inItem.label"
                                                :key="inItem.value"
                                            />
                                        </el-select>
                                    </div>
                                </el-form-item>
                                <el-form-item
                                    prop="ramp"
                                    :label="$t('patients.Ramp')"
                                >
                                    <div class="form-item">
                                        <el-select v-model="formData.ramp">
                                            <el-option
                                                v-for="inItem in rampOptions"
                                                :value="inItem.value"
                                                :label="inItem.label"
                                                :key="inItem.value"
                                            />
                                        </el-select>
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
                                            :maxlength="inputLength.mask"
                                        />
                                    </div>
                                </el-form-item> -->
                            </div>
                        </template>
                    </collapse-panel>
                </div>
                <!-- Demographics & Contact details -->
                <div class="form-module m-t-20px">
                    <collapse-panel v-if="dialogVisible">
                        <template #title>
                            <div class="module-title">
                                {{ `${$t('patients.Demographics')} & ${$t('patients.ContactDetails')}` }}
                            </div>
                        </template>
                        <template #content>
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
                                            :maxlength="inputLength.city"
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
                                            @input="filterNumberAndChart('zip_code')"
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
                                            :placeholder="$t('login.PhoneNumber')"
                                            :maxlength="inputLength.mobile"
                                            @input="filterMobile('mobile')"
                                        />
                                    </div>
                                </el-form-item>
                            </div>
                        </template>
                    </collapse-panel>
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
        </base-dialog>
    </div>
</template>

<script setup lang="ts">
    import type { FormInstance, InputInstance } from 'element-plus';
    import moment from 'moment';
    import deviceMode from './tabs/components/device-mode.vue';
    import { useUserStore } from '~/stores/modules/user';
    import type { AddPatientReq } from '~/api/patient/types';
    import { addPatient, checkSerial } from '~/api/patient';
    import { type SelectOffice } from '#build/components';
    import BaseButton from '@/components/base-button/index.vue';

    const userStore = useUserStore();

    const dialogVisible = defineModel({
        default: false,
        type: Boolean,
    });

    const focusRef = ref<InputInstance>();
    watch(
        dialogVisible,
        val => {
            if (val) {
                setTimeout(() => {
                    focusRef.value?.focus();
                }, 0);
            }
        },
        {
            immediate: true,
        },
    );

    const formRef = ref<FormInstance>(); // 表单ref

    const formDataInit = {
        gender: 0,
        institution_id: userStore.userInfo?.institution_id || '',
        institution_name: userStore.userInfo?.institution_name || '',
        therapist_id: userStore.userInfo?.id || '',
        therapist_name: userStore.userInfo ? nameFormat(userStore.userInfo) : '',
        physician_id: '',
        physician_name: '',
        ramp: '0',
        mode_name: '0',
        setup_date: moment().format('YYYY-MM-DD'),
    };

    const formData = ref<Partial<AddPatientReq>>({
        ...formDataInit,
    });

    const { filterMobile, filterNumberAndChart, filterChart } = useFilterInput(formData);
    const { firstName, lastName, emailNoRequired, role, office, setupDate, birthdate, sn } = useFormRules();
    // 表单规则
    const formRules = computed(() => {
        return {
            first_name: firstName,
            last_name: lastName,
            email: emailNoRequired,
            group_id: role,
            institution_id: office,
            setup_date: setupDate,
            birthdate,
            sn,
        };
    });

    const emit = defineEmits(['refresh', 'showPatientReport']);
    const loading = ref(false); // 按钮loading
    const deviceModeRef = ref<InstanceType<typeof deviceMode>>();
    /**
     * submit
     */
    const submit = () => {
        formRef.value?.validate((valid: boolean) => {
            if (!valid) {
                return;
            }
            // 如果没有选择医生
            if (!formData.value.physician_id) {
                useElMessageBox().alert(
                    h('div', {}, [
                        h(
                            'p',
                            { class: 'msg' },
                            'By not adding a physician to the patient record the phsycian will not be able to access the patients account in the SleepRes cloud platform.',
                        ),
                        h('p', { class: 'msg' }, 'Would you like to add a physician?'),
                        h('div', { class: 'el-message-box__btns' }, [
                            h(
                                BaseButton,
                                {
                                    onClick: () => {
                                        ElMessageBox.close();
                                        showAddPhysician();
                                    },
                                },
                                'YES',
                            ),
                            h(
                                BaseButton,
                                {
                                    onClick: () => {
                                        ElMessageBox.close();
                                        saveForm();
                                    },
                                },
                                'No',
                            ),
                        ]),
                    ]),
                    'Warning: A physician has not been added to the patient record',
                    {
                        // if you want to disable its autofocus
                        // autofocus: false,

                        showConfirmButton: false,
                        showCancelButton: false,
                        confirmButtonText: 'No',
                        cancelButtonText: 'Yes',
                        center: true,
                        dangerouslyUseHTMLString: true,
                        customClass: 'message-dialog custom-btn',
                        closeOnClickModal: true,
                        closeOnPressEscape: true,
                    },
                );
            } else {
                saveForm();
            }
        });
    };

    const saveForm = () => {
        loading.value = true;

        // 去除formData null和undefined
        Object.keys(formData.value).forEach(key => {
            let value = formData.value[key as keyof AddPatientReq];
            if (value === null || value === undefined) {
                formData.value[key as keyof AddPatientReq] = '' as any;
            }
        });

        // 新增
        addPatient({
            ...formData.value,
            physician_id: formData.value?.physician_id ? formData.value?.physician_id : '',
        })
            .then((res: any) => {
                if (res.code === 1) {
                    ElMessage.success('Patiented created successfully');
                    emit('refresh');
                    if (formData.value?.sn) {
                        deviceModeRef.value?.update().finally(() => {
                            setTimeout(() => {
                                loading.value = false;
                                dialogVisible.value = false;
                                let userInfo = { ...res.data, patient: JSON.parse(res.data.patient) };
                                showDetail(userInfo);
                            }, 500);
                        });
                    } else {
                        setTimeout(() => {
                            dialogVisible.value = false;
                            let userInfo = { ...res.data, patient: JSON.parse(res.data.patient) };
                            showDetail(userInfo);
                        }, 500);
                    }
                }
            })
            .finally(() => {
                loading.value = false;
            });
    };

    const close = () => {
        dialogVisible.value = false;

        formRef.value?.resetFields();
        deviceSn.value.sn = '';
        formData.value = { ...formDataInit };
    };

    const selectOfficeRef = ref<InstanceType<typeof SelectOffice>>();
    const showDialog = () => {
        // 初始化机构选择框默认值

        // selectOfficeRef.value?.initOptions();

        dialogVisible.value = true;
    };

    const handleChangeOffice = (val: { id: string; name: string }) => {
        if (val) {
            formData.value.institution_id = val.id;
            formData.value.institution_name = val.name;
        } else {
            formData.value.institution_id = '';
            formData.value.institution_name = '';
        }
        formRef.value?.validateField('institution_id');
    };

    const handleChangeSelect = (key: string, label: string, val: any) => {
        console.log(val);
        if (val) {
            formData.value[(key + '_id') as keyof typeof formData.value] = val.id;
            formData.value[(key + '_name') as keyof typeof formData.value] = val[label];
        } else {
            // @ts-expect-error
            formData.value[(key + '_id') as keyof typeof formData.value] = '';
            // @ts-expect-error
            formData.value[(key + '_name') as keyof typeof formData.value] = '';
        }
    };

    // 选择医生
    const showSelectPhysician = ref(false);
    const showAddPhysician = () => {
        showSelectPhysician.value = true;
    };

    const deviceSn = ref({
        sn: formData.value.sn,
    });
    provide('patient', deviceSn);

    // 校验序列号
    const checkSn = () => {
        formRef.value?.validateField('sn').then(valid => {
            if (!valid) {
                return;
            }
            if (formData.value.sn) {
                checkSerial({ sn: formData.value.sn }).then(res => {
                    console.log(res);
                    if (res.code === 1) {
                        if (res.data_other === 0) {
                            deviceSn.value.sn = formData.value.sn;
                        } else if (res.data_other === 1) {
                            // 序列号错误
                            useElMessageBox().alert(
                                '<p class="msg">Sorry， the device you are trying to add is not recognized by the SleepResplatform. Please check that the serial number you are entering is corrector contact SleepRes technical support for assistance.</p>' +
                                    '<p class="author"><p>Technical Support</p><p>1-800-555-5555</p><p>technical.support@sleepres.com</p></p>',
                                'Unable to Accept Device',
                                {
                                    // if you want to disable its autofocus
                                    // autofocus: false,

                                    showConfirmButton: false,
                                    center: true,
                                    dangerouslyUseHTMLString: true,
                                    customClass: 'register-dialog',
                                    closeOnClickModal: false,
                                    closeOnPressEscape: false,
                                },
                            );
                        } else if (res.data_other === 2) {
                            let userInfo = { ...res.data, patient: JSON.parse(res.data.patient) };
                            // 序列号已被绑定
                            useElMessageBox().alert(
                                () =>
                                    h('p', { class: 'msg' }, [
                                        'The serial number you are trying to use is already attached to Patient ID ',
                                        h(
                                            'span',
                                            {
                                                class: 'link',
                                                onClick: () => {
                                                    ElMessageBox.close();
                                                    showDetail(userInfo);
                                                }, // 注意在Vue 3中应该使用`onClick`而不是`@click`
                                            },
                                            userInfo.patient.patientid,
                                        ),
                                        '. Please verify the serial number you are entering is correct or remove the device from Patient ID ',
                                        h(
                                            'span',
                                            {
                                                class: 'link',
                                                onClick: () => {
                                                    ElMessageBox.close();
                                                    showDetail(userInfo);
                                                },
                                            },
                                            userInfo.patient.patientid,
                                        ),
                                        ' file.',
                                    ]),
                                'Device already attached to another patient file',
                                {
                                    // if you want to disable its autofocus
                                    // autofocus: false,

                                    showConfirmButton: false,
                                    center: true,
                                    dangerouslyUseHTMLString: true,
                                    customClass: 'register-dialog',
                                    closeOnClickModal: false,
                                    closeOnPressEscape: false,
                                },
                            );
                        }
                    }
                });
            }
        });
    };

    // 校验ID
    const checkId = () => {
        if (formData.value.patientid) {
            checkPatientIdFn(formData.value.patientid, showDetail);
        }
    };

    const showDetail = (userInfo: any) => {
        emit('showPatientReport', userInfo);
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
<style lang="scss">
    .custom-btn {
        padding-bottom: 15px !important;
    }

    .message-dialog {
        min-width: 800px !important;

        .el-message-box__content {
            padding-left: 10px !important;
        }

        .msg {
            margin-bottom: 20px;
            font-size: $font-small;
            text-align: center;
        }

        .el-message-box__title {
            font-size: $font-large;
            font-weight: bold;
        }
    }

    .register-dialog {
        top: -200px;
    }
</style>
