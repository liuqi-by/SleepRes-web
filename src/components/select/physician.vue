<!-- 选择医生 -->
<template>
    <base-select-search
        v-model="value"
        :getListApi="getDoctor"
        :searchPlaceholder="$t('patients.searchPlaceholderDoctor')"
        value="id"
        label="nickname"
        searchWidth="400px"
    >
        <template #option="{ data }">
            <div class="flex justify-between">
                <span class="m-r-[20px]">{{ data.nickname }}</span>
                <span>{{ data.email }}</span>
            </div>
        </template>
    </base-select-search>
</template>

<script setup lang="ts">
    import { getDoctor } from '~/api/patient';

    const value = defineModel({
        type: String,
        default: '',
    });
</script>

<style lang="scss" scoped></style>
