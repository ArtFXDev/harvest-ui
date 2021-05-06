import React from "react";

interface CheckBoxProps {
  checked: boolean;
  onChange: any;

  label?: string;
  className?: string;
  title?: string;
}

/**
 * Simple reusable checkbox component
 */
const CheckBox: React.FC<CheckBoxProps> = (props) => {
  return (
    <div className={`pretty p-svg p-curve ${props.className}`}>
      <input
        type="checkbox"
        checked={props.checked}
        onChange={props.onChange}
        title={props.title || ""}
      />

      <div className="state p-success">
        <svg className="svg svg-icon" viewBox="0 0 20 20">
          <path
            d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"
            style={{ stroke: "white", fill: "white" }}
          ></path>
        </svg>

        {props.label && <label>{props.label}</label>}
      </div>
    </div>
  );
};

export default CheckBox;
