"use client";

import styles from "./Points.module.scss";
import { MAX_POINTS } from "@/constants";
import { points } from "@/labels";
import { useAppContext } from "@/context";

export const Points = () => {
  const { currentSpentPoints } = useAppContext();

  return (
    <div className={styles.talentPoints}>
      <p className={styles.pointsCounter}>
        {currentSpentPoints} / {MAX_POINTS}
      </p>
      <p className={styles.pointsText}>{points.pointsSpent}</p>
    </div>
  );
};
