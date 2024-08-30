import type { EChartsOption } from 'echarts/types/dist/shared.js';
import type { BarChartRes } from '~/api/report/types';
// 静态图表通用配置
export function useStaticChartCommonOption(dates: BarChartRes['dates']) {
    const option: EChartsOption = {
        title: {
            textStyle: {
                rich: {
                    a: {
                        fontFamily: 'Source Han Sans CN',
                        fontSize: 16,
                        fontWeight: 'bold',

                        color: '#0F1B33',
                    },
                    b: {
                        fontFamily: 'Source Han Sans CN',
                        fontSize: 14,
                        fontWeight: 350,

                        color: '#6F7685',
                    },
                },
            },
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow',
            },

            formatter: function (params: any) {
                let index = params[0].dataIndex;
                let time = dates[index];

                let html = `
                <div>${time}</div>
                ${params
                    .map((item: any) => {
                        return `<div style="display:flex;justify-content:space-between;"><span style="text-align:left;flex:1;margin-right:5px;" > ${item.seriesName}</span>${item.data}</div>`;
                    })
                    .join('')}`;

                return html;
            },
        },
        grid: {
            left: '50',
            right: '20',
            bottom: '25',
            top: '35',
            containLabel: false,
        },

        xAxis: [
            {
                type: 'category',
                splitLine: { show: false },
                axisTick: { show: false },
                data: dates.map((item: string) => {
                    return item.substring(5, 10);
                }),
                position: 'bottom',
            },
        ],
        yAxis: {
            type: 'value',
            splitLine: { show: true },
        },
    };
    return {
        commonOption: option,
    };
}
