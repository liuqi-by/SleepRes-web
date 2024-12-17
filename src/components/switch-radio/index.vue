<template>
    <div>
        <el-radio-group v-model="radioValue">
            <el-radio
                :value="true"
                @click.prevent="radioValue = !radioValue"
                :style="{ color: color, fontWeight: 'bold', minWidth: label ? minWidth : '0' }"
            >
                <template #default>
                    {{ label }}
                </template>
            </el-radio>
        </el-radio-group>
    </div>
</template>

<script setup lang="ts">
    const radioValue = defineModel({
        default: false,
        type: Boolean,
    });

    defineProps({
        label: {
            type: String,
            default: '',
        },
        color: {
            type: String,
            default: '#000',
        },
        minWidth: {
            type: String,
            default: '120px',
        },
    });
</script>

<style lang="scss" scoped>
    :deep(.el-radio__input.is-checked + .el-radio__label) {
        color: inherit;
    }
</style>
