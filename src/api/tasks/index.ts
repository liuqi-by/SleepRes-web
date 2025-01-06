import type { TaskRuleData } from './types';

/**
 * @description
 */
export const getTaskRuleData = () => {
    return useClientRequest<ResPonseType<TaskRuleData>>('api/task/getruledata', {
        method: 'GET',
    });
};

/**
 * @description
 */
export const getTaskPercentUsage = () => {
    return useClientRequest<ResPonseType<void>>('/api/task/percent_usage', {
        method: 'GET',
    });
};

/**
 * @description
 */
export const getTaskAdherent = () => {
    return useClientRequest<ResPonseType<void>>('/api/task/adherent', {
        method: 'GET',
    });
};
