<template>
    <div class="select-hours">
        <div class="flex-shrink-0 m-r-[20px]">Hours</div>
        <el-select
            v-model="selectHours"
            placeholder="Select hours"
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
            label: '0 (Zero)',
            value: 0,
        },
        {
            label: '0.1 - 2.0',
            value: 1,
        },
        {
            label: '2.1 - 4.0',
            value: 2,
        },
        {
            label: '4.1 - 6.0',
            value: 3,
        },
        {
            label: '6.1 - 8.0',
            value: 4,
        },
        {
            label: 'Greater than 8.0',
            value: 5,
        },
    ];
</script>

<style lang="scss" scoped>
    .select-hours {
        display: flex;
        align-items: center;
        min-width: 300px;
    }
</style>
