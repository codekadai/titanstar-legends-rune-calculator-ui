import { useAppContext } from "@/context";
import styles from "./Paths.module.scss";
import { Path } from "../Path";
import type { PathType } from "./Paths.types";
import { paths } from "@/labels";

export const Paths = () => {
  const { currentPaths } = useAppContext();

  return (
    <div className={styles.paths}>
      {currentPaths.length !== 0 ? (
        currentPaths.map((path: PathType, pathIndex: number) => (
          <Path key={pathIndex} path={path} pathIndex={pathIndex} />
        ))
      ) : (
        <p className={styles.emptyPaths}>{paths.noPaths}</p>
      )}
    </div>
  );
};
