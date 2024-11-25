// 使用这些方法，仍然需要注意数值范围、舍入策略和比较运算等方面的问题，根据具体的应用场景进行适当的调整和处理。

// 加法运算
export function add(a: number, b: number) {
    const precision = Math.max(getPrecision(a), getPrecision(b));
    const multiplier = Math.pow(10, precision);
    return (Math.round(a * multiplier) + Math.round(b * multiplier)) / multiplier;
}

// 减法运算
export function subtract(a: number, b: number) {
    return add(a, -b);
}

// 乘法运算
export function multiply(a: number, b: number) {
    const precision = getPrecision(a) + getPrecision(b);
    const multiplier = Math.pow(10, precision);
    return (Math.round(a * multiplier) * Math.round(b * multiplier)) / (multiplier * multiplier);
}

// 除法运算
export function divide(a: number, b: number) {
    const precision = getPrecision(a) - getPrecision(b);
    const divisor = Math.pow(10, precision);
    return Math.round((a / b) * divisor) / divisor;
}

// 获取浮点数的小数位数
export function getPrecision(num: number) {
    const str = String(num);
    const decimalIndex = str.indexOf('.');
    return decimalIndex === -1 ? 0 : str.length - decimalIndex - 1;
}

// 计算百分比取整
export function calculatePercentage(num: number, total: number) {
    return total ? Math.round((num / total) * 100) : 0;
}
