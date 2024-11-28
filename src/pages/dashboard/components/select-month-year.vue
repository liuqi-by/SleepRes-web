<template>
    <div class="flex items-center">
        <div class="flex-shrink-0 m-r-[20px]">{{ label ? label : 'Monh / Year' }}</div>
        <el-date-picker
            v-model="date"
            type="month"
            placeholder="Pick a month"
            format="MMMM YY"
            value-format="YYYY-MM"
            :disabledDate="disabledDateFn"
            :clearable="false"
            v-bind="$attrs"
        />
    </div>
</template>

<script setup lang="ts">
    import { useDashboard } from '~/stores/modules/dashboard';

    const date = defineModel<string>();

    const porps = defineProps({
        label: {
            type: String,
            default: '',
        },
        disabledDate: {
            type: Function,
            default: function (time: Record<string, any>) {
                const monthRange = useDashboard().monthRange;
                return (
                    time.getTime() > new Date(monthRange[monthRange.length - 1]).getTime() ||
                    time.getTime() < new Date(monthRange[0]).getTime()
                );
            },
        },
    });

    const disabledDateFn = (time: Record<string, any>): boolean => {
        return porps.disabledDate(time);
    };
</script>

<style lang="scss" scoped></style>
