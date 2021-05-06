import React, { useState, useEffect, useReducer } from "react";
import FadeIn from "react-fade-in";

import {
  ItemNode,
  createNodeItem,
  isNodeValid,
} from "../DropDownContainer/DropDownContainer";

import CheckBox from "components/CheckBox/CheckBox";

import styles from "./DropDownItem.module.scss";

interface ItemProps {
  node: ItemNode;
  updateParent?: Function;
  updateChangeCounter: Function;
  index: number;
}

const DropDownItem: React.FC<ItemProps> = (props) => {
  const [node, setNode] = useState<ItemNode>(props.node);
  const [open, setOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  // Hack to force the update of the component
  // TODO: In the future change this
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const fetchData = async () => {
    const nextUrl = `${node.url}/${node.index}`;

    await fetch(nextUrl)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        // Add children to the node
        props.node.children = json
          .sort((a: any, b: any) => (a.index > b.index ? 1 : -1))
          .map((e: any) =>
            createNodeItem(
              e.index,
              nextUrl,
              e.total === e.valid,
              node.depth + 1,
              node.modified,
              node,
              e.total,
              e.valid
            )
          );
      })
      .catch((err) => setError(String(err)));
  };

  // Fetch data when opened
  useEffect(() => {
    const fetchIfNotCached = async () => {
      await fetchData();
      forceUpdate();
    };

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

  /**
   * Return true if one of the children of the node was modified
   */
  const isChildModified = (node: ItemNode): boolean => {
    if (!node.children) return false;

    for (const child of node.children) {
      if (child.modified || isChildModified(child)) return true;
    }

    return false;
  };

  /**
   * Return the number of valid childs recursively
   */
  const getNumberOfValidChilds = (node: ItemNode): number => {
    if (!node.children) return node.totalValid;

    return node.children
      .map((child) => {
        if (isNodeValid(child)) {
          return child.total;
        } else {
          return getNumberOfValidChilds(child);
        }
      })
      .reduce((a: number, b: number) => a + b, 0);
  };

  /**
   * Return CSS class according to state
   */
  const getStatusClass = (): string => {
    if (node.modified || isChildModified(node)) {
      return styles.modified;
    } else if (node.valid) {
      return styles.valid;
    }

    return "";
  };

  /**
   * Return item text
   */
  const getText = (): string => {
    const zeroFill = (n: number, pad: number) => ("0000" + n).slice(-pad);
    const number =
      node.depth <= 1 ? zeroFill(node.index, 3) : zeroFill(node.index, 4);
    return ["s", "p", "frame ", "Layer "][node.depth] + number;
  };

  /**
   * Recursively check nodes from this one
   */
  const recursiveCheck = (node: ItemNode, targetState: boolean) => {
    if (isNodeValid(node) !== targetState) {
      node.modified = !node.modified;
    }

    if (node.children) {
      node.children.forEach((child) => recursiveCheck(child, targetState));
    }
  };

  /**
   * TODO: again we should not do this
   */
  const updateParent = () => {
    if (!node.parent || !node.parent.children) return;

    const nValid = node.parent.children
      .map((n) => isNodeValid(n))
      .filter((x) => x === true).length;

    if ((nValid === node.parent.children.length) !== isNodeValid(node.parent)) {
      node.parent.modified = !node.parent.modified;
    }

    // Recursively update parents
    if (props.updateParent) props.updateParent();
  };

  /**
   * Called when item is checked by the user
   * check the subtree, update parent and notify change
   */
  const onChecked = () => {
    const targetState = !node.modified !== node.valid;
    recursiveCheck(node, targetState);

    updateParent();

    forceUpdate();
    props.updateChangeCounter();
  };

  const onDropDownClicked = () => {
    setOpen(!open);
  };

  /**
   * Parse and check items according to expression
   */
  const onSubmitExpression = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // If the key pressed is not enter, do nothing
    if (e.code !== "Enter" && e.code !== "NumpadEnter") return;

    // Get the expression
    const expression = e.currentTarget.value;

    // Initialize the list of child to toogle
    const childList: Array<number> = [];

    const splits = expression.split(",", 10);

    for (let split of splits) {
      // Initialise the step, start, end
      let step = 1;
      let start = 0;
      let end = 0;

      // If the expression is a range
      if (split.indexOf("-") > -1) {
        // If the expression specifies a step
        if (split.indexOf("x") > -1) {
          step = +split.split("x")[1] > 0 ? +split.split("x")[1] : 1;
          split = split.split("x")[0];
        }

        start = +split.split("-")[0];
        end = +split.split("-")[1];
      }
      // If the expression is just a single index
      else {
        start = end = +split;
      }

      // Gather all the matching frames
      for (let i = start; i <= end; i += step) {
        childList.push(i);
      }
    }

    // If the user checked all the children, validate the entire subtree
    if (node.children && childList.length >= node.children.length) {
      recursiveCheck(node, true);
    } else {
      // Toogle all the children that are set in the childList
      node.children?.forEach((child) => {
        if (childList.includes(child.index)) {
          child.modified = !child.modified;
        }
      });
    }

    // Update the children to see the modifications
    forceUpdate();
    if (props.updateParent) props.updateParent();
  };

  // Compute useful info at render time for styling
  const currentlyValid = getNumberOfValidChilds(node);
  const validPercent: number = isNodeValid(node)
    ? 100
    : Math.floor((currentlyValid / node.total) * 100);

  const statusClass = getStatusClass();

  return (
    <div className={`${styles.container} ${styles["item-depth" + node.depth]}`}>
      {/* Item */}
      <div
        className={`${styles.item}`}
        title={`${validPercent}% valid ${
          statusClass === styles.modified ? "(modified)" : ""
        }`}
      >
        {/* Progress bar with CSS animation */}
        <div
          className={styles.progressBarContainer}
          style={{ width: `${validPercent}%` }}
        >
          <div
            className={`${styles.progressBar} ${statusClass}`}
            style={{ animationDelay: `${props.index * 100}ms` }}
          />
        </div>

        {/* Arrow */}
        <div
          className={`${styles.arrow} ${open ? styles.open : styles.closed}`}
          onClick={onDropDownClicked}
        />

        {/* Text */}
        <p className={styles.text}>{getText()}</p>

        {/* Expression text input */}
        {open && (
          <input
            className={`${styles.expression}`}
            type="text"
            onKeyDown={onSubmitExpression}
          />
        )}

        {/* Conditional error message */}
        {error && <p className={`${styles.text} ${styles.error}`}>{error}</p>}

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
        <FadeIn transitionDuration={1000} delay={20}>
          {node.children &&
            open &&
            node.children.map((child: ItemNode, index: number) => (
              <DropDownItem
                key={`node-${child.depth}-${child.index}`}
                node={child}
                updateParent={() => {
                  forceUpdate();
                  if (props.updateParent) updateParent();
                }}
                updateChangeCounter={props.updateChangeCounter}
                index={index}
              />
            ))}
        </FadeIn>
      </div>
    </div>
  );
};

export default DropDownItem;
