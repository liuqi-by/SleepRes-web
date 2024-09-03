<!-- 选择性别 -->
<template>
    <el-select
        v-model="gender"
        placeholder="Please select"
        filterable
    >
        <el-option
            v-for="item in genderList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
    </el-select>
</template>

<script setup lang="ts">
    const { t } = useI18n();
    const genderList = [
        {
            label: t('patients.unknown'),
            value: 0,
        },
        {
            label: t('patients.Male'),
            value: 1,
        },
        {
            label: t('patients.Female'),
            value: 2,
        },
    ];

    const gender = defineModel({
        type: Number,
        default: 0,
    });
</script>

<style lang="scss" scoped></style>
