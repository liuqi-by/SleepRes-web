<template>
    <div v-loading="loadingSetting">
        <div v-if="modeOptions && modeOptions.length > 0">
            <el-form-item
                prop="mode"
                label="Mode"
            >
                <div class="form-item w-[200px]!">
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
                <el-form-item
                    label="Tubing"
                    prop="tubing"
                >
                    <div class="form-item">
                        <el-select v-model="formData.tubing">
                            <el-option
                                value="Standard Tubing"
                                label="Standard Tubing"
                            />
                            <el-option
                                value="Heated Tubing"
                                label="Heated Tubing"
                            />
                        </el-select>
                    </div>
                </el-form-item>
                <el-form-item
                    label="Mask"
                    prop="mask"
                >
                    <div class="form-item w-[300px]!">
                        <el-input
                            v-model="formData.mask"
                            class="form-input"
                            :maxlength="inputLength.mask"
                        />
                    </div>
                </el-form-item>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import type { Parshow } from '~/api/device/types';
    import type { UserInfo } from '~/api/login/types';
    import { getDeviceModel, updateDeviceModel, updateTubingAndMask } from '~/api/device';

    const formData = ref({
        mode: 0,
        mask: '',
        tubing: 'Standard Tubing',
    });

    // 模式显示
    const mode = ref(0);

    const modeSave = ref(0);
    // 模式选项
    const modeOptions = ref<
        {
            id: number;
            label: string;
        }[]
    >();

    // 模式设置的值
    const modeSettingValue = ref<any>({});

    // 模式设置保存的值
    const modeSettingSaveValue = ref<any>({});

    // 模式设置框的选项
    const modeSettingList = ref<Parshow>({});
    // 储存接口数据
    const saveApiData = ref({
        modeSettingValue: {},
        mode: 0,
        mask: '',
        tubing: 'Standard Tubing',
    });
    // 患者
    const patient = inject<Ref<UserInfo>>('patient');

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
        '83': [20, 20, 20, 20, 20, 20, 20, 20, 25, 25, 25, 30, 30, 30], // 最小压力
        '82': [20, 20, 20, 20, 20, 20, 20, 20, 25, 25, 25, 30, 30, 30], // 最大压力
        '79': [25, 25, 25, 25, 25, 30, 25, 25, 25, 25, 25, 30, 30, 30], // 最大吸气压力
        '80': [25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 30, 30], // 最小吸气压力
        '77': [25, 25, 25, 25, 25, 30, 25, 25, 30, 30, 30, 30, 30, 30], // 吸气压力
        '76': [23, 23, 23, 23, 23, 28, 23, 23, 25, 25, 25, 25, 25, 25], // 呼气压力
        '78': [23, 23, 23, 23, 23, 28, 28, 28, 28, 28, 28, 28, 28, 28], // 最小呼气压力
    };

    // 获取压力最大值
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
                return getPressOptions(4, getOptionsValue('84') || getMaxPre('75'));
            case 1:
            case 2:
                return getPressOptions(4, getOptionsValue('82') || getMaxPre('75'));
            case 3:
            case 4:
            case 5:
            case 7:
                return getPressOptions(4, getOptionsValue('76') || getMaxPre('75'));
            case 6:
                return getPressOptions(4, getOptionsValue('78') || getMaxPre('75'));
            default:
                return getPressOptions(4, getMaxPre('75'));
        }
    };

    // 计算吸气压力
    const computedInspPress = () => {
        switch (mode.value) {
            case 3:
            case 4:
            case 5:
            case 7:
                return getPressOptions(Math.max(getOptionsValue('76') + 2, 4), getMaxPre('77'));

            case 6:
                return getPressOptions(
                    Math.max(getOptionsValue('76') + 2, 4),
                    Math.min(getOptionsValue('76') + 8, getOptionsValue('79'), getMaxPre('77')),
                );
            case 8:
            case 9:
                return getPressOptions(getOptionsValue('80') || 4, Math.min(getOptionsValue('79'), getMaxPre('77')));
            default:
                return getPressOptions(4, Math.max(getOptionsValue('76') + 8, getOptionsValue('79'), getMaxPre('77')));
        }
    };

    // 计算呼气压力
    const computedEpapPress = () => {
        switch (mode.value) {
            case 6:
                return getPressOptions(getOptionsValue('77') - 8, Math.min(getOptionsValue('77') - 2, getMaxPre('76')));
            case 8:
                return getPressOptions(
                    4,
                    Math.min(getOptionsValue('77') - 2, getOptionsValue('80') - 2, getMaxPre('76')),
                );
            default:
                return getPressOptions(getOptionsValue('75'), Math.min(getOptionsValue('77') - 2, getMaxPre('76')));
        }
    };

    // 计算最大吸气时长
    const computedMaxInspTime = () => {
        switch (mode.value) {
            case 8:
                return getRangeOptions(Math.max(getOptionsValue('65'), getOptionsValue('67'), 0.5), 4, 's', 0.1, 10);
            default:
                return getRangeOptions(Math.max(getOptionsValue('67'), 0.5), 4, 's', 0.1, 10);
        }
    };

    // 计算最小吸气时长
    const computedMinInspTime = () => {
        switch (mode.value) {
            case 8:
                return getRangeOptions(0.5, Math.min(getOptionsValue('66'), getOptionsValue('65'), 4), 's', 0.1, 10);
            default:
                return getRangeOptions(0.5, Math.min(getOptionsValue('66'), 4), 's', 0.1, 10);
        }
    };

    // 计算吸气时长
    const computedInspTime = () => {
        switch (mode.value) {
            case 7:
            case 9:
                return getRangeOptions(0.5, Math.min((60 / getOptionsValue('69') / 10) * 0.8, 4), 's', 0.1, 10);
            default:
                return getRangeOptions(
                    Math.max(0.5, getOptionsValue('67')),
                    Math.min((60 / getOptionsValue('69') / 10) * 0.8, getOptionsValue('66')),
                    's',
                    0.1,
                    10,
                );
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
            '84': getPressOptions(Math.max(getOptionsValue('75'), 4), getMaxPre('84')),
            '89': APsensOptions,
            // 最小压力
            '82': getPressOptions(Math.max(getOptionsValue('75'), 4), Math.min(getOptionsValue('83'), getMaxPre('82'))),
            // 最大压力 最大压力大于等于最小压力
            '83': getPressOptions(Math.max(getOptionsValue('82'), 4), getMaxPre('83')),
            // 呼气灵敏度 ESens
            '63': ESensOptions,
            // 吸气灵敏度 ISens
            '64': ESensOptions,
            // 最大吸气时间 MaxInspTime
            '66': computedMaxInspTime(),
            // 最小吸气时间 MinInspTime
            '67': computedMinInspTime(),
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
            '76': computedEpapPress(),
            // 吸气压力 IPAP
            '77': computedInspPress(),
            // 吸气时间 InspTime
            '65': computedInspTime(),
            // 呼吸频率 RR
            '69': getRangeOptions(3, Math.min(60 / (getOptionsValue('65') / 0.8), 40), 'BPM'),
            // 最低呼气压力 MinEPAP
            '78': getPressOptions(4, Math.min(getOptionsValue('76'), getMaxPre('78'))),
            // 最高吸气压力 Max IPAP
            '79': getPressOptions(getOptionsValue('77'), getMaxPre('79')),
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
            '80': getPressOptions(getOptionsValue('76') + 2, Math.min(getOptionsValue('77'), getMaxPre('80'))),
            // 目标潮气量 VT
            '85': getRangeOptions(200, 2000, 'ml', 50),
        };
    });

    watch(
        () => mode.value,
        () => {
            // 重置 modeSettingValue

            modeSettingValue.value = JSON.parse(JSON.stringify(saveApiData.value.modeSettingValue));
        },
    );

    let timer_update: NodeJS.Timeout | null = null;

    // 清除定时器
    onUnmounted(() => {
        if (timer_update) {
            clearInterval(timer_update);
        }
    });

    const update = () => {
        return new Promise<void>((resolve, _reject) => {
            if (!patient?.value.sn) {
                return;
            }
            let timerOut = 5;

            let loadingInstance = ElLoading.service({
                lock: true,
                text: 'Parameter adjustment in progress, please do not close the interface',
                target: '.prescription',
            });

            let data: any = {};

            for (const key of modeSettingList.value[mode.value]) {
                data[key] = modeSettingValue.value[key]['v' + mode.value] || modeSettingValue.value[key].val;
            }

            data['90'] = String(mode.value);

            if (timer_update) {
                clearInterval(timer_update);
            }

            timer_update = setInterval(() => {
                timerOut--;

                if (timerOut <= 0) {
                    loadingInstance.close();
                    timer_update && clearInterval(timer_update);
                    ElMessage.error('Request timeout, please retry');
                }

                updateDeviceModel({
                    data: JSON.stringify(data),
                    sn: patient.value.sn,
                })
                    .then(res => {
                        console.log(res);
                        // ElMessage.success(res.msg);
                        // modeSettingSaveValue.value = {
                        //     ...modeSettingValue.value,
                        // };
                        if (res.msg === 'Successfully') {
                            loadingInstance.setText('The new settings have been sent to the PAP device');
                            setTimeout(() => {
                                loadingInstance.close();
                                timer_update && clearInterval(timer_update);
                                modeSettingSaveValue.value = JSON.parse(JSON.stringify(modeSettingValue.value));
                                modeSave.value = mode.value;
                            }, 1000);
                        }
                        if (res.msg === 'No Online') {
                            loadingInstance.setText(
                                'The device is not connected to the server, and the parameters take effect after the device is connected to the server',
                            );
                            setTimeout(() => {
                                loadingInstance.close();
                                timer_update && clearInterval(timer_update);
                                modeSave.value = mode.value;
                                modeSettingSaveValue.value = JSON.parse(JSON.stringify(modeSettingValue.value));
                            });
                        }
                    })
                    .finally(() => {
                        resolve();
                    });
            }, 1000);

            // 更新面罩信息
            updateTubingAndMask({
                sn: patient.value.sn,
                tubing: formData.value.tubing,
                mask: formData.value.mask,
            });
        });
    };

    const save = () => {
        return new Promise<void>((resolve, _reject) => {
            if (!patient?.value.sn) {
                return;
            }
            let timerOut = 5;
            ElMessageBox.confirm(' ', 'Would you like to send the Rx settings to the PAP device?', {
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
                type: 'warning',
            })
                .then(() => {
                    let loadingInstance = ElLoading.service({
                        lock: true,
                        text: 'Parameter adjustment in progress, please do not close the interface',
                        target: '.prescription',
                    });

                    let data: any = {};

                    for (const key of modeSettingList.value[mode.value]) {
                        data[key] = modeSettingValue.value[key]['v' + mode.value] || modeSettingValue.value[key].val;
                    }

                    data['90'] = String(mode.value);

                    if (timer_update) {
                        clearInterval(timer_update);
                    }

                    timer_update = setInterval(() => {
                        timerOut--;

                        if (timerOut <= 0) {
                            loadingInstance.close();
                            timer_update && clearInterval(timer_update);
                            ElMessage.error('Request timeout, please retry');
                        }

                        updateDeviceModel({
                            data: JSON.stringify(data),
                            sn: patient.value.sn,
                        })
                            .then(res => {
                                console.log(res);
                                // ElMessage.success(res.msg);
                                // modeSettingSaveValue.value = {
                                //     ...modeSettingValue.value,
                                // };
                                if (res.msg === 'Successfully') {
                                    loadingInstance.setText('The new settings have been sent to the PAP device');
                                    setTimeout(() => {
                                        loadingInstance.close();
                                        timer_update && clearInterval(timer_update);
                                        modeSettingSaveValue.value = JSON.parse(JSON.stringify(modeSettingValue.value));
                                        modeSave.value = mode.value;
                                    }, 1000);
                                }
                                if (res.msg === 'No Online') {
                                    loadingInstance.setText(
                                        'The device is not connected to the server, and the parameters take effect after the device is connected to the server',
                                    );
                                    setTimeout(() => {
                                        loadingInstance.close();
                                        timer_update && clearInterval(timer_update);
                                        modeSave.value = mode.value;
                                        modeSettingSaveValue.value = JSON.parse(JSON.stringify(modeSettingValue.value));
                                    });
                                }
                            })
                            .finally(() => {
                                resolve();
                            });
                    }, 1000);

                    // 更新面罩信息
                    updateTubingAndMask({
                        sn: patient.value.sn,
                        tubing: formData.value.tubing,
                        mask: formData.value.mask,
                    });
                })
                .catch(() => {
                    resolve();
                });
        });
    };

    const loadingSetting = ref(false);
    const getDeviceModelInfo = useDebounceFn(() => {
        if (!patient || !patient.value?.sn) {
            modeOptions.value = [];
            // 模式显示
            mode.value = 0;
            formData.value.mask = '';
            formData.value.tubing = 'Standard Tubing';
            modeSettingList.value = {};
            modeSettingValue.value = {};

            deviceType.value = undefined;

            saveApiData.value.mode = 0;
            saveApiData.value.modeSettingValue = {};
            saveApiData.value.mask = '';
            saveApiData.value.tubing = 'Standard Tubing';
            return;
        }
        loadingSetting.value = true;
        getDeviceModel({
            sn: patient.value?.sn,
        })
            .then(res => {
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
                    formData.value.mask = res.data.info.mask || '';
                    formData.value.tubing = res.data.info.tubing || 'Standard Tubing';
                    modeSettingList.value = res.data.par_show;
                    modeSettingValue.value = res.data.par_show_val;
                    deviceType.value = res.data.device_type_id;

                    saveApiData.value.mode = mode.value;
                    saveApiData.value.modeSettingValue = JSON.parse(JSON.stringify(res.data.par_show_val));
                    saveApiData.value.mask = res.data.info.mask || '';
                    saveApiData.value.tubing = res.data.info.tubing || 'Standard Tubing';
                } else {
                    modeOptions.value = [];
                    // 模式显示
                    mode.value = 0;
                    formData.value.mask = '';
                    formData.value.tubing = 'Standard Tubing';
                    modeSettingList.value = {};
                    modeSettingValue.value = {};

                    deviceType.value = undefined;

                    saveApiData.value.mode = 0;
                    saveApiData.value.modeSettingValue = {};
                    saveApiData.value.mask = '';
                    saveApiData.value.tubing = 'Standard Tubing';
                }
            })
            .finally(() => {
                loadingSetting.value = false;
            });
    }, 500);

    watch(
        () => patient?.value.sn,
        () => {
            getDeviceModelInfo();
        },
        {
            immediate: true,
            deep: true,
        },
    );

    const resetEdit = () => {
        mode.value = saveApiData.value.mode;
        modeSettingValue.value = JSON.parse(JSON.stringify(saveApiData.value.modeSettingValue));
        formData.value.mask = saveApiData.value.mask;
        formData.value.tubing = saveApiData.value.tubing;
    };

    onUpdated(() => {});

    defineExpose({
        save,
        resetEdit,
        update,
    });
</script>

<style lang="scss" scoped>
    .form-item {
        max-width: 200px;
    }

    .column-box {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
    }

    :deep(.el-loading-mask) {
        z-index: 999999;
    }
</style>
