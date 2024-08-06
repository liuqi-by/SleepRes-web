<!-- 消息中心 -->
<template>
    <div>
        <el-popover
            placement="bottom"
            trigger="click"
            width="550"
        >
            <template #reference>
                <div class="wh-full flex items-center justify-center">
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
                </div>
            </template>
            <table-module
                :data="showMessageData"
                border
            >
                <el-table-column
                    type="index"
                    align="center"
                    label="NO."
                    width="70"
                />
                <el-table-column
                    width="110"
                    property="date"
                    label="Date"
                    align="center"
                />
                <el-table-column
                    property="accountType"
                    label="Account Type"
                    align="center"
                    min-width="180"
                >
                    <template #default="{ row }">
                        {{ row.accountType === 'DME' ? 'DME Account  Creation' : 'Physician Account Creation' }}
                    </template>
                </el-table-column>
                <el-table-column
                    label="Status"
                    align="center"
                    width="80"
                >
                    <template #default="{ row }">
                        <span
                            class="link"
                            @click="checkMessage(row)"
                            >Check</span
                        >
                    </template>
                </el-table-column>
            </table-module>
        </el-popover>
        <approval ref="approvalRef" />
    </div>
</template>

<script setup lang="ts">
    import moment from 'moment';
    import approval from './approval.vue';

    defineProps({
        size: {
            type: String,
        },
    });

    const unReadCount = ref(20);

    const messageData = useLocalStorage('userList', []);

    const showMessageData = computed(() => {
        return messageData.value.map((item: any) => {
            return {
                ...item,
                date: moment().format('YYYY-MM-DD'),
            };
        });
    });

    // 查看
    const approvalRef = ref<InstanceType<typeof approval>>();
    const checkMessage = (row: any) => {
        approvalRef.value?.showApproval(row);
    };
</script>
