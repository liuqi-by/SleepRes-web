export function useFormRules(formData?: any) {
    // 表单验证规则
    const { t } = useI18n();

    return {
        // 用户名验证规则
        usernameRequired: [
            {
                required: true,
                trigger: 'blur',
                message: t('form.PleaseEnter') + t('login.username'),
            },
        ],
        // 密码验证规则
        passwordRequired: [
            {
                trigger: 'blur',
                required: true,
                message: t('form.PleaseEnter') + t('login.password'),
            },
        ],
        dmeName: [
            {
                required: true,
                trigger: 'blur',
                message: t('form.PleaseEnter') + t('login.dmeName'),
            },
        ],
        practiceName: [
            {
                required: true,
                trigger: 'blur',
                message: t('form.PleaseEnter') + t('login.PracticeName'),
            },
        ],
        // 用户名验证规则
        username: [
            {
                required: true,
                trigger: 'blur',
                message: t('form.PleaseEnter') + t('login.username'),
            },
            {
                min: 3,
                max: 18,
                message: t('form.lengthRule', { length: '3-' + inputLength.name }),
                trigger: 'blur',
            },
        ],
        // 用户名验证规则
        firstName: [
            {
                required: true,
                trigger: 'blur',
                message: t('form.PleaseEnter') + t('login.FirstName'),
            },
        ],
        // 用户名验证规则
        lastName: [
            {
                required: true,
                trigger: 'blur',
                message: t('form.PleaseEnter') + t('login.LastName'),
            },
        ],
        // 机构名称
        officeName: [
            {
                required: true,
                trigger: 'blur',
                message: t('form.PleaseEnter') + t('office.OfficeName'),
            },
        ],

        // 密码验证规则
        password: [
            {
                trigger: 'blur',
                required: true,
                message: t('form.PleaseEnter') + t('login.password'),
            },
            {
                validator: (_rule: any, value: string, callback: any) => {
                    if (value && value.length <= 20 && value.length >= 10 && /^(?=\S*[!@#$%^&*?])\S*$/.test(value)) {
                        callback();
                    } else {
                        return callback(new Error(t('login.passwordRule')));
                    }
                },
                // message: t('login.passwordRule'),
                trigger: 'blur',
            },
        ],
        // 确认密码验证规则
        confirmPassword: [
            {
                required: true,
                trigger: 'blur',
                message: t('layout.inputConfirmPassword'),
            },
            {
                validator: (_rule: any, value: string, callback: any) => {
                    if (value !== formData.value.password) {
                        return callback(new Error(t('layout.passwordNotMatch')));
                    }
                    callback();
                },
                trigger: 'blur',
            },
        ],
        oldPassword: [
            {
                trigger: 'blur',
                required: true,
                message: t('layout.oldPasswordPlaceHolder'),
            },
        ],
        // 邮箱
        email: [
            {
                trigger: 'blur',
                required: true,
                message: t('form.PleaseEnter') + t('login.Email'),
            },
            {
                trigger: 'blur',
                validator: (_rule: any, value: string, callback: any) => {
                    const reg = REGULAR.email;
                    if (!reg.test(value)) {
                        return callback(new Error('Please enter the correct Email.'));
                    }
                    callback();
                },
            },
        ],
        // 邮箱非必填
        emailNoRequired: [
            {
                trigger: 'blur',
                validator: (_rule: any, value: string, callback: any) => {
                    const reg = REGULAR.email;
                    if (value && !reg.test(value)) {
                        return callback(new Error(t('form.PleaseEnterCurrent') + t('login.Email')));
                    }
                    callback();
                },
            },
        ],
        // accountName
        accountName: [
            {
                required: true,
                trigger: 'blur',
                message: t('form.PleaseEnter') + t('message.AccountName'),
            },
        ],
        accountNumber: [
            {
                required: true,
                trigger: 'blur',
                message: t('form.PleaseEnter') + t('message.AccountNumber'),
            },
        ],
        // role、type
        role: [
            {
                required: true,
                trigger: 'change',
                message: t('form.PleaseSelect') + t('users.Role'),
            },
        ],
        // office loaction
        office: [
            {
                required: true,
                trigger: 'change',
                message: t('form.PleaseSelect') + t('users.OfficeLocation'),
            },
        ],
        // setupDate
        setupDate: [
            {
                required: true,
                trigger: 'change',
                message: t('form.PleasePick') + t('patients.SetupDate'),
            },
        ],
        // notes
        notes: [
            {
                required: true,
                trigger: 'blur',
                message: t('form.PleaseEnter') + t('patients.Notes'),
            },
        ],
        // birthdate
        birthdate: [
            {
                required: true,
                trigger: 'change',
                message: t('form.PleasePick') + t('patients.Birthdate'),
            },
        ],
        // 序列号
        sn: [
            {
                max: 12,
                min: 10,
                trigger: 'blur',
            },
        ],
    };
}
