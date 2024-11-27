<template>
    <div class="flex items-center">
        <div class="flex-shrink-0 m-r-[20px]">{{ label ? label : 'Monh / Year' }}</div>
        <el-date-picker
            v-model="date"
            type="month"
            placeholder="Pick a month"
            format="MMMM YY"
            value-format="YYYY-MM"
            :disabledDate="disabledDate"
            :clearable="false"
        />
    </div>
</template>

<script setup lang="ts">
    import { useDashboard } from '~/stores/modules/dashboard';

    const date = defineModel<string>();

    defineProps({
        label: {
            type: String,
            default: '',
        },
    });

    const monthRange = useDashboard().monthRange;

    const disabledDate = (time: Record<string, any>): boolean => {
        return (
            time.getTime() > new Date(monthRange[monthRange.length - 1]).getTime() ||
            time.getTime() < new Date(monthRange[0]).getTime()
        );
    };
</script>

<style lang="scss" scoped></style>
