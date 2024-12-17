<template>
    <div class="page-container">
        <div class="rule-module">
            <h1>{{ $t('rules.Therapy') }}</h1>
            <div class="radio-flex">
                <switch-radio
                    v-model="rulesOption.Therapy.good.isOpen"
                    label="Good:"
                    color="#03BF16"
                />
                The patients therapy usage is
                <selectNum v-model="rulesOption.Therapy.good.limits[0]" />
                % or greater based on 4 hours of use per night
            </div>
            <div class="radio-flex">
                <switch-radio
                    v-model="rulesOption.Therapy.caution.isOpen"
                    label="Caution:"
                    color="#F59A23"
                />
                The patients therapy usage is between
                <selectNum v-model="rulesOption.Therapy.caution.limits[0]" /> % and
                <selectNum v-model="rulesOption.Therapy.caution.limits[1]" /> % based on 4 hours of use per night
            </div>
            <div class="radio-flex">
                <switch-radio
                    v-model="rulesOption.Therapy.risk.isOpen"
                    label="At Risk:"
                    class="self-start"
                    color="#D9001B"
                />
                <div>
                    <p class="line-height-[32px] flex">
                        The patients therapy usage is below
                        <selectNum v-model="rulesOption.Therapy.risk.limits[0]" /> % based on 4 hours of use per night
                    </p>
                    <el-checkbox-group v-model="rulesOption.Therapy.selectDays">
                        <div>
                            <el-checkbox
                                value="1"
                                size="large"
                                class="w-[70px]"
                            >
                                Day 7
                            </el-checkbox>
                            <el-checkbox
                                value="2"
                                size="large"
                                class="w-[70px]"
                            >
                                Day 21
                            </el-checkbox>
                            <el-checkbox
                                value="3"
                                size="large"
                                class="w-[70px]"
                            >
                                Day 45
                            </el-checkbox>
                        </div>

                        <div>
                            <el-checkbox
                                value="4"
                                size="large"
                                class="w-[70px]"
                            >
                                Day 14
                            </el-checkbox>
                            <el-checkbox
                                value="5"
                                size="large"
                                class="w-[70px]"
                            >
                                Day 28
                            </el-checkbox>
                            <el-checkbox
                                value="6"
                                size="large"
                                class="w-[70px]"
                            >
                                Day 6
                            </el-checkbox>
                        </div>
                    </el-checkbox-group>
                </div>
            </div>
            <div class="radio-flex">
                <switch-radio
                    v-model="rulesOption.Therapy.adherenceAchieved.isOpen"
                    label="Adherence Achieved:"
                    minWidth="200px"
                />
                The patient has met the CMS criteria for adherence within the first 90 days
            </div>
            <div class="radio-flex">
                <switch-radio
                    v-model="rulesOption.Therapy.LongTermAdherence.isOpen"
                    label="Long-term Adherence:"
                    class="self-start"
                    minWidth="200px"
                />
                <div>
                    <p class="line-height-[32px] flex">
                        The patient has not used their machine and/or the machine has not contacted SleepRes for
                        <selectNum
                            v-model="rulesOption.Therapy.LongTermAdherence.limits[0]"
                            :min="1"
                        />
                        number of days in a row.
                    </p>
                    <div class="radio-flex">
                        <switch-radio
                            v-model="rulesOption.Therapy.LongTermAdherence.isDisregard"
                            label=""
                            minWidth="0"
                        />
                        Disregard patients whose machine has not contacted SleepRes cloud platform for greater than
                        <selectNum
                            v-model="rulesOption.Therapy.LongTermAdherence.disregard"
                            :min="1"
                            :max="200"
                        />
                        days.
                    </div>
                </div>
            </div>
        </div>
        <div class="rule-module">
            <h1>{{ $t('rules.Clinical') }}</h1>
            <div class="radio-flex">
                <switch-radio
                    v-model="rulesOption.Clinical.leak.isOpen"
                    label="High Leak"
                    class="self-start"
                />
                <div>
                    <p class="line-height-[32px] flex">
                        The patients average unintentional leak is greater than
                        <selectNum
                            v-model="rulesOption.Clinical.leak.limits[0]"
                            :min="1"
                        />
                        LPM over the past
                        <selectNum
                            v-model="rulesOption.Clinical.leak.limits[1]"
                            :min="2"
                            :max="30"
                        />
                        days
                    </p>
                    <div class="radio-flex">
                        <switch-radio
                            v-model="rulesOption.Clinical.leak.isDisregard"
                            label=""
                        />
                        Disregard patients whose therapy start date is greater than
                        <selectNum
                            v-model="rulesOption.Clinical.leak.disregard"
                            :min="1"
                            :max="200"
                        />
                        days
                    </div>
                </div>
            </div>
            <div class="radio-flex">
                <switch-radio
                    v-model="rulesOption.Clinical.ahi.isOpen"
                    label="High AHI"
                    class="self-start"
                />
                <div>
                    <p class="line-height-[32px] flex">
                        The patients average AHI is greater than
                        <selectNum
                            v-model="rulesOption.Clinical.ahi.limits[0]"
                            :min="1"
                        />
                        over the past
                        <selectNum
                            v-model="rulesOption.Clinical.ahi.limits[1]"
                            :min="2"
                            :max="30"
                        />
                        days
                    </p>
                    <div class="radio-flex">
                        <switch-radio
                            v-model="rulesOption.Clinical.ahi.isDisregard"
                            label=""
                        />
                        Disregard patients whose therapy start date is greater than
                        <selectNum
                            v-model="rulesOption.Clinical.ahi.disregard"
                            :min="1"
                            :max="200"
                        />
                        days
                    </div>
                </div>
            </div>
        </div>
        <div class="rule-module">
            <h1>{{ $t('rules.Connectivity') }}</h1>
            <div class="radio-flex">
                <switch-radio
                    v-model="rulesOption.Connectivity.cellularModem.isOpen"
                    label="Cellular Modem"
                    class="self-start"
                    minWidth="200px"
                />
                <div>
                    <p class="line-height-[32px] flex">
                        The patients cellular modem has not contacted the SleepRes Cloud Platform for
                        <selectNum
                            v-model="rulesOption.Connectivity.cellularModem.limits[0]"
                            :min="2"
                        />
                        consecutive days
                    </p>
                    <div class="radio-flex">
                        <switch-radio
                            v-model="rulesOption.Connectivity.cellularModem.isDisregard"
                            label=""
                        />
                        Disregard patients whose therapy start date is greater than
                        <selectNum
                            v-model="rulesOption.Connectivity.cellularModem.disregard"
                            :min="1"
                            :max="200"
                        />
                        days
                    </div>
                </div>
            </div>
            <div class="radio-flex">
                <switch-radio
                    v-model="rulesOption.Connectivity.wifiModule.isOpen"
                    label="Wi-Fi Module"
                    class="self-start"
                    minWidth="200px"
                />
                <div>
                    <p class="line-height-[32px] flex">
                        The patients Wi-Fi module has not contacted the SleepRes Cloud Platform for
                        <selectNum
                            v-model="rulesOption.Connectivity.wifiModule.limits[0]"
                            :min="2"
                        />
                        consecutive days
                    </p>
                    <div class="radio-flex">
                        <switch-radio
                            v-model="rulesOption.Connectivity.wifiModule.isDisregard"
                            label=""
                        />
                        Disregard patients whose therapy start date is greater than
                        <selectNum
                            v-model="rulesOption.Connectivity.wifiModule.disregard"
                            :min="1"
                            :max="200"
                        />
                        days
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import selectNum from './components/select-number.vue';

    const rulesOption = ref({
        Therapy: {
            good: {
                isOpen: false,
                limits: [''],
            },
            caution: {
                isOpen: false,
                limits: ['', ''],
            },
            risk: {
                isOpen: false,
                limits: [''],
            },
            selectDays: [],
            adherenceAchieved: {
                isOpen: false,
            },
            LongTermAdherence: {
                isOpen: false,
                limits: [''],
                isDisregard: false,
                disregard: '',
            },
        },
        Clinical: {
            leak: {
                isOpen: false,
                limits: ['', ''],
                isDisregard: false,
                disregard: '',
            },
            ahi: {
                isOpen: false,
                limits: ['', ''],
                isDisregard: false,
                disregard: '',
            },
        },
        Connectivity: {
            cellularModem: {
                isOpen: false,
                limits: [''],
                isDisregard: false,
                disregard: '',
            },
            wifiModule: {
                isOpen: false,
                limits: [''],
                isDisregard: false,
                disregard: '',
            },
        },
    });
</script>

<style lang="scss" scoped>
    .page-container {
        padding-top: 20px;
    }

    .radio-flex {
        display: flex;
        align-items: center;
        margin-bottom: 5px;
    }

    .rule-module {
        padding: 20px 0;
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

        &:last-child {
            padding-bottom: 0;
        }
    }

    :deep(.select-number) {
        margin: 0 10px;
    }

    :deep(.el-checkbox-group) {
        display: block;
    }

    :deep(.el-checkbox__inner::after) {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 4px;
        height: 4px;
        content: '';
        background-color: var(--el-color-white);
        border-radius: 50% !important;
        transition: transform 0.15s ease-in;
        transform: translate(-50%, -50%) scale(1) !important;
    }

    :deep(.el-checkbox__inner) {
        border-radius: 50%;
    }
</style>
