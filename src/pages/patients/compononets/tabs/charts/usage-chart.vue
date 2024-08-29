<!-- 使用习惯 -->
<template>
    <client-only>
        <v-chart
            ref="chart"
            :autoresize="true"
            :option="option"
        />
    </client-only>
</template>

<script setup lang="ts">
    import VChart from 'vue-echarts';
    import { use } from 'echarts/core';
    import { CanvasRenderer } from 'echarts/renderers';
    import { BarChart } from 'echarts/charts';
    import {
        GridComponent,
        TooltipComponent,
        TitleComponent,
        ToolboxComponent,
        AxisPointerComponent,
        LegendComponent,
    } from 'echarts/components';
    import type { EChartsOption, YAXisOption } from 'echarts/types/dist/shared.js';
    import type { BarSeriesOption } from 'echarts';
    import type { BarChartRes } from '@/api/report/types';
    use([
        TitleComponent,
        TooltipComponent,
        GridComponent,
        ToolboxComponent,
        AxisPointerComponent,
        LegendComponent,
        CanvasRenderer,
        BarChart,
    ]);

    interface PropsInterface {
        usetimes: BarChartRes['usetimes'];
        dates: BarChartRes['dates'];
        sumtime: BarChartRes['sumtime'];
        usetime: BarChartRes['usetime'];
    }

    const props = defineProps<PropsInterface>();

    const { t } = useI18n();

    const option = ref<EChartsOption>({});

    watch(
        () => props.dates,
        () => {
            const { commonOption } = useStaticChartCommonOption(props.dates);

            option.value = {
                ...commonOption,
                // title: {
                //     text: [`{a|${t('report.Usage')}}`, `{b|（${t('report.hour')}）}`].join(''),
                //     ...commonOption.title,
                // },
                yAxis: {
                    type: 'value',
                    splitLine: (commonOption.yAxis as YAXisOption).splitLine,
                    max: 86400,
                    min: 0,
                    interval: 14400,
                    axisLine: { show: false },
                    axisTick: { show: false },
                    axisLabel: {
                        formatter: function (value: number) {
                            let flag = parseInt(value / 7200 + '');
                            // let textArr = [];
                            let timeFalg: string | number = 12;

                            if (flag === 0 || flag === 12) {
                                timeFalg = 12;
                            } else if (flag > 6) {
                                timeFalg = parseInt(flag * 2 - 12 + '');
                            } else {
                                timeFalg = parseInt(timeFalg + flag * 2 + '');
                            }
                            if (timeFalg === 24) {
                                timeFalg = 0;
                            }
                            // 补0
                            if (timeFalg < 10) {
                                timeFalg = '0' + timeFalg;
                            }
                            // textArr.push(timeFalg + ':00');
                            return timeFalg + ':00';
                        },
                    },
                },
            };

            let seriesData: EChartsOption['series'] = [];
            props.usetimes.forEach((n, i) => {
                if (i % 2 === 0) {
                    seriesData.push({
                        name: '',
                        type: 'bar',
                        stack: 'one',
                        itemStyle: {
                            borderColor: 'transparent',
                            color: 'transparent',
                        },

                        emphasis: {
                            itemStyle: {
                                borderColor: 'transparent',
                                color: 'transparent',
                            },
                        },
                        barMaxWidth: 37,
                        data: n,
                    });
                } else {
                    let newArr: BarSeriesOption['data'] = n.map((item, index) => {
                        let colorStart = '#00CE79';
                        let colorEnd = '#EFFEFF';
                        if (props.sumtime[index] < 14400) {
                            colorStart = '#FF9795';
                            colorEnd = '#FFCBCA';
                        }
                        return {
                            value: item,
                            itemStyle: {
                                color: {
                                    // 渐变色
                                    // 线性渐变，前四个参数分别是 x0, y0, x2, y2, 范围从 0 - 1，相当于在图形包围盒中的百分比，如果最后一个参数是‘true’，则该四个值是绝对像素位置
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [
                                        {
                                            offset: 0,
                                            color: colorStart, // 0% 处的颜色
                                        },
                                        {
                                            offset: 1,
                                            color: colorEnd, // 100% 处的颜色
                                        },
                                    ],
                                },
                            },
                        };
                    });

                    seriesData.push({
                        type: 'bar',
                        stack: 'one',
                        barMaxWidth: 40,
                        data: newArr,
                    });
                }
            });
            option.value.tooltip = {
                ...commonOption.tooltip,
                formatter: (params: any) => {
                    let index = (params[0] || params).dataIndex;
                    let res = props.dates[index] + '<br/>';

                    let datas = '';
                    let maxDif = '';
                    let dataArr = props.usetime[index].split('###').reverse();

                    for (let di in dataArr) {
                        datas = dataArr[di];
                        if (datas && datas !== '' && datas !== null && datas !== undefined && datas[0] !== undefined) {
                            let datasArr = datas.split('#');
                            maxDif = (Number(datasArr[2]) / 3600).toFixed(2);

                            if (maxDif === '0.00') {
                                maxDif = '<0.01';
                            }
                            if (maxDif === '24.00') {
                                maxDif = '23.99';
                            }
                            if (datasArr[0] === datasArr[1]) {
                                res += '' + datasArr[1] + '<=>';
                                res +=
                                    '' +
                                    `${t('charts.Abnormal_power_outage_shutdown')}` +
                                    '---' +
                                    `${t('charts.unkonwn')}` +
                                    '<br/>';
                            } else {
                                res += '' + datasArr[1] + '<=>';
                                res += '' + datasArr[0] + '---';
                                res += `${t('charts.use')}` + maxDif + 'H <br/>';
                            }
                        }
                    }
                    return res;
                },
            };
            option.value.series = seriesData;
        },
        {
            deep: true,
            immediate: true,
        },
    );
</script>

<style lang="scss" scoped></style>
