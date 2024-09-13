<template>
    <div class="prescription">
        under development
        <edit-btn v-model="isEdit" />

        <el-form
            ref="formRef"
            :model="formData"
            :rules="formRules"
            class="form"
            label-width="120px"
            :disabled="!isEdit"
        >
            <el-form-item
                prop="mode"
                label="通气模式"
            >
                <div class="form-item">
                    <el-select v-model="mode">
                        <el-option
                            :label="item.label"
                            :value="item.value"
                            v-for="item in modeOptions"
                            :key="item.value"
                        />
                    </el-select>
                </div>
            </el-form-item>
            <div class="column-box">
                <el-form-item
                    prop="sn"
                    :label="$t(`deviceSettings.par${item}`)"
                    v-for="(item, index) in modeSettingList[mode]"
                    :key="index"
                >
                    <div class="form-item">
                        <el-select>
                            <el-option
                                label="无"
                                value="0"
                            />
                        </el-select>
                    </div>
                </el-form-item>
            </div>
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
    import editBtn from './components/edit-btn.vue';
    import type { UserInfo } from '~/api/login/types';
    import { getDeviceModel } from '~/api/device';

    const isEdit = ref(false);

    const formData = ref({
        mode: 0,
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

    // 模式显示
    const mode = ref(0);
    const modeOptions = ref<string[]>();
    const modeSettingList = [
        [75, 60, 61, 62, 70, 84, 86],
        [75, 60, 61, 62, 70, 82, 83, 86, 89],
        [61, 62, 70, 82, 83, 89],
        [75, 77, 76, 64, 63, 68, 66, 67, 60, 61, 62, 86],
        [75, 77, 76, 68, 65, 60, 61, 62, 69, 86],
        [75, 77, 76, 64, 63, 68, 65, 66, 67, 60, 61, 62, 69, 86],
        [75, 77, 76, 64, 63, 68, 60, 61, 62, 78, 79, 81, 86, 88, 89],
        [75, 77, 76, 64, 68, 65, 60, 61, 62, 69, 86],
        [77, 76, 64, 63, 68, 65, 66, 67, 61, 62, 69, 79, 80, 85],
        [77, 76, 64, 68, 65, 61, 62, 69, 79, 80, 85],
    ];

    const patient = inject<Ref<UserInfo>>('patient');
    const getDeviceModelInfo = () => {
        if (!patient || !patient.value?.sn) {
            return;
        }

        getDeviceModel({
            sn: 'DACB0A00232',
        }).then(res => {
            if (res.code === 1) {
                modeOptions.value = res.data.model_name;
            }
        });
    };

    onMounted(() => {
        getDeviceModelInfo();
    });
</script>

<style lang="scss" scoped>
    .prescription {
        padding: 20px;

        .form-item {
            max-width: 200px;
        }

        .column-box {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
        }
    }
</style>
