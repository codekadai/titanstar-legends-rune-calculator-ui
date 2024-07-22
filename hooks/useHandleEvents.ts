import { useAppContext } from "@/context";
import { useCallback, useState } from "react";

export const useHandleEvents = () => {
  const {
    currentSpentPoints,
    talentPoints,
    currentPaths,
    focusIndex,
    hoverIndex,
    setCurrentSpentPoints,
    setCurrentPaths,
    setFocusIndex,
    setHoverIndex,
  } = useAppContext();

  const [tapEndTriggered, setTapEndTriggered] = useState<boolean>(false);
  const [enterDownTriggered, setEnterDownTriggered] = useState<boolean>(false);

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
      if (currentSpentPoints < talentPoints && canActivate(index, pathIndex)) {
        const newPaths = [...currentPaths];
        const newUsedPoints = currentSpentPoints + 1;
        newPaths[pathIndex][index].isActive = true;
        setCurrentPaths(newPaths);
        setCurrentSpentPoints(newUsedPoints);
        setHoverIndex({ index, pathIndex });
      }
    },
    [
      canActivate,
      currentPaths,
      currentSpentPoints,
      setCurrentPaths,
      setCurrentSpentPoints,
      setHoverIndex,
      talentPoints,
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
        setCurrentPaths(newPaths);
        setCurrentSpentPoints(newUsedPoints);
        setHoverIndex({ index: -1, pathIndex: -1 });
      }
    },
    [
      currentPaths,
      currentSpentPoints,
      setCurrentPaths,
      setCurrentSpentPoints,
      setHoverIndex,
    ]
  );

  const handleFocus = useCallback(
    (index: number, pathIndex: number, event: React.FocusEvent) => {
      if (tapEndTriggered || enterDownTriggered) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      setFocusIndex({ index, pathIndex });
    },
    [enterDownTriggered, setFocusIndex, tapEndTriggered]
  );

  const handleLeftClick = useCallback(
    (index: number, pathIndex: number, event: React.MouseEvent) => {
      if (tapEndTriggered || enterDownTriggered) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      !currentPaths[pathIndex][index].isActive &&
        activateRune(index, pathIndex);
    },
    [activateRune, currentPaths, enterDownTriggered, tapEndTriggered]
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
      setHoverIndex({ index, pathIndex });
    },
    [setHoverIndex, tapEndTriggered]
  );

  const handleMouseOut = useCallback(
    (event: React.MouseEvent) => {
      if (tapEndTriggered) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      setHoverIndex({ index: -1, pathIndex: -1 });
    },
    [setHoverIndex, tapEndTriggered]
  );

  const handleMouseDown = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
  }, []);

  const handleTap = useCallback(
    (index: number, pathIndex: number) => {
      setTapEndTriggered(true);
      !currentPaths[pathIndex][index].isActive
        ? activateRune(index, pathIndex)
        : deactivateRune(index, pathIndex);
    },
    [activateRune, currentPaths, deactivateRune]
  );

  const handleEnter = useCallback(
    (index: number, pathIndex: number, event: React.KeyboardEvent) => {
      if (event.key === "Enter") {
        setEnterDownTriggered(true);
        !currentPaths[pathIndex][index].isActive
          ? activateRune(index, pathIndex)
          : deactivateRune(index, pathIndex);
      }
    },
    [activateRune, currentPaths, deactivateRune]
  );

  return {
    currentSpentPoints,
    currentPaths,
    talentPoints,
    focusIndex,
    hoverIndex,
    handleLeftClick,
    handleRightClick,
    handleMouseOver,
    handleMouseOut,
    handleMouseDown,
    handleTap,
    handleEnter,
    handleFocus,
    canActivate,
  };
};
