<!-- 患者记录 -->
<template>
    <div>
        <el-dialog
            v-model="dialogVisible"
            title=""
            width="1250"
            @close="close"
            class="form form-dialog"
        >
            <div class="form-title">Patient Name</div>
            <el-button
                type="primary"
                class="absolute right-[80px] top-[40px]"
                >{{ $t('patients.SDCardUpload') }}
            </el-button>
            <el-form
                class="form"
                label-position="left"
                inline
                label-width="105px"
            >
                <!-- PatientID -->
                <el-form-item
                    prop="first_name"
                    :label="$t('patients.PatientID')"
                >
                    <div class="form-item">
                        <el-input
                            v-model="formData.first_name"
                            class="form-input"
                            :placeholder="$t('patients.PatientID')"
                            readonly
                        />
                    </div>
                </el-form-item>
                <!-- Equipment -->
                <el-form-item
                    prop="first_name"
                    :label="$t('patients.Equipment')"
                >
                    <div class="form-item">
                        <el-input
                            v-model="formData.first_name"
                            class="form-input"
                            :placeholder="$t('patients.Equipment')"
                            readonly
                        />
                    </div>
                </el-form-item>
                <!-- DateOfBirth -->
                <el-form-item
                    prop="first_name"
                    :label="$t('patients.DateOfBirth')"
                    label-width="120px"
                >
                    <div class="form-item">
                        <el-input
                            v-model="formData.first_name"
                            class="form-input"
                            :placeholder="$t('patients.DateOfBirth')"
                            readonly
                        />
                    </div>
                </el-form-item>
                <!-- SetupDate -->
                <el-form-item
                    prop="first_name"
                    :label="$t('patients.SetupDate')"
                >
                    <div class="form-item">
                        <el-input
                            v-model="formData.first_name"
                            class="form-input"
                            :placeholder="$t('patients.SetupDate')"
                            readonly
                        />
                    </div>
                </el-form-item>
                <!-- Compliant -->
                <el-form-item
                    prop="first_name"
                    :label="$t('patients.Compliant')"
                >
                    <div class="form-item">
                        <el-input
                            v-model="formData.first_name"
                            class="form-input"
                            :placeholder="$t('patients.Compliant')"
                            readonly
                        />
                    </div>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
    const dialogVisible = ref(false);

    const formData = ref({
        first_name: '',
    });

    const close = () => {
        dialogVisible.value = false;
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
        margin-bottom: 10px !important;
    }

    :deep(.el-dialog) {
        margin-top: 2vh;
        margin-bottom: 20px;
    }
</style>
