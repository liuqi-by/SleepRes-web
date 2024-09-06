import type { ConnectChartReq } from '~/api/report/types';
import { getConnectChartData } from '~/api/report';

/**
 * @description 联动图表请求数据
 * @param type 图表url
 * @param query 请求数据
 */
export function useConnectReq<T>(type: string) {
    // 请求数据
    const getData = async (query: ConnectChartReq) => {
        let data: T | null = null;
        let res = await getConnectChartData<T>(query, type);
        if (res.code === 1) {
            data = res.data;
        }
        return data;
    };

    return {
        getData,
    };
}
