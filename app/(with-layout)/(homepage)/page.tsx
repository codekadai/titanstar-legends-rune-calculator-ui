import styles from "./page.module.scss";
import { Tree } from "@/components/Tree";

const Home = () => {
  return (
    <main className={styles.container}>
      <Tree />
    </main>
  );
};

export default Home;
