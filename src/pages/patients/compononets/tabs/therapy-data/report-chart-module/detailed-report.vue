<!-- Detailed Report -->
<template>
    <div>
        <div
            class="chart-module"
            :key="queryOption.hapdate"
        >
            <div class="chart m-b-30px">
                <connect-chart
                    :date="queryOption.hapdate"
                    :data="leakData"
                    @change-option-time="changeOptionTime"
                    @change-data-zoom="changeDataZoom"
                    :dataZoom="dataZoom"
                    :level="level"
                    :title="[`{a|${$t('charts.Leak')}}`, `{b|（L/min）}`].join('')"
                    color="#54B22D"
                    name="Leak"
                    :yAxis="[0, 200]"
                    ref="chart"
                />
            </div>
            <div class="chart m-b-30px">
                <connect-chart
                    :date="queryOption.hapdate"
                    :data="pressureData"
                    @change-option-time="changeOptionTime"
                    @change-data-zoom="changeDataZoom"
                    :dataZoom="dataZoom"
                    :level="level"
                    :title="[`{a|${$t('charts.Pressure')}}`, `{b|（cmH2O）}`].join('')"
                    color="#54B22D"
                    name="Pressure"
                    :yAxis="[0, 40]"
                    ref="chart"
                />
            </div>
            <div class="chart">
                <event-chart
                    ref="chart"
                    :data="eventData"
                    :date="queryOption.hapdate"
                    :dataZoom="dataZoom"
                    :level="level"
                    :yAxis="[0, 10]"
                    @change-data-zoom="changeDataZoom"
                    @change-option-time="changeOptionTime"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import moment from 'moment';
    import ConnectChart from '../charts/detail-chart.vue';
    import EventChart from '../charts/event-chart.vue';
    import type { UserInfo } from '~/api/login/types';
    import type { AllDataRes, ConnectChartRes, EventRes } from '~/api/report/types';

    // 动态图表

    const patient = inject<Ref<UserInfo>>('patient');

    const loading = defineModel('loading', {
        default: false,
        type: Boolean,
    });

    // 请求参数，默认是
    let queryOption = ref({
        startValue: '12:00:00',
        endValue: '11:59:59',
        hapdate: moment().format('YYYY-MM-DD'),
    });

    // x start end
    let dataZoom = ref<number[]>([0, 100]);
    // 缩放level
    let level = ref(1);

    // 修改请求参数时间
    const changeOptionTime = (dates: number[]) => {
        if (dates.length > 1) {
            console.log(moment(dates[0]).format('HH:mm:ss'), moment(dates[1]).format('HH:mm:ss'));
            queryOption.value.startValue = moment(dates[0]).format('HH:mm:ss');
            queryOption.value.endValue =
                moment(dates[1]).format('HH:mm:ss') === '12:00:00' ? '11:59:59' : moment(dates[1]).format('HH:mm:ss');
        } else {
            queryOption.value.startValue = '12:00:00';
            queryOption.value.endValue = '11:59:59';
        }
    };

    // 同步dataZoom，level
    const changeDataZoom = (val: number[], lev: number) => {
        // 异步，以防过度更新性能问题

        dataZoom.value = val;
        level.value = lev;
    };

    // 漏气
    const leakData = ref<ConnectChartRes>([]);
    // 压力
    const pressureData = ref<ConnectChartRes>([]);
    // 事件
    const eventData = ref<EventRes>({
        alarm_event: [],
        ar_event: [],
        central_event: [],
        hypopnea_event: [],
        mixed_events: [],
        ob_event: [],
        ore_str: [],
        pm_event: [],
        sr_event: [],
    });

    // 接口请求
    const queryData = () => {
        if (!patient || !patient.value.sn) {
            return;
        }

        // 请求all_data，除了事件以外
        useConnectReq<AllDataRes>('all_data')
            .getData({ ...queryOption.value, sn: patient.value.sn })
            .then(allData => {
                if (allData) {
                    pressureData.value = allData.pressure;

                    leakData.value = allData.leak;

                    setTimeout(() => {
                        loading.value = false;
                    }, 500);
                    // 请求事件图数据
                    useConnectReq<EventRes>('event_data')
                        .getData({ ...queryOption.value, sn: patient.value.sn })
                        .then(eventDatas => {
                            if (eventDatas) {
                                eventData.value = eventDatas;
                            }
                        })
                        .catch();
                }
            })
            .catch()
            .finally(() => {
                setTimeout(() => {
                    loading.value = false;
                }, 500);
            });

        // useConnectReq<ConnectChartRes>('leak_data')
        //     .getData({ ...queryOption.value, sn: patient.value.sn })
        //     .then(data => {
        //         if (data) {
        //             leakData.value = data;
        //         }
        //     })
        //     .catch()
        //     .finally(() => {
        //         setTimeout(() => {
        //             loading.value = false;
        //         }, 500);
        //     });

        // useConnectReq<ConnectChartRes>('pressure_data')
        //     .getData({ ...queryOption.value, sn: patient.value.sn })
        //     .then(data => {
        //         if (data) {
        //             pressureData.value = data;
        //         }
        //     })
        //     .catch()
        //     .finally(() => {
        //         setTimeout(() => {
        //             loading.value = false;
        //         }, 500);
        //     });

        // 请求事件图数据
        // useConnectReq<EventRes>('event_data')
        //     .getData({ ...queryOption.value, sn: patient.value.sn })
        //     .then(eventDatas => {
        //         if (eventDatas) {
        //             eventData.value = eventDatas;
        //         }
        //     })
        //     .catch();

        // useConnectReq<ConnectChartRes>('pressure_data')
        //     .getData(queryOption.value)
        //     .then(data => {
        //         if (data) {
        //             pressureData.value = data;
        //         }
        //     });
        // useConnectReq<ConnectChartRes>('leak_data')
        //     .getData(queryOption.value)
        //     .then(data => {
        //         if (data) {
        //             leakData.value = data;
        //         }
        //     });
        // useConnectReq<ConnectChartRes>('flow_data')
        //     .getData(queryOption.value)
        //     .then(data => {
        //         if (data) {
        //             flowData.value = data;
        //         }
        //     });
        // useConnectReq<ConnectChartRes>('spo_data')
        //     .getData(queryOption.value)
        //     .then(data => {
        //         if (data) {
        //             spoData.value = data;
        //         }
        //     });
    };

    // 重置请求参数和缩放
    const resetData = () => {
        queryOption.value.startValue = '12:00:00';
        queryOption.value.endValue = '11:59:59';
        queryOption.value.hapdate = moment().format('YYYY-MM-DD');
        dataZoom.value = [0, 100];
        level.value = 1;
    };

    // 时间改变时获取data
    watch(
        queryOption,
        () => {
            queryData();
        },
        {
            deep: true,
        },
    );

    const initData = (date?: string) => {
        if (date) {
            queryOption.value.hapdate = date;
        }
        queryData();
    };

    defineExpose({
        initData,
        resetData,
    });
</script>

<style lang="scss" scoped></style>
