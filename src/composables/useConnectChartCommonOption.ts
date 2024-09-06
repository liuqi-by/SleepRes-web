import type { EChartsOption } from 'echarts/types/dist/shared.js';
import moment from 'moment';

/**
 * 联动图表option
 */
export function useConnectChartCommonOption() {
    const option: EChartsOption = {
        title: {
            textStyle: {
                rich: {
                    a: {
                        fontFamily: 'Source Han Sans CN',
                        fontSize: 18,
                        fontWeight: 'bold',
                        lineHeight: 25,
                        color: '#0F1B33',
                    },
                    b: {
                        fontFamily: 'Source Han Sans CN',
                        fontSize: '16',
                        fontWeight: 350,
                        lineHeight: 25,
                        color: '#6F7685',
                    },
                },
            },
        },
        dataZoom: {
            type: 'inside', // inside: 表示用内测滑块
            zoomOnMouseWheel: true, // 关闭滚轮缩放
            moveOnMouseWheel: false, // 开启滚轮平移
            moveOnMouseMove: true, // 鼠标移动能触发数据窗口平移
            start: 0,
            end: 100,
            // 最小缩放
            minSpan: 0.05,
            filterMode: 'filter',
            throttle: 0,
            id: 'connect',
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'line',
            },

            formatter: function (params: any) {
                let time = `<div>${moment(params[0].axisValue).format('YYYY-MM-DD HH:mm:ss.SSS')}</div>`;
                let html =
                    time +
                    `${params
                        .map((item: any) => {
                            return `<div style="display:flex;justify-content:space-between;"><span style="text-align:left;flex:1;margin-right:5px;" > ${item.seriesName}</span>${item.data && item.data[1]}</div>`;
                        })
                        .join('')}`;

                return html;
            },
        },
        grid: {
            left: '30',
            right: '20',
            bottom: '20',
            containLabel: false,
        },

        yAxis: {
            type: 'value',
            splitLine: { show: true, lineStyle: { type: 'dashed' } },
        },
    };

    return {
        commonOption: option,
    };
}
