<template>
    <div class="therapy-data">
        <!-- 静态信息 -->
        <div class="static-datas">
            <div class="static-data-list">
                <div
                    class="static-data-item"
                    v-for="(item, key) in staticList"
                    :key="key"
                >
                    <div class="static-data-label">{{ key }}:</div>
                    <div class="static-data-value">{{ item }}</div>
                </div>
            </div>
            <div class="create-btn">
                <base-button
                    type="primary"
                    @click="createReport"
                    >{{ $t('patients.CreateReport') }}</base-button
                >
            </div>
        </div>
        <!-- 图表 -->
        <div class="charts">
            <div class="time-list">
                <div
                    class="time-item"
                    v-for="item in timeList"
                    :key="item.label"
                    :class="{ active: item.value === activeTime }"
                    @click="handleSelectTime(item.value)"
                >
                    {{ item.label }}
                </div>
            </div>
            <div class="chart h-400px">
                <usage-chart
                    :dates="barChartData.dates"
                    :sumtime="barChartData.sumtime"
                />
            </div>
        </div>
        <!-- 报告生成 -->
        <report-generation v-model="isShowReportDialog" />
    </div>
</template>

<script setup lang="ts">
    import moment from 'moment';
    import ReportGeneration from './report-generation.vue';
    import UsageChart from './charts/usage-chart.vue';
    import { getStaticInfo, getUsageInfo } from '~/api/report';

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

    const staticList = ref({
        'Days ≥ 4hrs': '20/30',
        'Avg Pressure 95%': '8.1',
        'Average AHI': '6.4',
        'Days < 4 hrs': '10/30',
        'Average HI': '0.3',
        'Average CA': '2.3',
        'Average hours of use': ' 4.5',
        'Best 30 Days': '66.6%',
        'Average AI': '4.2',
        'Average pressure': '7.4',
        'Average time in High Leak': '00:20',
        'Average Leak': '10.3 lpm',
    });

    const timeList = ref([
        { label: '7 Days', value: 7 },
        { label: '14 Days', value: 14 },
        { label: '30 Days', value: 30 },
        { label: '90 Days', value: 90 },
        { label: '180 Days', value: 180 },
        { label: '365 Days', value: 365 },
        { label: 'Best 30', value: 'best30' },
    ]);

    // 时间默认是30天
    const activeTime = ref<string | number>(30);

    const getRangeDate = () => {
        if (typeof activeTime.value === 'string') {
            return [moment().subtract(29, 'day').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')];
        } else {
            return [
                moment()
                    .subtract(activeTime.value - 1, 'day')
                    .format('YYYY-MM-DD'),
                moment().format('YYYY-MM-DD'),
            ];
        }
    };

    // 选择时间
    const handleSelectTime = (value: number | string) => {
        activeTime.value = value;
    };

    const isShowReportDialog = ref(false);
    // 创建报告
    const createReport = () => {
        isShowReportDialog.value = true;
    };

    // 获取静态信息
    const getStaticData = (rangeDate: string[]) => {
        getStaticInfo({
            sn: '',
            start_date: rangeDate[0],
            end_date: rangeDate[1],
        }).then(res => {
            console.log(res);
        });
    };

    // 获取图表信息
    const getChartData = (rangeDate: string[]) => {
        getUsageInfo({
            sn: '',
            start_date: rangeDate[0],
            end_date: rangeDate[1],
        }).then(res => {
            console.log(res);
        });
    };

    watch(
        activeTime,
        () => {
            const rangeDate = getRangeDate();
            getStaticData(rangeDate);
            getChartData(rangeDate);
        },
        {
            immediate: true,
        },
    );
</script>

<style lang="scss" scoped>
    .therapy-data {
        padding: 30px;
    }

    .static-datas {
        display: flex;
    }

    .static-data-list {
        display: grid;
        flex: 4;
        grid-template-columns: repeat(3, 1fr); /* 三列，每列宽度相等 */
        gap: 10px; /* 网格项之间的间隙 */
        padding-top: 10px;
        font-size: $font-small;
        text-align: center;

        .static-data-item {
            display: flex;
            margin-bottom: 10px;
        }

        .static-data-label {
            white-space: nowrap;
        }
    }

    .create-btn {
        display: flex;
        flex: 1;
        align-items: center;
        justify-content: center;
    }

    .time-list {
        display: flex;
        margin-top: 20px;
        margin-bottom: 20px;

        .time-item {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 80px;
            height: 40px;
            cursor: pointer;
            background-color: #fff;
            border: 1px solid #ccc;

            &:not(:last-child) {
                border-right: 0;
            }

            // &.active,
            // &:hover {
            //     color: #fff;
            //     background-color: var(--el-color-primary);
            //     border-color: var(--el-color-primary);
            // }
            @include active;
        }
    }
</style>
