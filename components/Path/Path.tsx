import styles from "./Path.module.scss";
import { Rune } from "../Rune";
import type { RuneType } from "@/components/Rune/Rune.types";
import type { PathProps } from "./Path.types";
import { paths } from "@/labels";

export const Path = (props: PathProps) => {
  const { path, pathIndex } = props;
  return (
    <div key={pathIndex} className={styles.pathWrapper}>
      <h2 data-testid={"pathTitle"} className={styles.pathTitle}>
        {paths.talentPath} {pathIndex + 1}
      </h2>
      <div key={pathIndex} className={styles.path}>
        {path.map((rune: RuneType, index: number) => (
          <Rune
            key={index}
            index={index}
            pathIndex={pathIndex}
            rune={rune}
            path={path}
          />
        ))}
      </div>
    </div>
  );
};
