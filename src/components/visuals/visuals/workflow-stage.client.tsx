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
export function UnderLoadReportsVisual() {
  return (
    <Stage>
      <Reports
        incident={{
          title: "Worker under suspended load",
          camera: "Camera 03 · Lifting area",
          src: "/media/ailytics/stills/under-load-detection.jpg",
          photoPosition: "center bottom",
          box: { left: "62%", top: "62%", width: "8%", height: "33%" },
        }}
      />
    </Stage>
  );
}
export function PedestrianReportsVisual() {
  return (
    <Stage>
      <Reports
        incident={{
          title: "Pedestrian near moving forklift",
          camera: "Camera 05 · Warehouse floor",
          src: "/media/ailytics/stills/warehouse-forklift.jpg",
          box: { left: "47%", top: "40.5%", width: "11%", height: "27.5%" },
        }}
      />
    </Stage>
  );
}
export function OpenEdgeReportsVisual() {
  return (
    <Stage>
      <Reports
        incident={{
          title: "Worker near open edge",
          camera: "Camera 01 · Deck edge",
          src: "/media/ailytics/stills/open-edge-shaft.jpg",
          photoPosition: "center top",
          box: { left: "67.5%", top: "5.5%", width: "4%", height: "21.5%" },
        }}
      />
    </Stage>
  );
}
