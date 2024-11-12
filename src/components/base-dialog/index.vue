<!-- 全局dialog -->
<template>
    <el-dialog
        :close-on-click-modal="false"
        v-bind="$attrs"
    >
        <template
            v-for="(value, key) in $slots"
            :key="key"
            #[key]
        >
            <slot :name="key"></slot>
        </template>
    </el-dialog>
</template>

<script setup lang="ts"></script>

<style lang="scss">
    .el-dialog__headerbtn {
        width: 68px;
        height: 68px;

        .el-dialog__close {
            font-size: $font-large;
        }
    }
</style>
