<!-- 患者记录 -->
<template>
    <div>
        <el-dialog
            v-model="dialogVisible"
            title=""
            width="1250"
            @close="close"
            class="form form-dialog"
        >
            <div class="form-title">
                {{ $t('users.EditUserInfo') }}
            </div>
        </el-dialog>
    </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped></style>
