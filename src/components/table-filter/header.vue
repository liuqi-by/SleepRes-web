<!-- 筛选标题 -->
<template>
    <div class="table-header">
        <span>{{ column.label }}</span>
        <el-icon
            :ref="
                el => {
                    showKeyRef[column.property] = el;
                }
            "
            @click.stop="toggleNameFilter(column.property)"
            class="filter-icon"
            :class="{
                active: Array.isArray(searchDate[column.property])
                    ? searchDate[column.property].length > 0
                    : searchDate[column.property],
            }"
        >
            <base-svg-icon icon="filter" />
        </el-icon>
    </div>
</template>

<script setup lang="ts">
    export type FilterType = 'input' | 'select' | 'date';

    const props = withDefaults(
        defineProps<{
            column: any;
            searchDate: any;
            showKeyRef: any;
            type?: FilterType;
            customOptions?: any[];
        }>(),
        {
            customOptions: () => [],
            type: 'input',
        },
    );

    const emit = defineEmits(['toggleNameFilter']);

    const toggleNameFilter = (key: string) => {
        if (props.type === 'select' && props.customOptions && props.customOptions?.length > 0) {
            emit('toggleNameFilter', { key, type: props.type, options: props.customOptions });
        } else {
            emit('toggleNameFilter', { key, type: props.type });
        }
    };
</script>

<style lang="scss" scoped>
    .filter-icon {
        position: relative;
        top: 2px;
        margin-right: 2px;

        /* transform: translateY(-50%); */
        margin-left: 10px;
        font-weight: bold;

        /* top: 50%;
        right: 15px; */
        cursor: pointer;

        &:hover,
        &.active {
            color: var(--el-color-primary);
        }

        svg {
            stroke-width: 10px;
        }
    }

    .table-header {
        display: inline;
    }
</style>
