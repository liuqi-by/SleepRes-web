<!-- 注册 -->
<template>
    <div>
        <el-dialog
            v-model="dialogVisible"
            title=""
            width="600"
            @close="close"
            class="form form-dialog"
        >
            <div class="form-title">
                {{ tabType === 'registerDme' ? $t('login.registerDmeTitle') : $t('login.registerPhysicianTitle') }}
            </div>
            <el-form
                ref="formRef"
                :model="formData"
                :rules="formRules"
                class="login-form line-form"
                :label-width="tabType === 'registerDme' ? '180px' : '200px'"
                label-position="left"
            >
                <!-- DME name -->
                <el-form-item
                    prop="username"
                    :label="tabType === 'registerDme' ? $t('login.dmeName') : $t('login.PracticeName')"
                >
                    <div class="form-item">
                        <el-input
                            v-model="formData.username"
                            class="form-input"
                            :placeholder="tabType === 'registerDme' ? $t('login.dmeName') : $t('login.PracticeName')"
                            type="text"
                            :maxlength="inputLength.name"
                            ref="focusRef"
                        />
                    </div>
                </el-form-item>

                <!-- FirstName -->
                <el-form-item
                    prop="first_name"
                    :label="$t('login.FirstName')"
                >
                    <div class="form-item">
                        <el-input
                            v-model="formData.first_name"
                            class="form-input"
                            :placeholder="`${$t('login.FirstName')}`"
                            :maxlength="inputLength.name"
                        />
                    </div>
                </el-form-item>
                <!-- LastName -->
                <el-form-item
                    prop="last_name"
                    :label="$t('login.LastName')"
                >
                    <div class="form-item">
                        <el-input
                            v-model="formData.last_name"
                            class="form-input"
                            :placeholder="`${$t('login.LastName')}`"
                            :maxlength="inputLength.name"
                        />
                    </div>
                </el-form-item>
                <!-- SleepResAccountNumber -->
                <el-form-item
                    prop="account_num"
                    :label="$t('login.SleepResAccountNumber')"
                    v-if="tabType === 'registerDme'"
                >
                    <div class="form-item">
                        <el-input
                            v-model="formData.account_num"
                            class="form-input"
                            :placeholder="$t('login.SleepResAccountNumber')"
                            type="text"
                            maxlength="20"
                        />
                    </div>
                </el-form-item>
                <el-form-item
                    prop="account_id"
                    :label="$t('login.PhysicianNPI')"
                    v-else
                >
                    <div class="form-item">
                        <el-input
                            v-model="formData.account_id"
                            class="form-input"
                            :placeholder="$t('login.PhysicianNPI')"
                            type="text"
                            :maxlength="inputLength.account_id"
                        />
                    </div>
                </el-form-item>
                <!-- Email -->
                <el-form-item
                    prop="email"
                    :label="$t('login.Email')"
                >
                    <div class="form-item">
                        <el-input
                            v-model="formData.email"
                            class="form-input"
                            :placeholder="`${$t('login.Email')}`"
                            type="text"
                            :maxlength="inputLength.email"
                        />
                    </div>
                </el-form-item>
                <!-- PhoneNumber -->
                <el-form-item
                    prop="mobile"
                    :label="$t('login.PhoneNumber')"
                >
                    <div class="form-item">
                        <el-input
                            v-model="formData.mobile"
                            class="form-input"
                            :placeholder="`${$t('login.PhoneNumber')}`"
                            type="text"
                            :maxlength="inputLength.mobile"
                            @input="filterMobile('mobile')"
                        />
                    </div>
                </el-form-item>
                <!-- Address -->
                <el-form-item
                    prop="address"
                    :label="$t('login.Address')"
                >
                    <div class="form-item">
                        <el-input
                            v-model="formData.address"
                            class="form-input"
                            :placeholder="`${$t('login.Address')}`"
                            type="text"
                            :maxlength="inputLength.address"
                        />
                    </div>
                </el-form-item>
                <!-- State -->
                <el-form-item
                    prop="state"
                    :label="$t('login.State')"
                >
                    <div class="form-item">
                        <select-state
                            v-model="formData.state"
                            class="form-input"
                            :placeholder="`${$t('login.State')}`"
                        />
                    </div>
                </el-form-item>
                <!-- ZipCode -->
                <el-form-item
                    prop="zip_code"
                    :label="$t('login.ZipCode')"
                >
                    <div class="form-item">
                        <el-input
                            v-model="formData.zip_code"
                            class="form-input"
                            :placeholder="`${$t('login.ZipCode')}`"
                            type="text"
                            :maxlength="inputLength.zipCode"
                            @keyup.enter="submit"
                        />
                    </div>
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <base-button
                        type="primary"
                        @click="submit"
                        class="m-r-[10px]"
                        :loading="loading"
                    >
                        {{ $t('form.Submit') }}
                    </base-button>
                    <base-button @click="dialogVisible = false">{{ $t('form.Cancel') }}</base-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
    import type { FormInstance, InputInstance } from 'element-plus';
    import type { TabType } from '../index.vue';
    import type { RegisterReq } from '~/api/login/types';
    import { registerAccount } from '~/api/login';

    const dialogVisible = defineModel({ type: Boolean, default: false });

    const props = defineProps<{ tabType: TabType }>();

    const formRef = ref<FormInstance>(); // 登录表单ref
    const { t } = useI18n(); // 国际化

    // const formDataInit: RegisterReq = {
    //     username: '',
    //     email: '',
    //     mobile: '',
    //     first_name: '',
    //     last_name: '',
    //     account_id: '',
    //     account_num: '',
    //     address: '',
    //     state: '',
    //     zip_code: '',
    //     // 账户类型:2=DME,4=Physician
    //     type: '',
    // };

    const formData = ref<RegisterReq>({
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        group_id: 2,
    });
    const { filterMobile } = useFilterInput(formData);
    const { dmeName, practiceName, firstName, lastName, email } = useFormRules();
    // 表单规则
    const formRules = computed(() => {
        return {
            username: props.tabType === 'registerDme' ? dmeName : practiceName,
            first_name: firstName,
            last_name: lastName,
            email,
        };
    });

    watch(
        () => props.tabType,
        () => {
            nextTick(() => {
                formRef.value?.resetFields();
            });
        },
    );

    const loading = ref(false); // 按钮loading
    /**
     * 注册
     */
    const submit = () => {
        formRef.value?.validate((valid: boolean) => {
            if (!valid) {
                return;
            }
            loading.value = true;

            // 注册
            registerAccount({
                ...formData.value,
                group_id: props.tabType === 'registerDme' ? 2 : 4,
            })
                .then(res => {
                    if (res.code === 1) {
                        ElMessage.success(t('login.RegisterSuccess'));
                        // 重置
                        formRef.value?.resetFields();
                        dialogVisible.value = false;
                    }
                })
                .finally(() => {
                    loading.value = false;
                });
        });
    };

    const close = () => {
        formRef.value?.resetFields();
    };

    // 聚焦第一个输入框
    const focusRef = ref<InputInstance>();
    watch(
        dialogVisible,
        val => {
            if (val) {
                setTimeout(() => {
                    focusRef.value?.focus();
                }, 0);
            }
        },
        {
            immediate: true,
        },
    );
</script>

<style lang="scss" scoped>
    .el-form-item {
        margin-bottom: 18px !important;
    }
</style>
