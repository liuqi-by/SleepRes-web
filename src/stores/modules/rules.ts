import { getAdminRules, updateAdminRules } from '~/api/rules';

export const useRules = defineStore('rules', () => {
    const rulesOption = ref<any>({
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

    const riskDays = [
        {
            label: 'Day 7',
            value: 0,
        },
        {
            label: 'Day 14',
            value: 1,
        },
        {
            label: 'Day 21',
            value: 2,
        },
        {
            label: 'Day 28',
            value: 3,
        },
        {
            label: 'Day 45',
            value: 4,
        },
        {
            label: 'Day 60',
            value: 5,
        },
    ];

    const getRules = () => {
        getAdminRules().then(res => {
            if (res.code === 1 && res.data) {
                rulesOption.value = JSON.parse((res.data as unknown as string).replaceAll('&quot;', '"'));
            }
        });
    };

    const updateRules = (data: any) => {
        // TODO: update rules
        updateAdminRules({ rules: JSON.stringify(data) });
    };

    return {
        rulesOption,
        getRules,
        updateRules,
        riskDays,
    };
});
