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
  focusIndex: Record<string, number>;
  hoverIndex: Record<string, number>;
  setCurrentSpentPoints: React.Dispatch<React.SetStateAction<number>>;
  setCurrentPaths: React.Dispatch<React.SetStateAction<PathType[]>>;
  setTalentPoints: React.Dispatch<React.SetStateAction<number>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setFocusIndex: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  setHoverIndex: React.Dispatch<React.SetStateAction<Record<string, number>>>;
}

const defaultContextValue: AppContextType = {
  currentSpentPoints: 0,
  currentPaths: [],
  talentPoints: 0,
  isLoading: false,
  focusIndex: { index: -1, pathIndex: -1 },
  hoverIndex: { index: -1, pathIndex: -1 },
  /* v8 ignore next */
  setCurrentSpentPoints: () => {},
  /* v8 ignore next */
  setCurrentPaths: () => {},
  /* v8 ignore next */
  setTalentPoints: () => {},
  /* v8 ignore next */
  setIsLoading: () => {},
  /* v8 ignore next */
  setFocusIndex: () => {},
  /* v8 ignore next */
  setHoverIndex: () => {},
};

const AppContext = createContext<AppContextType>(defaultContextValue);

export const AppProvider: FC<AppContextProviderProps> = ({ children }) => {
  const [currentSpentPoints, setCurrentSpentPoints] = useState<number>(0);
  const [currentPaths, setCurrentPaths] = useState<PathType[]>([]);
  const [talentPoints, setTalentPoints] = useState<number>(0);
  const [focusIndex, setFocusIndex] = useState<Record<string, number>>({
    index: -1,
    pathIndex: -1,
  });
  const [hoverIndex, setHoverIndex] = useState<Record<string, number>>({
    index: -1,
    pathIndex: -1,
  });
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
      focusIndex,
      hoverIndex,
      setCurrentSpentPoints,
      setCurrentPaths,
      setTalentPoints,
      setIsLoading,
      setFocusIndex,
      setHoverIndex,
    }),
    [
      currentSpentPoints,
      currentPaths,
      talentPoints,
      isLoading,
      focusIndex,
      hoverIndex,
    ]
  );

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
