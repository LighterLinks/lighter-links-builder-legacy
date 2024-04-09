"use client";

import { motion } from "framer-motion";
import styles from "@/styles/dialogs/CloseDialog.module.css";
import AnimatedModalWrapper from "../modal/AnimatedModalWrapper";

export default function CloseDialog({
  text,
  onClickLeft,
  onClickRight,
}: {
  text: string;
  onClickLeft: () => void;
  onClickRight: () => void;
}) {
  return (
    <AnimatedModalWrapper className={styles.container}>
      <p>{text}</p>
      <div className={styles.buttonWrapper}>
        <button className={styles.buttonLeft} onClick={onClickLeft}>
          Cancel
        </button>
        <button className={styles.buttonRight} onClick={onClickRight}>
          Close
        </button>
      </div>
    </AnimatedModalWrapper>
  );
}
