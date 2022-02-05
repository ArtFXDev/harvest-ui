import { ContentType } from "recharts/types/component/Tooltip";

/**
 * Custom tooltip for pie chart (can't change text color so it's a workaround)
 */
export const coloredTooltip: ContentType<number, string> = (o) => {
  const { payload } = o;

  if (!payload || payload.length === 0) return null;
  const element = payload[0];

  return (
    <div
      className={`recharts-pie-tooltip-override recharts-default-tooltip`}
      style={{ color: element.payload.fill }}
    >
      {element.name?.replaceAll("_", " ")} : {element.value} computer
      {element.value && parseInt(element.name || "0") > 1 ? "s" : ""}
    </div>
  );
};
