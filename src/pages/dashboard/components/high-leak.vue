<!-- 高漏气 -->
<template>
    <client-only>
        <div class="relative">
            <v-chart
                ref="chart"
                :autoresize="true"
                :option="option"
                class="chart"
            />
        </div>
    </client-only>
</template>

<script setup lang="ts">
    import VChart from 'vue-echarts';
    import { use } from 'echarts/core';
    import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components';
    import { PieChart } from 'echarts/charts';
    import { LabelLayout } from 'echarts/features';
    import { CanvasRenderer } from 'echarts/renderers';

    use([TitleComponent, TooltipComponent, LegendComponent, PieChart, CanvasRenderer, LabelLayout]);

    const option = ref({
        title: {
            text: 'High Leak(5 day avg)',
            left: 'center',
            top: '5%',
        },
        tooltip: {
            trigger: 'item',
        },
        legend: {
            orient: 'horizontal',
            bottom: '10%',
        },

        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: '50%',
                center: ['50%', '45%'],
                data: [
                    { value: 1048, name: 'High Leak', itemStyle: { color: '#156082' } },
                    { value: 735, name: '10-19 LPM', itemStyle: { color: '#E97132' } },
                    { value: 580, name: '20-29 LPM', itemStyle: { color: '#196B24' } },
                    { value: 484, name: '30-39 LPM', itemStyle: { color: '#1EA4D8' } },
                    { value: 300, name: '40 LPM or Greater', itemStyle: { color: '#A02B93' } },
                ],
                itemStyle: {
                    borderWidth: 2, // 设置间隙宽度
                    borderColor: '#ffffff', // 设置间隙颜色
                },
                // 高亮
                emphasis: {
                    itemStyle: {},
                },
                label: {
                    show: true,
                    position: 'inner',
                    formatter: '{c}',
                    fontSize: 14,
                    color: '#fff',
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
<style lang="scss">
    .month-selector {
        .el-date-picker__header {
            display: none;
        }
    }
</style>
