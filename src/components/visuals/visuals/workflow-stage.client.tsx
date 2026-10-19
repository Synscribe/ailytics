"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Rules, Reports } from "./workflows.client";

function Stage({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.65);
  useEffect(() => {
    const node = ref.current;
    const content = inner.current;
    if (!node || !content) return;
    const fit = () =>
      setScale(
        Math.min(
          node.clientWidth / 480,
          node.clientHeight / content.offsetHeight,
        ),
      );
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(node);
    observer.observe(content);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className="absolute inset-0 flex items-center justify-center bg-paper"
    >
      <div
        ref={inner}
        style={{ width: 480, flexShrink: 0, transform: `scale(${scale})` }}
      >
        {children}
      </div>
    </div>
  );
}
export function RulesVisual() {
  return (
    <Stage>
      <Rules />
    </Stage>
  );
}
export function ReportsVisual() {
  return (
    <Stage>
      <Reports />
    </Stage>
  );
}
