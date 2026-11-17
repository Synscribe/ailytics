"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

import styles from "./hero-footage.module.css";

const FOOTAGE = "/media/ailytics/detection-open-edge";

/**
 * Real Ailytics camera footage behind the index hero, tinted to the brand
 * teal and faded out behind the copy. It plays only on wide screens and holds
 * the poster frame when the visitor prefers reduced motion.
 */
export function HeroFootage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const wide = window.matchMedia("(min-width: 1024px)");

    function sync() {
      if (!video) return;
      if (wide.matches && !reduce) {
        video.play().catch(() => {
          // Autoplay can be refused; the poster frame remains.
        });
      } else {
        video.pause();
      }
    }

    sync();
    wide.addEventListener("change", sync);
    return () => wide.removeEventListener("change", sync);
  }, [reduce]);

  return (
    <div aria-hidden="true" className={styles.footage}>
      <video
        className={styles.video}
        loop
        muted
        playsInline
        poster={`${FOOTAGE}-poster.jpg`}
        preload="none"
        ref={videoRef}
      >
        <source src={`${FOOTAGE}.webm`} type="video/webm" />
        <source src={`${FOOTAGE}.mp4`} type="video/mp4" />
      </video>
      <div className={styles.tint} />
      <div className={styles.grid} />
    </div>
  );
}
