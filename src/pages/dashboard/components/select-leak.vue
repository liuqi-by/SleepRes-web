<template>
    <div class="select-leak">
        <div class="flex-shrink-0 m-r-[20px]">Leak</div>
        <el-select
            v-model="selectHours"
            placeholder="Select leak"
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
            label: '10 - 19 LPM',
            value: 0,
        },
        {
            label: '20 - 29 LPM',
            value: 1,
        },
        {
            label: '30 - 39 LPM',
            value: 2,
        },
        {
            label: '40 LPM or greater',
            value: 3,
        },
    ];
</script>

<style lang="scss" scoped>
    .select-leak {
        display: flex;
        align-items: center;
        min-width: 300px;
    }
</style>
