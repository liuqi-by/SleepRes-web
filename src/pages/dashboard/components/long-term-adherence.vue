<template>
    <client-only>
        <v-chart
            ref="chart"
            :autoresize="true"
            :option="option"
            class="chart"
            @click="handleClick"
        />
        <select-date
            v-model:month="month"
            v-model:year="year"
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
    import selectDate from './select-date.vue';
    import { useDashboard } from '~/stores/modules/dashboard';
    import { getUseMonth } from '~/api/dashboard';

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
            minInterval: 1,
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
                data: [],
                type: 'bar',
                name: '0 hours',
                barMaxWidth: '30',
                stack: 'total',
                itemStyle: {
                    color: '#156082',
                },
            },
            {
                data: [],
                type: 'bar',
                name: '0.1 to 2 hours',
                barMaxWidth: '30',
                stack: 'total',
                itemStyle: {
                    color: '#E97132',
                },
            },
            {
                data: [],
                type: 'bar',
                name: '2.1 to 4 hours',
                barMaxWidth: '30',
                stack: 'total',
                itemStyle: {
                    color: '#196B24',
                },
            },
            {
                data: [],
                type: 'bar',
                name: '4.1 to 6 hours',
                barMaxWidth: '30',
                stack: 'total',
                itemStyle: {
                    color: '#0F9ED5',
                },
            },
            {
                data: [],
                type: 'bar',
                name: '6.1 to 8 hours',
                barMaxWidth: '30',
                stack: 'total',
                itemStyle: {
                    color: '#A02B93',
                },
            },
            {
                data: [],
                type: 'bar',
                name: '8 or more',
                barMaxWidth: '30',
                stack: 'total',
                itemStyle: {
                    color: '#50A831',
                },
            },
        ],
    });

    const month = ref('');
    const year = ref('');

    watch(year, () => {
        if (year.value && !month.value) {
            month.value = '01';
        }
        if (!year.value) {
            month.value = '';
        }
    });

    watch(month, () => {
        if (month.value && !year.value) {
            year.value = new Date().getFullYear().toString();
        }
        if (!month.value) {
            year.value = '';
        }
    });

    const date = computed(() => {
        return year.value ? year.value + '-' + month.value : '';
    });

    watch(date, () => {
        getData();
    });

    const handleClick = (params: any) => {
        let hours = params.seriesIndex;

        let queryDate = getYearAndMonth(year.value, month.value);

        navigateTo({
            path: '/dashboard/list',
            query: {
                listType: 3,
                date: params.name,
                type: hours,
                setupDate: queryDate.date,
                startDate: option.value.xAxis.data[0],
                endDate: option.value.xAxis.data[option.value.xAxis.data.length - 1],
            },
        });
    };

    const getData = () => {
        let params = getYearAndMonth(year.value, month.value);

        getUseMonth(params).then(res => {
            option.value.xAxis.data = [];
            option.value.series.forEach((item: any) => {
                item.data = [];
            });

            if (res.code === 1 && res.data) {
                // 将对象转成数组
                let data = Object.values(res.data);
                option.value.xAxis.data = Object.keys(res.data).filter((item: any) => {
                    return new Date(item).getTime() < new Date().getTime();
                });

                data.forEach((item: any) => {
                    for (let i = 0; i <= 5; i++) {
                        let key: any = 'sta' + i;
                        option.value.series[i].data.push(item[key] as never);
                    }
                });

                // let j = option.value.xAxis.data.length;
                // while (j--) {
                //     for (let i = 0; i <= 5; i++) {
                //         let key: any = 'sta' + i;
                //         option.value.series[i].data.push((data[j] as any)[key] as never);
                //     }
                //     if (j <= 0) {
                //         break;
                //     }
                // }
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
