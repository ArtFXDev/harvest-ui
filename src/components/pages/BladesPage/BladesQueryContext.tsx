import { useFetchData } from "hooks/fetch";
import React, { useContext } from "react";
import { Blade } from "types/tractor";

export interface BladeContext {
  blades?: { [hnm: string]: Blade };
}

export const BladesQueryContext = React.createContext<BladeContext>(
  {} as BladeContext
);

interface ProvideBladeProps {
  children: JSX.Element;
}

/**
 * The ProvideAction provides the current action context and handle action updates
 */
export const ProvideBladesQuery = ({
  children,
}: ProvideBladeProps): JSX.Element => {
  const data = useFetchData("info/blades", { interval: 10000 });
  const bladesDict: BladeContext["blades"] = {};

  if (data) {
    for (const blade of data.blades) {
      bladesDict[blade.hnm] = blade;
    }
  }

  return (
    <BladesQueryContext.Provider
      value={{
        blades: bladesDict,
      }}
    >
      {children}
    </BladesQueryContext.Provider>
  );
};

export const useBladesQuery = (): BladeContext =>
  useContext(BladesQueryContext);
