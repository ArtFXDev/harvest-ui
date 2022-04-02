import { useEffect, useRef } from "react";

/**
 * Generic hook for storing a value
 * // See: https://stackoverflow.com/questions/54095994/react-useeffect-comparing-objects
 */
export function usePrevious<T>(value: T) {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}
