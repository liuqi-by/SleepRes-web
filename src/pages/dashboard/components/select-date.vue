<template>
    <div class="select-Date">
        <div class="select-option">
            <div class="label">Month</div>
            <el-date-picker
                v-model="month"
                type="month"
                placeholder="Pick a month"
                format="MMMM"
                value-format="MM"
                popper-class="month-selector"
                :disabled-date="disabledMonth"
            />
        </div>

        <div class="select-option">
            <div class="label">Year</div>
            <el-date-picker
                v-model="year"
                type="year"
                placeholder="Pick a year"
                format="YYYY"
                value-format="YYYY"
                :disabled-date="disabledDate"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
    const month = defineModel<string>('month');
    const year = defineModel<string>('year');

    // 限制只能选今年和之前的
    const disabledDate = (time: Record<string, any>): boolean => {
        return time.getFullYear() > new Date().getFullYear();
    };

    const disabledMonth = (time: Record<string, any>): boolean => {
        return new Date(year.value ? year.value + '-' + (time.getMonth() + 1) : '').getTime() > new Date().getTime();
    };
</script>

<style lang="scss" scoped>
    .select-Date {
        display: flex;
        justify-content: space-around;
        margin-top: 10px;
    }

    .select-option {
        display: flex;
        align-items: center;

        .label {
            flex-shrink: 0;
            margin-right: 10px;
        }
    }
</style>
<style lang="scss">
    .month-selector {
        .el-date-picker__header {
            display: none;
        }
    }
</style>
