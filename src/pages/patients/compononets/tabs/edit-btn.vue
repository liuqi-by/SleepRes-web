<template>
    <div class="edit-btn">
        <base-button
            :type="isEdit ? 'primary' : 'default'"
            @click="isEdit = !isEdit"
            >{{ $t('admin.edit') }}</base-button
        >
    </div>
</template>

<script setup lang="ts">
    const isEdit = defineModel<boolean>({
        default: false,
    });
</script>

<style lang="scss" scoped>
    .edit-btn {
        padding: 10px 30px 30px;
        text-align: right;
    }
</style>
