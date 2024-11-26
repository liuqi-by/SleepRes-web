<!-- 仪表盘 -->
<template>
    <div class="page-container min-w-[600px]">
        <div class="flex justify-between flex-wrap">
            <div class="charts-container">
                <patient-adherence />
            </div>
            <div class="charts-container">
                <monthly-adherence />
            </div>
            <div class="charts-container">
                <long-term-adherence />
            </div>
            <div class="charts-container">
                <no-modem-connection />
            </div>
            <div class="charts-container">
                <high-leak />
            </div>
            <div class="charts-container">
                <ahi />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    // import patientAdherence from './components/patient-adherence.vue';
    // import monthlyAdherence from './components/monthly-adherence.vue';
    // import longTermAdherence from './components/long-term-adherence.vue';
    // import noModemConnection from './components/no-modem-connection.vue';
    // import highLeak from './components/high-leak.vue';
    // import ahi from './components/ahi.vue';

    const patientAdherence = defineAsyncComponent(() => import('./components/patient-adherence.vue'));
    const monthlyAdherence = defineAsyncComponent(() => import('./components/monthly-adherence.vue'));
    const longTermAdherence = defineAsyncComponent(() => import('./components/long-term-adherence.vue'));
    const noModemConnection = defineAsyncComponent(() => import('./components/no-modem-connection.vue'));
    const highLeak = defineAsyncComponent(() => import('./components/high-leak.vue'));
    const ahi = defineAsyncComponent(() => import('./components/ahi.vue'));
</script>

<style lang="scss" scoped>
    .charts-container {
        display: inline-block;
        width: 49%;
        min-width: 530px;
        margin-bottom: 20px;
    }

    @media screen and (width <= 1150px) {
        .charts-container {
            width: 800px;
        }
    }
</style>
