<!-- 注册 -->
<template>
    <div>
        <el-dialog
            v-model="dialogVisible"
            title=""
            width="600"
            @close="close"
        >
            <div class="title">
                {{ tabType === 'registerDme' ? $t('login.registerDmeTitle') : $t('login.registerPhysicianTitle') }}
            </div>
            <el-form
                ref="formRef"
                :model="formData"
                :rules="formRules"
                class="login-form"
                :label-width="tabType === 'registerDme' ? '170px' : '200px'"
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
                    prop="account"
                    :label="tabType === 'registerDme' ? $t('login.SleepResAccountNumber') : $t('login.PhysicianNPI')"
                >
                    <div class="form-item">
                        <el-input
                            v-model="formData.dmeName"
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
                        <el-input
                            v-model="formData.state"
                            class="form-input"
                            :placeholder="`${$t('login.State')}`"
                            type="text"
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
                        @click="handleLogin"
                        class="m-r-[10px]"
                    >
                        {{ $t('form.Confirm') }}
                    </base-button>
                    <base-button @click="dialogVisible = false">{{ $t('form.Cancel') }}</base-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
    import type { FormInstance } from 'element-plus';
    import type { LocationQuery, LocationQueryValue } from 'vue-router';
    import type { TabType } from '../index.vue';
    import { useUserStore } from '@/stores/modules/user';

    const dialogVisible = defineModel({ type: Boolean, default: true });

    const props = defineProps<{ tabType: TabType }>();

    const userStore = useUserStore();

    const loading = ref(false); // 按钮loading
    const formRef = ref<FormInstance>(); // 登录表单ref
    const { t } = useI18n(); // 国际化

    const formDataInit = {
        dmeName: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        mobile: '',
        address: '',
        state: '',
        zipCode: '',
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

    const route = useRoute();
    const router = useRouter();

    watch(
        () => props.tabType,
        () => {
            formRef.value?.resetFields();
        },
    );

    /**
     * 登录
     */
    const handleLogin = () => {
        formRef.value?.validate((valid: boolean) => {
            if (!valid) {
                return;
            }

            loading.value = true;
            let queryData = {
                account: formData.value.dmeName,
                password: formData.value.password,
            };
            userStore
                .login(queryData)
                .then(async () => {
                    ElMessage.success(t('login.loginSuccess'));
                    // 登录成功后，获取用户信息
                    await userStore.getUserInfo();

                    const query: LocationQuery = route.query;

                    const redirect = (query.redirect as LocationQueryValue) ?? '/';

                    const otherQueryParams = Object.keys(query).reduce((acc: any, cur: string) => {
                        if (cur !== 'redirect') {
                            acc[cur] = query[cur];
                        }
                        return acc;
                    }, {});

                    router.push({ path: redirect, query: otherQueryParams });
                })
                .finally(() => {
                    loading.value = false;
                });
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

    :deep(
            .el-form-item.is-required:not(.is-no-asterisk).asterisk-left > .el-form-item__label::before,
            .el-form-item.is-required:not(.is-no-asterisk).asterisk-left
                > .el-form-item__label-wrap
                > .el-form-item__label::before
        ) {
        position: absolute;
        right: 20px;
        margin-top: 3px;
        margin-right: 4px;
        color: var(--el-color-danger);
        content: '*';
    }
</style>
