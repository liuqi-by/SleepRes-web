export const useDashboard = defineStore('dashboard', () => {
    const monthRange = getLast12Months();

    return {
        monthRange,
    };
});
