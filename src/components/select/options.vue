<template>
    <div class="select-options">
        <div
            class="flex-shrink-0 m-r-[20px]"
            v-if="label"
        >
            {{ label }}
        </div>
        <el-select
            v-model="selectModel"
            :placeholder="`Select ${label}`"
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
    const selectModel = defineModel<any>();

    defineProps<{
        label?: string;
        options: Array<{
            label: string;
            value: number | string;
        }>;
    }>();
</script>

<style lang="scss" scoped>
    .select-options {
        display: flex;
        align-items: center;
        min-width: 300px;
    }
</style>
