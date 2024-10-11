// 自定义格式化字段
/**
 * Last, First Name
 */

export const nameFormat = (userInfo?: { first_name?: string; last_name?: string; [key: string]: any }) => {
    return userInfo && userInfo.last_name ? `${userInfo.last_name || ''},${userInfo.first_name || ''}` : '';
};
