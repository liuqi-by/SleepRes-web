<!-- 漏气量 -->
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
    import { BarChart, PictorialBarChart } from 'echarts/charts';
    import {
        GridComponent,
        TooltipComponent,
        TitleComponent,
        ToolboxComponent,
        AxisPointerComponent,
        LegendComponent,
    } from 'echarts/components';

    import type { BarChartRes } from '~/api/report/types';
    use([
        TitleComponent,
        TooltipComponent,
        GridComponent,
        ToolboxComponent,
        AxisPointerComponent,
        LegendComponent,
        CanvasRenderer,
        BarChart,
        PictorialBarChart,
    ]);

    interface PropsInterface {
        dates: BarChartRes['dates'];
        leak_max: BarChartRes['leak_max'];
        leak_avg: BarChartRes['leak_avg'];
        // leak_95: BarChartRes['leak_avg'];
    }

    const props = defineProps<PropsInterface>();

    const { t } = useI18n();

    // 配置项
    const option = computed<any>(() => {
        const { commonOption } = useStaticChartCommonOption(props.dates);
        // 获取Y轴最大值
        const max = Math.max(...(props.leak_max || []), ...(props.leak_avg || []));
        return {
            ...commonOption,
            title: {
                text: [`{a|${t('charts.Leak')}}`, '{b|（L/min）}'].join(''),
                ...commonOption.title,
            },

            yAxis: {
                ...commonOption.yAxis,
                max: max >= 200 ? max : 200,
                min: 0,
            },

            series: [
                {
                    name: t('charts.avg'),
                    type: 'pictorialBar',
                    itemStyle: {
                        color: '#736111',
                    },
                    symbol: 'rect',
                    symbolSize: ['100%', 2],
                    symbolPosition: 'top',
                    data: props.leak_avg.map(item => {
                        if (!item) {
                            return '-';
                        } else {
                            return item;
                        }
                    }),
                    zlevel: 10,
                },
                {
                    name: t('charts.max'),
                    type: 'bar',
                    barMaxWidth: 40,

                    itemStyle: {
                        color: '#f4c430',
                    },
                    data: props.leak_max,
                    markLine: {
                        data: [
                            {
                                yAxis: 24,
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
                },
            ],
        };
    });
</script>

<style lang="scss" scoped></style>
