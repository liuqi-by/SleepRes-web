// 自定义格式化字段
/**
 * Last, First Name
 */

export const nameFormat = (name: string) => {
    return name.replace(/ /g, ',');
};
