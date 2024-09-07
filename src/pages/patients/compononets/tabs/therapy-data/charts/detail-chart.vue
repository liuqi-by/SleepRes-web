<!-- 联动图表 -->
<template>
    <client-only>
        <v-chart
            ref="chart"
            :option="option"
            @datazoom="handleDataZoom"
            :onZr:mousewheel="handleWheel"
            group="curveView"
        />
    </client-only>
</template>

<script setup lang="ts">
    import type { EChartsOption } from 'echarts/types/dist/shared.js';
    import VChart from 'vue-echarts';
    import {
        GridComponent,
        TooltipComponent,
        TitleComponent,
        ToolboxComponent,
        AxisPointerComponent,
        LegendComponent,
        DataZoomComponent,
    } from 'echarts/components';
    import { use } from 'echarts/core';
    import { CanvasRenderer } from 'echarts/renderers';
    import { LineChart } from 'echarts/charts';
    import moment from 'moment';
    import type { ConnectChartRes, TipsProps } from '~/api/report/types';

    use([
        TitleComponent,
        TooltipComponent,
        GridComponent,
        ToolboxComponent,
        AxisPointerComponent,
        LegendComponent,
        CanvasRenderer,
        LineChart,
        DataZoomComponent,
    ]);

    interface PropsInterface {
        date: string;
        data: ConnectChartRes;
        title: string;
        color: string;
        name: string;
        yAxis: number[];
        // isFirstChart: boolean;
        dataZoom: number[];
        level: number;
    }
    const props = defineProps<PropsInterface>();

    // const { t } = useI18n();
    const chart = ref<InstanceType<typeof VChart>>();

    const emit = defineEmits<{
        changeOptionTime: [date: number[]];
        changeDataZoom: [dataZoom: number[], level: number];
        getSumData: [times: number, fn: (res: TipsProps) => void];
    }>();

    // loading
    // let loading = ref<boolean>(true);

    // 通用option配置
    const { commonOption } = useConnectChartCommonOption();
    // 缩放级别
    let mlevel = 1;
    let lastPercentDiff = 100;

    // 时间范围
    let timeStart = new Date(moment(props.date).startOf('day').hour(12).format('YYYY-MM-DD HH:mm:ss')).getTime();
    let timeEnd = new Date(
        moment(props.date).startOf('day').hour(12).add(1, 'day').format('YYYY-MM-DD HH:mm:ss'),
    ).getTime();

    let timeDif = timeEnd - timeStart;
    let timer: NodeJS.Timeout | null = null;

    // 优化鼠标滚轮放大
    const handleWheel = (event: any) => {
        const delta = event.wheelDelta; // 获取滚轮滚动的距离
        const zoomScale = delta > 0 ? 0.5 : 5; // 定义缩放比例
        // 获取当前的dataZoom状态
        const dataZoomOption = chart.value?.getOption().dataZoom[0];

        const currentStart = dataZoomOption.start;
        const currentEnd = dataZoomOption.end;
        const currentRange = currentEnd - currentStart;

        if (currentRange <= 0.02) {
            return;
        }
        // 获取鼠标在图表容器内的位置
        const x = event.offsetX;
        // 转成百分比型式
        let percentage = chart.value?.convertFromPixel('xAxis', x)
            ? ((chart.value?.convertFromPixel('xAxis', x) - timeStart) / (timeEnd - timeStart)) * 100
            : 49;

        // 计算缩放后的新范围
        const newRange = currentRange * zoomScale;
        // 计算左右比例
        const leftPercentage = (percentage - currentStart) / currentRange;
        // const rightPercentage = (currentRange - percentage) / currentRange;
        // 根据左右比例缩放
        let newStart = percentage - newRange * leftPercentage;
        let newEnd = percentage + newRange - newRange * leftPercentage;
        // 手动去修改
        chart.value?.dispatchAction({
            type: 'dataZoom',
            start: newStart < 0 ? 0 : newStart,
            end: newEnd > 100 ? 100 : newEnd,
        });
    };

    // 处理datazoom事件
    const handleDataZoom = (event: any) => {
        if (event) {
            let start = (event.batch && event.batch[0].start) || event.start;
            let end = (event.batch && event.batch[0].end) || event.end;
            // 同步datazoom

            let startTime = timeStart + Math.round(timeDif * (start / 100));
            let endTime = timeStart + Math.round(timeDif * (end / 100));

            let diff = endTime - startTime;
            // 取整
            let percentDiff = end - start;

            // mircodiff !== 0，说明是放大而不是拖拽，拖拽横坐标跨度是不变的
            let mircodiff = Math.abs(percentDiff - lastPercentDiff);

            lastPercentDiff = percentDiff;

            // 更新时间范围
            function emitTimeChange() {
                timer = setTimeout(() => {
                    if (mlevel === 1) {
                        emit('changeOptionTime', []);
                    } else {
                        emit('changeOptionTime', [startTime, endTime]);
                    }
                }, 100);
            }
            // console.log('percentDiff', percentDiff, 'lastPercentDiff', lastPercentDiff, 'mircodiff', mircodiff);
            // console.log(mircodiff);
            if (mircodiff) {
                let oldlevel = mlevel;
                if (diff > 12 * 60 * 60 * 1000) {
                    // 跨度24小时

                    mlevel = 1;
                } else if (diff <= 12 * 60 * 60 * 1000 && diff >= 4 * 60 * 60 * 1000) {
                    // 跨度12小时

                    mlevel = 2;
                } else if (diff < 4 * 60 * 60 * 1000 && diff >= 1 * 60 * 60 * 1000) {
                    // 跨度4小时

                    mlevel = 3;
                } else if (diff < 1 * 60 * 60 * 1000 && diff >= 12 * 60 * 1000) {
                    // 跨度1小时

                    mlevel = 4;
                } else if (diff < 12 * 60 * 1000 && diff >= 60 * 1000) {
                    // 跨度12分钟

                    mlevel = 5;
                } else if (diff < 60 * 1000 && diff >= 12 * 1000) {
                    // 跨度1分钟

                    mlevel = 6;
                } else if (diff < 12 * 1000 && diff >= 3 * 1000) {
                    // 跨度12秒钟

                    mlevel = 7;
                } else if (diff < 3 * 1000) {
                    // 跨度12秒钟

                    mlevel = 8;
                }

                if (mlevel !== oldlevel) {
                    if (timer) {
                        clearTimeout(timer);
                    }

                    emitTimeChange();
                }
            }
            // 更新datazoo和level
            emit('changeDataZoom', [start, end], mlevel);

            if (!mircodiff) {
                // 要做防抖

                if (timer) {
                    clearTimeout(timer);
                }
                // 拖拽
                emitTimeChange();
            }
        }
    };

    // 获取计算后tips的值
    // let result: TipsProps = {
    //     Pressure: '',
    //     Flow: '',
    //     Leak: '',
    //     Spo: '',
    //     PR: '',
    //     alarm_event: '',
    //     ar_event: '',
    //     central_event: '',
    //     hypopnea_event: '',
    //     mixed_events: '',
    //     ob_event: '',
    //     ore_str: '',
    //     pm_event: '',
    //     sr_event: '',
    // };
    // const getSumData = (times: number) => {
    //     result = {
    //         Pressure: '',
    //         Flow: '',
    //         Leak: '',
    //         Spo: '',
    //         PR: '',
    //         alarm_event: '',
    //         ar_event: '',
    //         central_event: '',
    //         hypopnea_event: '',
    //         mixed_events: '',
    //         ob_event: '',
    //         ore_str: '',
    //         pm_event: '',
    //         sr_event: '',
    //     };
    //     emit('getSumData', times, (res: TipsProps) => {
    //         result = res;
    //     });
    //     return result;
    // };

    const option = ref<EChartsOption>({
        ...commonOption,
        animation: false,
        title: {
            ...commonOption.title,
            text: props.title,
        },
        yAxis: props.yAxis
            ? {
                  ...commonOption.yAxis,
                  min: props.yAxis[0],
                  max: props.yAxis[1],
              }
            : {
                  ...commonOption.yAxis,
                  min: 0,
              },
        // @ts-expect-error
        xAxis: {
            type: 'time',
            position: 'bottom',
            splitLine: { show: false },
            axisTick: { show: false },
            boundaryGap: false,

            axisLabel: {
                hideOverlap: true,
                // 格式化x轴显示
                formatter: function (value: any) {
                    if (mlevel < 4) {
                        return moment(value).format('HH:mm');
                    } else {
                        return moment(value).format('HH:mm:ss');
                    }
                },
            },
            splitNumber: mlevel >= 4 ? 7 : 10,

            min: timeStart,
            max: timeEnd,
            axisPointer: {
                type: 'line',
            },
        },
    });

    // 获取y轴最大值
    const getYaxisMax = () => {
        let max = 0;
        props.data.forEach(item => {
            if (Number(item[1]) > max) {
                max = Number(item[1]);
            }
        });

        return props.yAxis[1] > max ? props.yAxis[1] : max;
    };

    // 在时间段中间插入空值，防止超过10分钟的数据还连线
    const insertEmptyData = (data: ConnectChartRes) => {
        let lastTime = data[0][0];
        data.forEach((item, index) => {
            if (item[0] - lastTime > 1000 * 600) {
                data.splice(index, 0, [item[0] + 1000, '-']);
            }
            lastTime = item[0];
        });

        return data;
    };

    // 同步dataZoom，不采用conncect，从而优化性能
    watch(
        () => props.dataZoom,
        () => {
            mlevel = props.level;
            // nextTick 防止图表还没加载就调用
            nextTick(() => {
                chart.value?.setOption({
                    dataZoom: {
                        ...commonOption.dataZoom,
                        start: props.dataZoom[0],
                        end: props.dataZoom[1],
                    },
                });
            });
        },
        {
            deep: true,
            immediate: true,
        },
    );

    // 监听数据变化
    watch(
        [
            () => props.data,
            //  () => props.isFirstChart
        ],
        () => {
            // nextTick 防止图表还没加载就调用
            nextTick(() => {
                chart.value?.setOption({
                    yAxis: {
                        ...commonOption.yAxis,
                        max: getYaxisMax,
                    },
                    xAxis: {
                        ...option.value.xAxis,
                    },
                    // 优化性能，只有第一个chart我才去计算所有值
                    // tooltip: {
                    //     ...commonOption.tooltip,
                    //     formatter: (params: any) => {
                    //         // let label = params[0].axisValueLabel;
                    //         let res = getSumData(params[0].axisValue);
                    //         let html =
                    //             `<div class="tooltip-title">${moment(params[0].axisValue).format('YYYY-MM-DD HH:mm:ss.SS')}</div>` +
                    //             `<div class="tooltip-content">`;
                    //         for (let key in res) {
                    //             let item = res[key as keyof TipsProps];
                    //             if (key && item) {
                    //                 html += `<div class="tooltip-content-item flex justify-between"><span>${t('charts.' + key)}：</span><span>${item}</span></div>`;
                    //             }
                    //         }
                    //         return html;
                    //     },
                    // },

                    series: [
                        {
                            name: props.name,
                            type: 'line',
                            smooth: true,
                            itemStyle: {
                                color: props.color,
                            },
                            lineStyle: {
                                color: props.color,
                                width: 2,
                            },
                            symbol: 'none',

                            largeThreshold: 2000,
                            data:
                                props.data.length > 0 &&
                                insertEmptyData(props.data.map(item => [Number(item[0]), item[1] || '-'])),
                            // data: props.data.map(item => [Number(item[0]), item[1] || '-']),
                            connectNulls: false,
                        },
                    ],
                });
            });
        },
        {
            deep: true,
            immediate: true,
        },
    );
    onMounted(() => {
        useChartResize(chart);
    });

    // onActivated(() => {
    //     nextTick(() => {
    //         setTimeout(() => {
    //             resize();
    //         }, 500);
    //     });
    // });

    const resize = () => {
        setTimeout(() => {
            if (chart.value) {
                chart.value.resize();
            }
        }, 500);
    };
    defineExpose({
        resize,
    });
</script>
