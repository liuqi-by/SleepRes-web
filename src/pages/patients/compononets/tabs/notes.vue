<!-- notes -->
<template>
    <div class="notes">
        <el-form
            ref="formRef"
            :model="formData"
            :rules="formRules"
            class="form"
            label-position="top"
        >
            <!-- note展示 -->
            <el-form-item label="Note">
                <div class="note-list">
                    <li
                        v-for="(item, index) in noteList"
                        :key="index"
                    >
                        <p>
                            <b class="m-r-10px">{{
                                nameFormat({
                                    first_name: item.first_name,
                                    last_name: item.last_name,
                                })
                            }}</b>
                            {{ item.add_time && moment(item.add_time * 1000).format(dateFormatReg + ' HH:mm:ss') }}
                        </p>
                        <p class="m-t-5px">{{ item.note }}</p>
                    </li>
                </div>
            </el-form-item>
            <!-- note输入 -->
            <el-form-item
                :label="$t('patients.TakeNotes')"
                prop="notes"
                class="no-required"
            >
                <el-input
                    v-model="formData.notes"
                    type="textarea"
                    :rows="8"
                    :placeholder="$t('patients.TakeNotes')"
                    :maxlength="inputLength.note"
                />
            </el-form-item>
        </el-form>
        <div class="footer-btn">
            <base-button
                type="primary"
                @click="save"
                :loading="loading"
            >
                {{ $t('form.Save') }}
            </base-button>
            <base-button @click="formData.notes = ''">
                {{ $t('form.Cancel') }}
            </base-button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import type { FormInstance } from 'element-plus';
    import moment from 'moment';
    import type { UserInfo } from '~/api/login/types';
    import { addNote } from '~/api/patient';

    const patient = inject<Ref<UserInfo>>('patient');

    const noteList = computed(() => {
        return patient?.value?.note ? JSON.parse(patient?.value?.note).reverse() : [];
    });

    const formData = reactive({
        notes: '',
    });

    const { notes } = useFormRules();
    const formRules = computed(() => {
        return {
            notes,
        };
    });

    const loading = ref(false);
    const formRef = ref<FormInstance>(); // 表单ref
    // const emit = defineEmits(['update']);
    const update = inject<Function>('update');
    const updatePatient = inject<Function>('updatePatient');
    // 保存
    const save = () => {
        formRef.value?.validate(valid => {
            if (valid) {
                loading.value = true;
                if (!patient?.value.id) {
                    return;
                }
                addNote({
                    note: formData.notes,
                    user_id: patient.value.id,
                })
                    .then(res => {
                        if (res.code === 1) {
                            ElMessage.success(res.msg);
                            // emit('update', { ...res.data, patient: JSON.parse(res.data.patient) });
                            // update && update();
                            update && update();
                            updatePatient && updatePatient({ ...res.data, patient: JSON.parse(res.data.patient) });
                            formData.notes = '';
                        }
                    })
                    .finally(() => {
                        loading.value = false;
                    });
            }
        });
    };
</script>

<style lang="scss" scoped>
    .notes {
        padding: 20px 80px;

        .note-list {
            width: 100%;
            min-height: 150px;
            max-height: 300px;
            padding: 10px;
            overflow: auto;
            line-height: 1.5;
            background-color: #fff;
            border: 1px solid #ccc;

            li {
                padding: 5px;
                border-bottom: 1px solid #eee;

                &:last-child {
                    border-bottom: none;
                }
            }
        }
    }
</style>
