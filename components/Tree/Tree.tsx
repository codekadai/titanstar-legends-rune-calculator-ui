"use client";

import styles from "./Tree.module.scss";
import { Points } from "../Points";
import { AppProvider } from "@/context";
import { Paths } from "../Paths";

export const Tree = () => {
  return (
    <AppProvider>
      <div className={styles.treeWrapper}>
        <Paths />
        <Points />
      </div>
    </AppProvider>
  );
};
