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
                    </div>
                    <div class="mid-btns">
                        <base-button
                            type="primary"
                            width="100px"
                            >Add</base-button
                        >
                        <base-button
                            type="primary"
                            width="100px"
                            >Remove</base-button
                        >
                    </div>
                    <div class="right-content">
                        <h2 class="title">Selected Columns</h2>
                    </div>
                    <div class="right-btns">
                        <div class="btn cursor-pointer">
                            <base-svg-icon
                                icon="up"
                                size="20px"
                            />
                        </div>
                        <div class="btn cursor-pointer">
                            <base-svg-icon
                                icon="down"
                                size="20px"
                            />
                        </div>
                    </div>
                </div>
                <div class="footer-btns">
                    <base-button @click="close">Save</base-button>
                    <base-button @click="close">Cancel</base-button>
                </div>
            </div>
        </base-dialog>
    </div>
</template>

<script setup lang="ts">
    const dialogVisible = ref(true);

    const close = () => {
        dialogVisible.value = false;
    };
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
            padding: 5px;
            text-align: center;
            border: 1px solid #666;
        }

        .title {
            font-size: $font-large;
            font-weight: bold;
            line-height: 2;
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
