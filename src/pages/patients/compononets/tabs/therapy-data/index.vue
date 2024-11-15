<template>
    <div class="therapy-data">
        <!-- 静态信息 -->
        <div class="static-datas">
            <div class="static-data-list">
                <div
                    class="static-data-item"
                    v-for="(item, key) in deviceReport"
                    :key="key"
                >
                    <div class="static-data-label">{{ EnumStaticInfo[key] }}:</div>
                    &nbsp;
                    <div class="static-data-value">{{ key === 'best30' ? item + '%' : item }}</div>
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
            <div
                class="chart h-400px"
                v-loading="loading"
            >
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
    import { getDeviceReport, getBarChart } from '~/api/report';
    import type { UserInfo } from '~/api/login/types';
    import type { BarChartRes } from '~/api/report/types';

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
        if (activeTime.value === 'best30') {
            return ['30', '30'];
        } else if (typeof activeTime.value === 'number') {
            // 判断是否12点前,过了中午12点就传当天日期 12点之前传前一天日期
            const now = new Date();
            if (now.getHours() < 12) {
                return [
                    moment()
                        .subtract(activeTime.value - 1, 'day')
                        .format('YYYY-MM-DD'),
                    moment().subtract(1, 'day').format('YYYY-MM-DD'),
                ];
            } else {
                return [
                    moment()
                        .subtract(activeTime.value - 1, 'day')
                        .format('YYYY-MM-DD'),
                    moment().format('YYYY-MM-DD'),
                ];
            }
        } else {
            return [];
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

    const deviceReport = ref({
        usage_days_select: '-',
        pressure_95: '-',
        ahi: '-',
        usage_days_select_not: '-',
        hi: '-',
        ca_avg: '-',
        usetime_avg_select: '-',
        best30: '0',
        ai: '-',
        pressure_avg: '-',
        leak_avg_time: '-',
        leak_avg: '-',
    });
    enum EnumStaticInfo {
        usage_days_select = 'Days ≥ 4hrs',
        pressure_95 = 'Avg Pressure 95%',
        ahi = 'Average AHI',
        usage_days_select_not = 'Days < 4 hrs',
        hi = 'Average HI',
        ca_avg = 'Average CA',
        usetime_avg_select = 'Average hours of use',
        best30 = 'Best 30 Days',
        ai = 'Average AI',
        pressure_avg = 'Average pressure',
        leak_avg_time = 'Average time in High Leak',
        leak_avg = 'Average Leak',
    }

    const patient = inject<Ref<UserInfo>>('patient');

    // 获取静态信息
    const getStaticReport = (rangeDate: string[]) => {
        if (!patient || !patient.value.sn) {
            return;
        }

        getDeviceReport({
            sn: patient.value.sn,
            start_date: rangeDate[0],
            end_date: rangeDate[1],
        }).then(res => {
            if (res.code === 1) {
                for (const key of Object.keys(deviceReport.value) as Array<keyof typeof deviceReport.value>) {
                    if (res.data[key]) {
                        deviceReport.value[key] = res.data[key];
                    }
                }
            }
        });
    };

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
    const barChartData = ref<BarChartRes>({
        ...initBartChartData,
    });
    // 获取图表信息
    const loading = ref(false);
    const getChartData = (rangeDate: string[]) => {
        if (!patient || !patient.value.sn) {
            barChartData.value.dates = getDatesBetween(rangeDate[0], rangeDate[1]);
            return;
        }
        loading.value = true;
        getBarChart({
            sn: patient.value.sn,
            start_date: rangeDate[0],
            end_date: rangeDate[1],
        })
            .then(res => {
                console.log('error');
                if (res.code === 1) {
                    barChartData.value = res.data;
                } else {
                    barChartData.value = { ...initBartChartData };
                    barChartData.value.dates = getDatesBetween(rangeDate[0], rangeDate[1]);
                }
            })

            .finally(() => {
                loading.value = false;
            });
    };

    watch(
        activeTime,
        async () => {
            const rangeDate = getRangeDate();

            await Promise.all([getStaticReport(rangeDate), getChartData(rangeDate)]);
            if (barChartData.value.dates.length === 0) {
                barChartData.value.dates = getDatesBetween(rangeDate[0], rangeDate[1]);
            }
        },
        {
            immediate: true,
            deep: true,
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
