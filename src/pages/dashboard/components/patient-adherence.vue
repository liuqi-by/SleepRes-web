<!-- 患者合规性 -->
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
            <div class="table-container">
                <table
                    class="table"
                    border-collapse="collapse"
                >
                    <tr>
                        <td>Adherent</td>
                        <td>{{ calculatePercentage(option.series[0].data[0].value, total) }}%</td>
                    </tr>
                    <tr>
                        <td>Monitoring</td>
                        <td>{{ calculatePercentage(option.series[0].data[1].value, total) }}%</td>
                    </tr>
                    <tr>
                        <td>Non-Adherent</td>
                        <td>{{ calculatePercentage(option.series[0].data[2].value, total) }}%</td>
                    </tr>
                </table>
            </div>
        </div>
        <select-date
            v-model:month="month"
            v-model:year="year"
        />
    </client-only>
</template>

<script setup lang="ts">
    import VChart from 'vue-echarts';
    import { use } from 'echarts/core';
    import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components';
    import { PieChart } from 'echarts/charts';
    import { LabelLayout } from 'echarts/features';
    import { CanvasRenderer } from 'echarts/renderers';
    import selectDate from './select-date.vue';
    import { getAdherenceProportion } from '~/api/dashboard';
    import type { AdherenceProportion } from '~/api/dashboard/types';

    use([TitleComponent, TooltipComponent, LegendComponent, PieChart, CanvasRenderer, LabelLayout]);

    const option = ref({
        title: {
            text: 'Patient Adherence',
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
                    { value: 0, name: 'Adherent', itemStyle: { color: '#156082' }, status: 0 },
                    { value: 0, name: 'Monitoring', itemStyle: { color: '#E97132' }, status: 1 },
                    { value: 0, name: 'Non-Adherent', itemStyle: { color: '#196B24' }, status: 2 },
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

    const router = useRouter();
    const handleClick = (params: any) => {
        let { status } = params.data;

        let query: AdherenceProportion = {
            type: 0,
        };
        if (month.value && year.value) {
            query = {
                date: year.value + '-' + month.value,
                type: 2,
            };
        } else if (year.value) {
            query = {
                date: year.value,
                type: 1,
            };
        } else {
            query = {
                type: 0,
            };
        }

        router.push({
            path: '/dashboard/list',
            query: {
                ...query,
                status,
                listType: 1,
            },
        });
    };

    const month = ref('');
    const year = ref('');

    const date = computed(() => {
        return year.value ? year.value + '-' + month.value : '';
    });

    watch(date, () => {
        getData();
    });

    const getData = () => {
        let params: AdherenceProportion = {
            type: 0,
        };

        if (month.value && year.value) {
            params = {
                date: year.value + '-' + month.value,
                type: 2,
            };
        } else if (year.value) {
            params = {
                date: year.value,
                type: 1,
            };
        } else {
            params = {
                type: 0,
            };
        }

        getAdherenceProportion(params).then(res => {
            if (res.code === 1 && res.data) {
                option.value.series[0].data = [
                    { value: res.data.compliant0, name: 'Adherent', itemStyle: { color: '#156082' }, status: 0 },
                    { value: res.data.compliant1, name: 'Monitoring', itemStyle: { color: '#E97132' }, status: 1 },
                    { value: res.data.compliant2, name: 'Non-Adherent', itemStyle: { color: '#196B24' }, status: 2 },
                ];
            }
        });
    };

    const total = computed(() => {
        return option.value.series[0].data.reduce((total, cur) => total + cur.value, 0);
    });

    onActivated(() => {
        getData();
    });

    onMounted(() => {
        getData();
    });
</script>

<style lang="scss" scoped>
    .table-container {
        position: absolute;
        top: 2%;
        left: 2%;

        td {
            padding: 5px;
        }

        table {
            border-collapse: collapse;
            border: 1px solid #000;
        }

        th,
        td {
            text-align: center;
            border: 1px solid #000;
        }
    }

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
