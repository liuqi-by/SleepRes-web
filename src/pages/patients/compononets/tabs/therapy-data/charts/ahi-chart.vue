<!-- AHI -->
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
    import { BarChart, LineChart } from 'echarts/charts';
    import {
        GridComponent,
        TooltipComponent,
        TitleComponent,
        ToolboxComponent,
        AxisPointerComponent,
        LegendComponent,
    } from 'echarts/components';
    import type { ECBasicOption } from 'echarts/types/dist/shared.js';
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
        LineChart,
    ]);

    interface PropsInterface {
        dates: BarChartRes['dates'];
        ai: BarChartRes['ai'];
        hi: BarChartRes['hi'];
        ahi: BarChartRes['ahi'];
    }

    const props = defineProps<PropsInterface>();
    const { t } = useI18n();

    // 配置项
    const option = computed<ECBasicOption>(() => {
        const { commonOption } = useStaticChartCommonOption(props.dates);

        const max = Math.max(...(props.ai || []), ...(props.hi || []));
        return {
            ...commonOption,
            title: {
                ...commonOption.title,
                text: ['{a|AHI}', `{b|（${t('charts.T/H')}）}`].join(''),
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow',
                },
                formatter: function (params: any) {
                    let index = params[0].dataIndex;
                    let time = props.dates[index];

                    let html = `
                    <div>${time}</div>
                    ${params
                        .map((item: any) => {
                            return `<div style="display:flex;justify-content:space-between;"><span style="text-align:left;flex:1;margin-right:5px;" > ${item.seriesName}</span>${item.data}</div>`;
                        })
                        .join('')}`;

                    return html;
                },
            },

            legend: {
                data: ['AI', 'HI'],
                right: 90,
                icon: 'circle',
            },

            yAxis: {
                ...commonOption.yAxis,
                min: 0,
                max: max > 10 ? max : 10,
            },
            series: [
                {
                    name: 'AI',
                    type: 'bar',
                    itemStyle: {
                        color: '#8e62a1',
                    },
                    barMaxWidth: 40,
                    data: props.ai.map(item => (item === 0 ? '-' : item)),
                },

                {
                    name: 'HI',
                    type: 'bar',
                    barGap: '-100%' /* 可以重叠 */,
                    itemStyle: {
                        color: '#b89dc4',
                    },
                    barMaxWidth: 40,
                    data: props.hi.map(item => (item === 0 ? '-' : item)),
                },
                {
                    name: 'AHI',
                    type: 'line',
                    symbol: 'none',
                    symbolSize: 0, // symbol的大小设置为0
                    showSymbol: false, // 不显示symbol
                    lineStyle: {
                        width: 0, // 线宽是0
                        color: 'rgba(0, 0, 0, 0)', // 线的颜色是透明的
                    },

                    data: props.ahi.map(item => (item === 0 ? '-' : item)),
                },
            ],
        };
    });

    const chart = ref<InstanceType<typeof VChart>>();
    onMounted(() => {
        useChartResize(chart);
    });
</script>

<style lang="scss" scoped></style>
