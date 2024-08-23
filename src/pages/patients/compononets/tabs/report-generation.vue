<template>
    <div class="report-generation">
        <el-dialog
            v-model="dialogVisible"
            title=""
            width="900"
            @close="close"
            class="form form-dialog"
        >
            <div class="form-title">
                {{ $t('patients.TherapyReport') }}
            </div>
            <!-- Report Type -->
            <div class="radio-group m-b-[50px]">
                <div class="radio-group-title">
                    {{ $t('patients.ReportType') }}
                </div>
                <el-radio-group
                    v-model="reportType"
                    size="large"
                >
                    <el-radio :label="1">{{ $t('patients.ComplianceReport') }}</el-radio>
                    <el-radio :label="2">{{ $t('patients.TherapyReport') }}</el-radio>
                </el-radio-group>
            </div>
            <!-- Timeframe -->
            <div class="m-b-30px">
                <div class="radio-group">
                    <div class="radio-group-title">
                        {{ $t('patients.Timeframe') }}
                    </div>
                    <el-radio-group
                        v-model="selectTime"
                        size="large"
                    >
                        <el-radio :label="1">{{ $t('patients.Best30Days') }}</el-radio>
                        <el-radio :label="2">{{ $t('patients.First90Days') }}</el-radio>
                        <el-radio :label="3">{{ $t('patients.CustomDateRange') }}</el-radio>
                    </el-radio-group>
                </div>
                <el-date-picker
                    v-model="customDate"
                    type="daterange"
                    unlink-panels
                    range-separator="To"
                    start-placeholder="Start Date"
                    end-placeholder="End Date"
                    v-if="selectTime === 3"
                />
            </div>

            <template #footer>
                <span class="dialog-footer">
                    <el-button
                        @click="close"
                        type="primary"
                        >{{ $t('patients.CreateReport') }}</el-button
                    >
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
    const dialogVisible = defineModel({
        default: false,
        type: Boolean,
    });

    const close = () => {
        dialogVisible.value = false;
    };

    // 报告类型
    const reportType = ref(1);

    // 选择时间
    const selectTime = ref(1);

    // 自定义时间
    const customDate = ref();
</script>

<style lang="scss" scoped>
    :deep(.el-dialog) {
        margin-top: 10vh !important;
    }

    :deep(.el-radio__inner) {
        border-radius: 2px !important;
    }

    :deep(.el-radio__input.is-checked .el-radio__inner::after) {
        position: absolute;
        top: 3px;
        left: 2px;
        display: block;
        width: 8px;
        height: 3px;
        text-align: center;
        content: '';
        background: none;
        border: 1px solid white;
        border-top: transparent;
        border-right: transparent;
        border-radius: 0;
        transform: rotate(-45deg);
    }

    :deep(.el-radio-group) {
        flex-direction: column;
        align-items: flex-start;
    }

    .radio-group-title {
        margin-bottom: 10px;
        font-size: $font-middle;
        font-weight: bold;
    }
</style>
