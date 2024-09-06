/**
 *  监听窗口大小变化
 * @param chart 图表ref
 */
export function useChartResize(chart: any) {
    const { width } = useWindowSize();

    watch(
        () => width.value,
        () => {
            if (chart.value) {
                chart.value?.resize();
            }
        },
    );
}
