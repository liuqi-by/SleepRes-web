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
                        <td>10%</td>
                    </tr>
                    <tr>
                        <td>Monitoring</td>
                        <td>10%</td>
                    </tr>
                    <tr>
                        <td>Non-Adherent</td>
                        <td>10%</td>
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
                name: 'Access From',
                type: 'pie',
                radius: '50%',
                center: ['50%', '45%'],
                data: [
                    { value: 1048, name: 'Adherent', itemStyle: { color: '#156082' }, status: 0 },
                    { value: 735, name: 'Monitoring', itemStyle: { color: '#E97132' }, status: 1 },
                    { value: 580, name: 'Non-Adherent', itemStyle: { color: '#196B24' }, status: 2 },
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
        router.push({
            path: '/dashboard/list',
            query: {
                type: 1,
                status,
            },
        });
    };

    const month = ref('');
    const year = ref('');

    watchEffect(() => {
        console.log(month.value, year.value);
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
