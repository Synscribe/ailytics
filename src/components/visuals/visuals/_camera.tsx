"use client";

/**
 * Camera-view parts shared by the detection visuals.
 *
 * Every still in public/media/ailytics/stills is a clean 1280×960 frame, so
 * overlays are authored in that pixel space: SVG geometry uses the viewBox,
 * and HTML chips are placed with `at(x, y)`. The stage is always 4:3, so the
 * two stay aligned at any size.
 *
 * The detection frame is the brand motif: a slate square offset up and to the
 * right behind the front square. The front square is teal for a detection,
 * coral for a hazard and citrus for a security event.
 */

import type { CSSProperties, ReactNode, Ref } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

import { cn } from "@/lib/utils";

import { EASE, SPRING, TONES, VisualFrame } from "./_kit";

export const CAM_W = 1280;
export const CAM_H = 960;

export const STILL_SIZES =
  "(min-width: 1024px) 42vw, (min-width: 768px) 60vw, 100vw";

/** Places an HTML element at a point in the 1280×960 still. */
export function at(x: number, y: number): CSSProperties {
  return { left: `${(x / CAM_W) * 100}%`, top: `${(y / CAM_H) * 100}%` };
}

export type Box = readonly [x: number, y: number, w: number, h: number];

export type FrameTone = "detect" | "hazard" | "security";

const FRONT: Record<FrameTone, string> = {
  detect: "var(--signal)",
  hazard: "var(--alert)",
  security: "var(--caution)",
};

/** A full-bleed camera still with an overlay layer on top. */
export function CameraStage({
  innerRef,
  src,
  className,
  children,
}: {
  innerRef: Ref<HTMLDivElement>;
  src: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <VisualFrame
      className={cn("camera-stage overflow-hidden p-0 sm:p-0", className)}
      innerRef={innerRef}
    >
      <Image
        alt=""
        className="object-cover"
        fill
        sizes={STILL_SIZES}
        src={src}
      />
      {children}
    </VisualFrame>
  );
}

/** SVG layer in still pixels. Strokes stay crisp at every size. */
export function CamOverlay({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      className={cn(
        "absolute inset-0 h-full w-full overflow-visible",
        className,
      )}
      preserveAspectRatio="xMidYMid slice"
      viewBox={`0 0 ${CAM_W} ${CAM_H}`}
    >
      {children}
    </svg>
  );
}

/** Camera name chip, top left. */
export function CamBadge({ camera, place }: { camera: string; place: string }) {
  return (
    <span
      className="camera-badge absolute top-2.5 left-2.5 inline-flex items-center gap-1.5 rounded-full py-1 pr-2.5 pl-2 text-[10.5px] font-medium shadow-sm sm:top-3.5 sm:left-3.5"
      style={{ background: "var(--paper)", color: "var(--ink)" }}
    >
      <motion.i
        animate={{ opacity: [1, 0.35, 1] }}
        className="size-1.5 rounded-full"
        style={{ background: "var(--signal)" }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      />
      {camera}
      <span style={{ color: "var(--ink-faint)" }}>· {place}</span>
    </span>
  );
}

/**
 * The double-square detection frame. `tone` cross-fades the front square,
 * because Framer cannot tween between two CSS variables.
 */
export function Frame({
  box,
  tone = "detect",
  visible = true,
  instant = false,
  offset = 9,
}: {
  box: Box;
  tone?: FrameTone;
  visible?: boolean;
  instant?: boolean;
  offset?: number;
}) {
  const [x, y, w, h] = box;
  const fade = { duration: instant ? 0 : 0.35, ease: EASE };
  return (
    <motion.g
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 1.04 }}
      initial={false}
      style={{ transformBox: "fill-box", transformOrigin: "center" }}
      transition={instant ? { duration: 0 } : { duration: 0.45, ease: EASE }}
    >
      <rect
        fill="none"
        height={h}
        stroke="var(--ink)"
        strokeOpacity={0.85}
        strokeWidth={2}
        vectorEffect="non-scaling-stroke"
        width={w}
        x={x + offset}
        y={y - offset}
      />
      {(Object.keys(FRONT) as FrameTone[]).map((key) => (
        <motion.rect
          animate={{ opacity: key === tone ? 1 : 0 }}
          fill="none"
          height={h}
          initial={false}
          key={key}
          stroke={FRONT[key]}
          strokeWidth={2.75}
          transition={fade}
          vectorEffect="non-scaling-stroke"
          width={w}
          x={x}
          y={y}
        />
      ))}
    </motion.g>
  );
}

/**
 * Label tab that sits on the top-left corner of a frame, like the tab on the
 * logo's squares. Hazard and security tags fill with their colour.
 */
export function Tag({
  x,
  y,
  tone = "detect",
  visible = true,
  instant = false,
  below = false,
  children,
}: {
  x: number;
  y: number;
  tone?: FrameTone;
  visible?: boolean;
  instant?: boolean;
  below?: boolean;
  children: ReactNode;
}) {
  const style: CSSProperties =
    tone === "hazard"
      ? { background: TONES.human.fg, color: "#fff" }
      : tone === "security"
        ? { background: TONES.caution.solid, color: "var(--ink)" }
        : { background: "var(--paper)", color: "var(--ink)" };
  return (
    <motion.span
      animate={{
        opacity: visible ? 1 : 0,
        y: visible ? 0 : 4,
        filter: visible ? "blur(0px)" : "blur(4px)",
      }}
      className="camera-tag absolute z-10 flex items-center"
      initial={false}
      style={
        {
          ...at(x, y),
          "--tag-x": `${(x / CAM_W) * 100}%`,
          top: `max(64px, ${(y / CAM_H) * 100}%)`,
          translate: below ? "-1px 3px" : "-1px calc(-100% - 3px)",
        } as CSSProperties
      }
      transition={instant ? { duration: 0 } : { duration: 0.4, ease: EASE }}
    >
      <span
        className="inline-flex items-center gap-1 rounded-[4px] px-1.5 py-[3px] text-[10px] leading-none font-medium whitespace-nowrap shadow-sm"
        style={style}
      >
        {tone === "detect" ? (
          <i
            className="size-[7px] rounded-[2px]"
            style={{ background: "var(--signal)" }}
          />
        ) : null}
        {children}
      </span>
    </motion.span>
  );
}

/** The outcome card at the foot of a camera view. */
export function EventCard({
  show,
  instant = false,
  icon,
  tone = "human",
  title,
  meta,
  badge,
  className,
}: {
  show: boolean;
  instant?: boolean;
  icon: ReactNode;
  tone?: "human" | "caution" | "positive";
  title: string;
  meta: string;
  badge?: ReactNode;
  className?: string;
}) {
  const t = TONES[tone];
  return (
    <motion.div
      animate={{
        opacity: show ? 1 : 0,
        y: show ? 0 : 12,
        filter: show ? "blur(0px)" : "blur(6px)",
      }}
      className={cn(
        "camera-event absolute inset-x-2.5 bottom-2.5 z-20 flex items-center gap-2.5 rounded-xl px-3 py-2.5 shadow-md sm:inset-x-3.5 sm:bottom-3.5",
        className,
      )}
      data-visible={show}
      initial={false}
      style={{ background: "var(--paper)", color: "var(--ink)" }}
      transition={instant ? { duration: 0 } : { duration: 0.6, ease: EASE }}
    >
      <span
        className="grid size-7 flex-none place-items-center rounded-full [&_svg]:size-3.5"
        style={{ background: t.tint, color: t.fg }}
      >
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[12.5px] leading-snug font-medium">
          {title}
        </span>
        <span
          className="block text-[11px] leading-snug font-medium"
          style={{ color: "var(--ink-faint)" }}
        >
          {meta}
        </span>
      </span>
      {badge}
    </motion.div>
  );
}

/** Small state pill used on cards and chips; springs when it changes. */
export function StatePill({
  on,
  instant = false,
  onLabel,
  offLabel,
  onTone = "human",
}: {
  on: boolean;
  instant?: boolean;
  onLabel: string;
  offLabel: string;
  onTone?: "human" | "caution" | "positive";
}) {
  const t = TONES[onTone];
  return (
    <span className="relative inline-grid flex-none text-[10.5px] font-medium">
      <motion.span
        animate={{ opacity: on ? 0 : 1 }}
        className="col-start-1 row-start-1 rounded-full px-2 py-[3px] text-center"
        initial={false}
        style={{ background: TONES.neutral.tint, color: "var(--ink-muted)" }}
        transition={{ duration: instant ? 0 : 0.25 }}
      >
        {offLabel}
      </motion.span>
      <motion.span
        animate={{ opacity: on ? 1 : 0, scale: on ? 1 : 0.7 }}
        className="col-start-1 row-start-1 rounded-full px-2 py-[3px] text-center"
        initial={false}
        style={{ background: t.tint, color: t.fg }}
        transition={instant ? { duration: 0 } : SPRING}
      >
        {onLabel}
      </motion.span>
    </span>
  );
}
