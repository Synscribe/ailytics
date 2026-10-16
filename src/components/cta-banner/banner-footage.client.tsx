"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

/**
 * Prototype: camera footage for the closing banner, greyscale and tinted to
 * the brand teal like the blog hero. Holds the poster frame under reduced
 * motion. Styling comes from the caller so each variant can grade it.
 */
export function BannerFootage({
  media,
  className,
  videoClassName,
}: {
  media: string;
  className?: string;
  videoClassName?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (reduce) {
      video.pause();
      return;
    }
    video.play().catch(() => {
      // Autoplay can be refused; the poster frame remains.
    });
  }, [reduce]);

  const src = `/media/ailytics/${media}`;
  return (
    <div aria-hidden="true" className={className}>
      <video
        className={videoClassName}
        loop
        muted
        playsInline
        poster={`${src}-poster.jpg`}
        preload="metadata"
        ref={ref}
      >
        <source src={`${src}.webm`} type="video/webm" />
        <source src={`${src}.mp4`} type="video/mp4" />
      </video>
    </div>
  );
}
