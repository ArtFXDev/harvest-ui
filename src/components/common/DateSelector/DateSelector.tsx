import CheckBox from "components/common/CheckBox/CheckBox";
import * as DateUtils from "utils/date";

import styles from "./DateSelector.module.scss";

interface DateSelectorProps {
  startDate: Date;
  setStartDate: (date: Date) => void;

  endDate: Date;
  setEndDate: (date: Date) => void;

  period?: string;
  setPeriod?: (period: string) => void;

  includeWE?: boolean;
  setIncludeWE?: (includeWE: boolean) => void;
}

const DateSelector = (props: DateSelectorProps): JSX.Element => {
  return (
    <>
      {/* Start date input */}
      <p className={styles.selector}>
        <label htmlFor="start" className={styles.label}>
          Start date:
        </label>
        <input
          type="date"
          id="start"
          name="start-date"
          value={
            props.startDate ? DateUtils.dateToYYYYMMDD(props.startDate) : ""
          }
          onChange={(d) => {
            if (d.target.valueAsDate) {
              props.setStartDate(d.target.valueAsDate);
            }
          }}
          required={true}
        />
      </p>

      {/* End date input */}
      <p className={styles.selector}>
        <label htmlFor="end" className={styles.label}>
          End date:
        </label>
        <input
          type="date"
          id="end"
          name="end-date"
          value={DateUtils.dateToYYYYMMDD(props.endDate)}
          min={DateUtils.dateToYYYYMMDD(props.startDate)}
          max={DateUtils.dateToYYYYMMDD(new Date())}
          onChange={(d) => {
            if (d.target.valueAsDate) {
              props.setEndDate(d.target.valueAsDate);
            }
          }}
          required={true}
        />
      </p>

      {/* Time scale input */}
      {props.period && props.setPeriod && (
        <>
          <label htmlFor="period" className={styles.label}>
            Period:{" "}
          </label>

          {/* Period selector */}
          <select
            name="period"
            id="period-select"
            value={props.period}
            onChange={(e) => {
              if (props.setPeriod) {
                props.setPeriod(e.target.value);
              }
            }}
            className={styles.selector}
          >
            <option value="hours">day</option>
            <option value="days">week</option>
          </select>
        </>
      )}

      {props.includeWE !== undefined && props.setIncludeWE && (
        <CheckBox
          checked={props.includeWE}
          onChange={(e) => {
            if (props.setIncludeWE) {
              props.setIncludeWE(e.target.checked);
            }
          }}
          label="Week end"
          title="Include week end data into the average"
        />
      )}
    </>
  );
};

export default DateSelector;
