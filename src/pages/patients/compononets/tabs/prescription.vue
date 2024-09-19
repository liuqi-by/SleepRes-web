<template>
    <div class="prescription">
        under development
        <edit-btn v-model="isEdit" />

        <el-form
            ref="formRef"
            :model="formData"
            :rules="formRules"
            class="form"
            label-width="120px"
            :disabled="!isEdit"
        >
            <el-form-item
                prop="mode"
                label="通气模式"
            >
                <div class="form-item">
                    <el-select v-model="mode">
                        <el-option
                            :label="item.label"
                            :value="item.id"
                            v-for="item in modeOptions"
                            :key="item.id"
                        />
                    </el-select>
                </div>
            </el-form-item>

            <div class="column-box">
                <el-form-item
                    prop="sn"
                    :label="$t(`deviceSettings.par${item}`)"
                    v-for="(item, index) in modeSettingList[mode]"
                    :key="index"
                >
                    <div class="form-item">
                        <el-select
                            v-model="modeSettingValue[item]['v' + mode]"
                            v-if="modeSettingValue[item]['v' + mode]"
                        >
                            <el-option
                                v-for="inItem in modeSettingOptions[item]"
                                :value="inItem.value"
                                :label="inItem.label"
                                :key="inItem.value"
                            />
                        </el-select>
                        <el-select
                            v-model="modeSettingValue[item].val"
                            v-else
                        >
                            <el-option
                                v-for="inItem in modeSettingOptions[item]"
                                :value="inItem.value"
                                :label="inItem.label"
                                :key="inItem.value"
                            />
                        </el-select>
                    </div>
                </el-form-item>
            </div>
        </el-form>
        <div class="footer-btn">
            <base-button
                type="primary"
                @click="save"
                :loading="loading"
                :disabled="!isEdit"
            >
                {{ $t('form.Save') }}
            </base-button>
            <base-button
                @click="isEdit = false"
                :disabled="!isEdit"
            >
                {{ $t('form.Cancel') }}
            </base-button>
            <base-button>
                {{ $t('patients.SendRx') }}
            </base-button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import type { FormInstance, InputInstance } from 'element-plus';
    import editBtn from './components/edit-btn.vue';
    import type { UserInfo } from '~/api/login/types';
    import { getDeviceModel } from '~/api/device';
    import type { Parshow } from '~/api/device/types';

    const isEdit = ref(false);

    const formData = ref({
        mode: 0,
    });

    const formRules = computed(() => {
        return {};
    });

    const loading = ref(false);
    const formRef = ref<FormInstance>(); // 表单ref
    // 保存
    const save = () => {
        formRef.value?.validate(valid => {
            if (valid) {
                loading.value = true;
            }
        });
    };

    const snInput = ref<InputInstance>();
    watch(isEdit, val => {
        if (val) {
            snInput.value?.focus();
        }
    });

    // 模式显示
    const mode = ref(0);
    // 模式选项
    const modeOptions = ref<
        {
            id: number;
            label: string;
        }[]
    >();
    // 模式设置框的选项
    const modeSettingList = ref<Parshow>({});
    // 患者
    const patient = inject<Ref<UserInfo>>('patient');

    // 模式设置的值
    const modeSettingValue = ref<any>({});

    // 模式设置保存的值
    const modeSettingSaveValue = ref<any>({});

    // 设备机型
    const deviceType = ref();

    const onAndOff = [
        {
            label: 'OFF',
            value: '0',
        },
        {
            label: 'ON',
            value: '1',
        },
    ];

    const APsensOptions = [
        {
            label: 'Low',
            value: '0',
        },
        {
            label: 'Medium',
            value: '1',
        },
        {
            label: 'High',
            value: '2',
        },
    ];

    const ESensOptions = [
        ...new Array(7).fill(0).map((_, index) => {
            if (index === 0) {
                return {
                    label: 'Auto',
                    value: '0',
                };
            } else {
                return {
                    label: index + ' Level',
                    value: String(index),
                };
            }
        }),
    ];

    // 根据最大最小值得到压力选项列表
    const getPressOptions = (min: number, max: number) => {
        return getRangeOptions(min, max, 'cmH2O', 0.5, 10);
    };

    const getRangeOptions = (min: number, max: number, unit: string, step: number = 1, override: number = 1) => {
        let options = [];
        for (let i = min; i <= max; i = add(i, step)) {
            options.push({
                label: i + ' ' + unit,
                value: String(i * override),
            });
        }
        return options;
    };

    // 根据机型不同最大值不同
    const $device_pre_arr = [20, 20, 20, 25, 25, 30, 25, 25, 25, 30, 30, 30, 30, 30]; // 所有压力最大值

    // const $pre_84_arr = [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20]; // 压力
    // const $pre_75_arr = [20, 20, 20, 23, 23, 23, 23, 23, 23, 25, 25, 25, 25, 28]; // 初始压力
    // const $pre_83_arr = [20, 20, 20, 20, 20, 20, 20, 20, 25, 25, 25, 30, 30, 30]; // 最大压力
    // const $pre_82_arr = [20, 20, 20, 20, 20, 20, 20, 20, 25, 25, 25, 30, 30, 30]; // 最小压力
    // const $pre_79_arr = [25, 25, 25, 25, 25, 30, 25, 25, 25, 25, 25, 30, 30, 30]; // 最大吸气压力
    // const $pre_80_arr = [25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 30, 30]; // 最小吸气压力
    // const $pre_77_arr = [25, 25, 25, 25, 25, 30, 25, 25, 30, 30, 30, 30, 30, 30]; // 吸气压力
    // const $pre_76_arr = [23, 23, 23, 23, 23, 28, 23, 23, 25, 25, 25, 25, 25, 25]; // 呼气压力
    // const $pre_78_arr = [23, 23, 23, 23, 23, 28, 28, 28, 28, 28, 28, 28, 28, 28]; // 最小呼气压力
    const maxPreList = {
        '84': [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20], // 压力
        '75': [20, 20, 20, 23, 23, 23, 23, 23, 23, 25, 25, 25, 25, 28], // 初始压力
        '83': [20, 20, 20, 20, 20, 20, 20, 20, 25, 25, 25, 30, 30, 30], // 最大压力
        '82': [20, 20, 20, 20, 20, 20, 20, 20, 25, 25, 25, 30, 30, 30], // 最小压力
        '79': [25, 25, 25, 25, 25, 30, 25, 25, 25, 25, 25, 30, 30, 30], // 最大吸气压力
        '80': [25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 30, 30], // 最小吸气压力
        '77': [25, 25, 25, 25, 25, 30, 25, 25, 30, 30, 30, 30, 30, 30], // 吸气压力
        '76': [23, 23, 23, 23, 23, 28, 23, 23, 25, 25, 25, 25, 25, 25], // 呼气压力
        '78': [23, 23, 23, 23, 23, 28, 28, 28, 28, 28, 28, 28, 28, 28], // 最小呼气压力
    };

    const getMaxPre = (index: keyof typeof maxPreList) => {
        return maxPreList[index][deviceType.value] <= $device_pre_arr[deviceType.value]
            ? maxPreList[index][deviceType.value]
            : $device_pre_arr[deviceType.value];
    };

    const getOptionsValue = (key: string) => {
        return modeSettingValue.value[key]['v' + mode.value] / 10;
    };

    // 计算初始压力
    const computedStartPress = () => {
        switch (mode.value) {
            case 0:
                return getPressOptions(4, getOptionsValue('84') || 20);
            case 1:
            case 2:
                return getPressOptions(4, getOptionsValue('82') || 20);
            case 3:
            case 4:
            case 5:
            case 7:
                return getPressOptions(4, getOptionsValue('76') || 20);
            case 6:
                return getPressOptions(4, getOptionsValue('78') || 20);
            default:
                return getPressOptions(4, 20);
        }
    };

    // 计算吸气压力
    const computedInspPress = () => {
        switch (mode.value) {
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
                return getPressOptions(
                    Math.max(getOptionsValue('76') + 2, 4),
                    Math.min(getOptionsValue('76') + 8, getOptionsValue('79')),
                );
            case 8:
            case 9:
                return getPressOptions(getOptionsValue('80') || 4, getOptionsValue('79'));
            default:
                return getPressOptions(4, Math.max(getOptionsValue('76') + 8, getOptionsValue('79')));
        }
    };

    // 模式设置值的选项
    const modeSettingOptions = computed<any>(() => {
        console.log(subtract(getOptionsValue('77'), getOptionsValue('76')));
        return {
            '60': [
                ...new Array(61).fill(0).map((_, index) => {
                    if (index > 0) {
                        return {
                            label: index + 'min',
                            value: String(index),
                        };
                    } else {
                        return {
                            label: 'OFF',
                            value: '0',
                        };
                    }
                }),
            ],
            '61': onAndOff,
            '62': onAndOff,
            '70': getRangeOptions(0, 3, 'Level'),
            '86': onAndOff,
            // 初始压力 小于等于最小压力
            '75': computedStartPress(),
            // 压力值 大于等于初始压力
            '84': getPressOptions(Math.max(getOptionsValue('75'), 4), 20),
            '89': APsensOptions,
            // 最小压力
            '82': getPressOptions(4, Math.min(getOptionsValue('83'), 20)),
            // 最大压力 最大压力大于等于最小压力
            '83': getPressOptions(Math.max(getOptionsValue('82'), 4), 20),
            // 呼气灵敏度 ESens
            '63': ESensOptions,
            // 吸气灵敏度 ISens
            '64': ESensOptions,
            // 最大吸气时间 MaxInspTime
            '66': getRangeOptions(Math.max(getOptionsValue('67'), 0.5), 4, 's', 0.1, 10),
            // 最小吸气时间 MinInspTime
            '67': getRangeOptions(0.5, Math.min(getOptionsValue('66'), 4), 's', 0.1, 10),
            // 升压时间 ISlop
            '68': [
                ...new Array(7)
                    .fill(0)
                    .map((_, index) => {
                        if (index === 0) {
                            return {
                                label: 'Auto',
                                value: '0',
                            };
                        } else {
                            return {
                                label: index + ' Level',
                                value: String(index),
                            };
                        }
                    })
                    .filter((_, index) => index !== 0),
            ],
            // 呼气压力 EPAP
            '76': getPressOptions(Math.max(getOptionsValue('77') - 8, 4), Math.min(getOptionsValue('77') - 2)),
            // 吸气压力 IPAP
            '77': computedInspPress(),
            // 吸气时间 InspTime
            '65': getRangeOptions(0.5, (60 / getOptionsValue('69') / 10) * 0.8, 's', 0.1, 10),
            // 呼吸频率 RR
            '69': getRangeOptions(
                3,
                60 / (getOptionsValue('65') / 0.8) > 40 ? 40 : 60 / getOptionsValue('65') / 0.8,
                'BPM',
            ),
            // 最低呼气压力 MinEPAP
            '78': getPressOptions(4, getOptionsValue('76')),
            // 最高吸气压力 Max IPAP
            '79': getPressOptions(getOptionsValue('77'), 30),
            // 最大PS MaxPS
            '81': getPressOptions(Math.max(subtract(getOptionsValue('77'), getOptionsValue('76')), 3), 8),
            // 分夜 Split Night
            '88': [
                {
                    label: 'OFF',
                    value: '0',
                },
                {
                    label: '120min',
                    value: '120',
                },
                {
                    label: '180min',
                    value: '180',
                },
                {
                    label: '240min',
                    value: '240',
                },
            ],
            // 最低吸气压力 Min IPAP
            '80': getPressOptions(4, 30),
            // 目标潮气量 VT
            '85': getRangeOptions(200, 2000, 'ml', 50),
        };
    });

    watch(
        () => mode.value,
        () => {
            console.log(subtract(getOptionsValue('77'), getOptionsValue('76')));
            modeSettingValue.value = JSON.parse(JSON.stringify(modeSettingSaveValue.value));
        },
    );

    // 获取设备模式信息
    const getDeviceModelInfo = () => {
        if (!patient || !patient.value?.sn) {
            return;
        }

        getDeviceModel({
            sn: 'NBCD0000001',
        }).then(res => {
            if (res.code === 1) {
                modeOptions.value = res.data.model_name
                    .map((item, index) => {
                        return {
                            id: index,
                            label: item,
                        };
                    })
                    .filter((_item, index) => {
                        return res.data.model_type.includes(index);
                    });
                mode.value = res.data.model_type_default;
                modeSettingList.value = res.data.par_show;
                modeSettingValue.value = res.data.par_show_val;
                modeSettingSaveValue.value = JSON.parse(JSON.stringify(res.data.par_show_val));
                deviceType.value = res.data.device_type_id;
            }
        });
    };

    watch(
        () => patient?.value.sn,
        () => {
            getDeviceModelInfo();
        },
        {
            immediate: true,
        },
    );
</script>

<style lang="scss" scoped>
    .prescription {
        padding: 20px;

        .form-item {
            max-width: 200px;
        }

        .column-box {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
        }
    }
</style>
