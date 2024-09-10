import type { DeviceModelRes } from './types';

/**
 *  获取设备包含的模式以及默认模式显示的参数
 */
export const getDeviceModel = (data: { sn: string }) => {
    return useClientRequest<ResPonseType<DeviceModelRes>>('/api/device/device_model', {
        method: 'GET',
        params: data,
    });
};
