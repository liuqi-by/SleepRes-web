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
            />
        </div>

        <div class="select-option">
            <div class="label">Year</div>
            <el-date-picker
                v-model="year"
                type="year"
                placeholder="Pick a year"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
    const month = ref('');
    const year = ref('');
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
