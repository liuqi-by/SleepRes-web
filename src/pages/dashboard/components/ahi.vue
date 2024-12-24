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
    import { getHighAHI } from '~/api/dashboard';

    use([TitleComponent, TooltipComponent, LegendComponent, PieChart, CanvasRenderer, LabelLayout]);

    const option = ref({
        title: {
            text: 'AHI(5 day avg)',
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
                    { value: 0, name: 'AHI 10-19', itemStyle: { color: '#156082' } },
                    { value: 0, name: 'AHI 20-29', itemStyle: { color: '#E97132' } },
                    { value: 0, name: 'AHI 30-39', itemStyle: { color: '#196B24' } },
                    { value: 0, name: 'AHI Greater than 40', itemStyle: { color: '#1EA4D8' } },
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

                    fontSize: 14,
                    color: '#fff',
                    formatter: function (param: any) {
                        if (!param.value) {
                            return '';
                        } else {
                            return param.value;
                        }
                    },
                },
            },
        ],
    });

    const handleClick = (params: any) => {
        let ahi = params.dataIndex + 1;
        navigateTo({
            path: '/dashboard/list',
            query: {
                listType: 6,
                type: ahi,
            },
        });
    };

    const getData = () => {
        getHighAHI().then(res => {
            console.log(res);
            if (res.code === 1 && res.data) {
                option.value.series[0].data = [
                    { value: res.data.sta1, name: 'AHI 10-19', itemStyle: { color: '#156082' } },
                    { value: res.data.sta2, name: 'AHI 20-29', itemStyle: { color: '#E97132' } },
                    { value: res.data.sta3, name: 'AHI 30-39', itemStyle: { color: '#196B24' } },
                    { value: res.data.sta4, name: 'AHI Greater than 40', itemStyle: { color: '#1EA4D8' } },
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
