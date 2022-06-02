/* eslint-disable @typescript-eslint/no-explicit-any */
import { EffectCallback, useEffect, useRef } from "react";
import { singleDepthEqual } from "utils/diff";

function useDeepCompareMemoize(value: Record<string, unknown> | undefined) {
  const ref = useRef<unknown>();

  if (ref.current && !singleDepthEqual(value as any, ref.current as any)) {
    ref.current = value;
  }

  return ref.current;
}

// Make sure previous params are not equal
// It was creating an infinite loop since comparing an object was triggering useEffect every time
// See: https://stackoverflow.com/questions/54095994/react-useeffect-comparing-objects
export function useDeepCompareEffect(
  callback: EffectCallback,
  dependencies: unknown[]
) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(callback, dependencies.map(useDeepCompareMemoize as any));
}
