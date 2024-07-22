"use client";

import styles from "./Rune.module.scss";
import type { RuneProps } from "./Rune.types";
import { useHandleEvents } from "@/hooks";
import { RuneMarker } from "../RuneMarker";
import { useMemo } from "react";

export const Rune = (props: RuneProps) => {
  const { index, pathIndex, rune, path } = props;

  const {
    focusIndex,
    hoverIndex,
    currentSpentPoints,
    talentPoints,
    handleLeftClick,
    handleRightClick,
    handleFocus,
    handleMouseOver,
    handleMouseOut,
    handleMouseDown,
    handleTap,
    handleEnter,
    canActivate,
  } = useHandleEvents();

  const isDisabled = useMemo(() => {
    return !(
      currentSpentPoints < talentPoints && canActivate(index, pathIndex)
    );
  }, [canActivate, currentSpentPoints, index, pathIndex, talentPoints]);

  const isFocused = useMemo(() => {
    return focusIndex.index === index && focusIndex.pathIndex === pathIndex;
  }, [focusIndex.index, focusIndex.pathIndex, index, pathIndex]);

  const isHovered = useMemo(() => {
    return (
      !isDisabled &&
      hoverIndex.index === index &&
      hoverIndex.pathIndex === pathIndex
    );
  }, [hoverIndex.index, hoverIndex.pathIndex, index, isDisabled, pathIndex]);

  return (
    <div key={index} className={styles.runeWrapper}>
      <div
        data-testid={"rune"}
        className={`${styles.runeBorder} ${rune.isActive && styles.active}`}
      >
        <button
          name={rune.name}
          aria-label={rune.name}
          disabled={isDisabled}
          onBlur={(event) => handleFocus(-1, -1, event)}
          onFocus={(event) => handleFocus(index, pathIndex, event)}
          className={`${styles.rune} ${rune.isActive && styles.active}`}
          onClick={(event) => handleLeftClick(index, pathIndex, event)}
          onContextMenu={(event) => handleRightClick(index, pathIndex, event)}
          onTouchEnd={() => handleTap(index, pathIndex)}
          onKeyDown={(event) => handleEnter(index, pathIndex, event)}
          onMouseDown={(event) => handleMouseDown(event)}
          onMouseOver={(event) => handleMouseOver(index, pathIndex, event)}
          onMouseOut={(event) => handleMouseOut(event)}
          style={{
            backgroundPosition: `${
              isHovered || rune.isActive || isFocused
                ? `-${pathIndex * 200 + index * 50}px 0`
                : `-${pathIndex * 200 + index * 50}px 50px`
            }`,
          }}
        />
      </div>
      {index + 1 !== path.length && <RuneMarker rune={rune} />}
    </div>
  );
};
