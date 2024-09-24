<template>
    <div>
        <el-dialog
            v-model="dialogVisible"
            title=""
            width="700"
            class="form form-dialog"
        >
            <div class="form-title">Release Logs</div>
            <div
                class="max-h-500px m-b-20px overflow-y-auto p-[10px]"
                border="1px solid #e0e0e0"
                v-html="mdData"
            ></div>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
    import { marked } from 'marked';

    // const id = 'preview-only';
    const mdData = ref('# Hello Editor');

    // const scrollElement = document.documentElement;
    const renderer = new marked.Renderer();

    renderer.listitem = function (text: any) {
        if (/\d+\./.test(text.raw)) {
            // 这里处理有序列表项，可以根据需要修改
            return `<li>${text.raw}</li>`;
        }
        // 其他列表项（无序列表）的默认处理
        return `<li>${text.raw}</li>`;
    };

    const dialogVisible = ref(false);

    const showDialog = () => {
        dialogVisible.value = true;
        fetch('/logs.md')
            .then(res => res.text())
            .then(res => {
                mdData.value = marked(res, { breaks: false, renderer });
            });
    };

    defineExpose({
        showDialog,
    });
</script>

<style lang="scss" scoped>
    :deep(ol) {
        margin-bottom: 20px;

        li {
            margin-top: 5px;
            line-height: 1.35;
        }
    }
</style>
