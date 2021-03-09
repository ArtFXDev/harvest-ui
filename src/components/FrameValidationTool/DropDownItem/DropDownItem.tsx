import React, { useState, useEffect } from 'react';

import styles from "./DropDownItem.module.scss";

interface Props {
  depth: number; // The depth in the item hierarchy
  baseUrl: string;
  index: number;
  valid: boolean;
  isModified: boolean;
}

const DropDownItem: React.FC<Props> = (props) => {
  const [open, setOpen] = useState<boolean>(false);

  const [modified, setModified] = useState<boolean>(props.isModified);
  const [data, setData] = useState([]);

  const urlApi = `${props.baseUrl}/${props.index}`;

  const fetchData = async () => {
    await fetch(urlApi).then((response) => {
      return response.json();
    }).then((json) => setData(json.sort((a: any, b: any) => a.index > b.index ? 1 : -1)))
      .catch((error) => console.log(error));
  }

  // Fetch data when opened
  useEffect(() => {
    if (open && data.length === 0) {

      fetchData();
    }
  }, [open]);

  // Update when modified
  useEffect(() => {
    setModified(props.isModified);
  }, [props.isModified]);

  // Return CSS class according to state
  const getStatusClass = (): string => {
    if (modified) {
      return styles.modified;
    } else if (props.valid) {
      return styles.valid;
    }

    return "";
  }

  // Return true if valid (xor)
  const isValid = (): boolean => {
    return modified !== props.valid;
  }

  const getText = (): string => {
    return ["SQ", "Shot ", "Frame ", "Layer "][props.depth] + props.index;
  }

  const onChecked = () => {
    setModified(!modified);
  }

  const onDropDownClicked = () => {
    // Don't use dropdown on frames now
    if (props.depth < 2) {
      setOpen(!open);
    }
  }

  return (
    <div className={styles.container}>

      {/* Item */}
      <div className={`${styles.item} ${getStatusClass()} ${styles["item-depth" + props.depth]}`}>
        {/* Arrow */}
        <div className={`${styles.arrow} ${open ? styles.open : styles.closed}`}
          onClick={onDropDownClicked}
        />

        {/* Text */}
        <p className={styles.text}>{getText()}</p>

        {/* Checkbox */}
        <div className={`pretty p-svg p-curve ${styles.checkbox}`}>
          <input type="checkbox" checked={isValid()} onChange={onChecked} />
          <div className="state p-success">
            <svg className="svg svg-icon" viewBox="0 0 20 20">
              <path d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z" style={{ stroke: "white", fill: "white" }}></path>
            </svg>
            <label>Valid</label>
          </div>
        </div>
      </div>

      {/* Display children */}
      <div className={styles.children}>
        {data && open &&
          data.map((e: any) => {
            const isElementValid: boolean = e.valid === e.total;

            return <DropDownItem
              key={`${getText()}-${e.index}`}
              baseUrl={urlApi}
              index={e.index}
              valid={isElementValid}
              isModified={modified && !isElementValid}
              depth={props.depth + 1}
            />
          })
        }
      </div>

    </div>
  );
}

export default DropDownItem;
