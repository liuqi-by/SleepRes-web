<!-- 筛选弹窗 -->
<template>
    <el-popover
        placement="bottom"
        :width="'fit-content'"
        trigger="click"
        v-bind="$attrs"
    >
        <div class="filter-popover">
            <div v-if="filterType === 'input'">
                <el-input
                    v-model="filterInput"
                    placeholder="输入框"
                    clearable
                    style="width: 150px; margin-top: 10px"
                    @keydown.enter="searchFilter"
                />
            </div>
            <div v-else-if="filterType === 'select'">
                <el-checkbox-group
                    v-model="selectFilter"
                    class="select-checkbox"
                    v-if="filterCustomOptions.length === 0"
                >
                    <el-checkbox
                        v-for="item in filterList"
                        :key="item"
                        :label="item"
                        :value="item"
                    >
                        {{ item }}
                    </el-checkbox>
                </el-checkbox-group>
                <el-checkbox-group
                    v-model="selectFilter"
                    class="select-checkbox"
                    v-else
                >
                    <el-checkbox
                        v-for="item in filterCustomOptions"
                        :key="item"
                        :label="item.label"
                        :value="item.value"
                    >
                        {{ item.label }}
                    </el-checkbox>
                </el-checkbox-group>
            </div>
            <div v-else-if="filterType === 'date'">
                <date-picker
                    v-model="filterInput"
                    type="date"
                    clearable
                    @change="searchFilter"
                />
            </div>
            <div
                class="mt"
                style="text-align: right"
            >
                <el-button
                    type="info"
                    link
                    @click="cancelFilter"
                    >重置</el-button
                >
                <el-button
                    type="primary"
                    link
                    @click="searchFilter"
                    >筛选</el-button
                >
            </div>
        </div>
    </el-popover>
</template>

<script setup lang="ts">
    import type { FilterType } from '~/components/table-filter/header.vue';

    withDefaults(
        defineProps<{
            filterType: FilterType;
            filterCustomOptions?: any[];
            filterList: string[];
        }>(),
        {
            filterCustomOptions: () => [],
            filterList: () => [],
        },
    );

    const filterInput = defineModel('filterInput', {
        type: String,
        default: '',
    });

    const selectFilter = defineModel<any[]>('selectFilter', {
        default: () => [],
    });

    const emit = defineEmits(['searchFilter', 'cancelFilter']);

    const searchFilter = () => {
        emit('searchFilter');
    };

    const cancelFilter = () => {
        emit('cancelFilter');
    };
</script>

<style lang="scss" scoped></style>
