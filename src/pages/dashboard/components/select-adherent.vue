<template>
    <div class="select-adherent">
        <div class="flex-shrink-0 m-r-[20px]">Status</div>
        <el-select
            v-model="status"
            placeholder="Select status"
        >
            <el-option
                label="Adherent"
                value="0"
            />
            <el-option
                label="Non-Adherent"
                value="2"
            />
            <el-option
                label="Monitoring"
                value="1"
            />
        </el-select>
    </div>
</template>

<script setup lang="ts">
    const status = defineModel<number>('status');
</script>

<style lang="scss" scoped>
    .select-adherent {
        display: flex;
        align-items: center;
        min-width: 300px;
    }
</style>
