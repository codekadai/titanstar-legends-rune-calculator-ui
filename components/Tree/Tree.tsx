"use client";

import styles from "./Tree.module.scss";
import { Points } from "../Points";
import { useAppContext } from "@/context";
import { Paths } from "../Paths";
import { Loader } from "../Loader";

export const Tree = () => {
  const { isLoading } = useAppContext();

  return (
    <div className={styles.treeWrapper}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Paths />
          <Points />
        </>
      )}
    </div>
  );
};
