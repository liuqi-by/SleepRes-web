<template>
    <div class="select-ahi">
        <div class="flex-shrink-0 m-r-[20px]">AHI</div>
        <el-select
            v-model="selectHours"
            placeholder="Select AHI"
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
            label: '10 - 19',
            value: 0,
        },
        {
            label: '20 - 29',
            value: 1,
        },
        {
            label: '30 - 39',
            value: 2,
        },
        {
            label: '40 or greater',
            value: 3,
        },
    ];
</script>

<style lang="scss" scoped>
    .select-ahi {
        display: flex;
        align-items: center;
        min-width: 300px;
    }
</style>
