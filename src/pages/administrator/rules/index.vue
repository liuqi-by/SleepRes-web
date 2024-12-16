<template>
    <div class="page-container">
        <div class="rule-module">
            <h1>{{ $t('rules.Therapy') }}</h1>
            <div class="radio-flex">
                <switch-radio
                    v-model="option1"
                    label="Good:"
                    color="#03BF16"
                />
                The patients therapy usage is <selectNum v-model="selectNumber" /> % or greater based on 4 hours of use
                per night
            </div>
            <div class="radio-flex">
                <switch-radio
                    v-model="option2"
                    label="Poor:"
                    color="#F59A23"
                />
                The patients therapy usage is between <selectNum v-model="selectNumber" /> % and
                <selectNum v-model="selectNumber" /> % based on 4 hours of use per night
            </div>
            <div class="radio-flex">
                <switch-radio
                    v-model="option3"
                    label="At Risk:"
                    class="self-start"
                    color="#D9001B"
                />
                <div>
                    <p class="line-height-[32px] flex">
                        The patients therapy usage is below <selectNum v-model="selectNumber" /> % based on 4 hours of
                        use per night
                    </p>
                    <el-radio-group v-model="option3">
                        <div>
                            <el-radio
                                label="1"
                                size="large"
                                class="w-[70px]"
                            >
                                Day 7
                            </el-radio>
                            <el-radio
                                label="2"
                                size="large"
                                class="w-[70px]"
                            >
                                Day 21
                            </el-radio>
                            <el-radio
                                label="3"
                                size="large"
                                class="w-[70px]"
                            >
                                Day 45
                            </el-radio>
                        </div>

                        <div>
                            <el-radio
                                label="4"
                                size="large"
                                class="w-[70px]"
                            >
                                Day 14
                            </el-radio>
                            <el-radio
                                label="5"
                                size="large"
                                class="w-[70px]"
                            >
                                Day 28
                            </el-radio>
                            <el-radio
                                label="6"
                                size="large"
                                class="w-[70px]"
                            >
                                Day 6
                            </el-radio>
                        </div>
                    </el-radio-group>
                </div>
            </div>
            <div class="radio-flex">
                <switch-radio
                    v-model="option2"
                    label="Adherence Achieved:"
                    minWidth="200px"
                />
                The patient has met the CMS criteria for adherence within the first 90 days
            </div>
            <div class="radio-flex">
                <switch-radio
                    v-model="option2"
                    label="Long-term Adherence:"
                    class="self-start"
                    minWidth="200px"
                />
                <div>
                    <p class="h-[32px] line-height-[32px]">
                        The patient has not used their machine and/or the machine has not contacted SleepRes for number
                        of days in a row.
                    </p>
                    <div class="radio-flex">
                        <switch-radio
                            v-model="option2"
                            label=""
                        />
                        Disregard patients whose machine has not contacted SleepRes cloud platform for greater than
                        days.
                    </div>
                </div>
            </div>
        </div>
        <div class="rule-module">
            <h1>{{ $t('rules.Clinical') }}</h1>
            <div class="radio-flex">
                <switch-radio
                    v-model="option2"
                    label="High Leak"
                    class="self-start"
                />
                <div>
                    <p class="h-[32px] line-height-[32px]">
                        The patients average unintentional leak is greater than LPM over the past days
                    </p>
                    <div class="radio-flex">
                        <switch-radio
                            v-model="option2"
                            label=""
                            class="label"
                        />
                        Disregard patients whose therapy start date is greater than days
                    </div>
                </div>
            </div>
            <div class="radio-flex">
                <switch-radio
                    v-model="option2"
                    label="High AHI"
                    class="self-start"
                />
                <div>
                    <p class="h-[32px] line-height-[32px]">
                        The patients average AHI is greater than over the past days
                    </p>
                    <div class="radio-flex">
                        <switch-radio
                            v-model="option2"
                            label=""
                        />
                        Disregard patients whose therapy start date is greater than days
                    </div>
                </div>
            </div>
        </div>
        <div class="rule-module">
            <h1>{{ $t('rules.Connectivity') }}</h1>
            <div class="radio-flex">
                <switch-radio
                    v-model="option2"
                    label="Cellular Modem"
                    class="self-start"
                    minWidth="200px"
                />
                <div>
                    <p class="h-[32px] line-height-[32px]">
                        The patients cellular modem has not contacted the SleepRes Cloud Platform for consecutive days
                    </p>
                    <div class="radio-flex">
                        <switch-radio
                            v-model="option2"
                            label=""
                        />
                        Disregard patients whose therapy start date is greater than days
                    </div>
                </div>
            </div>
            <div class="radio-flex">
                <switch-radio
                    v-model="option2"
                    label="Wi-Fi Module"
                    class="self-start"
                    minWidth="200px"
                />
                <div>
                    <p class="h-[32px] line-height-[32px]">
                        The patients Wi-Fi module has not contacted the SleepRes Cloud Platform for consecutive days
                    </p>
                    <div class="radio-flex">
                        <switch-radio
                            v-model="option2"
                            label=""
                        />
                        Disregard patients whose therapy start date is greater than days
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import selectNum from './components/select-number.vue';
    const option1 = ref(false);
    const option2 = ref(false);
    const option3 = ref(false);

    const selectNumber = ref();
</script>

<style lang="scss" scoped>
    .radio-flex {
        display: flex;
        align-items: center;
        margin-bottom: 5px;
    }

    .rule-module {
        padding: 25px 0;
        border-top: 1px solid #000;

        h1 {
            margin-bottom: 15px;
            font-size: $font-large;
            font-weight: bold;
        }

        &:first-child {
            padding-top: 0;
            border-top: none;
        }
    }

    :deep(.select-number) {
        margin: 0 10px;
    }

    :deep(.el-radio-group) {
        display: block;
    }
</style>
