<template>
    <div class="therapy-data">
        <!-- 静态信息 -->
        <div class="static-datas">
            <div class="static-data-list">
                <div
                    class="static-data-item"
                    v-for="(item, key) in staticList"
                    :key="key"
                >
                    <div class="static-data-label">{{ key }}:</div>
                    <div class="static-data-value">{{ item }}</div>
                </div>
            </div>
            <div class="create-btn">
                <base-button
                    type="primary"
                    @click="createReport"
                    >{{ $t('patients.CreateReport') }}</base-button
                >
            </div>
        </div>
        <!-- 图表 -->
        <div class="charts">
            <div class="time-list">
                <div
                    class="time-item"
                    v-for="item in timeList"
                    :key="item.label"
                    :class="{ active: item.value === activeTime }"
                    @click="handleSelectTime(item.value)"
                >
                    {{ item.label }}
                </div>
            </div>
            <div class="chart">chart</div>
        </div>
        <!-- 报告生成 -->
        <report-generation v-model="isShowReportDialog" />
    </div>
</template>

<script setup lang="ts">
    import ReportGeneration from './report-generation.vue';

    const staticList = ref({
        'Days ≥ 4hrs': '20/30',
        'Avg Pressure 95%': '8.1',
        'Average AHI': '6.4',
        'Days < 4 hrs': '10/30',
        'Average HI': '0.3',
        'Average CA': '2.3',
        'Average hours of use': ' 4.5',
        'Best 30 Days': '66.6%',
        'Average AI': '4.2',
        'Average pressure': '7.4',
        'Average time in High Leak': '00:20',
        'Average Leak': '10.3 lpm',
    });

    const timeList = ref([
        { label: '7 Days', value: 7 },
        { label: '14 Days', value: 14 },
        { label: '30 Days', value: 30 },
        { label: '90 Days', value: 90 },
        { label: '180 Days', value: 180 },
        { label: '365 Days', value: 365 },
        { label: 'Best 30', value: 30 },
    ]);

    const activeTime = ref(7);

    // 选择时间
    const handleSelectTime = (value: number) => {
        activeTime.value = value;
    };

    const isShowReportDialog = ref(false);
    // 创建报告
    const createReport = () => {
        isShowReportDialog.value = true;
    };
</script>

<style lang="scss" scoped>
    .therapy-data {
        padding: 30px;
    }

    .static-datas {
        display: flex;
    }

    .static-data-list {
        display: grid;
        flex: 4;
        grid-template-columns: repeat(3, 1fr); /* 三列，每列宽度相等 */
        gap: 10px; /* 网格项之间的间隙 */
        padding-top: 10px;
        font-size: $font-small;
        text-align: center;

        .static-data-item {
            display: flex;
            margin-bottom: 10px;
        }

        .static-data-label {
            white-space: nowrap;
        }
    }

    .create-btn {
        display: flex;
        flex: 1;
        align-items: center;
        justify-content: center;
    }

    .time-list {
        display: flex;
        margin-top: 20px;

        .time-item {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 80px;
            height: 40px;
            cursor: pointer;
            background-color: #fff;
            border: 1px solid #ccc;

            &:not(:last-child) {
                border-right: 0;
            }

            // &.active,
            // &:hover {
            //     color: #fff;
            //     background-color: var(--el-color-primary);
            //     border-color: var(--el-color-primary);
            // }
            @include active;
        }
    }
</style>
