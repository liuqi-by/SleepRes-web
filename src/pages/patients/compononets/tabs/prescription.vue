<template>
    <div class="prescription">
        <edit-btn v-model="isEdit" />

        <el-form
            ref="formRef"
            :model="formData"
            :rules="formRules"
            class="form"
            label-width="190px"
        >
            <el-form-item
                prop="sn"
                :label="$t('patients.DeviceSerialNumber')"
            >
                <div class="form-item">
                    <el-input
                        v-model="formData.sn"
                        class="form-input"
                        ref="snInput"
                        :maxlength="inputLength.sn"
                        :readonly="!isEdit"
                    />
                </div>
            </el-form-item>
            <el-form-item
                prop="mode_name"
                :label="$t('patients.Mode')"
            >
                <div class="form-item">
                    <el-input
                        v-model="formData.mode_name"
                        class="form-input"
                        :readonly="!isEdit"
                    />
                </div>
            </el-form-item>
            <el-form-item
                prop="pressure"
                :label="$t('patients.Pressure')"
            >
                <div class="form-item">
                    <el-input
                        v-model="formData.pressure"
                        class="form-input"
                        :readonly="!isEdit"
                    />
                </div>
            </el-form-item>
            <el-form-item
                prop="ramp"
                :label="$t('patients.Ramp')"
            >
                <div class="form-item">
                    <el-input
                        v-model="formData.ramp"
                        class="form-input"
                        :readonly="!isEdit"
                    />
                </div>
            </el-form-item>
            <el-form-item
                prop="mask"
                :label="$t('patients.Mask')"
            >
                <div class="form-item">
                    <el-input
                        v-model="formData.mask"
                        class="form-input"
                        :readonly="!isEdit"
                    />
                </div>
            </el-form-item>
            <el-form-item
                prop="mask"
                :label="$t('patients.Tubing')"
            >
                <div class="form-item">
                    <el-input
                        v-model="formData.mask"
                        class="form-input"
                        :readonly="!isEdit"
                    />
                </div>
            </el-form-item>
        </el-form>
        <div class="footer-btn">
            <base-button
                type="primary"
                @click="save"
                :loading="loading"
                :disabled="!isEdit"
            >
                {{ $t('form.Save') }}
            </base-button>
            <base-button
                @click="isEdit = false"
                :disabled="!isEdit"
            >
                {{ $t('form.Cancel') }}
            </base-button>
            <base-button>
                {{ $t('patients.SendRx') }}
            </base-button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import type { FormInstance, InputInstance } from 'element-plus';
    import editBtn from './edit-btn.vue';

    const isEdit = ref(false);

    const formData = ref({
        sn: '',
    });

    const formRules = computed(() => {
        return {};
    });

    const loading = ref(false);
    const formRef = ref<FormInstance>(); // 表单ref
    // 保存
    const save = () => {
        formRef.value?.validate(valid => {
            if (valid) {
                loading.value = true;
            }
        });
    };

    const snInput = ref<InputInstance>();
    watch(isEdit, val => {
        if (val) {
            snInput.value?.focus();
        }
    });
</script>

<style lang="scss" scoped>
    .prescription {
        padding: 20px;

        .form-item {
            max-width: 350px;
        }
    }
</style>
