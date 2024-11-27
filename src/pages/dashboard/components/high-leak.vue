<!-- 高漏气 -->
<template>
    <client-only>
        <div class="relative">
            <v-chart
                ref="chart"
                :autoresize="true"
                :option="option"
                class="chart"
                @click="handleClick"
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
    import { getHighLeakage } from '~/api/dashboard';

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
                type: 'pie',
                radius: '50%',
                center: ['50%', '45%'],
                data: [
                    { value: 0, name: '10-19 LPM', itemStyle: { color: '#156082' } },
                    { value: 0, name: '20-29 LPM', itemStyle: { color: '#E97132' } },
                    { value: 0, name: '30-39 LPM', itemStyle: { color: '#196B24' } },
                    { value: 0, name: '40 LPM or Greater', itemStyle: { color: '#1EA4D8' } },
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

    const handleClick = (params: any) => {
        let leak = params.dataIndex;
        navigateTo({
            path: '/dashboard/list',
            query: {
                type: 5,
                leak,
            },
        });
    };

    const getData = () => {
        getHighLeakage().then(res => {
            console.log(res);
            if (res.code === 1 && res.data) {
                option.value.series[0].data = [
                    { value: res.data.sta1, name: '10-19 LPM', itemStyle: { color: '#156082' } },
                    { value: res.data.sta2, name: '20-29 LPM', itemStyle: { color: '#E97132' } },
                    { value: res.data.sta3, name: '30-39 LPM', itemStyle: { color: '#196B24' } },
                    { value: res.data.sta4, name: '40 LPM or Greater', itemStyle: { color: '#1EA4D8' } },
                ];
            }
        });
    };

    onActivated(() => {
        getData();
    });

    onMounted(() => {
        getData();
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
