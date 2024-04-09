"use client";

import { motion } from "framer-motion";
import styles from "@/styles/dialogs/LoadingDialog.module.css";
import { SyncLoader } from "react-spinners";
import AnimatedModalWrapper from "../modal/AnimatedModalWrapper";

export default function LoadingDialog() {
  return (
    <AnimatedModalWrapper className={styles.container}>
      <SyncLoader color={"#34385F"} />
    </AnimatedModalWrapper>
  );
}
