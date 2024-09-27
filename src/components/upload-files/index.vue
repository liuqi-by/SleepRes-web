<!-- 上传文件 -->
<template>
    <div>
        <el-dialog
            v-model="dialogVisible"
            title=""
            width="900"
            @close="close"
            class="form form-dialog upload"
        >
            <div class="form-title">
                {{ $t('patients.SDCardUpload') }}
            </div>
            <!-- 定义Uploader组件 -->
            <uploader
                :options="options"
                ref="uploaderRef"
                @file-added="onFileAdded"
                :fileStatusText="fileStatusText"
                allowDuplicateUploads
                @complete="onFileComplete"
            >
                <!-- 定义不支持上传的提示 -->
                <uploader-unsupport />
                <!-- 定义拖拽区域 -->

                <!-- 定义上传按钮，使用Element UI的按钮组件 -->
                <div class="top-header">
                    <!-- <el-dropdown type="primary"> -->

                    <div class="el-button el-button--primary el-button--default">
                        <uploader-btn
                            class="btn wh-full el-button el-button--primary el-button--default"
                            :directory="true"
                        >
                            {{ $t('upload.Select') }}
                        </uploader-btn>
                    </div>

                    <!-- <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item>
                                    <uploader-btn class="btn">
                                        <span> {{ $t('upload.UploadFiles') }}</span>
                                    </uploader-btn>
                                </el-dropdown-item> 
                                <el-dropdown-item>
                                    <uploader-btn
                                        class="btn"
                                        :directory="true"
                                    >
                                        <span>{{ $t('upload.UploadFolder') }}</span>
                                    </uploader-btn>
                                </el-dropdown-item>
                            </el-dropdown-menu> 
                        </template> 
                    </el-dropdown>-->
                    <base-button @click="clearFiles">{{ $t('upload.ClearFiles') }}</base-button>
                </div>
                <!-- 定义文件列表 -->
                <uploader-files>
                    <template #default="{ files }">
                        <el-table
                            border
                            class="file-table"
                            style="height: 400px"
                            :data="files"
                        >
                            <el-table-column
                                type="index"
                                label="No."
                                width="70"
                                align="center"
                            />
                            <el-table-column
                                prop="name"
                                label="filename"
                                min-width="180"
                            />
                            <el-table-column
                                prop="size"
                                label="size"
                                width="180"
                            >
                                <template #default="{ row }">
                                    {{ Math.floor((row.size / 1024 / 1024) * 100) / 100 }} MB
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="success"
                                label="status"
                                width="180"
                            >
                                <template #default="{ row }">
                                    <uploader-file
                                        :file="row"
                                        :key="row.time"
                                    >
                                        <template #default="{ response, progress }">
                                            <Select
                                                size="6"
                                                color="var(--el-color-success)"
                                                v-if="response && response.code === 1"
                                            />
                                            <CloseBold
                                                size="6"
                                                color="var(--el-color-danger)"
                                                v-if="response && response.code === 0"
                                            />
                                            {{
                                                !response
                                                    ? `${Math.floor(progress * 100)}%`
                                                    : response?.code === 1
                                                      ? ''
                                                      : response?.msg
                                            }}
                                        </template>
                                    </uploader-file>
                                </template>
                            </el-table-column>
                            <!-- <el-table-column
                                prop="operate"
                                label="operate"
                                width="100"
                            >
                                <template #default="{ row }">
                                    <el-button
                                        type="primary"
                                        size="small"
                                        @click="retry(row)"
                                    >
                                        {{ $t('upload.retry') }}
                                    </el-button>
                                </template>
                            </el-table-column> -->
                        </el-table>
                    </template>
                </uploader-files>
            </uploader>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
    import { Select, CloseBold } from '@element-plus/icons-vue';
    import { getProgress } from '~/api/patient';
    import { useUserStore } from '~/stores/modules/user';

    const dialogVisible = ref(false);

    let userId: number | string = 0;

    const showDialog = (id?: string) => {
        dialogVisible.value = true;
        userId = id || Math.random() + Date.now();
    };

    const close = () => {
        dialogVisible.value = false;
        userId = 0;
        clearFiles();
        timer && clearInterval(timer);
        timer = null;
        loadingInstance.close();
    };

    const options = {
        testChunks: false,
        target: '/api/common/sd_upload',

        processParams: (file: any) => {
            return {
                name: file.filename,
                // 有userId时，传userId，否则传时间戳和userid随机数
                user_id: userId,
                token: useUserStore().loginStatus?.token,
                userid: useUserStore().loginStatus?.id,
            };
        },

        processResponse: (response: any, cb: Function, file: any) => {
            response = JSON.parse(response);
            // console.log('processResponse', response);
            // if (response && response.code === 1) {
            // } else {
            //     file.error = true;
            // }
            console.log('processResponse', response, file);
            if (response && response.code === 0) {
                file.CusetomError = true;
            }

            cb(null, response);
        },
    };

    const fileStatusText = (_status: string, response: ResPonseType<any>) => {
        if (response && response.code === 0) {
            return 'fail: ' + response.msg;
        }
    };

    const uploaderRef = ref();
    const onFileAdded = file => {
        // 每次上传前清空
        // uploaderRef.value.uploader.files = [];
        // uploaderRef.value.uploader.fileList = [];
        // uploaderRef.value.files = [];
        // uploaderRef.value.fileList = [];
        // clearFiles();
    };

    const clearFiles = () => {
        // 每次上传前清空
        uploaderRef.value.files = [];
        uploaderRef.value.fileList = [];
        uploaderRef.value.uploader.files = [];
        uploaderRef.value.uploader.fileList = [];
    };

    // 重新上传
    // const retry = (file: any) => {
    //     file.retry();
    //     file.uploading = false;
    //     file.paused = false;
    //     file.completed = false;
    //     file.time = Date.now();
    // };
    let loadingInstance: any = null;
    const onFileComplete = () => {
        // 判断文件是否上传成功
        console.log('onFileComplete', uploaderRef.value.uploader.files);
        let isAllSuccess = true;
        isAllSuccess = !uploaderRef.value.uploader.files.some((file: any) => file.CusetomError === true);
        if (!isAllSuccess) {
            ElMessage.error('上传失败');
        } else {
            loadingInstance = ElLoading.service({
                lock: true,
                text: '文件正在处理中，请稍后...',
                target: '.upload',
            });
            checkFileSuccess();
        }
    };

    let timer: NodeJS.Timeout | null = null;
    const checkFileSuccess = () => {
        timer = setInterval(() => {
            getProgress({
                user_id: userId,
            })
                .then(res => {
                    // 文件处理成功
                    if (res.code === 1) {
                        if (res.msg === 'successful') {
                            loadingInstance.setText('文件处理成功');
                        } else if (res.msg === 'Processing') {
                            loadingInstance.setText('文件正在处理中，请稍后...');
                        } else if (res.msg === 'Processing failed') {
                            loadingInstance.setText('文件处理失败');
                        }

                        switch (res.msg) {
                            case 'successful':
                            case 'Processing failed':
                                timer && clearInterval(timer);
                                timer = null;
                                loadingInstance.close();
                        }
                    }
                })
                .catch(() => {
                    loadingInstance.setText('服务器错误');
                    timer && clearInterval(timer);
                    timer = null;
                    loadingInstance.close();
                });
        }, 5000);
    };

    onUnmounted(() => {
        if (timer) {
            clearInterval(timer);
        }
    });

    defineExpose({
        showDialog,
    });
</script>

<style lang="scss" scoped>
    .top-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 20px 0;
    }

    .uploader-file {
        display: flex;
        align-items: center;
        height: auto;
        line-height: normal;
        border: 0;
    }

    .uploader-btn {
        color: inherit;
        border: none;

        &:hover {
            color: inherit;
            background-color: inherit;
        }
    }
</style>
