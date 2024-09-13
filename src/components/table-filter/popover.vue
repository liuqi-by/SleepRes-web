<!-- 筛选弹窗 -->
<template>
    <el-popover
        placement="bottom"
        :width="'fit-content'"
        trigger="click"
        v-bind="$attrs"
    >
        <div class="filter-popover">
            <!-- 输入筛选 -->
            <div v-if="filterType === 'input'">
                <el-input
                    v-model="filterInput"
                    :placeholder="$t('form.PleaseEnter')"
                    clearable
                    style="width: 200px; margin-top: 10px"
                    @keydown.enter="searchFilter"
                />
            </div>
            <!-- 多选框筛选 -->
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
            <!-- 日期选择 -->
            <div v-else-if="filterType === 'date'">
                <date-picker
                    v-model="filterInput"
                    type="date"
                    clearable
                    @change="searchFilter"
                    :placeholder="$t('form.PleaseSelect')"
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
                >
                    {{ $t('form.Reset') }}
                </el-button>
                <el-button
                    type="primary"
                    link
                    @click="searchFilter"
                >
                    {{ $t('form.Confirm') }}
                </el-button>
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

<style lang="scss" scoped>
    .select-checkbox {
        display: flex;
        flex-flow: column;
        width: 200px;
        max-height: 200px;
        overflow-y: auto;

        .el-checkbox {
            margin: 5px 0;
        }
    }
</style>
