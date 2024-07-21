import { Header } from "@/components";
import styles from "./layout.module.scss";

const WithLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className={styles.main}>
      <Header />
      {children}
    </main>
  );
};

export default WithLayout;
