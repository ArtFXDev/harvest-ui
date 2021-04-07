import React from 'react';

import styles from './DateSelector.module.scss';

import DateUtils from 'utils/date-utils';
import CheckBox from 'components/CheckBox/CheckBox';

interface DateSelectorProps {
  startDate: Date;
  setStartDate: Function;

  endDate: Date;
  setEndDate: Function;

  period?: string;
  setPeriod?: Function;

  includeWE?: boolean;
  setIncludeWE?: Function;
}

const DateSelector: React.FC<DateSelectorProps> = (props) => {
  return (
    <>
      {/* Start date input */}
      <p className={styles.selector}>
        <label htmlFor="start" className={styles.label}>Start date:</label>
        <input type="date" id="start" name="start-date"
          value={props.startDate ? DateUtils.dateToYYYYMMDD(props.startDate) : ''}
          onChange={d => props.setStartDate(d.target.valueAsDate!)}
          required={true}
        />
      </p>

      {/* End date input */}
      <p className={styles.selector}>
        <label htmlFor="end" className={styles.label}>End date:</label>
        <input type="date" id="end" name="end-date"
          value={DateUtils.dateToYYYYMMDD(props.endDate)}
          min={DateUtils.dateToYYYYMMDD(props.startDate)}
          max={DateUtils.dateToYYYYMMDD(new Date())}
          onChange={d => props.setEndDate(d.target.valueAsDate!)}
          required={true}
        />
      </p>

      {/* Time scale input */}
      {props.period && props.setPeriod && (
        <>
          <label htmlFor="period" className={styles.label}>Period: </label>

          {/* Period selector */}
          <select
            name="period"
            id="period-select"
            value={props.period}
            onChange={e => props.setPeriod!(e.target.value)}
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
          onChange={(e: any) => props.setIncludeWE!(e.target.checked)}
          label="Week end"
          title="Include week end data into the average"
        />
      )}
    </>
  );
};

export default DateSelector;
