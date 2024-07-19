import { MAX_POINTS } from "@/constants";
import { useAppContext } from "@/context";
import { useCallback, useState } from "react";

export const useHandleEvents = () => {
  const {
    currentSpentPoints,
    currentPaths,
    setCurrentSpentPoints,
    setCurrentPaths,
  } = useAppContext();

  const [tapEndTriggered, setTapEndTriggered] = useState<boolean>(false);

  const canActivate = useCallback(
    (index: number, pathIndex: number): boolean => {
      const path = currentPaths[pathIndex];
      const rune = path[index];
      return (
        !rune.isActive &&
        (rune.dependencies.length === 0 ||
          currentPaths[pathIndex][index - 1].isActive)
      );
    },
    [currentPaths]
  );

  const activateRune = useCallback(
    (index: number, pathIndex: number) => {
      if (currentSpentPoints < MAX_POINTS && canActivate(index, pathIndex)) {
        const newPaths = [...currentPaths];
        const newUsedPoints = currentSpentPoints + 1;
        newPaths[pathIndex][index].isActive = true;
        newPaths[pathIndex][index].isHovered =
          !currentPaths[pathIndex][index].isHovered;
        setCurrentPaths(newPaths);
        setCurrentSpentPoints(newUsedPoints);
      }
    },
    [
      canActivate,
      currentPaths,
      currentSpentPoints,
      setCurrentPaths,
      setCurrentSpentPoints,
    ]
  );

  const deactivateRune = useCallback(
    (index: number, pathIndex: number) => {
      if (
        index === currentPaths[pathIndex].length - 1 ||
        !currentPaths[pathIndex][index + 1].isActive
      ) {
        const newPaths = [...currentPaths];
        const newUsedPoints = currentSpentPoints - 1;
        newPaths[pathIndex][index].isActive = false;
        newPaths[pathIndex][index].isHovered =
          !currentPaths[pathIndex][index].isHovered;
        setCurrentPaths(newPaths);
        setCurrentSpentPoints(newUsedPoints);
      }
    },
    [currentPaths, currentSpentPoints, setCurrentPaths, setCurrentSpentPoints]
  );

  const handleHover = useCallback(
    (index: number, pathIndex: number) => {
      const newPaths = [...currentPaths];
      const newUsedPoints = currentSpentPoints;
      newPaths[pathIndex][index].isHovered =
        !currentPaths[pathIndex][index].isHovered;
      setCurrentPaths(newPaths);
      setCurrentSpentPoints(newUsedPoints);
    },
    [currentPaths, currentSpentPoints, setCurrentPaths, setCurrentSpentPoints]
  );

  const handleLeftClick = useCallback(
    (index: number, pathIndex: number, event: React.MouseEvent) => {
      if (tapEndTriggered) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      !currentPaths[pathIndex][index].isActive &&
        activateRune(index, pathIndex);
    },
    [activateRune, currentPaths, tapEndTriggered]
  );

  const handleRightClick = useCallback(
    (index: number, pathIndex: number, event: React.MouseEvent) => {
      event.preventDefault();
      currentPaths[pathIndex][index].isActive &&
        deactivateRune(index, pathIndex);
    },
    [currentPaths, deactivateRune]
  );

  const handleMouseOver = useCallback(
    (index: number, pathIndex: number, event: React.MouseEvent) => {
      if (tapEndTriggered) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      handleHover(index, pathIndex);
    },
    [handleHover, tapEndTriggered]
  );

  const handleMouseOut = useCallback(
    (index: number, pathIndex: number, event: React.MouseEvent) => {
      if (tapEndTriggered) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      handleHover(index, pathIndex);
    },
    [handleHover, tapEndTriggered]
  );

  const handleTap = useCallback(
    (index: number, pathIndex: number) => {
      setTapEndTriggered(true);
      !currentPaths[pathIndex][index].isActive
        ? activateRune(index, pathIndex)
        : deactivateRune(index, pathIndex);
    },
    [activateRune, currentPaths, deactivateRune]
  );

  return {
    currentSpentPoints,
    currentPaths,
    handleLeftClick,
    handleRightClick,
    handleMouseOver,
    handleMouseOut,
    handleTap,
  };
};
