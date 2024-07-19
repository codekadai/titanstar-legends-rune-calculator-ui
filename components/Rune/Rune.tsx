"use client";

import styles from "./Rune.module.scss";
import type { RuneType } from "./Rune.types";
import type { PathType } from "../Path/Path.types";
import { useHandleEvents } from "@/hooks";
import { PathMarker } from "../PathMarker";

type RuneProps = {
  index: number;
  pathIndex: number;
  rune: RuneType;
  path: PathType;
};

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
      <div className={`${styles.runeBorder} ${rune.isActive && styles.active}`}>
        <div
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
        ></div>
      </div>
      {index + 1 !== path.length && <PathMarker rune={rune} />}
    </div>
  );
};
