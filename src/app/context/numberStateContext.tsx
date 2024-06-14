"use client";

import { createContext, useState, Dispatch, SetStateAction } from "react";

type Props = {
  children: React.ReactNode;
};

export type NumberStateContextType = {
  numberStateContext: NumberState | undefined;
  setNumberStateContext: Dispatch<SetStateAction<NumberState | undefined>>;
};

export const NumberStateContext = createContext<NumberStateContextType | null>(
  null
);

export default function NumberStateContextProvider({ children }: Props) {
  const [numberStateContext, setNumberStateContext] = useState<NumberState>();

  return (
    <NumberStateContext.Provider
      value={{ numberStateContext, setNumberStateContext }}
    >
      {children}
    </NumberStateContext.Provider>
  );
}
