<!-- 0% ~ 100%选择框 -->
<template>
    <div class="select-number">
        <el-select
            v-model="value"
            style="width: 65px"
        >
            <el-option
                v-for="item in 100"
                :key="item"
                :label="item"
                :value="item"
            />
        </el-select>
    </div>
</template>

<script setup lang="ts">
    const value = defineModel<number>({
        default: 0,
    });
</script>

<style lang="scss" scoped>
    .el-select-dropdown__item {
        padding: 0;
        text-align: center;
    }
</style>
