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
                    prop="companyName"
                >
                    <div class="form-item">
                        <el-input
                            v-model="formData.companyName"
                            class="form-input"
                        />
                    </div>
                </el-form-item>
                <el-form-item
                    label="Address Line 1"
                    prop="companyName"
                >
                    <div class="form-item">
                        <el-input
                            v-model="formData.companyName"
                            class="form-input"
                        />
                    </div>
                </el-form-item>
                <el-form-item
                    label="Address Line 2"
                    prop="companyName"
                >
                    <div class="form-item">
                        <el-input
                            v-model="formData.companyName"
                            class="form-input"
                        />
                    </div>
                </el-form-item>
                <el-form-item
                    :label="$t('office.City')"
                    prop="companyName"
                >
                    <div class="form-item">
                        <el-input
                            v-model="formData.companyName"
                            class="form-input"
                        />
                    </div>
                </el-form-item>
                <el-form-item
                    label=""
                    prop="companyName"
                    label-width="200px"
                >
                    <template #label>
                        State
                        <select-state
                            v-model="formData.companyName"
                            class="form-input m-l-10px"
                            :placeholder="`${$t('login.State')}`"
                        />
                    </template>
                    <div class="form-item el-form-item__label p-0!">
                        Zip Code
                        <el-input
                            v-model="formData.companyName"
                            class="form-input m-l-10px"
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
                    <div class="form-item w-[240px]! items-center justify-center relative top-20px">
                        <img
                            src="@/assets/images/logo.png"
                            alt="logo"
                            class="bg-#797979"
                        />
                    </div>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script setup lang="ts">
    import type { UploadFile } from 'element-plus';

    const formData = ref({
        companyName: '',
    });

    const formRules = computed(() => {
        return {};
    });

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

        const formData = new FormData();
        formData.append('file', rawFile); // 添加文件到表单数据
        formData.append('name', rawFile.name); // 添加其他表单数据

        // // 调用上传文件的接口
        // try {
        //     let res = await uploadFile(formData);

        //     if (res.code === 1) {
        //         userStore.updateUserInfo({
        //             ...userStore.userInfo,
        //             avatar: res.data.url,
        //         });
        //     }
        // } catch (error) {}
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
