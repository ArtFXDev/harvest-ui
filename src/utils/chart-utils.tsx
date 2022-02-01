/**
 * Chart utility functions
 */
namespace ChartUtils {
  /**
   * Custom tooltip for pie chart (can't change text color so it's a workaround)
   */
  export const renderPieChartTooltipContent = (o: any) => {
    const { payload } = o;

    if (payload.length === 0) return <></>;
    const element = payload[0];

    return (
      <div
        className={`recharts-pie-tooltip-override recharts-default-tooltip`}
        style={{ color: element.payload.fill }}
      >
        {element.name} : {element.value} computers
      </div>
    );
  };
}

export default ChartUtils;
