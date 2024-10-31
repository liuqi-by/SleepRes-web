<template>
    <div class="select-days">
        <div class="flex-shrink-0 m-r-[20px]">Days</div>
        <el-select
            v-model="selectHours"
            placeholder="Select days"
        >
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="String(item.value)"
            />
        </el-select>
    </div>
</template>

<script setup lang="ts">
    const selectHours = defineModel<number>();

    const options = [
        {
            label: '3-5 Days',
            value: 0,
        },
        {
            label: '6-10 Days',
            value: 1,
        },
        {
            label: '11-15 Days',
            value: 2,
        },
        {
            label: '16-20 Days',
            value: 3,
        },
        {
            label: '21 Days or Greater',
            value: 4,
        },
    ];
</script>

<style lang="scss" scoped>
    .select-days {
        display: flex;
        align-items: center;
        min-width: 300px;
    }
</style>
