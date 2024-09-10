<template>
    <Select
        size="6"
        color="var(--el-color-success)"
        v-if="compliant === 0"
    />
    <CloseBold
        size="6"
        color="var(--el-color-danger)"
        v-else-if="compliant === 2"
    />
    <span v-else-if="compliant === 1">{{ $t('patients.Monitoring') }}</span>
</template>

<script setup lang="ts">
    import { Select, CloseBold } from '@element-plus/icons-vue';

    defineProps<{ compliant: number }>();
</script>

<style lang="scss" scoped></style>
