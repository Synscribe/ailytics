"use client";

import {
  stagger,
  useAnimate,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { type ReactNode, useEffect, useRef } from "react";

/**
 * Children marked with `data-reveal` rise in one after another the first time
 * the group enters view. The server renders them visible, so nothing depends
 * on JavaScript: items are only hidden on the client while still off-screen.
 */
export function RevealGroup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const inView = useInView(scope, { once: true, margin: "0px 0px -12% 0px" });
  const reduce = useReducedMotion();
  const armed = useRef(false);

  useEffect(() => {
    if (reduce) {
      animate("[data-reveal]", { opacity: 1, y: 0 }, { duration: 0 });
      return;
    }
    if (!inView && !armed.current) {
      armed.current = true;
      animate("[data-reveal]", { opacity: 0, y: 14 }, { duration: 0 });
      return;
    }
    if (inView && armed.current) {
      armed.current = false;
      animate(
        "[data-reveal]",
        { opacity: [0, 1], y: [14, 0] },
        { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: stagger(0.03) },
      );
    }
  }, [inView, reduce, animate]);

  return (
    <div ref={scope} className={className}>
      {children}
    </div>
  );
}
