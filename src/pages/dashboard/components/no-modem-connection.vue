<!-- 无调制解调器连接 -->
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
    import { getNoConnect } from '~/api/dashboard';

    use([TitleComponent, TooltipComponent, LegendComponent, PieChart, CanvasRenderer, LabelLayout]);

    const option = ref({
        title: {
            text: 'No Modem Connection',
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
                    { value: 0, name: '3-5 Days', itemStyle: { color: 'purple' } },
                    { value: 0, name: '6-10 Days', itemStyle: { color: 'blue' } },
                    { value: 0, name: '11-15 Days', itemStyle: { color: 'orange' } },
                    { value: 0, name: '16-20 Days', itemStyle: { color: 'yellow' } },
                    { value: 0, name: '21 Days or Greater', itemStyle: { color: 'red' } },
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
        console.log(params);
        let days = params.dataIndex + 1;
        navigateTo({
            path: '/dashboard/list',
            query: {
                listType: 4,
                type: days,
            },
        });
    };

    const getData = () => {
        getNoConnect().then(res => {
            if (res.code === 1 && res.data) {
                option.value.series[0].data = [
                    { value: res.data.sta1, name: '3-5 Days', itemStyle: { color: 'purple' } },
                    { value: res.data.sta2, name: '6-10 Days', itemStyle: { color: 'blue' } },
                    { value: res.data.sta3, name: '11-15 Days', itemStyle: { color: 'orange' } },
                    { value: res.data.sta4, name: '16-20 Days', itemStyle: { color: 'yellow' } },
                    { value: res.data.sta5, name: '21 Days or Greater', itemStyle: { color: 'red' } },
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
