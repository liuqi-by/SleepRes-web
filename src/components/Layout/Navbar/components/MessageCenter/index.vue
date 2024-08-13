<!-- 消息中心 -->
<template>
    <div>
        <el-popover
            placement="bottom"
            trigger="click"
            width="550"
            :visible="visiblePopover"
            @show="showEvent"
            @hide="hideEvent"
        >
            <template #reference>
                <div
                    class="wh-full flex items-center justify-center"
                    @click="showMessage"
                >
                    <client-only>
                        <el-badge
                            :value="unReadCount"
                            :max="99"
                            :show-zero="false"
                        >
                            <base-svg-icon
                                icon="message"
                                :size="size"
                            />
                        </el-badge>
                    </client-only>
                </div>
            </template>
            <div ref="popover">
                <table-module
                    :data="messageData"
                    border
                    v-loading="loading"
                    v-model:currentPage="pageOption.page"
                    v-model:pageSize="pageOption.pagesize"
                    :total="pageOption.total"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                >
                    <el-table-column
                        type="index"
                        align="center"
                        :label="$t('message.NO')"
                        width="70"
                    />
                    <el-table-column
                        width="110"
                        property="date"
                        :label="$t('message.Date')"
                        align="center"
                    >
                        <template #default="{ row }">
                            {{ row.createtime ? moment(row.createtime * 1000).format('YYYY-MM-DD') : '' }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        property="group_name"
                        :label="$t('admin.AccountType')"
                        align="center"
                        min-width="180"
                    />
                    <el-table-column
                        :label="$t('message.Status')"
                        align="center"
                        width="80"
                    >
                        <template #default="{ row }">
                            <span
                                class="link"
                                @click="checkMessage(row)"
                                >{{ $t('message.Check') }}</span
                            >
                        </template>
                    </el-table-column>
                </table-module>
            </div>
        </el-popover>
        <approval
            ref="approvalRef"
            @refresh="refreshList"
        />
    </div>
</template>

<script setup lang="ts">
    import moment from 'moment';

    import approval from './approval.vue';
    import { getMessage } from '~/api/admin';
    import type { MessageRes } from '~/api/admin/types';
    import { useUserStore } from '~/stores/modules/user';

    defineProps({
        size: {
            type: String,
        },
    });
    const userStore = useUserStore();
    const unReadCount = computed(() => userStore.messageCount);

    const messageData = ref<MessageRes[]>([]);

    // 查看
    const approvalRef = ref<InstanceType<typeof approval>>();
    const checkMessage = (row: MessageRes) => {
        approvalRef.value?.showApproval(row);
    };

    // 分页
    const pageOption = ref({
        page: 1,
        pagesize: 10,
        total: 0,
    });

    const loading = ref(false);
    // 获取消息
    const getMessageList = () => {
        loading.value = true;

        messageData.value = [];

        getMessage({
            ...pageOption.value,
            page: pageOption.value.page - 1,
            status: 1,
        })
            .then(res => {
                if (res.code === 1) {
                    messageData.value = res.data;
                    pageOption.value.total = res.data_other.num;
                    userStore.setMessageCount(res.data_other.num);
                }
            })
            .finally(() => {
                loading.value = false;
            });
    };

    const handleSizeChange = () => {
        getMessageList();
    };
    const handleCurrentChange = () => {
        getMessageList();
    };

    // const handleShow = () => {
    //     getMessageList();
    // };

    let visiblePopover = ref(false);
    const showMessage = () => {
        visiblePopover.value = true;
        getMessageList();
    };

    const showEvent = () => {
        document.addEventListener('click', hidePanel, false);
    };
    const hideEvent = () => {
        document.removeEventListener('click', hidePanel, false);
    };

    const popover = ref<any>();
    // 点击外面隐藏
    const hidePanel = (e: any) => {
        if (!popover.value?.contains(e.target) && !approvalRef.value?.dialogVisible) {
            visiblePopover.value = false;
            hideEvent();
        }
    };

    const refreshList = () => {
        if (messageData.value.length === 1) {
            pageOption.value.page--;
        }
        getMessageList();
    };
</script>
