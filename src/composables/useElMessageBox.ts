import type { ElMessageBoxOptions } from 'element-plus';

/**
 * @description ElmessageBox二次封装
 */
export const useElMessageBox = () => {
    const alert = (
        message: ElMessageBoxOptions['message'],
        title: ElMessageBoxOptions['title'],
        option?: ElMessageBoxOptions,
    ) => {
        return ElMessageBox.alert(message, title, {
            closeOnClickModal: false,
            closeOnPressEscape: false,
            ...option,
        });
    };

    const confirm = (
        message: ElMessageBoxOptions['message'],
        title: ElMessageBoxOptions['title'],
        option?: ElMessageBoxOptions,
    ) => {
        return ElMessageBox.confirm(message, title, {
            closeOnClickModal: false,
            closeOnPressEscape: false,
            ...option,
        });
    };
    return { alert, confirm };
};
