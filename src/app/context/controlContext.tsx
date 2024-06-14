"use client";

import { createContext, useState, Dispatch, SetStateAction } from "react";

type Props = {
  children: React.ReactNode;
};

export type ControlContextType = {
  controlContext: Boolean | undefined;
  setcontrolContext: Dispatch<SetStateAction<Boolean | undefined>>;
};

export const ControlContext = createContext<ControlContextType | null>(null);

export default function ControlContextProvider({ children }: Props) {
  const [controlContext, setcontrolContext] = useState<Boolean>();

  return (
    <ControlContext.Provider value={{ controlContext, setcontrolContext }}>
      {children}
    </ControlContext.Provider>
  );
}
