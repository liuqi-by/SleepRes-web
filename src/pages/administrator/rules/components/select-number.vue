<!-- 0% ~ 100%选择框 -->
<template>
    <div class="select-number">
        <el-select
            v-model="value"
            placeholder=""
            style="min-width: 65px"
        >
            <el-option
                v-for="item in range"
                :key="item"
                :label="item"
                :value="item"
            />
        </el-select>
    </div>
</template>

<script setup lang="ts">
    const value = defineModel<number | string>({
        default: 0,
    });

    const props = defineProps({
        min: {
            type: Number,
            default: 0,
        },
        max: {
            type: Number,
            default: 100,
        },
    });

    const range = computed(() => {
        return Array.from({ length: props.max - props.min + 1 }, (_, i) => i + props.min);
    });
</script>

<style lang="scss" scoped>
    .el-select-dropdown__item {
        padding: 0;
        text-align: center;
    }

    :deep(.el-select__wrapper) {
        min-height: 30px;
    }

    :deep(.el-select__placeholder) {
        position: relative;
        top: none;
        transform: none;
    }
</style>
