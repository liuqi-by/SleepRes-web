<!-- 事件 -->
<template>
    <client-only>
        <v-chart
            ref="chart"
            :autoresize="true"
            :option="option"
            :onZr:mousewheel="handleWheel"
            @datazoom="handleDataZoom"
            group="curveView"
        />
    </client-only>
</template>

<script setup lang="ts">
    import VChart from 'vue-echarts';
    import { use } from 'echarts/core';
    import { CanvasRenderer } from 'echarts/renderers';
    import { ScatterChart, PictorialBarChart } from 'echarts/charts';
    import {
        GridComponent,
        TooltipComponent,
        TitleComponent,
        ToolboxComponent,
        AxisPointerComponent,
        LegendComponent,
        DataZoomComponent,
    } from 'echarts/components';
    import moment from 'moment';
    import type { EChartsOption } from 'echarts/types/dist/shared.js';
    import type { EventRes, TipsProps } from '~/api/report/types';
    use([
        TitleComponent,
        TooltipComponent,
        GridComponent,
        ToolboxComponent,
        AxisPointerComponent,
        LegendComponent,
        CanvasRenderer,
        ScatterChart,
        PictorialBarChart,
        DataZoomComponent,
    ]);

    interface PropsInterface {
        date: string;
        data: EventRes;
        // isFirstChart: boolean;
        dataZoom: number[];
        level: number;
        yAxis: number[];
    }
    const props = defineProps<PropsInterface>();

    const emit = defineEmits<{
        changeOptionTime: [date: number[]];
        changeDataZoom: [dataZoom: number[], level: number];
        getSumData: [times: number, fn: (res: TipsProps) => void];
    }>();

    const { t } = useI18n();

    const chart = ref<InstanceType<typeof VChart>>();

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

    const eventList = [
        {
            name: t('charts.ar_event'),
            icon: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARzQklUCAgICHwIZIgAAADhSURBVDiNrZOxjcIwFIa/50SpGSF3VHSMYKQMwCYcEyAmuLAJA0Q6j0BHBWQEasvRozhHyoWCyNzf2fL3+Un+LYxytrYssmyHyBIoAVC9I3L0IRwWzrXD8zJcXKrqG/gaS0ep502zfRJcq+pHwb6Ae8h9Ns0KwPQ3T4UBFGycFjlbWxZ5fpsKD+ND+DBFnm9SYIAiy3YG1XWqAJGlQWSWLIDSvAEDv6/QJtOqd4PqKVkgcjS+6/apvA/hYGK36wS+XjjX/k+VAeLGlEnqHo6yv4nV3qC6HnSkRfXku24//s4PWklUAKop8FkAAAAASUVORK5CYII=',
        },
        {
            name: t('charts.pm_event'),
            icon: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARzQklUCAgICHwIZIgAAAAdSURBVDiNYzwz8/9/BgoAEyWaRw0YNWDUgMFkAAD/DAODw7WPgwAAAABJRU5ErkJggg==',
        },
        {
            name: t('charts.ob_event'),
            icon: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAYAAABb0P4QAAAAAXNSR0IArs4c6QAAAARzQklUCAgICHwIZIgAAAD3SURBVDiNpZK9EYJAFIT3PfxJKQE6UCQxswTtgABJtQNKIHWswg7MRUc70BLMmfMMHFE8OB7jZnezt/PNzQcIEufhLDlO5pJuT1Ji0hmgXQC71m5bIc6DNYARQN7yEER/DUbnkctE6ftMjNTWbx0cPHgFwP3ckJecAuso2egGyrlWBwEAdy7UeDO93DoRDpWT1YwBgKv7TiNlLWGchzMmvW96BABcKL+OspaQSLd+fhOlQSih+8piG54qbhqEL4mlMbuVwY/E0piyl4O/Eosnf2QvB02JxZMV2elN1yCxNKXsDFgllqaUnTpqYg0XymeJxNLovpM+AcApT6z8CeojAAAAAElFTkSuQmCC',
        },
        {
            name: t('charts.central_event'),
            icon: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAARCAYAAADQWvz5AAAAAXNSR0IArs4c6QAAAARzQklUCAgICHwIZIgAAAFESURBVDiNpZRNUsJAEIXfSyasc4S4o8pQ4lqKSk4gN4DcQE6AnABvQG7gEUJpPAFKuRNPoPtkpl1QYMgPobRXU92vv3ozPTNAS0jS9STpem06q02Ajhobxx79GySCgOC4TceTkKTriaM+AIBZfsHwffs3Rx11cNK2vZMgEQT7ddv2KE+9EWy5qlLoCuTuSEzc10G0Np+UpO/C0bNy07lB8IGD9fRw2PLsB0I8AnDPQ8jWGJmr4SbeAYul3ZSWwO/ZNMSKWR4Vp1g7fkkvlwJO6mqExBy8ReV87dQE9JqsNNUqjiTpu+LkX00goP5yVhwZJ5sUsFtjTERjIgDf+6y2raDcVwERvN1DmOlQDTcxh5uYWX4NYAUAlmWdfnuS9F2T+iIv/qxRk/YWJvWl/LUcOdK2DigIefM6bwJxsJ5SEEKpI9APrcp8esvF7J0AAAAASUVORK5CYII=',
        },
        {
            name: t('charts.sr_event'),
            icon: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAARCAYAAAACCvahAAAAAXNSR0IArs4c6QAAAARzQklUCAgICHwIZIgAAADESURBVDiN7dPBEcFAGMXx/xf2roToQAkcTNZNCdEBFRgV0IGU4JgZFx3QgZTgajbmOTAGkxhy9o47+9vvO+yDmjiv1CXau5GmdXesCgFzIH46LgSTMrddNfaK22JpxrhuErDjwixs7XDDXrG7TUo/oNeIVTizMOd1fFvx2wdOUSMIYHSiRvCeP/4Zi1NDW0ThTBex+hFmAQaPv+2G6tFiCfTrhMSmNGbkVkBFq9pefYM1b60CFiG37Ku93EhTl2h/r2hlrl0HOyhGqJ56AAAAAElFTkSuQmCC',
        },
        {
            name: t('charts.ore_str'),
            icon: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAATCAYAAACUef2IAAAAAXNSR0IArs4c6QAAAARzQklUCAgICHwIZIgAAADRSURBVDiN7ZTbjcIwEEXPoLgP0kHoADrYEtgOkgoIFcQdUAMVQAdLB6QPI11+CEIIGyMeP8v5tHXPXFkjw6eoneavyNj1QeO0B3pB44PtkkI0NscGoAtWXt6NIpmpwV9daBGVFlqYYw+Mb90XqUZmtI3Tj+B3aH/R8qYwS3yiOrVvh2EZmSwxjwgHYm/8NF/xfxBLtFL+yuXsca/AzGM9QO20NlgBVSqUbCzRdsHKQQrgg+26YJN77WPiXoHSH2wZC/qDLQUTYJsacOZV//HbOAJnE0aSjhCiRAAAAABJRU5ErkJggg==',
        },
        {
            name: t('charts.hypopnea_event'),
            icon: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAARCAYAAAACCvahAAAAAXNSR0IArs4c6QAAAARzQklUCAgICHwIZIgAAADzSURBVDiN1dPBccIwEIXhT66AEkwH0AHphFQQqMCTCkgqgA6SDkgHFhXgDqAD5YAVFI9Nznkzuuy8f3cl7TKhlnWkbdlMecIYFGhQF+Eu8bzkq/RWBVRHPgL7HuwSW3SoA8fIsWVhAO0jqT/nYasnmsgle07sWmYhci5aPCRel7dqw+vMKpp0T3wNkQSJ+Rg0kqQOt4J+4MXI400pM9Vfxkf673D7e6ImVfoqXCFwzp8/BUX2+ZvQVYl54A0Smz5JMwA3gSPWfeiQeAqFYRHYYZUzJ94DL+6tfia2eZjGtmpVLEdW14/t4eGDlK32+7ye8nwDmeVbytwpYQ0AAAAASUVORK5CYII=',
        },
        {
            name: t('charts.alarm_event'),
            icon: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAAAXNSR0IArs4c6QAAAARzQklUCAgICHwIZIgAAAGJSURBVDiNlZTBddpAFEXvG1bZUYIoIFglOBXE2YE2QAUwFQgqEFQAbDBLu4KoBNkuICqBVbJifhaSiEgcEr3VPzN/7nkzel/iHX1MsqkzTYAIEWGUQGnYs/vBrnjyp3a//jiMUiB6D17rpGC+OPpds+CaYphsUoe2QISRB7MvCjZ4OSykYIMQbIaRA31z2g6TTXrlJB5lU3PaAhhavh7mq7/ZGI6zhaQMIGCzt4Pfufgh65urFs3M3wIAvD76taFldQ2lALqQjfzlcfHpFqCtu/H6K+I+YDMn9BkgmO3/F1BfZQPgTBNH/SV6kHeB9IyiLiOHKkhx9GUXyKVfRK4OEvEoi7pALv1G6aCCnEXcBXKG+7osXVD1oA7Nu0CcNKmM2LMA7pL1NyD6V9AatQJ30ncbOICArQCELYfjbHETkGzSJrEK5osnf9LVJrak8pgHs30P8uLoy3iURWcROzRH1Vu0XV9NcT1DGdC/YaYM2Ort8GuK9XtH/JD1wwemdZKv/idBtm8fbvQTYqewoBhAK6gAAAAASUVORK5CYII=',
        },
    ];

    // 图表option
    const option = ref<EChartsOption>({
        ...commonOption,
        yAxis: {
            ...commonOption.yAxis,
            min: 0,
            max: props.yAxis[1] || 10,
        },
        animation: false,
        title: {
            text: [`{a|${t('charts.Event')}}`].join(''),
            ...commonOption.title,
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'line',
            },
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
                    if (mlevel >= 4) {
                        // 其他的时间返回格式化 00:00
                        return moment(value).format('HH:mm:ss');
                    } else {
                        return moment(value).format('HH:mm');
                    }
                },
            },

            splitNumber: 10,
            min: timeStart,
            max: timeEnd,
            axisPointer: {
                type: 'line',
            },
        },
    });

    // 同步dataZoom和level，不采用conncect，从而优化性能
    watch(
        () => props.dataZoom,
        () => {
            mlevel = props.level;
            chart.value?.setOption({
                dataZoom: {
                    ...commonOption.dataZoom,
                    start: props.dataZoom[0],
                    end: props.dataZoom[1],
                },
            });
        },
    );

    watch(
        () => props.data,
        () => {
            if (!props.data) {
                return;
            }

            let xAxis: number[] = [];
            let bar: { [key: string]: number[] } = {
                alarm_event: [],
                ar_event: [],
                central_event: [],
                hypopnea_event: [],
                mixed_events: [],
                ob_event: [],
                ore_str: [],
                pm_event: [],
                sr_event: [],
            };
            // y轴最大值默认为10
            let max = 10;
            /**
             * 1. 遍历数据
             * 2. 生成x轴数据
             * 3. 生成柱状图数据
             *
             */
            // 生成柱状图数据
            for (const [key, val] of Object.entries(props.data)) {
                val.forEach(item => {
                    let time;
                    // 将时间近似到整点
                    time = roundTimestampByLevel(item[0] / 1000, props.level);

                    let index = xAxis.findIndex(i => i === time);

                    if (index === -1) {
                        xAxis.push(time);
                        bar[key as keyof EventRes][xAxis.length - 1] = 1;
                    } else if (bar[key as keyof EventRes][index]) {
                        bar[key as keyof EventRes][index] += 1;
                    } else {
                        bar[key as keyof EventRes][index] = 1;
                    }
                    // 生成最大值
                    max = bar[key as keyof EventRes][index] > max ? bar[key as keyof EventRes][index] : max;
                });
            }

            // console.log('bar', bar, 'xAxis', xAxis);
            // 填0
            // for (let i = 0; i < xAxis.length; i++) {
            //     for (let j = 0; j < Object.keys(bar).length; j++) {
            //         if (!bar[Object.keys(bar)[j]][i]) {
            //             bar[Object.keys(bar)[j]][i] = 0;
            //         }
            //     }
            // }

            // 根据bar生成
            const dealBar = (arr: Array<number>, name: string, barIndex: number) => {
                const bar: any = [];
                arr.forEach((item: number, index: number) => {
                    const data = [];
                    for (let i = 0; i < index; i++) {
                        data.push('');
                    }
                    if (item) {
                        data.push({ value: [xAxis[index], item], symbol: eventList[barIndex].icon });

                        bar.push({
                            name,
                            type: 'pictorialBar',
                            symbolSize: 16,
                            xAxisIndex: index + 1,
                            barWidth: 16,
                            barGap: 0,
                            symbolPosition: 'end',
                            symbolOffset: [0, '-8'],
                            data,
                        });
                    }
                });
                return bar;
            };
            // 防止图表还没加载就调用
            nextTick(() => {
                chart.value?.setOption(
                    {
                        ...option.value,
                        dataZoom: {
                            ...commonOption.dataZoom,
                            start: props.dataZoom[0],
                            end: props.dataZoom[1],
                        },

                        legend: {
                            data: eventList,
                            itemWidth: 12,
                            itemHeight: 12,
                            width: 700,

                            right: 10,
                            align: 'left',
                            itemGap: 15,
                        },

                        tooltip: {
                            trigger: 'axis',

                            axisPointer: {
                                type: 'line',
                            },
                        },
                        yAxis: {
                            ...commonOption.yAxis,
                            min: 0,
                            max: max > 10 ? max + 5 : 10,
                        },
                        xAxis: [
                            {
                                ...option.value.xAxis,
                            },
                            ...xAxis.map(item => {
                                let data = item;
                                return {
                                    type: 'time',
                                    position: 'bottom',
                                    splitLine: { show: false },
                                    axisTick: { show: false },
                                    boundaryGap: false,
                                    splitNumber: 10,
                                    min: timeStart,
                                    max: timeEnd,

                                    data,
                                    axisLabel: {
                                        show: false,
                                        // 格式化x轴显示
                                    },
                                    axisPointer: {
                                        show: false,
                                    },
                                };
                            }),
                        ],

                        /**
                         * 事件
                         * 气流受限事件
                         * 参数改变事件
                         * 阻塞性事件
                         * 中枢性事件
                         * 鼾声事件
                         * 氧减事件
                         * 低通气事件
                         * 报警事件
                         */
                        series: [
                            // 多列柱状图，数据为空情况下，也可以居中显示
                            ...dealBar(bar.ar_event, eventList[0].name, 0),
                            ...dealBar(bar.pm_event, eventList[1].name, 1),
                            ...dealBar(bar.ob_event, eventList[2].name, 2),
                            ...dealBar(bar.central_event, eventList[3].name, 3),
                            ...dealBar(bar.sr_event, eventList[4].name, 4),
                            ...dealBar(bar.ore_str, eventList[5].name, 5),
                            ...dealBar(bar.hypopnea_event, eventList[6].name, 6),
                            ...dealBar(bar.alarm_event, eventList[7].name, 7),

                            // 普通显示，symbol none不显示，只为展示tooltip
                            {
                                name: eventList[0].name,
                                type: 'pictorialBar',
                                symbolSize: 16,
                                symbol: 'none',
                                data: bar.ar_event.map((item, index) => {
                                    if (item) {
                                        return [xAxis[index], item];
                                    } else {
                                        return '';
                                    }
                                }),
                                barWidth: 16,
                                barGap: 0,
                                symbolPosition: 'end',

                                xAxisIndex: 0,
                            },
                            {
                                name: eventList[1].name,
                                type: 'pictorialBar',
                                symbolSize: 16,
                                symbol: 'none',
                                data: bar.pm_event.map((item, index) => {
                                    if (item) {
                                        return [xAxis[index], item];
                                    } else {
                                        return '';
                                    }
                                }),
                                barGap: 0,
                                barWidth: 16,
                                symbolPosition: 'end',
                                xAxisIndex: 0,
                            },
                            {
                                name: eventList[2].name,
                                type: 'pictorialBar',
                                symbolSize: 16,
                                symbol: 'none',
                                data: bar.ob_event.map((item, index) => {
                                    if (item) {
                                        return [xAxis[index], item];
                                    } else {
                                        return '';
                                    }
                                }),
                                barGap: 0,
                                barWidth: 16,
                                symbolPosition: 'end',
                                xAxisIndex: 0,
                            },
                            {
                                name: eventList[3].name,
                                type: 'pictorialBar',
                                symbolSize: 16,
                                symbol: 'none',
                                data: bar.central_event.map((item, index) => {
                                    if (item) {
                                        return [xAxis[index], item];
                                    } else {
                                        return '';
                                    }
                                }),
                                barGap: 0,
                                barWidth: 16,
                                symbolPosition: 'end',
                                xAxisIndex: 0,
                            },
                            {
                                name: eventList[4].name,
                                type: 'pictorialBar',
                                symbolSize: 16,
                                symbol: 'none',
                                data: bar.sr_event.map((item, index) => {
                                    if (item) {
                                        return [xAxis[index], item];
                                    } else {
                                        return '';
                                    }
                                }),
                                barGap: 0,
                                barWidth: 16,
                                symbolPosition: 'end',
                                xAxisIndex: 0,
                            },
                            {
                                name: eventList[5].name,
                                type: 'pictorialBar',
                                symbolSize: 16,
                                symbol: 'none',
                                data: bar.ore_str.map((item, index) => {
                                    if (item) {
                                        return [xAxis[index], item];
                                    } else {
                                        return '';
                                    }
                                }),
                                barGap: 0,
                                barWidth: 16,
                                symbolPosition: 'end',
                                xAxisIndex: 0,
                            },
                            {
                                name: eventList[6].name,
                                type: 'pictorialBar',
                                symbolSize: 16,
                                symbol: 'none',
                                data: bar.hypopnea_event.map((item, index) => {
                                    if (item) {
                                        return [xAxis[index], item];
                                    } else {
                                        return '';
                                    }
                                }),
                                barGap: 0,
                                barWidth: 16,
                                symbolPosition: 'end',
                                xAxisIndex: 0,
                            },
                            {
                                name: eventList[7].name,
                                type: 'pictorialBar',
                                symbolSize: 16,
                                symbol: 'none',
                                data: bar.alarm_event.map((item, index) => {
                                    if (item) {
                                        return [xAxis[index], item];
                                    } else {
                                        return '';
                                    }
                                }),
                                barGap: 0,
                                barWidth: 16,
                                symbolPosition: 'end',
                                xAxisIndex: 0,
                            },
                        ],
                    },
                    true,
                );
            });
        },
        {
            deep: true,
            immediate: true,
        },
    );
    onMounted(() => {
        if (chart) {
            useChartResize(chart);
        }
    });
</script>

<style lang="scss" scoped>
    .chart-wrapper {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
</style>
