"use client";

import styles from "./Points.module.scss";
import { points } from "@/labels";
import { useAppContext } from "@/context";

export const Points = () => {
  const { currentSpentPoints, talentPoints } = useAppContext();

  return (
    <div className={styles.talentPoints}>
      <p className={styles.pointsCounter}>
        {currentSpentPoints} / {talentPoints}
      </p>
      <p className={styles.pointsText}>{points.pointsSpent}</p>
    </div>
  );
};
