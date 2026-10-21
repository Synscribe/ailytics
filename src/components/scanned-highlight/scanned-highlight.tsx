"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import styles from "./scanned-highlight.module.css";

/** A single scan on entering the viewport; copy stays readable without JS. */
export function ScannedHighlight({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  return (
    <motion.span
      className={styles.highlight}
      initial={{ backgroundSize: "0% 100%" }}
      whileInView={{ backgroundSize: "100% 100%" }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: reduced ? 0 : 0.9, ease: "easeInOut" }}
    >
      {children}
    </motion.span>
  );
}
