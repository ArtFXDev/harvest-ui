import React, { useState, useEffect, useReducer } from 'react';

import { ItemNode, createNodeItem, isNodeValid } from "../DropDownContainer/DropDownContainer";

import styles from "./DropDownItem.module.scss";

interface Props {
  node: ItemNode;
  updateParent?: Function;
  updateChangeCounter: Function;
}

const DropDownItem: React.FC<Props> = (props) => {
  const [node, setNode] = useState<ItemNode>(props.node);
  const [open, setOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const [, forceUpdate] = useReducer(x => x + 1, 0);

  const fetchData = async () => {
    const nextUrl = `${node.url}/${node.index}`

    await fetch(nextUrl).then((response) => {
      return response.json();
    }).then((json) => {

      // Add children to the node
      props.node.children = json.sort((a: any, b: any) => a.index > b.index ? 1 : -1)
        .map((e: any) => createNodeItem(e.index, nextUrl, e.total === e.valid, node.depth + 1, node.modified, node));

    }).catch((err) => setError(String(err)));
  }

  // Fetch data when opened
  useEffect(() => {
    const fetchIfNotCached = async () => {
      await fetchData();
      forceUpdate();
    }

    if (open && !node.children) {
      fetchIfNotCached();
    }

    if (!open) {
      setError(undefined);
    }
  }, [open]);

  // Update node when props updated
  useEffect(() => {
    setNode(props.node);
  }, [props.node]);

  // Force update when state modified
  useEffect(() => {
    forceUpdate();
  }, [props.node.modified]);

  // Return CSS class according to state
  const getStatusClass = (): string => {
    if (node.modified) {
      return styles.modified;
    } else if (node.valid) {
      return styles.valid;
    }

    return "";
  }

  const getText = (): string => {
    const zeroFill = (n: number, pad: number) => ('0000' + n).slice(-pad);
    const number = (node.depth <= 1) ? zeroFill(node.index, 3) : zeroFill(node.index, 4);
    return ["s", "p", "frame ", "Layer "][node.depth] + number;
  }

  const recursiveCheck = (node: ItemNode, targetState: boolean) => {
    if (isNodeValid(node) !== targetState) {
      node.modified = !node.modified;
    }

    if (node.children) {
      node.children.forEach(child => recursiveCheck(child, targetState));
    }
  }

  const updateParent = () => {
    if (!node.parent || !node.parent.children) return;

    const nValid = node.parent.children.map(n => isNodeValid(n)).filter(x => x === true).length;

    if ((nValid === node.parent.children.length) !== isNodeValid(node.parent)) {
      node.parent.modified = !node.parent.modified;
      if (props.updateParent) props.updateParent();
    }
  }

  const onChecked = () => {
    const targetState = !node.modified !== node.valid;
    recursiveCheck(node, targetState);

    if (node.parent) updateParent();

    forceUpdate();
    props.updateChangeCounter();
  }

  const onDropDownClicked = () => {
    setOpen(!open);
  }

  // Callback when enter is pressed on the expression
  const onSubmitExpression = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // If the key pressed is not enter, do nothing
    if(e.code != "Enter" && e.code != "NumpadEnter") { return; }

    // Get the expression
    const expression = e.currentTarget.value;
    
    // Initialize the list of child to toogle
    const childList: number[] = [];

    const splits = expression.split(",", 10)
    for(let split of splits) {
        // Initialise the step, start, end
        let step = 1;
        let start = 0;
        let end = 0;
        // If the expression is a range
        if(split.indexOf("-") > -1) {
            // If the expression specifies a step
            if(split.indexOf("x") > -1) {
                step = (+split.split("x")[1] > 0) ? +split.split("x")[1] : 1;
                split = split.split("x")[0]
            }
            start = +split.split("-")[0]
            end = +split.split("-")[1]
        }
        // If the expression is just a single index
        else {
            start = end = +split
        }
        // Gather all the matching frames
        for(let i = start; i <= end; i += step) {
            childList.push(i)
        }
    }

    // Toogle all the children that are set in the childList
    node.children?.map((child) => { 
        if(childList.includes(child.index)) {
            child.modified = !child.modified; 
        }
    })
    // Update the children to see the modifications
    forceUpdate();
  }

  return (
    <div className={styles.container}>

      {/* Item */}
      <div className={`${styles.item} ${getStatusClass()} ${styles["item-depth" + node.depth]}`}>

        {/* Arrow */}
        <div className={`${styles.arrow} ${open ? styles.open : styles.closed}`}
          onClick={onDropDownClicked}
        />

        {/* Text */}
        <p className={styles.text}>{getText()}</p>

        {open &&
            <input type="text" onKeyDown={onSubmitExpression}/>
        }
        
        {error &&
          <p className={`${styles.text} ${styles.error}`}>{error}</p>
        }

        {/* Checkbox */}
        <div className={`pretty p-svg p-curve ${styles.checkbox}`}>
          <input type="checkbox" checked={isNodeValid(node)} onChange={onChecked} />
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
        {node.children && open &&
          node.children.map((child: ItemNode) => {
            return <DropDownItem key={`node-${child.depth}-${child.index}`} node={child} updateParent={forceUpdate} updateChangeCounter={props.updateChangeCounter} />
          })
        }
      </div>

    </div>
  );
}

export default DropDownItem;
