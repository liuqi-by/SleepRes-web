<template>
    <client-only>
        <v-chart
            ref="chart"
            :autoresize="true"
            :option="option"
            class="chart"
            @click="handleClick"
        />
        <select-date />
    </client-only>
</template>

<script setup lang="ts">
    import VChart from 'vue-echarts';
    import { use } from 'echarts/core';
    import { TitleComponent, TooltipComponent, LegendComponent, GridComponent } from 'echarts/components';
    import { BarChart } from 'echarts/charts';
    import { CanvasRenderer } from 'echarts/renderers';
    import moment from 'moment';
    import selectDate from './select-date.vue';
    import { useDashboard } from '~/stores/modules/dashboard';

    use([TooltipComponent, TitleComponent, BarChart, CanvasRenderer, LegendComponent, GridComponent]);

    const xDate = useDashboard().monthRange;

    const option = ref({
        xAxis: {
            type: 'category',
            data: xDate,
            axisLabel: {
                formatter: function (params: any) {
                    // 转换成 Jue 23
                    return moment(params).format('MMM YY');
                },
            },
        },
        yAxis: {
            type: 'value',
        },
        title: {
            text: 'Long-term Adherence',
            left: 'center',
            top: '5%',
        },
        tooltip: {
            trigger: 'item',
        },
        legend: {
            orient: 'horizontal',
            bottom: '5%',
            itemGap: 20,
        },
        grid: {
            top: '18%',
            bottom: '20%',
        },
        series: [
            {
                data: [120, 200, 150, 80, 70, 110, 130],
                type: 'bar',
                name: '0 hours',
                barWidth: '30',
                stack: 'total',
                itemStyle: {
                    color: '#156082',
                },
            },
            {
                data: [20, 31, 332, 132, 132, 132, 132],
                type: 'bar',
                name: '0.1 to 2 hours',
                barWidth: '30',
                stack: 'total',
                itemStyle: {
                    color: '#E97132',
                },
            },
            {
                data: [21, 21, 21, 21, 21, 21, 21],
                type: 'bar',
                name: '2.1 to 4 hours',
                barWidth: '30',
                stack: 'total',
                itemStyle: {
                    color: '#196B24',
                },
            },
            {
                data: [11, 11, 11, 11, 11, 11, 11],
                type: 'bar',
                name: '4.1 to 6 hours',
                barWidth: '30',
                stack: 'total',
                itemStyle: {
                    color: '#0F9ED5',
                },
            },
            {
                data: [31, 31, 31, 31, 31, 31, 31],
                type: 'bar',
                name: '6.1 to 8 hours',
                barWidth: '30',
                stack: 'total',
                itemStyle: {
                    color: '#A02B93',
                },
            },
            {
                data: [41, 41, 41, 41, 41, 41, 41],
                type: 'bar',
                name: '8 or more',
                barWidth: '30',
                stack: 'total',
                itemStyle: {
                    color: '#50A831',
                },
            },
        ],
    });

    const handleClick = (params: any) => {
        let hours = params.seriesIndex;
        let date = params.name;
        navigateTo({
            path: '/dashboard/list',
            query: {
                type: 3,
                status: 1,
                date,
                hours,
            },
        });
    };
</script>

<style lang="scss" scoped>
    .chart {
        height: 500px;
        border: 1px solid #ccc;
    }
</style>
