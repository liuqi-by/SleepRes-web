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
                        @change="handleChangeOffice"
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
                    <el-select
                        v-model="formData.therapist_id"
                        placeholder="Please select"
                        :disabled="!isEdit"
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
                <div class="min-w-[192px] form-item">
                    <select-physician
                        v-model="formData.physician_id"
                        :disabled="!isEdit"
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
                @click="isEdit = false"
                :disabled="!isEdit"
            >
                {{ $t('form.Cancel') }}
            </base-button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import editBtn from './edit-btn.vue';
    import { useUserStore } from '~/stores/modules/user';

    const isEdit = ref(false);

    const userStore = useUserStore();

    const formData = ref({
        first_name: '',
    });

    const formRules = computed(() => {
        return {};
    });
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
