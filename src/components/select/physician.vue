<!-- 选择医生 -->
<template>
    <base-select-search
        v-model="value"
        :getListApi="type === 1 ? getTherapist : getDoctor"
        :searchPlaceholder="$t('patients.searchPlaceholderDoctor')"
        value="id"
        label="nickname"
        searchWidth="400px"
        v-bind="$attrs"
    >
        <template #option="{ data }">
            <div class="flex justify-between">
                <span class="m-r-[20px]">{{ nameFormat(data) }}</span>
                <span>{{ data.email }}</span>
            </div>
        </template>
    </base-select-search>
</template>

<script setup lang="ts">
    import { getDoctor, getTherapist } from '~/api/patient';

    const value = defineModel<any>();

    defineProps({
        type: {
            type: Number,
            default: 0,
        },
    });
</script>

<style lang="scss" scoped></style>
