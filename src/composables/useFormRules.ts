export function useFormRules() {
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
        // 密码验证规则
        password: [
            {
                trigger: 'blur',
                required: true,
                message: t('form.PleaseEnter') + t('login.password'),
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
    };
}
