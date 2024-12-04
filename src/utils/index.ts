/**
 * 判断是否有Class
 * @param {HTMLElement} ele
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele: HTMLElement, cls: string) {
    return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

/**
 * 添加Class
 * @param {HTMLElement} ele
 * @param {string} cls
 */
export function addClass(ele: HTMLElement, cls: string) {
    if (!hasClass(ele, cls)) {
        ele.className += ' ' + cls;
    }
}

/**
 * 移除Class
 * @param {HTMLElement} ele
 * @param {string} cls
 */
export function removeClass(ele: HTMLElement, cls: string) {
    if (hasClass(ele, cls)) {
        const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        ele.className = ele.className.replace(reg, ' ');
    }
}

/**
 * 判断是不是链
 * @param {string} path
 * @returns {boolean}
 */
export function isExternal(path: string) {
    const isExternal = /^(https?:|http?:|mailto:|tel:)/.test(path);
    return isExternal;
}

/**
 * 判断是否是邮箱
 */
export function isEmail(email: string) {
    if (email.includes('@')) {
        return true;
    } else {
        return false;
    }
}

/**
 * 判断是否可以滚动
 */
export function isScrollable(element: HTMLElement, type: 'vertical' | 'horizontal' = 'vertical') {
    if (type === 'vertical') {
        return element.scrollHeight > element.clientHeight;
    } else {
        return element.scrollWidth > element.clientWidth;
    }
}

/**
 *   使用Object.entries()和数组的map()方法
 */

export function queryString(data: Object) {
    return Object.entries(data)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`) // 使用encodeURIComponent来处理特殊字符
        .join('&');
}
/**
 * 数组交换位置
 * @param arr 数组
 * @param indexA 数组1位置
 * @param indexB 数组2位置
 */
export function swapArray(arr: [], indexA: number, indexB: number) {
    const temp = arr[indexA];
    arr[indexA] = arr[indexB];
    arr[indexB] = temp;
}
