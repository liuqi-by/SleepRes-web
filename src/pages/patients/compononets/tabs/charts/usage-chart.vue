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
        MarkLineComponent,
    } from 'echarts/components';
    import type { YAXisOption } from 'echarts/types/dist/shared.js';

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
        MarkLineComponent,
    ]);

    interface PropsInterface {
        dates: BarChartRes['dates'];
        sumtime: BarChartRes['sumtime'];
        isShowTitle?: boolean;
    }

    const props = defineProps<PropsInterface>();

    const { t } = useI18n();

    const option = ref<any>({});

    watch(
        () => props.dates,
        () => {
            const { commonOption } = useStaticChartCommonOption(props.dates);

            option.value = {
                ...commonOption,
                title: props.isShowTitle
                    ? {
                          text: [`{a|${t('charts.Usage')}}`, `{b|（${t('charts.hour')}）}`].join(''),
                          ...commonOption.title,
                      }
                    : {},
                grid: props.isShowTitle
                    ? { ...commonOption.grid }
                    : {
                          left: '50',
                          right: '20',
                          bottom: '25',
                          top: '20',
                          containLabel: false,
                      },

                yAxis: {
                    type: 'value',
                    splitLine: (commonOption.yAxis as YAXisOption).splitLine,
                    axisLine: { show: false },
                    axisTick: { show: false },
                    max: 86400,
                    min: 0,
                    interval: 14400,
                    axisLabel: {
                        formatter: function (value: number) {
                            let flag = parseInt(value / 3600 + '');
                            return flag;
                        },
                    },
                },
                tooltip: {
                    trigger: 'axis',

                    valueFormatter: function (value: number) {
                        return (value / 3600).toFixed(2) + t('charts.hour');
                    },
                },
                series: [
                    {
                        name: t('charts.Usage'),
                        type: 'bar',
                        barMaxWidth: 40,
                        markLine: {
                            data: [
                                {
                                    yAxis: 14400,
                                },
                            ],
                            lineStyle: {
                                color: '#FF9795',
                                type: 'dashed',
                            },
                            symbol: 'none',
                            label: {
                                show: false,
                            },
                        },
                        data: props.sumtime.map(item => {
                            if (item < 14400) {
                                return {
                                    value: item,
                                    itemStyle: {
                                        color: '#FF9795',
                                    },
                                };
                            } else {
                                return {
                                    value: item,
                                    itemStyle: {
                                        color: '#00CE79',
                                    },
                                };
                            }
                        }),
                    },
                ],
            };
        },
        {
            deep: true,
            immediate: true,
        },
    );
</script>

<style lang="scss" scoped></style>
