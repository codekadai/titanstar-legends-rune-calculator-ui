import styles from "./Loader.module.scss";
import { loader } from "@/labels";

export const Loader = () => {
  return (
    <div className={styles.loaderWrapper}>
      <p className={styles.loaderText}>{loader.message}</p>
      <div className={styles.loader} />
    </div>
  );
};
