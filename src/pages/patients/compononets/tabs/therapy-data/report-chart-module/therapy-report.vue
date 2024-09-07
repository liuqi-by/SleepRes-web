<!-- Therapy Report -->
<template>
    <div>
        <div class="chart-module">
            <div class="title">Therapy Usage Graph</div>
            <div class="chart">
                <usage-chart
                    :dates="barChartData.dates"
                    :sumtime="barChartData.sumtime"
                    isShowTitle
                    class="chart-left"
                />
                <div class="chart-info">
                    <div class="chart-info-item">
                        <div class="chart-info-label">Usage days</div>
                        <div class="chart-info-value">27/28(96%)</div>
                    </div>
                    <div class="chart-info-item color-[#00CE79]">
                        <div class="chart-info-label">>= 4 hour days</div>
                        <div class="chart-info-value">27(96%)</div>
                    </div>
                    <div class="chart-info-item color-[#FF9795]">
                        <div class="chart-info-label">{{ '< 4 hour days' }}</div>
                        <div class="chart-info-value">27(96%)</div>
                    </div>
                    <div class="chart-info-item">
                        <div class="chart-info-label">Days not used</div>
                        <div class="chart-info-value">27(96%)</div>
                    </div>
                    <div class="chart-info-item">
                        <div class="chart-info-label">Days no data</div>
                        <div class="chart-info-value">27(96%)</div>
                    </div>
                    <div class="chart-info-item">
                        <div class="chart-info-label">Used/day(avg)</div>
                        <div class="chart-info-value">9.3hrs</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="chart-module">
            <div class="title">Leak Graph</div>
            <div class="chart">
                <leak-chart
                    :dates="barChartData.dates"
                    :leak_max="barChartData.leak_max"
                    :leak_avg="barChartData.leak_avg"
                    class="chart-left"
                />
                <div class="chart-info">
                    <div class="chart-info-item">
                        <div class="chart-info-label">Set threshold</div>
                        <div class="chart-info-value">24.0 L/min</div>
                    </div>
                    <div class="chart-info-item">
                        <div class="chart-info-label">Maximum(avg)</div>
                        <div class="chart-info-value">23.8</div>
                    </div>
                    <div class="chart-info-item color-[#f4c430]">
                        <div class="chart-info-label">95th %(avg)</div>
                        <div class="chart-info-value">27(96%)</div>
                    </div>
                    <div class="chart-info-item">
                        <div class="chart-info-label">Median(avg)</div>
                        <div class="chart-info-value">20.1</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="chart-module">
            <div class="title">AHI Graph</div>
            <div class="chart">
                <ahi-chart
                    :ai="barChartData.ai"
                    :hi="barChartData.hi"
                    :ahi="barChartData.ahi"
                    :dates="barChartData.dates"
                    class="chart-left"
                />

                <div class="chart-info">
                    <div class="chart-info-item">
                        <div class="chart-info-label">AHI</div>
                        <div class="chart-info-value">24.0 L/min</div>
                    </div>
                    <div class="chart-info-item color-[#b89dc4]">
                        <div class="chart-info-label">HI</div>
                        <div class="chart-info-value">23.8</div>
                    </div>
                    <div class="chart-info-item color-[#8e62a1]">
                        <div class="chart-info-label">AI</div>
                        <div class="chart-info-value">27(96%)</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import UsageChart from '../charts/usage-chart.vue';
    import leakChart from '../charts/leak-chart.vue';
    import AhiChart from '../charts/ahi-chart.vue';
    import type { BarChartRes } from '~/api/report/types';

    defineProps<{
        barChartData: BarChartRes;
    }>();
</script>

<style lang="scss" scoped></style>
