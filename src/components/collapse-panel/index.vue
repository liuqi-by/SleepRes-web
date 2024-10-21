<!-- 折叠面板 -->
<template>
    <div
        class="collapse-panel"
        :class="isOpen ? 'open' : 'closed'"
    >
        <div
            @click="toggle"
            class="hover: cursor-pointer relative"
        >
            <slot name="title"> </slot>
            <el-icon class="absolute right-0 top-0 color-[#333]">
                <Plus v-if="!isOpen" />
                <Minus v-else />
            </el-icon>
        </div>
        <transition
            name="collapse"
            appear
        >
            <div
                ref="content"
                class="collapse-content"
                :style="{ height: isOpen ? contentHeight + 'px' : 0 }"
            >
                <slot name="content"></slot>
            </div>
        </transition>
    </div>
</template>

<script setup lang="ts">
    import { Plus, Minus } from '@element-plus/icons-vue';

    interface PropsInterface {
        resize?: boolean;
    }

    const props = withDefaults(defineProps<PropsInterface>(), {
        resize: true,
    });

    const isOpen = ref(false);

    const toggle = () => {
        isOpen.value = !isOpen.value;
    };

    const content = ref<HTMLElement>();
    const contentHeight = ref(0);
    // 计算内容高度
    const measureContentHeight = () => {
        nextTick(() => {
            if (content.value) {
                contentHeight.value = content.value.children[0].scrollHeight;
            }
        });
    };

    const { width } = useWindowSize();

    watch(width, () => {
        if (!props.resize) {
            return;
        }
        measureContentHeight();
    });

    onMounted(() => {
        measureContentHeight();
        isOpen.value = false;
        useIntersectionObserver(content.value, () => {
            if (!contentHeight.value) {
                measureContentHeight();
            }
        });
    });
</script>

<style lang="scss" scoped>
    .collapse-panel {
        overflow: hidden;
    }

    .collapse-content {
        overflow: hidden;
        transition: height 0.3s ease-in-out;
    }

    /* 定义过渡的进入和离开状态 */
    .collapse-enter-active,
    .collapse-leave-active {
        overflow: hidden; /* 确保内容不会被裁剪 */
    }

    .collapse-enter,
    .collapse-leave-to {
        height: 0;
    }
</style>
