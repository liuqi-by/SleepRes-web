<!-- 自定义表格 -->
<template>
    <div>
        <base-dialog
            v-model="dialogVisible"
            title=""
            width="1000"
            @close="close"
            class="form form-dialog column-selection-dialog"
        >
            <div class="p-r-[90px]">
                <div class="content">
                    <div class="left-content">
                        <h2 class="title">Available Columns</h2>
                        <ul>
                            <li
                                v-for="(item, index) in columns"
                                :key="item.label"
                                class="column"
                                @click="selectLeftColumn(index + 1, $event)"
                                :class="selectAddColumn.includes(index + 1) ? 'selected' : ''"
                            >
                                {{ item.label }}
                            </li>
                        </ul>
                    </div>
                    <div class="mid-btns">
                        <base-button
                            type="primary"
                            width="100px"
                            @click="addColumn"
                            :disabled="!selectAddColumn"
                            >Add</base-button
                        >
                        <base-button
                            type="primary"
                            width="100px"
                            :disabled="!selectColumn"
                            @click="removeColumn"
                            >Remove</base-button
                        >
                    </div>
                    <div class="right-content">
                        <h2 class="title">Selected Columns</h2>
                        <ul>
                            <li
                                v-for="(item, index) in selectColumns"
                                :key="item.prop"
                                class="column"
                                @click="selectRightColumn(index + 1, $event)"
                                :class="selectColumn.includes(index + 1) ? 'selected' : ''"
                            >
                                {{ item.label }}
                            </li>
                        </ul>
                    </div>
                    <div class="right-btns">
                        <div
                            class="btn cursor-pointer"
                            @click="moveUp"
                        >
                            <base-svg-icon
                                icon="up"
                                size="20px"
                            />
                        </div>
                        <div
                            class="btn cursor-pointer"
                            @click="moveDown"
                        >
                            <base-svg-icon
                                icon="down"
                                size="20px"
                            />
                        </div>
                    </div>
                </div>
                <div class="footer-btns">
                    <base-button @click="Save">Save</base-button>
                    <base-button @click="close">Cancel</base-button>
                </div>
            </div>
        </base-dialog>
    </div>
</template>

<script setup lang="ts">
    export type ColumnsType = {
        label: string;
        prop: string;
        width: number;
        defaultTemplate: boolean;
        isShow: boolean;
        orderIndex: number;
        type?: undefined;
        selectOptions?: undefined;
    };

    const dialogVisible = ref(false);

    // 左侧列
    const columns = ref<ColumnsType[]>([]);

    // 选择的列
    const selectColumns = computed(() => {
        return columns.value.filter(item => item.isShow).sort((a, b) => a.orderIndex - b.orderIndex);
    });
    const close = () => {
        dialogVisible.value = false;
        selectColumn.value = [];
        selectAddColumn.value = [];
        columns.value = [];
    };

    const selectAddColumn = ref<number[]>([]);

    const selectColumn = ref<number[]>([]);

    const show = (showColumns: any) => {
        columns.value = JSON.parse(JSON.stringify(showColumns));

        dialogVisible.value = true;
    };

    // 左侧选择
    const selectLeftColumn = (index: number, event: MouseEvent) => {
        let isCtrl = event.ctrlKey;

        if (selectAddColumn.value.includes(index)) {
            return (selectAddColumn.value = selectAddColumn.value.filter(item => item !== index));
        }

        if (isCtrl) {
            selectAddColumn.value = [...selectAddColumn.value, index];
        } else {
            selectAddColumn.value = [index];
        }

        selectColumn.value = [];
    };

    // 右侧选择
    const selectRightColumn = (index: number, event: MouseEvent) => {
        let isCtrl = event.ctrlKey;

        if (selectColumn.value.includes(index)) {
            return (selectColumn.value = selectColumn.value.filter(item => item !== index));
        }

        if (isCtrl) {
            selectColumn.value = [...selectColumn.value, index];
        } else {
            selectColumn.value = [index];
        }
        selectAddColumn.value = [];
    };

    // 添加
    const addColumn = () => {
        if (selectAddColumn.value.length > 0) {
            selectAddColumn.value.forEach(item => {
                columns.value[item - 1].isShow = true;
            });

            selectAddColumn.value = [];
        }
    };

    // 移除
    const removeColumn = () => {
        console.log('removeColumn', selectColumn.value);
        if (selectColumn.value.length > 0) {
            selectColumn.value.forEach(item => {
                columns.value[item - 1].isShow = false;
            });

            selectColumn.value = [];
        }
    };

    // 上移
    const moveUp = () => {
        if (selectColumn.value.length === 1) {
            let index = selectColumn.value[0] - 1;
            if (index > 0) {
                let arr = selectColumns.value;

                let order = arr[index].orderIndex;

                arr[index].orderIndex = arr[index - 1].orderIndex;
                arr[index - 1].orderIndex = order;

                selectColumn.value[0] = index;

                console.log('moveUp', columns.value);
            }
        }
    };

    // 下移
    const moveDown = () => {
        if (selectColumn.value.length === 1) {
            let index = selectColumn.value[0] - 1;
            if (index <= selectColumns.value.length - 1) {
                let arr = selectColumns.value;

                let order = arr[index].orderIndex;

                arr[index].orderIndex = arr[index + 1].orderIndex;
                arr[index + 1].orderIndex = order;

                selectColumn.value[0] = index + 2;
            }
        }
        console.log('moveDown', columns.value);
    };

    const update = inject<any>('update:columns');
    const Save = () => {
        update(columns.value);
        close();
    };

    defineExpose({
        show,
    });
</script>

<style lang="scss" scoped>
    .content {
        display: flex;
        margin-bottom: 30px;

        .left-content,
        .right-content,
        .mid-btns {
            flex: 1;
            min-height: 600px;
        }

        .right-btns {
            position: absolute;
            top: 50%;
            right: 30px;
            display: flex;
            transform: translateY(-50%);

            .btn {
                padding: 5px;
                background: #666;
                border-radius: 50%;

                &:last-child {
                    margin-left: 5px;
                }
            }
        }

        .mid-btns {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            .el-button + .el-button {
                margin-top: 20px;
                margin-left: 0;
            }
        }

        .left-content,
        .right-content {
            padding: 5px 0;
            text-align: center;
            border: 1px solid #666;
        }

        .title {
            font-size: $font-large;
            font-weight: bold;
            line-height: 2;
        }

        .column {
            padding: 5px;
            font-size: $font-small;
            line-height: 1.2;

            &.selected {
                color: #fff;
                background-color: var(--el-color-primary);
            }
        }
    }

    .footer-btns {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    :deep(.column-selection-dialog) {
        margin-top: 5vh !important;
    }
</style>
