import React, { useState, useEffect, useReducer } from 'react';

import { ItemNode, createNodeItem, isNodeValid } from '../DropDownContainer/DropDownContainer';

import CheckBox from 'components/CheckBox/CheckBox';

import styles from './DropDownItem.module.scss';

interface Props {
  node: ItemNode;
  updateParent?: Function;
  updateChangeCounter: Function;
}

const DropDownItem: React.FC<Props> = (props) => {
  const [node, setNode] = useState<ItemNode>(props.node);
  const [open, setOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  // Hack to force the update of the component
  // TODO: In the future change this
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
    if (e.code !== "Enter" && e.code !== "NumpadEnter") { return; }

    // Get the expression
    const expression = e.currentTarget.value;

    // Initialize the list of child to toogle
    const childList: number[] = [];

    const splits = expression.split(",", 10)
    for (let split of splits) {
      // Initialise the step, start, end
      let step = 1;
      let start = 0;
      let end = 0;
      // If the expression is a range
      if (split.indexOf("-") > -1) {
        // If the expression specifies a step
        if (split.indexOf("x") > -1) {
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
      for (let i = start; i <= end; i += step) {
        childList.push(i)
      }
    }

    // Toogle all the children that are set in the childList
    node.children?.forEach((child) => {
      if (childList.includes(child.index)) {
        child.modified = !child.modified;
      }
    })

    // Update the children to see the modifications
    forceUpdate();
  }

  return (
    <div className={`${styles.container} ${styles["item-depth" + node.depth]}`}>

      {/* Item */}
      <div className={`${styles.item} ${getStatusClass()} `}>

        {/* Arrow */}
        <div className={`${styles.arrow} ${open ? styles.open : styles.closed}`}
          onClick={onDropDownClicked}
        />

        {/* Text */}
        <p className={styles.text}>{getText()}</p>

        {/* Expression text input */}
        {open &&
          <input className={`${styles.expression}`} type="text" onKeyDown={onSubmitExpression} />
        }

        {/* Conditional error message */}
        {error &&
          <p className={`${styles.text} ${styles.error}`}>{error}</p>
        }

        {/* Checkbox */}
        <CheckBox
          checked={isNodeValid(node)}
          onChange={onChecked}
          className={styles.checkbox}
          label="Valid"
        />
      </div>

      {/* Display children */}
      <div className={styles.children}>
        {node.children && open &&
          node.children.map((child: ItemNode) => {
            return (
              <DropDownItem
                key={`node-${child.depth}-${child.index}`}
                node={child}
                updateParent={forceUpdate}
                updateChangeCounter={props.updateChangeCounter}
              />
            )
          })
        }
      </div>

    </div>
  );
};

export default DropDownItem;
