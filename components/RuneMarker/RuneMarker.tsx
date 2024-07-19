import styles from "./RuneMarker.module.scss";
import type { RuneMarkerProps } from "./RuneMarket.types";

export const RuneMarker = (props: RuneMarkerProps) => {
  const { rune } = props;
  return (
    <span
      data-testid={"runeMarker"}
      className={`${styles.pathMarker} ${
        rune.isActive && styles.activePathMarker
      }`}
    />
  );
};
