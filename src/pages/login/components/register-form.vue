<!-- 注册 -->
<template>
    <div>
        <el-dialog
            v-model="dialogVisible"
            title=""
            width="600"
        >
            <div class="title">
                {{ tabType === 'registerDme' ? $t('login.registerDmeTitle') : $t('login.registerPhysicianTitle') }}
            </div>
            <el-form
                ref="formRef"
                :model="formData"
                :rules="formRules"
                class="login-form"
                label-width="200px"
                label-position="left"
            >
                <!-- 账号 -->
                <el-form-item
                    prop="account"
                    :label="tabType === 'registerDme' ? $t('login.dmeName') : $t('login.PracticeName')"
                >
                    <div class="form-item">
                        <el-input
                            v-model.trim="formData.account"
                            class="form-input"
                            :placeholder="tabType === 'registerDme' ? $t('login.dmeName') : $t('login.PracticeName')"
                            name="username"
                            type="text"
                        />
                    </div>
                </el-form-item>
                <!-- FirstName -->
                <el-form-item
                    prop="account"
                    :label="$t('login.FirstName')"
                >
                    <div class="form-item">
                        <el-input
                            v-model.trim="formData.account"
                            class="form-input"
                            :placeholder="`${$t('login.FirstName')}`"
                            name="username"
                            type="text"
                        />
                    </div>
                </el-form-item>
                <!-- LastName -->
                <el-form-item
                    prop="account"
                    :label="$t('login.LastName')"
                >
                    <div class="form-item">
                        <el-input
                            v-model.trim="formData.account"
                            class="form-input"
                            :placeholder="`${$t('login.LastName')}`"
                            name="username"
                            type="text"
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
                            v-model.trim="formData.account"
                            class="form-input"
                            :placeholder="
                                tabType === 'registerDme' ? $t('login.SleepResAccountNumber') : $t('login.PhysicianNPI')
                            "
                            name="username"
                            type="text"
                        />
                    </div>
                </el-form-item>
                <!-- Email -->
                <el-form-item
                    prop="account"
                    :label="$t('login.Email')"
                >
                    <div class="form-item">
                        <el-input
                            v-model.trim="formData.account"
                            class="form-input"
                            :placeholder="`${$t('login.Email')}`"
                            name="username"
                            type="text"
                        />
                    </div>
                </el-form-item>
                <!-- PhoneNumber -->
                <el-form-item
                    prop="account"
                    :label="$t('login.PhoneNumber')"
                >
                    <div class="form-item">
                        <el-input
                            v-model.trim="formData.account"
                            class="form-input"
                            :placeholder="`${$t('login.PhoneNumber')}`"
                            name="username"
                            type="text"
                        />
                    </div>
                </el-form-item>
                <!-- Address -->
                <el-form-item
                    prop="account"
                    :label="$t('login.Address')"
                >
                    <div class="form-item">
                        <el-input
                            v-model.trim="formData.account"
                            class="form-input"
                            :placeholder="`${$t('login.Address')}`"
                            name="username"
                            type="text"
                        />
                    </div>
                </el-form-item>
                <!-- State -->
                <el-form-item
                    prop="account"
                    :label="$t('login.State')"
                >
                    <div class="form-item">
                        <el-input
                            v-model.trim="formData.account"
                            class="form-input"
                            :placeholder="`${$t('login.State')}`"
                            name="username"
                            type="text"
                        />
                    </div>
                </el-form-item>
                <!-- ZipCode -->
                <el-form-item
                    prop="account"
                    :label="$t('login.ZipCode')"
                >
                    <div class="form-item">
                        <el-input
                            v-model.trim="formData.account"
                            class="form-input"
                            :placeholder="`${$t('login.ZipCode')}`"
                            name="username"
                            type="text"
                        />
                    </div>
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button
                        type="primary"
                        @click="handleLogin"
                        class="m-r-[10px]"
                    >
                        {{ $t('form.Confirm') }}
                    </el-button>
                    <el-button @click="dialogVisible = false">{{ $t('form.Cancel') }}</el-button>
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

    const formData = ref({
        account: '',
        password: '',
        verificationCode: '',
    });

    // 表单规则
    const formRules = computed(() => {
        return {};
    });

    const route = useRoute();
    const router = useRouter();

    watch(
        () => props.tabType,
        () => {
            formData.value = {
                account: '',
                password: '',
                verificationCode: '',
            };
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
                account: formData.value.account,
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
</script>

<style lang="scss" scoped>
    .el-form-item {
        margin-bottom: 12px !important;
    }
</style>
