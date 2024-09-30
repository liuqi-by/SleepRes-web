<!-- 下拉分页搜索选择 -->
<template>
    <el-select
        v-model="selectValue"
        :placeholder="$t('form.PleaseSelect')"
        @focus="getList"
        class="auto-width"
        ref="selectRef"
        :value-key="value"
        clearable
        :value-on-clear="valueOnClear"
    >
        <template #header>
            <div class="header">
                <el-input
                    v-model="searchVal"
                    :placeholder="searchPlaceholder"
                    @input="searchList"
                    :style="{ width: searchWidth }"
                />
            </div>
        </template>

        <el-option
            v-for="item in options"
            :key="item[value]"
            :label="item[label]"
            :value="item"
        >
            <slot
                name="option"
                :data="item"
            >
                <div class="flex justify-between">
                    <span class="m-r-[20px]">{{ item.nickname }}</span>
                    <span>{{ item.email }}</span>
                </div>
            </slot>
        </el-option>
        <template #footer>
            <base-pagination
                layout="prev, pager, next,->, jumper"
                v-model:current-page="pageOption.currentPage"
                v-model:page-size="pageOption.pageSize"
                :total="pageOption.total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
            />
        </template>
    </el-select>
</template>

<script setup lang="ts">
    import type { ElSelect } from 'element-plus';
    import { useThrottleFn } from '@vueuse/core';
    const props = defineProps({
        getListApi: {
            type: Function,
            default: () => {},
        },
        status: {
            type: Number,
            required: false,
            default: 0,
        },
        searchPlaceholder: {
            type: String,
            default: '',
        },
        searchWidth: {
            type: String,
            default: '100%',
        },
        value: {
            type: String,
            default: 'value',
        },
        label: {
            type: String,
            default: 'label',
        },
    });

    const options = ref<any[]>([]);
    const valueOnClear = '';
    const selectValue = defineModel({
        type: Object,
        default: '',
    });

    const pageOption = ref({
        currentPage: 1,
        pageSize: 10,
        total: 0,
    });

    const searchVal = ref('');
    // const optionLabel = computed(() => {
    //     return selectValue.value[props.label];
    // });

    options.value = [
        {
            ...selectValue.value,
        },
    ];
    const getList = () => {
        props
            .getListApi(
                {
                    page: pageOption.value.currentPage - 1,
                    pagesize: pageOption.value.pageSize,
                    val: searchVal.value || '',
                },
                props.status,
            )
            .then((res: ResPonseType<any>) => {
                if (res.code === 1) {
                    options.value = res.data;
                    pageOption.value.total = res.data_other.num;
                } else {
                    options.value = [];
                    pageOption.value.total = 0;
                }
            });
    };

    const searchList = useThrottleFn(() => {
        pageOption.value.currentPage = 1;
        getList();
    }, 300);

    const handleSizeChange = () => {
        getList();
    };

    const handleCurrentChange = () => {
        getList();
    };

    // const initOptions = () => {
    //     options.value = [
    //         {
    //             ...selectValue.value,
    //         },
    //     ];
    // };

    // defineExpose({
    //     initOptions,
    // });
</script>

<style lang="scss" scoped>
    .auto-width {
        // position: relative;
        :deep(.el-select__placeholder) {
            position: relative;
            top: none;
            transform: none;
        }
    }
</style>
