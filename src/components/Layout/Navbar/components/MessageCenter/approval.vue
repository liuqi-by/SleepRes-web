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
                class="form line-form"
                :label-width="tabType === 'DME' ? '180px' : '200px'"
                label-position="left"
            >
                <!-- DME name -->
                <el-form-item
                    prop="dmename"
                    :label="tabType === 'DME' ? $t('login.dmeName') : $t('login.PracticeName')"
                >
                    <div class="form-item">
                        <el-input
                            v-model="formData.dmename"
                            class="form-input"
                            :placeholder="tabType === 'DME' ? $t('login.dmeName') : $t('login.PracticeName')"
                            type="text"
                            :maxlength="inputLength.dme_name"
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
                            :maxlength="inputLength.first_name"
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
                            :maxlength="inputLength.last_name"
                        />
                    </div>
                </el-form-item>
                <!-- SleepResAccountNumber -->
                <!-- <el-form-item
                    prop="account_id"
                    :label="tabType === 'DME' ? $t('login.SleepResAccountNumber') : $t('login.PhysicianNPI')"
                >
                    <div class="form-item">
                        <el-input
                            v-model="formData.account_id"
                            class="form-input"
                            :placeholder="
                                tabType === 'DME' ? $t('login.SleepResAccountNumber') : $t('login.PhysicianNPI')
                            "
                            type="text"
                        />
                    </div>
                </el-form-item> -->
                <el-form-item
                    prop="account_num"
                    :label="$t('login.SleepResAccountNumber')"
                    v-if="tabType === 'DME'"
                >
                    <div class="form-item">
                        <el-input
                            v-model="formData.account_num"
                            class="form-input"
                            :placeholder="$t('login.SleepResAccountNumber')"
                            type="text"
                            :maxlength="inputLength.account_num"
                            ref="focusRef"
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
                            :maxlength="inputLength.npi"
                            ref="focusRef"
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
                    prop="zipCode"
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

                <!-- AccountName -->
                <el-form-item
                    prop="username"
                    :label="$t('message.AccountName')"
                >
                    <div class="form-item">
                        <el-input
                            v-model="formData.username"
                            class="form-input"
                            :placeholder="`${$t('message.AccountName')}`"
                            type="text"
                            :maxlength="inputLength.account_name"
                        />
                    </div>
                </el-form-item>
                <!-- AccountNumber -->
                <el-form-item
                    prop="account_num"
                    :label="$t('message.AccountNumber')"
                    v-if="tabType !== 'DME'"
                >
                    <div class="form-item">
                        <el-input
                            v-model="formData.account_num"
                            class="form-input"
                            :placeholder="`${$t('message.AccountNumber')}`"
                            type="text"
                            :maxlength="inputLength.account_num"
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
                    <base-button @click="reject">{{ $t('form.Reject') }}</base-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
    import type { FormInstance, InputInstance } from 'element-plus';
    import { checkMessage } from '~/api/admin';
    import type { MessageRes } from '~/api/admin/types';
    import type { UserInfo } from '~/api/login/types';

    const dialogVisible = ref(false);
    const tabType = ref('DME');

    const formRef = ref<FormInstance>(); // 登录表单ref
    const { t } = useI18n(); // 国际化

    const formData = ref<Partial<UserInfo>>({});
    const { accountName, accountNumber, firstName, lastName, email, dmeName, practiceName } = useFormRules();
    // 表单规则
    const formRules = computed(() => {
        return {
            username: accountName,
            account_num: accountNumber,
            dmename: tabType.value === 'DME' ? dmeName : practiceName,
            first_name: firstName,
            last_name: lastName,
            email,
        };
    });

    const { filterMobile } = useFilterInput(formData);

    watch(
        () => tabType,
        () => {
            nextTick(() => {
                formRef.value?.resetFields();
            });
        },
    );

    const focusRef = ref<InputInstance>();

    // 打开
    const showApproval = (item: MessageRes) => {
        formData.value = {
            ...item.userinfo,

            username: '',
        };

        dialogVisible.value = true;
        tabType.value = item.group_id === 2 ? 'DME' : 'Physician';

        setTimeout(() => {
            focusRef.value?.focus();
        }, 0);
    };

    const loading = ref(false); // 按钮loading
    const emit = defineEmits(['refresh']);
    /**
     * 批准
     */
    const submit = () => {
        formRef.value?.validate((valid: boolean) => {
            if (!valid) {
                return;
            }
            loading.value = true;

            if (!formData.value.id) {
                return;
            }

            checkMessage({
                user_id: formData.value?.id,
                account_num: formData.value?.account_num,
                account_name: formData.value?.username,
                status: 1,
                first_name: formData.value?.first_name,
                last_name: formData.value?.last_name,
                dmename: formData.value?.dmename,
                zip_code: formData.value?.zip_code,
                mobile: formData.value?.mobile,
                email: formData.value?.email,
                account_id: formData.value?.account_id,
                state: formData.value?.state,
                address: formData.value?.address,
            })
                .then(res => {
                    if (res.code === 1) {
                        ElMessage.success(t('message.Approved'));
                        emit('refresh');
                        dialogVisible.value = false;
                    }
                })
                .finally(() => {
                    loading.value = false;
                });
        });
    };

    // 拒绝
    const reject = () => {
        let msg = t('message.confirmReject');
        ElMessageBox.confirm(' ', msg, {
            confirmButtonText: t('form.Confirm'),
            cancelButtonText: t('form.Cancel'),
            type: 'warning',
            customStyle: { minHeight: 0 },
            dangerouslyUseHTMLString: true,
        })
            .then(() => {
                if (!formData.value.id) {
                    return;
                }

                checkMessage({
                    user_id: formData.value?.id,
                    status: 2,
                }).then(res => {
                    if (res.code === 1) {
                        ElMessage.success(t('message.Rejected'));
                        emit('refresh');
                        dialogVisible.value = false;
                    }
                });
            })
            .catch();
    };

    const close = () => {
        formRef.value?.resetFields();
    };

    defineExpose({
        showApproval,
        dialogVisible,
    });
</script>

<style lang="scss" scoped>
    .form-item {
        word-break: break-all;
    }

    .el-form-item {
        margin-bottom: 20px !important;
    }
</style>
