import { homepage } from "@/labels";
import styles from "./page.module.scss";
import { Tree } from "@/components/Tree";

const Home = () => {
  return (
    <section className={styles.container}>
      <Tree />
    </section>
  );
};

export default Home;
