<template>
    <!-- 图表生成选项 -->
    <div class="report-generation">
        <base-dialog
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
                        <!-- <date-picker
                            v-model="selDate"
                            :disabled-date="disabledDateFun"
                            :default-value="new Date()"
                            :clearable="false"
                            v-else
                        /> -->
                        <div v-else>
                            <date-picker
                                v-model="customDate"
                                type="daterange"
                                unlink-panels
                                range-separator="To"
                                start-placeholder="Start Date"
                                end-placeholder="End Date"
                                :disabled-date="disabledDateFunDetail"
                                @calendar-change="calendarChange"
                                @clear="calendarTime = []"
                            />
                            <p class="m-t-10px text-[#8A8A8A]">
                                Detailed reports have a 14-day limit due to the size of the file
                            </p>
                        </div>
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
                        @calendar-change="calendarChange"
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
        </base-dialog>
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
                customDate: [customDate.value[0], customDate.value[1]],
                selectTime: selectTime.value,
                selDate: customDate.value[1],
            });
        }
    };

    const close = () => {
        dialogVisible.value = false;
        reportType.value = 1;
        selectTime.value = 1;
        customDate.value = [];
        calendarTime = [];
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

    // 限制一年范围选择

    let calendarTime: string[] = [];

    const calendarChange = (Date: string[]) => {
        calendarTime = Date;
    };

    // 最多选择到365天
    const disabledDateFun = (time: Record<string, any>): boolean => {
        // 如果选择了某个日期
        if (calendarTime.length) {
            // 限制范围365天
            let selectDate = calendarTime[0];
            const choiceDateTime = new Date(selectDate).getTime();
            const minTime = new Date(choiceDateTime).setMonth(new Date(choiceDateTime).getMonth() - 12);
            const maxTime = new Date(choiceDateTime).setMonth(new Date(choiceDateTime).getMonth() + 12);
            const min = minTime;
            const newDate = new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1;
            const max = newDate < maxTime ? newDate : maxTime;

            return time.getTime() < min || time.getTime() > max;
        } else {
            return time.getTime() > new Date().getTime();
        }
    };

    // 最多选择14天
    const disabledDateFunDetail = (time: Record<string, any>): boolean => {
        // 如果选择了某个日期
        if (calendarTime.length) {
            // 限制范围365天
            let selectDate = calendarTime[0];
            const choiceDateTime = new Date(selectDate).getTime();

            // 计算14天后的时间戳
            const maxTime = choiceDateTime + 14 * 24 * 60 * 60 * 1000; // 14天的毫秒数

            // 默认情况下，最小时间就是选择的日期本身（可以包括选择的当天）
            const minTime = choiceDateTime - 14 * 24 * 60 * 60 * 1000;

            const min = minTime;
            const newDate = new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1;
            const max = newDate < maxTime ? newDate : maxTime;

            return time.getTime() < min || time.getTime() > max;
        } else {
            return time.getTime() > new Date().getTime();
        }
    };
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
