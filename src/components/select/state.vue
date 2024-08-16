<!-- 选择州 -->
<template>
    <el-select
        v-model="state"
        placeholder="Please select"
        filterable
    >
        <el-option
            label="All"
            value=""
        />
        <el-option
            v-for="item in stateJson"
            :key="item"
            :label="item"
            :value="item"
        />
    </el-select>
</template>

<script setup lang="ts">
    import stateJson from '@/assets/areas/state.json';

    const state = defineModel({
        type: String,
        default: '',
    });
</script>

<style lang="scss" scoped></style>
