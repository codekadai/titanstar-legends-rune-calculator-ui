import { homepage } from "@/labels";
import styles from "./page.module.scss";
import { Tree } from "@/components/Tree";

const Home = () => {
  return (
    <main className={styles.main}>
      <section className={styles.container}>
        <h1 className={styles.title}>{homepage.title}</h1>
        <Tree />
      </section>
    </main>
  );
};

export default Home;
