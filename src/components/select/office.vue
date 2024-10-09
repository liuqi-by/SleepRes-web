<!-- 选择机构 -->
<template>
    <base-select-search
        v-model="value"
        :getListApi="getOrganization"
        :searchPlaceholder="$t('office.searchPlaceholder')"
        value="id"
        label="name"
        ref="baseSelectRef"
        v-bind="$attrs"
        clearable
    >
        <template #option="{ data }">
            <div class="flex justify-between">
                <span class="m-r-[20px]">{{ data.name }}</span>
                <span>{{ data.state }}</span>
            </div>
        </template>
    </base-select-search>
</template>

<script setup lang="ts">
    import { getOrganization } from '~/api/organization';

    const value = defineModel({
        type: Object,
        default: '',
    });

    // const baseSelectRef = ref<InstanceType<typeof BaseSelectSearch>>();

    // const initOptions = () => {
    //     baseSelectRef.value?.initOptions();
    // };

    // defineExpose({
    //     initOptions,
    // });
</script>

<style lang="scss" scoped></style>
