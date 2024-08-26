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
                        :maxlength="inputLength.name"
                        :readonly="!isEdit"
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
                        :maxlength="inputLength.name"
                        :readonly="!isEdit"
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
                        :disabled-date="disabledDateFun"
                        value-format="YYYY-MM-DD"
                        :readonly="!isEdit"
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
                        :maxlength="inputLength.name"
                        :readonly="!isEdit"
                    />
                </div>
            </el-form-item>
            <el-form-item
                prop="institution_id"
                :label="$t('patients.Office')"
            >
                <div class="min-w-[192px]">
                    <select-office
                        :model-value="{
                            id: formData.institution_id,
                            name: formData.institution_name,
                        }"
                        @change="handleChangeSelect('institution', 'name', $event)"
                        ref="selectOfficeRef"
                        :key="formData.institution_id"
                        :disabled="!isEdit"
                    />
                </div>
            </el-form-item>
            <br /><br />
            <el-form-item
                prop="setup_date"
                :label="$t('patients.SetupDate')"
            >
                <div class="form-item">
                    <el-date-picker
                        v-model="formData.setup_date"
                        type="date"
                        value-format="YYYY-MM-DD"
                        :readonly="!isEdit"
                    />
                </div>
            </el-form-item>
            <el-form-item
                prop="therapist_id"
                :label="$t('patients.Therapist')"
            >
                <div class="min-w-[192px]">
                    <!-- <el-select
                        v-model="formData.therapist_id"
                        placeholder="Please select"
                        :disabled="!isEdit"
                    >
                        <el-option
                            v-if="userStore.userInfo"
                            :label="userStore.userInfo?.nickname"
                            :value="String(userStore.userInfo.id)"
                        />

                        <el-option
                            v-if="userStore.userInfo?.id != formData.therapist_id"
                            :label="formData.therapist_name"
                            :value="String(formData.therapist_id)"
                        />
                    </el-select> -->
                    <select-physician
                        :model-value="{
                            id: Number(formData.therapist_id),
                            nickname: formData.therapist_name,
                        }"
                        :disabled="!isEdit"
                        @change="handleChangeSelect('therapist', 'nickname', $event)"
                        :key="formData.therapist_id"
                    />
                </div>
            </el-form-item>
            <el-form-item
                prop="physician_id"
                :label="$t('patients.Physician')"
            >
                <div class="min-w-[192px] form-item">
                    <select-physician
                        :model-value="{
                            id: Number(formData.physician_id),
                            nickname: formData.physician_name,
                        }"
                        :disabled="!isEdit"
                        @change="handleChangeSelect('physician', 'nickname', $event)"
                        :key="formData.physician_id"
                    />
                </div>
            </el-form-item>
            <br /><br />
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
            </el-form-item>
            <br /><br />
            <el-form-item
                prop="city"
                :label="$t('office.City')"
            >
                <div class="form-item">
                    <el-input
                        v-model="formData.city"
                        class="form-input"
                        :readonly="!isEdit"
                    />
                </div>
            </el-form-item>
            <el-form-item
                prop="state"
                :label="$t('login.State')"
            >
                <div class="min-w-[192px]">
                    <select-state
                        v-model="formData.state"
                        :disabled="!isEdit"
                    />
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
                        :readonly="!isEdit"
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
                        :readonly="!isEdit"
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
                        :readonly="!isEdit"
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
    import editBtn from './edit-btn.vue';
    import { useUserStore } from '~/stores/modules/user';
    import { editPatient } from '~/api/patient';

    const isEdit = ref(false);

    const userStore = useUserStore();

    const props = defineProps({
        patient: {
            type: Object,
            default: () => ({}),
        },
    });

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

    watch(
        () => props.patient,
        val => {
            formData.value = {
                first_name: val.first_name || '',
                last_name: val.last_name || '',
                birthdate: val.patient.birthdate || '',
                patientid: val.patient.patientid || '',
                institution_id: val.institution_id || '',
                institution_name: val.institution_name || '',
                setup_date: val.patient.setup_date || '',
                therapist_id: val.patient.therapist_id || '',
                therapist_name: val.patient.therapist_name || '',
                physician_id: val.patient.physician_id || '',
                physician_name: val.patient.physician_name || '',
                sn: val.sn || '',
                city: val.patient.city || '',
                state: val.state || '',
                address: val.address || '',
                email: val.email || '',
                mobile: val.mobile || '',
                user_id: val.id || '',
            };
        },
        {
            immediate: true,
            deep: true,
        },
    );

    const { firstName, lastName, email, sn } = useFormRules();
    const formRules = computed(() => {
        return {
            first_name: firstName,
            last_name: lastName,
            email,
            sn,
        };
    });

    const emit = defineEmits(['update']);
    const update = inject<Function>('update');
    const formRef = ref<FormInstance>();
    const loading = ref(false);
    const save = () => {
        formRef.value?.validate(valid => {
            if (valid) {
                loading.value = true;
                editPatient({ ...formData.value })
                    .then(res => {
                        loading.value = false;
                        if (res.code === 1) {
                            ElMessage.success('Update success');
                            isEdit.value = false;
                            emit('update', { ...res.data, patient: JSON.parse(res.data.patient) });
                            update && update();
                        }
                    })
                    .finally(() => {
                        loading.value = false;
                    });
            }
        });
    };

    const cancel = () => {
        isEdit.value = false;
        let val = props.patient;
        formData.value = {
            first_name: val.first_name || '',
            last_name: val.last_name || '',
            birthdate: val.patient.birthdate || '',
            patientid: val.patient.patientid || '',
            institution_id: val.institution_id || '',
            institution_name: val.institution_name || '',
            setup_date: val.patient.setup_date || '',
            therapist_id: val.patient.therapist_id || '',
            therapist_name: val.patient.therapist_name || '',
            physician_id: val.patient.physician_id || '',
            physician_name: val.patient.physician_name || '',
            sn: val.sn || '',
            city: val.patient.city || '',
            state: val.state || '',
            address: val.address || '',
            email: val.email || '',
            mobile: val.mobile || '',
            user_id: val.id || '',
        };
    };

    const handleChangeSelect = (key: string, label: string, val: any) => {
        formData.value[(key + '_id') as keyof typeof formData.value] = val.id;
        formData.value[(key + '_name') as keyof typeof formData.value] = val[label];
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
