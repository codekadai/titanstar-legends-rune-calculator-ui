import styles from "./PathMarker.module.scss";
import type { RuneMarkerProps } from "./PathMarket.types";

export const PathMarker = (props: RuneMarkerProps) => {
  const { rune } = props;
  return (
    <span
      className={`${styles.pathMarker} ${
        rune.isActive && styles.activePathMarker
      }`}
    ></span>
  );
};
