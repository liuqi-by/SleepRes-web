<!-- 报告打印预览 -->
<template>
    <div class="report-preview">
        <el-dialog
            v-model="dialogVisible"
            width="920"
            @close="close"
            class="form form-dialog"
        >
            <div class="form-title">Compliance Report</div>
            <div class="top-Info">
                <div class="report-row">
                    <div class="title">mingzi</div>
                </div>
                <div class="report-row-content">
                    <div class="info-box flex-1">
                        <div class="label">Date of Birth:</div>
                        <div class="detail">123123123123123123</div>
                    </div>
                </div>
                <div class="report-row-content">
                    <div class="info-box">
                        <div class="label">Patient ID:</div>
                        <div class="detail">123123123123123123</div>
                    </div>
                    <div class="info-box">
                        <div class="label">DME Office Name:</div>
                        <div class="detail">123123123123123123</div>
                    </div>
                    <div class="info-box">
                        <div class="label">Date range of report:</div>
                        <div class="detail">123123123123123123</div>
                    </div>
                </div>
                <div class="report-row-content">
                    <div class="info-box">
                        <div class="label">Patient Phone #:</div>
                        <div class="detail">123123123123123123</div>
                    </div>
                    <div class="info-box">
                        <div class="label">DME Office Address:</div>
                        <div class="detail">123123123123123123</div>
                    </div>

                    <div class="info-box">
                        <div class="label">Mask:</div>
                        <div class="detail">123123123123123123</div>
                    </div>
                </div>
                <div class="report-row-content">
                    <div class="info-box">
                        <div class="label">Therapy Start Date:</div>
                        <div class="detail">123123123123123123</div>
                    </div>
                    <div class="info-box">
                        <div class="label">DME Phone #:</div>
                        <div class="detail">123123123123123123</div>
                    </div>
                    <div class="info-box">
                        <div class="label">Device Name:</div>
                        <div class="detail">123123123123123123</div>
                    </div>
                </div>
                <div class="report-row-content">
                    <div class="info-box flex-1">
                        <div class="label">Device Serial #:</div>
                        <div class="detail">123123123123123123</div>
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
                            <div class="detail">123123123123123123</div>
                        </div>
                        <div class="compliance-row">
                            <div class="label">Days without usage</div>
                            <div class="detail">123123123123123123</div>
                        </div>
                        <div class="compliance-row">
                            <div class="label">Days with usage greater or equal to 4 hrs</div>
                            <div class="detail">123123123123123123</div>
                        </div>
                        <div class="compliance-row">
                            <div class="label">Days with usage less than 4 hrs</div>
                            <div class="detail">123123123123123123</div>
                        </div>
                        <div class="compliance-row">
                            <div class="label">Average Usage per day</div>
                            <div class="detail">123123123123123123</div>
                        </div>
                        <div class="compliance-row">
                            <div class="label">Percentage of days with usage</div>
                            <div class="detail">123123123123123123</div>
                        </div>
                    </div>
                    <div class="compliance-module">
                        <div class="title">Auto CPAP Summary</div>
                        <div class="compliance-row">
                            <div class="label">Mean Pressure</div>
                            <div class="detail">123123123123123123</div>
                        </div>
                        <div class="compliance-row">
                            <div class="label">Average pressure</div>
                            <div class="detail">123123123123123123</div>
                        </div>
                        <div class="compliance-row">
                            <div class="label">{{ 'Device pressure <= 95% of the time' }}</div>
                            <div class="detail">123123123123123123</div>
                        </div>
                        <div class="compliance-row">
                            <div class="label">Average time in large leak per day</div>
                            <div class="detail">123123123123123123</div>
                        </div>
                        <div class="compliance-row">
                            <div class="label">Average AHI</div>
                            <div class="detail">123123123123123123</div>
                        </div>
                        <div class="compliance-row">
                            <div class="label">Average AI</div>
                            <div class="detail">123123123123123123</div>
                        </div>
                        <div class="compliance-row">
                            <div class="label">Average HI</div>
                            <div class="detail">123123123123123123</div>
                        </div>
                        <div class="compliance-row">
                            <div class="label">Average CA</div>
                            <div class="detail">123123123123123123</div>
                        </div>
                    </div>
                    <div class="compliance-module">
                        <div class="title">Device Settings</div>
                        <div class="compliance-row">
                            <div class="label">Min Pressure</div>
                            <div class="detail">123123123123123123</div>
                        </div>
                        <div class="compliance-row">
                            <div class="label">Max Pressure</div>
                            <div class="detail">123123123123123123</div>
                        </div>
                        <div class="compliance-row">
                            <div class="label">Ramp Time</div>
                            <div class="detail">123123123123123123</div>
                        </div>
                        <div class="compliance-row">
                            <div class="label">Ramp Start Pressure</div>
                            <div class="detail">123123123123123123</div>
                        </div>
                        <div class="compliance-row">
                            <div class="label">Tubing</div>
                            <div class="detail">123123123123123123</div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 底部的图表 -->
            <div
                class="bottom-charts"
                v-if="reportType === 1"
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
                        <usage-chart
                            :dates="barChartData.dates"
                            :sumtime="barChartData.sumtime"
                        />
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
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
    import UsageChart from './charts/usage-chart.vue';
    import leakChart from './charts/leak-chart.vue';

    const barChartData = ref({
        dates: [
            '2024-07-30',
            '2024-07-31',
            '2024-08-01',
            '2024-08-02',
            '2024-08-03',
            '2024-08-04',
            '2024-08-05',
            '2024-08-06',
            '2024-08-07',
            '2024-08-08',
            '2024-08-09',
            '2024-08-10',
            '2024-08-11',
            '2024-08-12',
            '2024-08-13',
            '2024-08-14',
            '2024-08-15',
            '2024-08-16',
            '2024-08-17',
            '2024-08-18',
            '2024-08-19',
            '2024-08-20',
            '2024-08-21',
            '2024-08-22',
            '2024-08-23',
            '2024-08-24',
            '2024-08-25',
            '2024-08-26',
            '2024-08-27',
            '2024-08-28',
        ],
        sumtime: [
            0, 933, 0, 0, 0, 0, 0, 6480, 51488, 68642, 55816, 6120, 0, 6084, 994, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0,
        ],
        usetime: [
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '08/06 16:52:53#08/06 16:15:18#2255###',
            '08/07 16:16:54#08/07 16:06:28#626###08/07 16:17:52#08/07 16:17:32#20###08/07 16:34:37#08/07 16:18:02#995###08/07 19:14:40#08/07 18:10:31#3849###08/07 22:41:25#08/07 20:07:13#9252###08/08 10:32:00#08/08 10:16:07#953###08/08 11:59:58#08/08 11:51:50#488###',
            '08/08 13:36:01#08/08 12:00:00#5761###08/08 13:54:20#08/08 13:52:45#95###08/08 14:51:44#08/08 14:15:20#2184###08/08 21:51:38#08/08 17:38:53#15165###08/09 10:54:06#08/09 08:54:25#7181###',
            '08/09 14:07:37#08/09 13:37:46#1791###08/09 14:16:56#08/09 14:13:49#187###08/10 08:19:40#08/09 17:20:06#53974###',
            '08/10 15:27:27#08/10 13:42:03#6324###',
            '',
            '08/12 13:52:54#08/12 13:35:25#1049###08/12 14:59:51#08/12 14:21:55#2276###08/12 16:23:29#08/12 15:58:23#1506###08/12 17:02:09#08/12 17:01:58#11###08/12 17:23:57#08/12 17:04:16#1181###08/13 10:42:55#08/13 10:42:31#24###08/13 11:40:27#08/13 11:39:15#72###',
            '08/13 13:50:24#08/13 13:33:52#992###',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
        ],
        usetimes: [
            [
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                15318,
                14788,
                0,
                5866,
                6123,
                null,
                5725,
                5632,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
            ],
            [
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                2255,
                626,
                5761,
                1791,
                6324,
                null,
                1049,
                992,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
            ],
            [
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                38,
                1004,
                372,
                null,
                null,
                1741,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
            ],
            [
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                20,
                95,
                187,
                null,
                null,
                2276,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
            ],
            [
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                10,
                1260,
                10990,
                null,
                null,
                3512,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
            ],
            [
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                995,
                2184,
                53974,
                null,
                null,
                1506,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
            ],
            [
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                5754,
                10029,
                null,
                null,
                null,
                2309,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
            ],
            [
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                3849,
                15165,
                null,
                null,
                null,
                11,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
            ],
            [
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                3153,
                39767,
                null,
                null,
                null,
                127,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
            ],
            [
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                9252,
                7181,
                null,
                null,
                null,
                1181,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
            ],
            [
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                41682,
                null,
                null,
                null,
                null,
                62314,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
            ],
            [
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                953,
                null,
                null,
                null,
                null,
                24,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
            ],
            [
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                4790,
                null,
                null,
                null,
                null,
                3380,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
            ],
            [
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                488,
                null,
                null,
                null,
                null,
                72,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
            ],
        ],
        pressure_max: [
            '',
            10,
            '',
            '',
            '',
            '',
            '',
            5,
            16,
            12,
            9,
            9,
            '',
            30,
            30,
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
        ],
        pressure_95: [
            '',
            10,
            '',
            '',
            '',
            '',
            '',
            5,
            8.9,
            11.9,
            8,
            9,
            '',
            30,
            12,
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
        ],
        pressure_avg: [
            '',
            10,
            '',
            '',
            '',
            '',
            '',
            5,
            13.2,
            10.8,
            8.9,
            8.9,
            '',
            7.7,
            10.4,
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
        ],
        leak_max: [
            0, 29.1, 0, 0, 0, 0, 0, 200, 93.6, 178.4, 86, 197.1, 0, 104.5, 94.9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0,
        ],
        leak_avg: [
            0, 28.5, 0, 0, 0, 0, 0, 19.1, 17.6, 22.5, 20.5, 22.7, 0, 12.3, 22.2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0,
        ],
        ahi: [0, 0, 0, 0, 0, 0, 0, 0, 0.1, 0, 0, 0.6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        hi: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ai: [0, 0, 0, 0, 0, 0, 0, 0, 0.1, 0, 0, 0.6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        spo_avg: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 42, 65, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        spo_min: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 35, 35, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        pulse_avg: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 38, 94, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        pulse_min: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 25, 93, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    });

    const dialogVisible = ref(false);

    const close = () => {
        dialogVisible.value = false;
    };

    const reportType = ref(1);

    const show = (type: number) => {
        reportType.value = type;
        dialogVisible.value = true;
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
