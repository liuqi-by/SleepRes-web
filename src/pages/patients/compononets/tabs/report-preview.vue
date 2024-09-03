<!-- 报告打印预览 -->
<template>
    <div class="report-preview">
        <el-dialog
            v-model="dialogVisible"
            width="920"
            @close="close"
            class="form form-dialog"
        >
            <div class="form-title">{{ options.reportType === 1 ? 'Compliance Report' : 'Therapy Report' }}</div>
            <div class="top-Info">
                <div class="report-row">
                    <div class="title">{{ patient?.nickname }}</div>
                </div>
                <div class="report-row-content">
                    <div class="info-box">
                        <div class="label">Date of Birth:</div>
                        <div class="detail">{{ patient?.patient.birthdate }}</div>
                    </div>
                    <div class="info-box">
                        <div class="label">Date range of report:</div>
                        <div class="detail text-nowrap!">
                            {{ barChartData.dates[0] }} - {{ barChartData.dates[barChartData.dates.length - 1] }}
                        </div>
                    </div>
                </div>
                <div class="report-row-content">
                    <div class="info-box">
                        <div class="label">Patient ID:</div>
                        <div class="detail">{{ patient?.patient.patientid }}</div>
                    </div>
                    <div class="info-box">
                        <div class="label">DME Office Name:</div>
                        <div class="detail">{{ patient?.institution_name }}</div>
                    </div>
                </div>
                <div class="report-row-content">
                    <div class="info-box">
                        <div class="label">Patient Phone #:</div>
                        <div class="detail">{{ patient?.mobile }}</div>
                    </div>
                    <div class="info-box">
                        <div class="label">DME Office Address:</div>
                        <div class="detail">{{ patient?.address }}</div>
                    </div>

                    <div class="info-box">
                        <div class="label">Mask:</div>
                        <div class="detail">{{ patient?.patient.mask }}</div>
                    </div>
                </div>
                <div class="report-row-content">
                    <div class="info-box">
                        <div class="label">Therapy Start Date:</div>
                        <div class="detail">{{ patient?.patient.setup_date }}</div>
                    </div>
                    <div class="info-box">
                        <div class="label">DME Phone #:</div>
                        <div class="detail">{{ patient?.mobile }}</div>
                    </div>
                    <div class="info-box">
                        <div class="label">Device Name:</div>
                        <div class="detail">{{ patient?.device_type }}</div>
                    </div>
                </div>
                <div class="report-row-content">
                    <div class="info-box flex-1">
                        <div class="label">Device Serial #:</div>
                        <div class="detail">{{ patient?.sn }}</div>
                    </div>
                </div>
            </div>
            <div class="mid-content">
                <div class="compliance-information">
                    <div class="compliance-module">
                        <div class="title">Compliance Summary Information</div>
                        <div class="compliance-row">
                            <div class="label">Compliance Achieved</div>
                            <div class="detail">123123123123123123</div>
                        </div>
                        <div class="compliance-row">
                            <div class="label">Days with usage</div>
                            <div class="detail">{{ deviceReport?.use_days }}</div>
                        </div>
                        <div class="compliance-row">
                            <div class="label">Days without usage</div>
                            <div class="detail">{{ deviceReport?.not_use_days }}</div>
                        </div>
                        <div class="compliance-row">
                            <div class="label">Days with usage greater or equal to 4 hrs</div>
                            <div class="detail">{{ deviceReport?.usage_days_use }}</div>
                        </div>
                        <div class="compliance-row">
                            <div class="label">Days with usage less than 4 hrs</div>
                            <div class="detail">{{ deviceReport?.usage_days_use_not }}</div>
                        </div>
                        <div class="compliance-row">
                            <div class="label">Average Usage per day</div>
                            <div class="detail">{{ deviceReport?.usetime_avg_select }}</div>
                        </div>
                        <!-- <div class="compliance-row">
                            <div class="label">Percentage of days with usage</div>
                            <div class="detail">123123123123123123</div>
                        </div> -->
                    </div>
                    <div class="compliance-module">
                        <div class="title">Auto CPAP Summary</div>
                        <div class="compliance-row">
                            <div class="label">Mean Pressure</div>
                            <div class="detail">123123123123123123</div>
                        </div>
                        <div class="compliance-row">
                            <div class="label">Average pressure</div>
                            <div class="detail">{{ deviceReport?.pressure_avg }}</div>
                        </div>
                        <div class="compliance-row">
                            <div class="label">{{ 'Device pressure <= 95% of the time' }}</div>
                            <div class="detail">{{ 123123123123123123 }}</div>
                        </div>
                        <div class="compliance-row">
                            <div class="label">Average time in large leak per day</div>
                            <div class="detail">123123123123123123</div>
                        </div>
                        <div class="compliance-row">
                            <div class="label">Average AHI</div>
                            <div class="detail">{{ deviceReport?.ahi }}</div>
                        </div>
                        <div class="compliance-row">
                            <div class="label">Average AI</div>
                            <div class="detail">{{ deviceReport?.ai }}</div>
                        </div>
                        <div class="compliance-row">
                            <div class="label">Average HI</div>
                            <div class="detail">{{ deviceReport?.hi }}</div>
                        </div>
                        <div class="compliance-row">
                            <div class="label">Average CA</div>
                            <div class="detail">123123123123123123</div>
                        </div>
                    </div>
                    <div
                        class="compliance-module"
                        v-if="deviceSettings && deviceSettings.length > 0"
                    >
                        <div class="title">Device Settings</div>

                        <div
                            class="compliance-row"
                            v-for="(item, index) in deviceSettings"
                            :key="index"
                        >
                            <div class="label">{{ item.label }}</div>
                            <div class="detail">{{ item.value }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 底部的图表 -->
            <div v-loading="loading">
                <div
                    class="bottom-charts"
                    v-if="options.reportType === 1"
                >
                    <div class="chart-module">
                        <div class="chart">
                            <usage-chart
                                :usetimes="barChartData.usetimes"
                                :dates="barChartData.dates"
                                :sumtime="barChartData.sumtime"
                                :usetime="barChartData.usetime"
                            />
                        </div>
                    </div>
                </div>

                <div
                    class="bottom-charts"
                    v-else
                >
                    <div class="chart-module">
                        <div class="title">Therapy Usage Graph</div>
                        <div class="chart">
                            <usage-chart
                                :dates="barChartData.dates"
                                :sumtime="barChartData.sumtime"
                                isShowTitle
                            />
                            <div class="chart-info">
                                <div class="chart-info-item">
                                    <div class="chart-info-label">Usage days</div>
                                    <div class="chart-info-value">27/28(96%)</div>
                                </div>
                                <div class="chart-info-item color-[#00CE79]">
                                    <div class="chart-info-label">>= 4 hour days</div>
                                    <div class="chart-info-value">27(96%)</div>
                                </div>
                                <div class="chart-info-item color-[#FF9795]">
                                    <div class="chart-info-label">{{ '< 4 hour days' }}</div>
                                    <div class="chart-info-value">27(96%)</div>
                                </div>
                                <div class="chart-info-item">
                                    <div class="chart-info-label">Days not used</div>
                                    <div class="chart-info-value">27(96%)</div>
                                </div>
                                <div class="chart-info-item">
                                    <div class="chart-info-label">Days no data</div>
                                    <div class="chart-info-value">27(96%)</div>
                                </div>
                                <div class="chart-info-item">
                                    <div class="chart-info-label">Used/day(avg)</div>
                                    <div class="chart-info-value">9.3hrs</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="chart-module">
                        <div class="title">Leak Graph</div>
                        <div class="chart">
                            <leak-chart
                                :dates="barChartData.dates"
                                :leak_max="barChartData.leak_max"
                                :leak_avg="barChartData.leak_avg"
                            />
                            <div class="chart-info">
                                <div class="chart-info-item">
                                    <div class="chart-info-label">Set threshold</div>
                                    <div class="chart-info-value">24.0 L/min</div>
                                </div>
                                <div class="chart-info-item">
                                    <div class="chart-info-label">Maximum(avg)</div>
                                    <div class="chart-info-value">23.8</div>
                                </div>
                                <div class="chart-info-item color-[#f4c430]">
                                    <div class="chart-info-label">95th %(avg)</div>
                                    <div class="chart-info-value">27(96%)</div>
                                </div>
                                <div class="chart-info-item">
                                    <div class="chart-info-label">Median(avg)</div>
                                    <div class="chart-info-value">20.1</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="chart-module">
                        <div class="title">AHI Graph</div>
                        <div class="chart">
                            <ahi-chart
                                :ai="barChartData.ai"
                                :hi="barChartData.hi"
                                :ahi="barChartData.ahi"
                                :dates="barChartData.dates"
                            />

                            <div class="chart-info">
                                <div class="chart-info-item">
                                    <div class="chart-info-label">AHI</div>
                                    <div class="chart-info-value">24.0 L/min</div>
                                </div>
                                <div class="chart-info-item color-[#b89dc4]">
                                    <div class="chart-info-label">HI</div>
                                    <div class="chart-info-value">23.8</div>
                                </div>
                                <div class="chart-info-item color-[#8e62a1]">
                                    <div class="chart-info-label">AI</div>
                                    <div class="chart-info-value">27(96%)</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="chart-module">
                        <div class="title">Events Graph</div>
                        <div class="chart">
                            <usage-chart
                                :dates="barChartData.dates"
                                :sumtime="barChartData.sumtime"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
    import UsageChart from './charts/usage-chart.vue';
    import leakChart from './charts/leak-chart.vue';
    import AhiChart from './charts/ahi-chart.vue';
    import type { UserInfo } from '~/api/login/types';
    import { getBarChart, getDeviceReport, getParamInfo } from '~/api/report';
    import type { BarChartRes, DeviceReportRes } from '~/api/report/types';

    const dialogVisible = ref(false);

    const close = () => {
        dialogVisible.value = false;
        deviceReport.value = undefined;
        deviceSettings.value = [];
        barChartData.value = {
            ...initBartChartData,
        };
    };

    interface Options {
        reportType: number;
        customDate: (string | number)[];
        selectTime: number;
    }
    const options = ref<Options>({
        reportType: 1,
        customDate: [30, 30],
        selectTime: 1,
    });

    const show = (option: Options) => {
        options.value = option;
        dialogVisible.value = true;

        getReportInfo();
        getDeviceSetting();
        getChartData(options.value.customDate);
    };

    const patient = inject<Ref<UserInfo>>('patient');

    // 静态信息
    const deviceReport = ref<DeviceReportRes>();
    const getReportInfo = () => {
        if (!patient || !patient.value.sn) {
            return;
        }
        getDeviceReport({
            sn: patient.value.sn,
            start_date: options.value.customDate[0],
            end_date: options.value.customDate[1],
        }).then(res => {
            if (res.code === 1) {
                deviceReport.value = res.data;
            }
        });
    };

    // 参数信息
    const deviceSettings = ref<any>([]);
    const getDeviceSetting = () => {
        if (!patient || !patient.value.sn) {
            return;
        }

        getParamInfo({
            sn: patient.value.sn,
            start_date: options.value.customDate[0],
            end_date: options.value.customDate[1],
        }).then((res: any) => {
            if (res.code === 1 && res.data) {
                deviceSettings.value = res.data[Object.keys(res.data).pop() as string].map((item: string) => {
                    let arr = item.split(':');
                    return {
                        label: arr[0],
                        value: arr[1],
                    };
                });
            } else {
                deviceSettings.value = [];
            }
        });
    };

    // 图表
    const initBartChartData = {
        usetimes: [],
        dates: [],
        sumtime: [],
        usetime: [],
        pressure_max: [],
        pressure_avg: [],
        pressure_95: [],
        leak_avg: [],
        leak_max: [],
        ahi: [],
        hi: [],
        ai: [],
        spo_avg: [],
        spo_min: [],
        pulse_avg: [],
        pulse_min: [],
    };
    const barChartData = ref<BarChartRes>(initBartChartData);
    // 获取图表信息
    const loading = ref(false);
    const getChartData = (rangeDate: (string | number)[]) => {
        if (!patient || !patient.value.sn) {
            return;
        }
        loading.value = true;
        getBarChart({
            sn: patient.value.sn,
            start_date: rangeDate[0],
            end_date: rangeDate[1],
        })
            .then(res => {
                if (res.code === 1) {
                    barChartData.value = res.data;
                } else {
                    barChartData.value = initBartChartData;
                }
            })
            .finally(() => {
                loading.value = false;
            });
    };

    defineExpose({
        show,
    });
</script>

<style lang="scss" scoped>
    .report-preview {
        :deep(.el-dialog) {
            margin-top: 2vh;
        }

        :deep(.el-dialog__body) {
            color: #000;
        }
    }

    .report-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 30px;
    }

    .title {
        font-size: $font-middle;
        font-weight: bold;
    }

    .report-row-content {
        display: flex;
        margin-bottom: 20px;

        .info-box {
            display: flex;
            flex-basis: 250px;
            margin-right: 20px;

            &:last-child {
                margin-right: 0;
            }

            .label {
                flex-shrink: 0;
                margin-right: 2px;
                font-weight: bold;
            }

            .detail {
                word-break: break-all;
                white-space: wrap;
            }
        }
    }

    .mid-content {
        padding: 10px 40px;
        margin-top: 30px;
        margin-bottom: 20px;
        border: 1px solid#000;

        .compliance-module {
            margin-bottom: 20px;

            .title {
                font-size: $font-middle;
            }

            .compliance-row {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding-left: 10px;
                margin-top: 10px;
            }
        }
    }

    .chart-module {
        border: 1px solid #000;

        &:not(:last-child) {
            border-bottom: 0;
        }

        .title {
            height: 50px;
            line-height: 50px;
            text-align: center;
            border-bottom: 1px solid #000;
        }

        .chart {
            display: flex;
            height: 300px;
            padding: 10px;
        }

        .chart-info {
            flex-shrink: 0;
        }

        .chart-info-item {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;

            .chart-info-label {
                flex-shrink: 0;
                margin-right: 10px;
            }
        }
    }
</style>
