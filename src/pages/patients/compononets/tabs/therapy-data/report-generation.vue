<template>
    <!-- 图表生成选项 -->
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
                    <el-radio :value="1">{{ $t('patients.ComplianceReport') }}</el-radio>
                    <el-radio :value="2">{{ $t('patients.TherapyReport') }}</el-radio>
                    <el-radio :value="3">{{ $t('patients.DetailedReport') }}</el-radio>
                </el-radio-group>
            </div>
            <!-- Timeframe -->
            <div class="m-b-30px">
                <div>
                    <div class="radio-group">
                        <div class="radio-group-title">
                            {{ $t('patients.Timeframe') }}
                        </div>
                        <el-radio-group
                            v-model="selectTime"
                            size="large"
                            v-if="reportType !== 3"
                        >
                            <el-radio :value="1">{{ $t('patients.Best30Days') }}</el-radio>
                            <el-radio :value="2">{{ $t('patients.First90Days') }}</el-radio>
                            <el-radio :value="3">{{ $t('patients.CustomDateRange') }}</el-radio>
                        </el-radio-group>
                        <date-picker
                            v-model="selDate"
                            :disabled-date="disabledDateFun"
                            :default-value="new Date()"
                            :clearable="false"
                            v-else
                        />
                    </div>
                    <date-picker
                        v-model="customDate"
                        type="daterange"
                        unlink-panels
                        range-separator="To"
                        start-placeholder="Start Date"
                        end-placeholder="End Date"
                        v-if="selectTime === 3 && reportType !== 3"
                        :disabled-date="disabledDateFun"
                    />
                </div>
            </div>

            <template #footer>
                <span class="dialog-footer justify-end!">
                    <el-button
                        @click="showReportPreview"
                        type="primary"
                        >{{ $t('patients.CreateReport') }}</el-button
                    >
                </span>
            </template>
        </el-dialog>
        <report-preview ref="reportPreviewRef" />
    </div>
</template>

<script setup lang="ts">
    import moment from 'moment';
    import ReportPreview from './report-preview.vue';

    const dialogVisible = defineModel({
        default: false,
        type: Boolean,
    });

    const reportPreviewRef = ref<InstanceType<typeof ReportPreview>>();
    const showReportPreview = () => {
        let dates: string[] = [];
        if (reportType.value !== 3) {
            switch (selectTime.value) {
                case 1:
                    dates = ['30', '30'];
                    break;
                case 2:
                    dates = ['90', '90'];
                    break;
                case 3:
                    if (!customDate.value) {
                        ElMessage.error('Please select custom date range');
                        return;
                    }
                    dates = [customDate.value[0], customDate.value[1]];
                    break;
            }

            reportPreviewRef.value?.show({
                reportType: reportType.value,
                customDate: dates,
                selectTime: selectTime.value,
            });
        } else {
            reportPreviewRef.value?.show({
                reportType: reportType.value,
                customDate: [selDate.value, selDate.value],
                selectTime: selectTime.value,
                selDate: selDate.value,
            });
        }
    };

    const close = () => {
        dialogVisible.value = false;
        reportType.value = 1;
        selectTime.value = 1;
        customDate.value = [];
        selDate.value = moment().format('YYYY-MM-DD');
    };

    // 报告类型 1 合规报告 2 治疗报告
    const reportType = ref(1);

    // 选择时间
    const selectTime = ref(1);

    // 自定义时间
    const customDate = ref<string[]>([]);

    // 选择的具体时间
    const selDate = ref<string>(moment().format('YYYY-MM-DD'));
</script>

<style lang="scss" scoped>
    :deep(.el-dialog) {
        margin-top: 10vh;
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
