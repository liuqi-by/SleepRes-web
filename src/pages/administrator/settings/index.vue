<template>
    <div class="page-container">
        <div>
            <h1>{{ $t('settings.CompanyInformation') }}</h1>
            <p>This information will be displayed on your therapy reports.</p>
        </div>
        <div class="w-600px m-t-30px p-l-30px">
            <el-form
                ref="formRef"
                :model="formData"
                :rules="formRules"
                class="form line-form"
                label-position="left"
                label-width="150px"
            >
                <el-form-item
                    :label="$t('settings.CompanyName')"
                    prop="company_name"
                >
                    <div class="form-item">
                        <el-input
                            v-model="formData.company_name"
                            class="form-input"
                            :placeholder="$t('settings.CompanyName')"
                            :maxlength="inputLength.office_name"
                            ref="focusRef"
                        />
                    </div>
                </el-form-item>
                <el-form-item
                    label="Address Line 1"
                    prop="address1"
                >
                    <div class="form-item">
                        <el-input
                            v-model="formData.address1"
                            class="form-input"
                            :placeholder="`${$t('login.Address')}`"
                            type="text"
                            :maxlength="inputLength.address"
                        />
                    </div>
                </el-form-item>
                <el-form-item
                    label="Address Line 2"
                    prop="address2"
                >
                    <div class="form-item">
                        <el-input
                            v-model="formData.address2"
                            class="form-input"
                            :placeholder="`${$t('login.Address')}`"
                            type="text"
                            :maxlength="inputLength.address"
                        />
                    </div>
                </el-form-item>
                <el-form-item
                    :label="$t('office.City')"
                    prop="city"
                >
                    <div class="form-item">
                        <el-input
                            v-model="formData.city"
                            class="form-input"
                            :placeholder="$t('office.City')"
                            :maxlength="inputLength.city"
                        />
                    </div>
                </el-form-item>
                <el-form-item
                    label=""
                    prop="state"
                    label-width="200px"
                >
                    <template #label>
                        State
                        <select-state
                            v-model="formData.state"
                            class="form-input m-l-10px"
                            :placeholder="`${$t('login.State')}`"
                        />
                    </template>
                    <div class="form-item el-form-item__label p-0!">
                        Zip Code
                        <el-input
                            v-model="formData.zip_code"
                            class="form-input"
                            :placeholder="`${$t('login.ZipCode')}`"
                            type="text"
                            :maxlength="inputLength.zipCode"
                            @input="filterNumberAndChart('zip_code')"
                        />
                    </div>
                </el-form-item>
                <el-form-item
                    label=""
                    prop="companyName"
                >
                    <template #label>
                        <div class="text-align-center">
                            <p>{{ $t('settings.CompanyLogo') }}</p>
                            <el-upload
                                action="#"
                                :auto-upload="false"
                                :show-file-list="false"
                                :on-change="handleUploadFile"
                                accept=".png,.jpg,.jpeg,.bmp"
                            >
                                <base-button type="primary">{{ $t('settings.Upload') }}</base-button>
                            </el-upload>
                        </div>
                    </template>
                    <div class="form-item w-[208px]! h-[64px]! items-center justify-center relative top-20px">
                        <img
                            :src="formData.logo ? baseUrl + formData.logo : ''"
                            alt="logo"
                            class="bg-#797979 wh-full"
                        />
                    </div>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script setup lang="ts">
    import type { UploadFile } from 'element-plus';
    import { getAdminSetting, updateAdminSetting } from '~/api/admin';
    import type { AdminSetting } from '~/api/admin/types';
    import { uploadFile } from '~/api/public';

    const baseUrl = process.env.API_URL;

    const formData = ref<AdminSetting>({
        company_name: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip_code: '',
        logo: '',
    });

    const isLoading = ref(true);
    onMounted(() => {
        // 获取管理员设置信息
        getAdminSetting()
            .then(res => {
                // formData一个个key赋值
                for (const keys in formData.value) {
                    let key = keys as keyof AdminSetting;
                    formData.value[key] = res.data[key];
                }
            })
            .finally(() => {
                nextTick(() => {
                    isLoading.value = false;
                });
            });
    });

    watch(
        () => formData.value,
        () => {
            if (isLoading.value) {
                return;
            }
            // 更新管理员设置信息
            updateData();
        },
        {
            deep: true,
        },
    );

    const updateData = useDebounceFn(() => {
        updateAdminSetting(formData.value);
    }, 500);

    const formRules = computed(() => {
        return {};
    });
    const { filterNumberAndChart } = useFilterInput(formData);

    const { t } = useI18n();
    // 图片上传
    const handleUploadFile = async (file: UploadFile) => {
        const rawFile = file.raw;

        if (!rawFile) {
            return;
        }

        if (
            rawFile.type !== 'image/jpeg' &&
            rawFile.type !== 'image/png' &&
            rawFile.type !== 'image/jpg' &&
            rawFile.type !== 'image/bmp'
        ) {
            ElMessage.warning(t('settings.imgFormatRule'));
            return false;
        } else if (rawFile.size / 1024 / 1024 > 5) {
            ElMessage.warning(t('settings.imgSizeRule'));
            return false;
        }

        const fileData = new FormData();

        fileData.append('file', rawFile); // 添加文件到表单数据
        fileData.append('name', rawFile.name); // 添加其他表单数据

        console.log(fileData);
        // 调用上传文件的接口
        try {
            let res = await uploadFile(fileData);

            if (res.code === 1) {
                formData.value.logo = res.data.url;
            }
        } catch (error) {}
    };
</script>

<style lang="scss" scoped>
    .page-container {
        padding-top: 20px;
    }

    h1 {
        margin-bottom: 15px;
        font-size: $font-huge;
        font-weight: bold;
    }

    :deep(.el-form-item__label) {
        height: 40px;
        line-height: 40px;
    }
</style>
