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
