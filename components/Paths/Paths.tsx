import { useAppContext } from "@/context";
import styles from "./Paths.module.scss";
import { Path } from "../Path";
import type { PathType } from "./Paths.types";

export const Paths = () => {
  const { currentPaths } = useAppContext();

  return (
    <div className={styles.paths}>
      {currentPaths.map((path: PathType, pathIndex: number) => (
        <Path key={pathIndex} path={path} pathIndex={pathIndex} />
      ))}
    </div>
  );
};
