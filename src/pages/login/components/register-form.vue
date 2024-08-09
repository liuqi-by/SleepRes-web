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
                class="login-form"
                :label-width="tabType === 'registerDme' ? '180px' : '200px'"
                label-position="left"
            >
                <!-- DME name -->
                <el-form-item
                    prop="dmeName"
                    :label="tabType === 'registerDme' ? $t('login.dmeName') : $t('login.PracticeName')"
                >
                    <div class="form-item">
                        <el-input
                            v-model="formData.dmeName"
                            class="form-input"
                            :placeholder="tabType === 'registerDme' ? $t('login.dmeName') : $t('login.PracticeName')"
                            type="text"
                            :maxlength="inputLength.name"
                        />
                    </div>
                </el-form-item>

                <!-- FirstName -->
                <el-form-item
                    prop="firstName"
                    :label="$t('login.FirstName')"
                >
                    <div class="form-item">
                        <el-input
                            v-model="formData.firstName"
                            class="form-input"
                            :placeholder="`${$t('login.FirstName')}`"
                            type="text"
                            :maxlength="inputLength.name"
                        />
                    </div>
                </el-form-item>
                <!-- LastName -->
                <el-form-item
                    prop="lastName"
                    :label="$t('login.LastName')"
                >
                    <div class="form-item">
                        <el-input
                            v-model="formData.lastName"
                            class="form-input"
                            :placeholder="`${$t('login.LastName')}`"
                            type="text"
                            :maxlength="inputLength.name"
                        />
                    </div>
                </el-form-item>
                <!-- SleepResAccountNumber -->
                <el-form-item
                    prop="sleepAccount"
                    :label="tabType === 'registerDme' ? $t('login.SleepResAccountNumber') : $t('login.PhysicianNPI')"
                >
                    <div class="form-item">
                        <el-input
                            v-model="formData.sleepAccount"
                            class="form-input"
                            :placeholder="
                                tabType === 'registerDme' ? $t('login.SleepResAccountNumber') : $t('login.PhysicianNPI')
                            "
                            type="text"
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
                    prop="zipCode"
                    :label="$t('login.ZipCode')"
                >
                    <div class="form-item">
                        <el-input
                            v-model="formData.zipCode"
                            class="form-input"
                            :placeholder="`${$t('login.ZipCode')}`"
                            type="text"
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
    import type { FormInstance } from 'element-plus';
    import type { TabType } from '../index.vue';

    const dialogVisible = defineModel({ type: Boolean, default: true });

    const props = defineProps<{ tabType: TabType }>();

    const formRef = ref<FormInstance>(); // 登录表单ref
    const { t } = useI18n(); // 国际化

    const formDataInit = {
        dmeName: '',
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
        address: '',
        state: '',
        zipCode: '',
        sleepAccount: '',
    };

    const formData = ref({
        ...formDataInit,
    });
    const { username, firstName, lastName, email } = useFormRules();
    // 表单规则
    const formRules = computed(() => {
        return {
            dmeName: username,
            firstName,
            lastName,
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

            const userList = useLocalStorage<any>('userList', []);
            // 注册
            setTimeout(() => {
                userList.value.push({
                    ...formData.value,
                    id: userList.value.length + 1,
                    accountType: props.tabType === 'registerDme' ? 'DME' : 'Physician',
                });
                ElMessage.success(t('login.RegisterSuccess'));
                dialogVisible.value = false;
                loading.value = false;
            }, 500);
        });
    };

    const close = () => {
        formRef.value?.clearValidate();
    };
</script>

<style lang="scss" scoped>
    .el-form-item {
        margin-bottom: 18px !important;
    }
</style>
