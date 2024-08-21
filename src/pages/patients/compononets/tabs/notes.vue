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
                        v-for="item in notesList"
                        :key="item.date"
                    >
                        <p>{{ item.date }}</p>
                        <p>{{ item.content }}</p>
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
        <div class="justify-center flex">
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

    const formData = reactive({
        notes: '',
    });

    const notesList = ref([
        {
            content: '123',
            date: '2022-01-01',
        },
        {
            content:
                '测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试',
            date: '2022-01-02',
        },
        {
            content: '测试',
            date: '2022-01-02',
        },
    ]);

    const { notes } = useFormRules();
    const formRules = computed(() => {
        return {
            notes,
        };
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
