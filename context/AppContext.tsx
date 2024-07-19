import { PathType } from "@/components/Path/Path.types";
import { paths } from "@/constants";
import React, { createContext, FC, useContext, useMemo, useState } from "react";

export interface AppContextProviderProps {
  children: React.ReactNode;
}

interface AppContextType {
  currentSpentPoints: number;
  currentPaths: PathType[];
  setCurrentSpentPoints: React.Dispatch<React.SetStateAction<number>>;
  setCurrentPaths: React.Dispatch<React.SetStateAction<PathType[]>>;
}

const defaultContextValue: AppContextType = {
  currentSpentPoints: 0,
  currentPaths: paths,
  setCurrentSpentPoints: () => {},
  setCurrentPaths: () => {},
};

const AppContext = createContext<AppContextType>(defaultContextValue);

export const AppProvider: FC<AppContextProviderProps> = ({ children }) => {
  const [currentSpentPoints, setCurrentSpentPoints] = useState<number>(0);
  const [currentPaths, setCurrentPaths] = useState<PathType[]>(paths);

  const contextValue = useMemo(
    () => ({
      currentSpentPoints,
      currentPaths,
      setCurrentSpentPoints,
      setCurrentPaths,
    }),
    [currentSpentPoints, currentPaths]
  );

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
