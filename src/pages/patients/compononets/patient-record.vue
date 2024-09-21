<!-- 患者记录 -->
<template>
    <div
        class="patient-record"
        :key="formData.id"
    >
        <el-dialog
            v-model="dialogVisible"
            title=""
            width="1250"
            @close="close"
            class="form form-dialog patient-record-dialog"
        >
            <div class="form-title">{{ formData.nickname }}</div>
            <base-button
                type="primary"
                class="absolute right-[80px] top-[40px]"
                @click="showUploadFiles"
                >{{ $t('patients.SDCardUpload') }}
            </base-button>
            <el-form
                class="form"
                label-position="left"
                inline
                label-width="120px"
            >
                <!-- PatientID -->
                <el-form-item
                    prop="patient.patientid"
                    :label="$t('patients.PatientID')"
                >
                    <div class="form-item">
                        <el-input
                            v-model="formData.patient.patientid"
                            class="form-input"
                            readonly
                        />
                    </div>
                </el-form-item>
                <el-form-item
                    prop="sn"
                    :label="$t('patients.SerialNumber')"
                    label-width="130px"
                >
                    <div class="form-item">
                        <el-input
                            v-model="formData.sn"
                            class="form-input"
                            readonly
                        />
                    </div>
                </el-form-item>
                <!-- Equipment -->
                <el-form-item
                    prop="device_type"
                    :label="$t('patients.Equipment')"
                >
                    <div class="form-item">
                        <el-input
                            v-model="formData.device_type"
                            class="form-input"
                            readonly
                        />
                    </div>
                </el-form-item>
                <!-- DateOfBirth -->
                <el-form-item
                    prop="birthdate"
                    :label="$t('patients.DateOfBirth')"
                    label-width="120px"
                >
                    <div class="form-item">
                        <el-input
                            :modelValue="dateFormat(formData.patient.birthdate)"
                            class="form-input"
                            readonly
                        />
                    </div>
                </el-form-item>
                <!-- SetupDate -->
                <el-form-item
                    prop="setup_date"
                    :label="$t('patients.SetupDate')"
                    label-width="130px"
                >
                    <div class="form-item">
                        <el-input
                            :modelValue="dateFormat(formData.patient.setup_date)"
                            class="form-input"
                            readonly
                        />
                    </div>
                </el-form-item>
                <!-- Compliant -->
                <el-form-item
                    prop="compliant"
                    :label="$t('patients.Compliant')"
                >
                    <div class="form-item">
                        <div class="el-input">
                            <div class="el-input__wrapper w-192px h-40px">
                                <!-- <Select
                                    size="6"
                                    color="var(--el-color-success)"
                                    v-if="formData.patient.compliant === 0"
                                />
                                <CloseBold
                                    size="6"
                                    color="var(--el-color-danger)"
                                    v-else-if="formData.patient.compliant === 2"
                                />
                                <span v-else-if="formData.patient.compliant === 1">Monitoring</span> -->
                                <compliant-status :compliant="Number(formData.patient.compliant)" />
                            </div>
                        </div>
                    </div>
                </el-form-item>
            </el-form>
            <!-- Tabs -->
            <div
                class="tabs"
                @click="selectTab"
            >
                <div
                    class="tab-item"
                    v-for="tab in Tabs"
                    :key="tab.index"
                    :class="{ active: tab.index === activeIndex }"
                    :data-index="tab.index"
                >
                    {{ $t('patients.' + tab.name) }}
                </div>
            </div>
            <!-- Tab Content -->
            <div
                class="tab-content"
                v-if="dialogVisible"
            >
                <TherapyData v-if="activeIndex === 1" />
                <Prescription v-if="activeIndex === 2" />
                <PatientDetails
                    v-if="activeIndex === 3"
                    @update="updatePatient"
                />
                <Notes
                    v-if="activeIndex === 4"
                    @update="updatePatient"
                />
                <Logs v-if="activeIndex === 5" />
            </div>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
    // import { Select, CloseBold } from '@element-plus/icons-vue';
    import Logs from './tabs/logs.vue';
    import Notes from './tabs/notes.vue';
    // import Prescription from './tabs/prescription.vue';
    import PatientDetails from './tabs/patient-details.vue';
    import TherapyData from './tabs/therapy-data/index.vue';
    import type { UserInfo } from '~/api/login/types';

    const Prescription = defineAsyncComponent(() => import('./tabs/prescription.vue'));

    const dialogVisible = ref(false);

    const formData = ref<Partial<UserInfo>>({});

    const close = () => {
        dialogVisible.value = false;
    };

    const showDialog = (item: UserInfo) => {
        formData.value = item;
        activeIndex.value = 1;
        dialogVisible.value = true;
    };

    const Tabs = ref([
        {
            name: 'TherapyData',
            index: 1,
        },
        {
            name: 'Prescription',
            index: 2,
        },
        {
            name: 'PatientDetails',
            index: 3,
        },
        {
            name: 'Notes',
            index: 4,
        },
        {
            name: 'Logs',
            index: 5,
        },
    ]);

    const activeIndex = ref(1);
    const selectTab = (e: any) => {
        if (e.target.dataset.index) {
            activeIndex.value = Number(e.target.dataset.index);
        }
    };

    const emit = defineEmits<{
        (e: 'showUploadFiles', id: string): void;
    }>();
    const showUploadFiles = () => {
        if (!formData.value.id) {
            return;
        }
        emit('showUploadFiles', formData.value.id);
    };

    provide('patient', formData);

    const updatePatient = (item: UserInfo) => {
        formData.value = item;
    };

    defineExpose({
        showDialog,
    });
</script>

<style lang="scss" scoped>
    .el-form-item {
        margin-bottom: 10px !important;
    }

    :deep(.patient-record-dialog) {
        margin-top: 2vh;
        margin-bottom: 20px;
    }

    .tabs {
        display: flex;
        justify-content: center;
        margin-top: 20px;
        font-size: $font-middle;

        .tab-item {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 180px;
            height: 50px;
            padding: 0 20px;
            margin-right: 10px;
            cursor: pointer;
            background-color: #d7d7d7;
            border-radius: 5px 5px 0 0;

            // &.active,
            // &:hover {
            //     color: #fff;
            //     background-color: var(--el-color-primary);
            // }
            @include active;
        }
    }

    .tab-content {
        position: relative;
        min-height: 500px;
        background-color: #f0f8fa;
        border-radius: 2px;
    }

    :deep(.footer-btn) {
        display: flex;
        justify-content: center;
        margin-top: 30px;

        .el-button {
            margin-right: 20px;

            &:last-child {
                margin-right: 0;
            }
        }
    }
</style>
