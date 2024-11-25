<template>
    <client-only>
        <v-chart
            ref="chart"
            :autoresize="true"
            :option="option"
            class="chart"
            @click="handleClick"
        />
    </client-only>
</template>

<script setup lang="ts">
    import VChart from 'vue-echarts';
    import { use } from 'echarts/core';
    import { TitleComponent, TooltipComponent, LegendComponent, GridComponent } from 'echarts/components';
    import { BarChart } from 'echarts/charts';
    import { CanvasRenderer } from 'echarts/renderers';
    import moment from 'moment';
    import { useDashboard } from '~/stores/modules/dashboard';
    import { getAdherenceProportionByMonth } from '~/api/dashboard';

    use([TooltipComponent, TitleComponent, BarChart, CanvasRenderer, LegendComponent, GridComponent]);

    const xDate = useDashboard().monthRange;

    const option = ref({
        xAxis: {
            type: 'category',
            data: xDate,
            axisLabel: {
                formatter: function (params: any) {
                    // 转换成 Jue 23
                    return moment(params).format('MMMYY');
                },
                showMaxLabel: true,
                showMinLabel: true,
            },
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
                data: [],
                type: 'bar',
                name: 'Adherent Patients',
                barMaxWidth: '20',
                itemStyle: {
                    color: '#156082',
                },
                label: {
                    show: true,
                    position: 'top',
                    // 百分比
                    formatter: function (params: any) {
                        let { dataIndex } = params;
                        return calculatePercentage(params.value, totalData.value[dataIndex]) + '%';
                    },
                },
            },
            {
                data: [],
                type: 'bar',
                barMaxWidth: '20',
                name: 'Non-Adherent Patients',
                itemStyle: {
                    color: '#E97132',
                },
            },
        ],
    });

    const handleClick = (params: any) => {
        let status = params.seriesIndex === 0 ? 0 : 2;
        let date = params.name;
        navigateTo({
            path: '/dashboard/list',
            query: {
                type: 2,
                status,
                date,
            },
        });
    };

    const totalData = ref<number[]>([]);

    const getData = () => {
        getAdherenceProportionByMonth({
            start_date: xDate[0],
            end_date: xDate[xDate.length - 1],
        }).then(res => {
            if (res.code === 1 && res.data) {
                // 将对象转成数组
                let data = Object.values(res.data);

                let data0 = data.map(item => item.compliant0);
                let data1 = data.map(item => item.compliant1);
                let data2 = data.map(item => item.compliant2);

                totalData.value = data0.map((item, index) => {
                    return item + data1[index] + data2[index];
                });

                option.value.series[0].data = data0 as never[];
                option.value.series[1].data = data2 as never[];
                option.value.xAxis.data = Object.keys(res.data);
            }
        });
    };
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
