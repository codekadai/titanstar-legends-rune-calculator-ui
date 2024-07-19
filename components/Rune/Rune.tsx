"use client";

import styles from "./Rune.module.scss";
import type { RuneProps } from "./Rune.types";
import { useHandleEvents } from "@/hooks";
import { RuneMarker } from "../RuneMarker";

export const Rune = (props: RuneProps) => {
  const { index, pathIndex, rune, path } = props;

  const {
    handleLeftClick,
    handleRightClick,
    handleMouseOver,
    handleMouseOut,
    handleTap,
  } = useHandleEvents();

  return (
    <div key={index} className={styles.runeWrapper}>
      <div
        data-testid={"rune"}
        className={`${styles.runeBorder} ${rune.isActive && styles.active}`}
      >
        <button
          name={rune.name}
          className={`${styles.rune} ${rune.isActive && styles.active}`}
          onClick={(event) => handleLeftClick(index, pathIndex, event)}
          onContextMenu={(event) => handleRightClick(index, pathIndex, event)}
          onTouchEnd={() => handleTap(index, pathIndex)}
          onMouseOver={(event) => handleMouseOver(index, pathIndex, event)}
          onMouseOut={(event) => handleMouseOut(index, pathIndex, event)}
          style={{
            backgroundPosition: `${
              rune.isHovered || rune.isActive
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
