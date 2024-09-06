<!-- Compliance Report -->
<template>
    <div>
        <div class="chart-module">
            <div class="chart">
                <usage-chart
                    :usetimes="barChartData.usetimes"
                    :dates="barChartData.dates"
                    :sumtime="barChartData.sumtime"
                    :usetime="barChartData.usetime"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import UsageChart from '../charts/usage-chart.vue';
    import type { BarChartRes } from '~/api/report/types';

    defineProps<{
        barChartData: BarChartRes;
    }>();
</script>

<style lang="scss" scoped></style>
