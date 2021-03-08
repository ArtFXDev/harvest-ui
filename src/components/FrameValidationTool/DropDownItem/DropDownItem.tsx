import React, { useState, useEffect } from 'react';

import styles from "./DropDownItem.module.scss";

interface Props {
  text: string;
  baseUrl: string;
  index: number;
  valid: boolean;
  modified: boolean;
}

const DropDownItem: React.FC<Props> = (props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [modified, setModified] = useState<boolean>(props.modified);
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
      console.log("Open");

      fetchData();
    }
  }, [open]);

  const getStatusClass = (): string => {
    if (modified) return styles.modified;
    else if (props.valid) return styles.valid;
    else return styles.invalid;
  }

  const onValidate = () => {
    setModified(!modified);
  }

  const isValid = (): boolean => {
    return modified !== props.valid;
  }

  return (
    <div className={styles.container}>
      <div className={`${styles.item} ${getStatusClass()}`}>
        <div className={`${styles.arrow} ${open ? styles.open : styles.closed}`}
          onClick={() => setOpen(!open)}
        />

        <p className={styles.text}>{props.text}</p>

        <div className={`pretty p-svg p-curve ${styles.checkbox}`}>
          <input type="checkbox" checked={isValid()} onChange={onValidate} />
          <div className="state p-success">
            <svg className="svg svg-icon" viewBox="0 0 20 20">
              <path d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z" style={{ stroke: "white", fill: "white" }}></path>
            </svg>
            <label>Valid</label>
          </div>
        </div>
      </div>

      <div className={styles.children}>
        {data && open &&
          data.map((e: any) => {
            return <DropDownItem key={`shot-${e.index}`} text={"Shot " + e.index} baseUrl={urlApi} index={e.index} valid={e.valid === e.total} modified={modified} />
          })
        }
      </div>
    </div>
  );
}

export default DropDownItem;
