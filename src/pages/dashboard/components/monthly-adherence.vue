<template>
    <client-only>
        <v-chart
            ref="chart"
            :autoresize="true"
            :option="option"
            class="chart"
        />
    </client-only>
</template>

<script setup lang="ts">
    import VChart from 'vue-echarts';
    import { use } from 'echarts/core';
    import { TitleComponent, TooltipComponent, LegendComponent, GridComponent } from 'echarts/components';
    import { BarChart } from 'echarts/charts';
    import { CanvasRenderer } from 'echarts/renderers';

    use([TooltipComponent, TitleComponent, BarChart, CanvasRenderer, LegendComponent, GridComponent]);

    const option = ref({
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
            type: 'value',
        },
        title: {
            text: 'Monthly Adherence Trend',
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
                name: 'Adherent Patients',
                barWidth: '20',
                itemStyle: {
                    color: '#156082',
                },
                label: {
                    show: true,
                    position: 'top',
                    // 百分比
                    formatter: '0%',
                },
            },
            {
                data: [120, 200, 150, 80, 70, 110, 130],
                type: 'bar',
                barWidth: '20',
                name: 'Non-Adherent Patients',
                itemStyle: {
                    color: '#E97132',
                },
            },
        ],
    });
</script>

<style lang="scss" scoped>
    .chart {
        height: 500px;
        border: 1px solid #ccc;
    }
</style>
