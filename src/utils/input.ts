import { checkPatientId } from '~/api/patient';
/**
 * 切换下一个input
 */
export const nextInput = () => {
    // 获取所有input
    const inputs = document.querySelectorAll('input');
    // 获取当前聚焦的input
    const currentInput = document.activeElement as HTMLInputElement;
    // 获取当前input的索引
    const currentIndex = Array.from(inputs).indexOf(currentInput);
    // 如果当前input不是最后一个input，则聚焦下一个input
    if (currentIndex < inputs.length - 1) {
        // 判断是不是el-select
        const nextInput = inputs[currentIndex + 1];
        if (nextInput.parentElement?.classList.contains('el-select__input-wrapper')) {
            // 是的话展开下拉框
            nextInput.click();
            nextInput.focus();
        } else {
            nextInput.focus();
        }
    }
};

/**
 * 检查患者ID
 */
export const checkPatientIdFn = (patientId: string, callback: Function) => {
    checkPatientId({ patientid: patientId }).then(res => {
        if (res.code === 1) {
            if (res.data) {
                let userInfo = { ...res.data, patient: JSON.parse(res.data.patient) };
                ElMessageBox.alert(
                    () =>
                        h('div', {}, [
                            h('div', { class: 'msg' }, [
                                'Sorry, the patient ID you are trying to use is already assigned to patient ( ',
                                h(
                                    'span',
                                    {
                                        class: 'link',
                                        onClick: () => {
                                            ElMessageBox.close();
                                            callback(userInfo);
                                        }, // 注意在Vue 3中应该使用`onClick`而不是`@click`
                                    },
                                    userInfo.patient.patientid,
                                ),
                                ' ).  Please either create a different ID or modify the ID in patient ( ',
                                h(
                                    'span',
                                    {
                                        class: 'link',
                                        onClick: () => {
                                            ElMessageBox.close();
                                            callback(userInfo);
                                        },
                                    },
                                    userInfo.patient.patientid,
                                ),
                                ' ) SleepRes account.',
                            ]),
                            h('div', { class: 'text-left m-t-[20px] text' }, [
                                h('p', { class: '' }, 'Technical Support'),
                                h('p', { class: '' }, '1-800-555-5555'),
                                h('p', { class: '' }, 'technical.support@sleepres.com'),
                            ]),
                        ]),

                    'Patient ID Already Exists',
                    {
                        // if you want to disable its autofocus
                        // autofocus: false,
                        showConfirmButton: false,
                        center: true,
                        dangerouslyUseHTMLString: true,
                        customClass: 'register-dialog',
                        closeOnClickModal: false,
                        closeOnPressEscape: false,
                        customStyle: {
                            minWidth: '630px',
                        },
                    },
                );
            }
        }
    });
};
