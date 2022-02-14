import { Host } from "types/fog";
import { Blade } from "types/tractor";
import { BLADE_STATUS_COLOR } from "utils/colors";
import { getBladeStatus } from "utils/tractor";

interface BladeSquareProps {
  blade?: Blade;
  host?: Host;
}

const BladeSquare = ({ blade, host }: BladeSquareProps): JSX.Element => {
  let tip;

  if (blade) {
    const status = getBladeStatus(blade);

    tip = `
      <p>${blade.hnm}</p>
      <p>Pool: ${blade.profile}</p>
      <p>Status: <span style="color: ${BLADE_STATUS_COLOR[status]}">${status}</p>
    `;
  } else {
    host = host as Host;
    tip = `
      <p>${host.name} (Not in Tractor)</p>
      <p>${host.description}</p>
    `;
  }

  return (
    <div
      data-html={true}
      data-tip={tip}
      data-for="blades-grid"
      style={{
        backgroundColor: blade
          ? BLADE_STATUS_COLOR[getBladeStatus(blade)]
          : "rgb(85, 85, 85)",
        width: "15px",
        height: "15px",
        transition: "all 0.5s ease",
      }}
    />
  );
};

export default BladeSquare;
