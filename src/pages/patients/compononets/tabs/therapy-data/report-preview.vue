<!-- 报告打印预览 -->
<template>
    <div class="report-preview">
        <el-dialog
            v-model="dialogVisible"
            width="830"
            @close="close"
            class="form form-dialog"
        >
            <base-button
                icon="export"
                height="50px"
                v-print="printOptions"
                @click="exportReport"
                class="export"
                >{{ $t('charts.Export') }}
            </base-button>
            <div
                id="reportRef"
                :key="options.reportType"
            >
                <div class="form-title">
                    {{
                        options.reportType === 1
                            ? $t('patients.ComplianceReport')
                            : options.reportType === 2
                              ? $t('patients.TherapyReport')
                              : $t('patients.DetailedReport')
                    }}
                </div>
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
                    </div>

                    <div class="report-row-content">
                        <div class="info-box">
                            <div class="label">Therapy Start Date:</div>
                            <div class="detail">{{ patient?.patient.setup_date }}</div>
                        </div>
                        <div class="info-box">
                            <div class="label">DME Phone #:</div>
                            <div class="detail">{{ patient?.institution_mobile }}</div>
                        </div>
                    </div>

                    <div class="report-row-content">
                        <div class="info-box">
                            <div class="label">Device Serial #:</div>
                            <div class="detail">{{ patient?.sn }}</div>
                        </div>
                        <div class="info-box flex-1">
                            <div class="label">Device Pressure Settings:</div>
                            <div class="detail">{{ patient?.sn }}</div>
                        </div>
                    </div>
                    <div class="report-row-content">
                        <div class="info-box">
                            <div class="label">Mask:</div>
                            <div class="detail">{{ patient?.patient.mask }}</div>
                        </div>
                        <div class="info-box">
                            <div class="label">Device Name:</div>
                            <div class="detail">{{ patient?.device_type }}</div>
                        </div>
                    </div>
                </div>
                <div class="mid-content">
                    <div
                        class="compliance-information"
                        v-if="options.reportType !== 3"
                    >
                        <div class="compliance-module">
                            <div class="title">Compliance Summary Information</div>
                            <div class="compliance-row">
                                <div class="label">Compliance Achieved</div>
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
                                <div class="detail">{{ deviceReport?.pressure_mean }}</div>
                            </div>
                            <div class="compliance-row">
                                <div class="label">Average pressure</div>
                                <div class="detail">{{ deviceReport?.pressure_avg }}</div>
                            </div>
                            <div class="compliance-row">
                                <div class="label">{{ 'Device pressure <= 95% of the time' }}</div>
                                <div class="detail">{{ deviceReport?.pressure_95_time }}</div>
                            </div>
                            <div class="compliance-row">
                                <div class="label">Average time in large leak per day</div>
                                <div class="detail">{{ deviceReport?.leak_avg_time }}</div>
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
                                <div class="detail">{{ deviceReport?.ca_avg }}</div>
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
                    <div
                        v-else
                        class="statistics"
                    >
                        <div class="title text-center">Usage and Clinical Statistics</div>
                        <div class="m-y-[10px] statistics-container">
                            <div class="flex m-b-[30px]">
                                <div class="statistics-item flex-1">
                                    <div class="statistics-title">Usage</div>
                                    <div class="statistics-info">{{ deviceReport?.usetime }}</div>
                                </div>
                                <div class="statistics-item flex-1">
                                    <div class="statistics-title">Pressure</div>
                                    <div class="statistics-info">
                                        <div>
                                            <span class="statistics-label">Max Pressure:</span>
                                            <span class="statistics-value">
                                                {{
                                                    deviceReport?.pressure_max
                                                        ? deviceReport.pressure_max + 'cmH2O'
                                                        : '-'
                                                }}
                                            </span>
                                        </div>
                                        <div>
                                            <span class="statistics-label">95% Pressure:</span>
                                            <span class="statistics-value">
                                                {{
                                                    deviceReport?.pressure_95 ? deviceReport.pressure_95 + 'cmH2O' : '-'
                                                }}
                                            </span>
                                        </div>
                                        <div>
                                            <span class="statistics-label">Avg Pressure:</span>
                                            <span class="statistics-value">
                                                {{
                                                    deviceReport?.pressure_avg
                                                        ? deviceReport.pressure_avg + 'cmH2O'
                                                        : '-'
                                                }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="flex">
                                <div class="statistics-item flex-1">
                                    <div class="statistics-title">Leak</div>
                                    <div class="statistics-info">
                                        <div>
                                            <span class="statistics-label">Max Leak:</span>
                                            <span class="statistics-value">
                                                {{ deviceReport?.leak_max ? deviceReport.leak_max + 'L/min' : '-' }}
                                            </span>
                                        </div>
                                        <div>
                                            <span class="statistics-label">Avg Leak:</span>
                                            <span class="statistics-value">
                                                {{ deviceReport?.leak_avg ? deviceReport.leak_avg + 'L/min' : '-' }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="statistics-item flex-1">
                                    <div class="statistics-title">Events per hour</div>
                                    <div class="statistics-info">
                                        <div>
                                            <span class="statistics-label">AHI:</span>
                                            <span class="statistics-value">{{
                                                deviceReport?.ahi ? deviceReport.ahi : '-'
                                            }}</span>
                                        </div>
                                        <div>
                                            <span class="statistics-label">AI:</span>
                                            <span class="statistics-value">{{
                                                deviceReport?.ai ? deviceReport.ai : '-'
                                            }}</span>
                                        </div>
                                        <div>
                                            <span class="statistics-label">HI:</span>
                                            <span class="statistics-value">{{
                                                deviceReport?.hi ? deviceReport.hi : '-'
                                            }}</span>
                                        </div>
                                        <div>
                                            <span class="statistics-label">Centrals:</span>
                                            <span class="statistics-value">{{
                                                deviceReport?.ca_avg ? deviceReport.ca_avg : '-'
                                            }}</span>
                                        </div>
                                        <div>
                                            <span class="statistics-label">Obstructive:</span>
                                            <span class="statistics-value"></span>
                                        </div>
                                        <div>
                                            <span class="statistics-label">RERA:</span>
                                            <span class="statistics-value"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 底部的图表 -->
                <div v-loading="loading">
                    <div class="bottom-charts">
                        <!-- Compliance Report -->
                        <compliance-report
                            :bar-chart-data="barChartData"
                            v-if="options.reportType === 1"
                        />
                        <!-- Therapy Report -->
                        <therapy-report
                            :bar-chart-data="barChartData"
                            :deviceReport="deviceReport"
                            v-if="options.reportType === 2"
                        />
                        <!-- Detailed Report -->
                        <detailed-report
                            ref="detailedReportRef"
                            v-model:loading="loading"
                            v-if="options.reportType === 3"
                        />
                    </div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
    import moment from 'moment';
    import TherapyReport from './report-chart-module/therapy-report.vue';
    import DetailedReport from './report-chart-module/detailed-report.vue';
    import ComplianceReport from './report-chart-module/compliance-report.vue';

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
        detailedReportRef.value?.resetData();
    };

    interface Options {
        reportType: number;
        customDate: string[];
        selectTime: number;
        selDate?: string;
    }
    const options = ref<Options>({
        reportType: 1,
        customDate: ['30', '30'],
        selectTime: 1,
    });

    const detailedReportRef = ref<InstanceType<typeof DetailedReport>>();
    const show = (option: Options) => {
        options.value = option;
        dialogVisible.value = true;

        getReportInfo();
        getDeviceSetting();

        if (options.value.reportType === 3) {
            loading.value = true;
            nextTick(() => {
                detailedReportRef.value?.initData(options.value.selDate || moment().format('YYYY-MM-DD'));
            });
        } else {
            getChartData(options.value.customDate);
        }
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
                // 空值设置成 -
                for (const key of Object.keys(res.data) as Array<keyof DeviceReportRes>) {
                    if (res.data[key] === '') {
                        res.data[key] = '-';
                    }
                }
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
    const getChartData = (rangeDate: string[]) => {
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

    // 报告
    const isExport = ref(false);

    const { t } = useI18n();
    // 导出报告
    const exportReport = () => {
        isExport.value = true;

        // const element = reportRef.value;

        // 如果是手机

        const { userAgent } = window.navigator;
        const isMobile = /(Android|webOS|iPhone|iPod|tablet|BlackBerry|Mobile)/i.test(userAgent);

        // 获取本机信息
        if (isMobile) {
            ElMessage.warning(t('charts.ExportDataReportTips'));
        }
        // ElLoading.service({
        //     target: reportRef.value,
        //     body: true,
        //     text: '正在生成报告，请稍后...',
        // });

        // await html2pdf(element, {
        //     margin: 0,
        //     filename: 'report.pdf',
        //     image: { type: 'jpeg', quality: 1 },

        //     jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        // });

        // ElLoading.service({ target: reportRef.value }).close();

        setTimeout(() => {
            isExport.value = false;
        }, 500);
    };

    // 打印配置
    const printOptions = ref({
        id: 'reportRef',
        preview: false,

        beforeOpenCallback() {
            console.log('打印前');
        }, // 开启打印前的回调事件
        openCallback() {
            console.log('打印');
        }, // 调用打印之后的回调事件

        closeCallback() {}, // 关闭打印的回调事件（无法确定点击的是确认还是取消）
    });

    defineExpose({
        show,
    });
</script>

<style lang="scss" scoped>
    .export {
        position: absolute;
        top: 40px;
        right: 40px;
    }

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
            flex: 1;
            flex-basis: 250px;
            margin-right: 30px;

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
        margin-bottom: 20px;
        border: 1px solid#000;

        .compliance-module {
            padding: 10px 40px;
            margin-bottom: 10px;

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

    :deep(.chart-module) {
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

    .statistics {
        .statistics-container {
            padding: 10px 40px;
        }

        .title {
            height: 50px;
            line-height: 50px;
            text-align: center;
            border-bottom: 1px solid #000;
        }

        .statistics-title {
            margin-bottom: 15px;
            font-size: $font-middle;
            font-weight: bold;
        }

        .statistics-info {
            font-size: $font-small;
            line-height: 1.35;
        }
    }

    // 打印媒体查询
    @media print {
        @page {
            margin: 30px 15px 15px;
            size: auto;
        }

        .report-ref {
            -webkit-print-color-adjust: exact !important; /* Chrome, Safari */
            color-adjust: exact !important; /* Firefox */
            print-color-adjust: exact !important;
        }
    }
</style>
