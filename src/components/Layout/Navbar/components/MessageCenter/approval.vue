<!-- 查看消息 -->
<template>
    <div>
        <el-dialog
            v-model="dialogVisible"
            title=""
            width="600"
            @close="close"
            class="form-dialog from"
            style="margin-top: 5vh"
            append-to-body
        >
            <div class="form-title">
                {{ tabType === 'DME' ? $t('message.dmeApproval') : $t('message.physicianApproval') }}
            </div>
            <el-form
                ref="formRef"
                :model="formData"
                :rules="formRules"
                class="login-form"
                :label-width="tabType === 'DME' ? '170px' : '200px'"
                label-position="left"
            >
                <!-- DME name -->
                <el-form-item
                    prop="dmeName"
                    :label="tabType === 'DME' ? $t('login.dmeName') : $t('login.PracticeName')"
                >
                    <div class="form-item">
                        {{ formData.dmeName }}
                    </div>
                </el-form-item>

                <!-- FirstName -->
                <el-form-item
                    prop="firstName"
                    :label="$t('login.FirstName')"
                >
                    <div class="form-item">
                        {{ formData.firstName }}
                    </div>
                </el-form-item>
                <!-- LastName -->
                <el-form-item
                    prop="lastName"
                    :label="$t('login.LastName')"
                >
                    <div class="form-item">
                        {{ formData.lastName }}
                    </div>
                </el-form-item>
                <!-- SleepResAccountNumber -->
                <el-form-item
                    prop="sleepAccount"
                    :label="tabType === 'DME' ? $t('message.dmeNPI') : $t('login.PhysicianNPI')"
                >
                    <div class="form-item">
                        <el-input
                            v-model="formData.sleepAccount"
                            class="form-input"
                            :placeholder="
                                tabType === 'DME' ? $t('login.SleepResAccountNumber') : $t('login.PhysicianNPI')
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
                        {{ formData.email }}
                    </div>
                </el-form-item>
                <!-- PhoneNumber -->
                <el-form-item
                    prop="mobile"
                    :label="$t('login.PhoneNumber')"
                >
                    <div class="form-item">
                        {{ formData.mobile }}
                    </div>
                </el-form-item>
                <!-- Address -->
                <el-form-item
                    prop="address"
                    :label="$t('login.Address')"
                >
                    <div class="form-item">
                        {{ formData.address }}
                    </div>
                </el-form-item>
                <!-- State -->
                <el-form-item
                    prop="state"
                    :label="$t('login.State')"
                >
                    <div class="form-item">
                        {{ formData.state }}
                    </div>
                </el-form-item>
                <!-- ZipCode -->
                <el-form-item
                    prop="zipCode"
                    :label="$t('login.ZipCode')"
                >
                    <div class="form-item">
                        {{ formData.zipCode }}
                    </div>
                </el-form-item>

                <!-- AccountName -->
                <el-form-item
                    prop="accountName"
                    :label="$t('message.AccountName')"
                >
                    <div class="form-item">
                        <el-input
                            v-model="formData.accountName"
                            class="form-input"
                            :placeholder="`${$t('message.AccountName')}`"
                            type="text"
                        />
                    </div>
                </el-form-item>
                <!-- AccountName -->
                <el-form-item
                    prop="accountNumber"
                    :label="$t('message.AccountNumber')"
                >
                    <div class="form-item">
                        <el-input
                            v-model="formData.accountNumber"
                            class="form-input"
                            :placeholder="`${$t('message.AccountNumber')}`"
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

    const dialogVisible = ref(false);
    const tabType = ref('DME');

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
        accountName: '',
        accountNumber: '',
    };

    const formData = ref({
        ...formDataInit,
    });
    const { accountName, accountNumber } = useFormRules();
    // 表单规则
    const formRules = computed(() => {
        return {
            accountName,
            accountNumber,
        };
    });

    watch(
        () => tabType,
        () => {
            nextTick(() => {
                formRef.value?.resetFields();
            });
        },
    );

    // 打开
    const showApproval = (item: any) => {
        formData.value = {
            ...item,
            accountNumber: '',
            accountName: '',
        };
        dialogVisible.value = true;
        tabType.value = item.accountType;
    };

    const loading = ref(false); // 按钮loading
    /**
     * 批准
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
                    accountType: tabType.value === 'DME' ? 'DME' : 'Physician',
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

    defineExpose({
        showApproval,
    });
</script>

<style lang="scss"></style>
