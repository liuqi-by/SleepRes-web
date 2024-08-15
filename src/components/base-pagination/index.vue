<!-- 分页器 -->
<template>
    <div>
        <el-pagination
            :layout="layout"
            :teleported="false"
            v-bind="$attrs"
        />
    </div>
</template>

<script setup lang="ts">
    defineProps({
        layout: {
            type: String,
            default: 'prev, pager, next, jumper,->,total,,sizes',
        },
    });
</script>

<style lang="scss" scoped>
    :deep(.el-pagination) {
        .el-pager {
            li {
                box-sizing: border-box;
                width: 28px;
                min-width: 28px;
                height: 28px;
                padding: 0;
                margin-left: 8px;
                font-family: var(--font-family);
                font-size: $font-standard;
                font-weight: 350;
                line-height: 22px;
                color: var(--font-black1);
                border: 1px solid #d9d9d9;
                border-radius: 2px;

                &:last-child {
                    margin-right: 8px;
                }

                &.is-active,
                &:hover {
                    color: var(--login-active-color);
                    border: 1px solid var(--login-active-color);
                }
            }
        }

        button {
            width: 28px;
            min-width: 28px;
            height: 28px;
            border: 1px solid #d9d9d9;

            &:disabled {
                background: #f5f5f5;
            }
        }

        .el-pagination__editor {
            width: 48px;
            height: 28px;
            background: #fff;
            border: 1px sffffffe0e0e0;
        }
    }
</style>
