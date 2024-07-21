"use client";

import { getPaths, getPlayers } from "@/api";
import { PathType } from "@/components/Path/Path.types";
import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export interface AppContextProviderProps {
  children: React.ReactNode;
}

interface AppContextType {
  currentSpentPoints: number;
  currentPaths: PathType[];
  talentPoints: number;
  isLoading: boolean;
  setCurrentSpentPoints: React.Dispatch<React.SetStateAction<number>>;
  setCurrentPaths: React.Dispatch<React.SetStateAction<PathType[]>>;
  setTalentPoints: React.Dispatch<React.SetStateAction<number>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultContextValue: AppContextType = {
  currentSpentPoints: 0,
  currentPaths: [],
  talentPoints: 0,
  isLoading: false,
  /* v8 ignore next */
  setCurrentSpentPoints: () => {},
  /* v8 ignore next */
  setCurrentPaths: () => {},
  /* v8 ignore next */
  setTalentPoints: () => {},
  /* v8 ignore next */
  setIsLoading: () => {},
};

const AppContext = createContext<AppContextType>(defaultContextValue);

export const AppProvider: FC<AppContextProviderProps> = ({ children }) => {
  const [currentSpentPoints, setCurrentSpentPoints] = useState<number>(0);
  const [currentPaths, setCurrentPaths] = useState<PathType[]>([]);
  const [talentPoints, setTalentPoints] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPaths = async () => {
      try {
        const paths = await getPaths();
        setCurrentPaths(paths);
      } catch (error) {
        console.error("getPaths at AppContext: ", error);
        return [];
      } finally {
        setIsLoading(false);
      }
    };
    const fetchPlayer = async () => {
      try {
        const players = await getPlayers();
        setTalentPoints(players[0].talentPoints);
      } catch (error) {
        console.error("getPlayers at AppContext: ", error);
        return [];
      } finally {
        setIsLoading(false);
      }
    };
    fetchPaths();
    fetchPlayer();
  }, []);

  const contextValue = useMemo(
    () => ({
      currentSpentPoints,
      currentPaths,
      talentPoints,
      isLoading,
      setCurrentSpentPoints,
      setCurrentPaths,
      setTalentPoints,
      setIsLoading,
    }),
    [currentSpentPoints, currentPaths, talentPoints, isLoading]
  );

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
