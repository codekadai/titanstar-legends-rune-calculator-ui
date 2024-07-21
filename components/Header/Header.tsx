import styles from "./Header.module.scss";
import { homepage } from "@/labels";

export const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{homepage.title}</h1>
    </header>
  );
};
