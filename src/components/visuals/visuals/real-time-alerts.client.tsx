"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ClockIcon,
  EllipsisVerticalIcon,
  ListChecksIcon,
  MapPinIcon,
  PlayIcon,
  VideoIcon,
} from "lucide-react";
import Image from "next/image";
import styles from "./phone.module.css";

import {
  BRAND,
  EASE,
  INSET,
  LINE,
  MUTED,
  SPRING,
  TONES,
  useLoop,
  VisualFrame,
} from "./_kit";
import { CamOverlay, Frame } from "./_camera";

/** Earlier notifications already in the list, modelled on the mobile app. */
const EARLIER = [
  {
    title: "Unknown truck entry",
    body: "An unknown truck entered Gate 1.",
    time: "8:51 pm",
  },
  {
    title: "New alert",
    body: "Near heavy machinery at Zone C.",
    time: "8:51 pm",
  },
  {
    title: "PPE Check generated",
    body: "Captured at Camera 02.",
    time: "8:49 pm",
  },
];

/** The alert that lands on the phone, and the record it opens. */
type AlertEvent = {
  notice: string;
  record: string;
  place: string;
  camera: string;
  src: string;
  box: readonly [x: number, y: number, w: number, h: number];
};

const PPE_EVENT: AlertEvent = {
  notice: "PPE Check generated",
  record: "PPE Check",
  place: "Gate 2",
  camera: "Camera 04",
  src: "/media/ailytics/stills/ppe-detection.jpg",
  box: [421, 285, 231, 544],
};

const UNDER_LOAD_EVENT: AlertEvent = {
  notice: "Worker under suspended load",
  record: "Under load",
  place: "Lifting area",
  camera: "Camera 03",
  src: "/media/ailytics/stills/under-load-detection.jpg",
  box: [808, 700, 76, 216],
};

/** The same phone for the suspended load page, with an under-load alert. */
export function UnderLoadAlertsVisual() {
  return <RealTimeAlertsVisual event={UNDER_LOAD_EVENT} />;
}

/**
 * The supervisor's phone, laid out like the mobile app: an alert
 * notification lands at the top of the list, opens into the record with the
 * event frame, camera and time, and the record is assigned so it shows in the
 * activity log. The alert is a PPE Check unless `event` says otherwise.
 */
export default function RealTimeAlertsVisual({
  event = PPE_EVENT,
}: {
  event?: AlertEvent;
}) {
  const { ref, phase, cycle, reduce } = useLoop(7, 1150);
  const arrived = phase >= 1;
  const detail = phase >= 3;
  const assigned = phase >= 5;
  const brand = TONES.positive;

  return (
    <VisualFrame innerRef={ref}>
      <div
        className={styles.phone}
        style={{
          borderColor: "var(--ink)",
          background: BRAND.surface,
          color: "var(--ink)",
        }}
      >
        <div className={styles.status}>
          <span>8:53</span>
          <i />
          <span>▮▮▮ ▰</span>
        </div>
        <div className={styles.screen}>
          {/* Notifications list */}
          <div className="flex items-center gap-1.5 px-2.5 pt-1 pb-1.5">
            <ChevronLeftIcon aria-hidden="true" className="size-3.5" />
            <span className="text-[12.5px] font-medium">Notifications</span>
            <ListChecksIcon
              aria-hidden="true"
              className="ml-auto size-3.5"
              style={{ color: MUTED }}
            />
          </div>
          <div
            className="flex gap-3 border-b px-2.5 text-[10px] font-medium whitespace-nowrap"
            style={{ borderColor: LINE }}
          >
            <span
              className="border-b-2 pb-1"
              style={{ borderColor: brand.fg, color: brand.fg }}
            >
              All
            </span>
            <span style={{ color: MUTED }}>Guardian</span>
            <span style={{ color: MUTED }}>Insight Vault</span>
          </div>
          <div
            className="flex flex-col gap-1.5 px-2 pt-2"
            style={{ background: INSET, minHeight: "100%" }}
          >
            <AnimatePresence initial={false}>
              {arrived ? (
                <motion.div
                  key={`new-${cycle}`}
                  animate={{ height: "auto", opacity: 1, y: 0 }}
                  className="overflow-hidden"
                  initial={reduce ? false : { height: 0, opacity: 0, y: -12 }}
                  transition={reduce ? { duration: 0 } : SPRING}
                >
                  <Notice
                    body={`Captured at ${event.camera}.`}
                    fresh
                    time="now"
                    title={event.notice}
                  />
                </motion.div>
              ) : null}
            </AnimatePresence>
            {EARLIER.map((n) => (
              <Notice key={n.title + n.time} {...n} />
            ))}
          </div>

          {/* The record the notification opens */}
          <AnimatePresence initial={false}>
            {detail ? (
              <motion.div
                key={`detail-${cycle}`}
                animate={{ x: 0, opacity: 1 }}
                className="absolute inset-0 flex flex-col"
                exit={{ opacity: 0, transition: { duration: 0.25 } }}
                initial={reduce ? false : { x: 40, opacity: 0 }}
                style={{ background: BRAND.surface }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <div className="flex items-center gap-1.5 px-2.5 pt-1 pb-1.5">
                  <ChevronLeftIcon aria-hidden="true" className="size-3.5" />
                  <span className="text-[12.5px] font-medium">
                    {event.record}
                  </span>
                  <EllipsisVerticalIcon
                    aria-hidden="true"
                    className="ml-auto size-3.5"
                    style={{ color: MUTED }}
                  />
                </div>
                <div className="flex flex-col gap-0.5 px-2.5 pb-2 text-[10px] font-medium">
                  <span className="text-[11.5px]">Tower site</span>
                  <Meta icon={MapPinIcon}>{event.place}</Meta>
                  <Meta icon={VideoIcon}>{event.camera}</Meta>
                  <Meta icon={ClockIcon}>8:53 pm, today</Meta>
                </div>
                <div className="relative mx-2 min-h-[70px] flex-1 overflow-hidden rounded-lg">
                  <Image
                    alt=""
                    className="object-cover"
                    fill
                    sizes="320px"
                    src={event.src}
                  />
                  <CamOverlay>
                    <Frame box={event.box} instant tone="hazard" />
                  </CamOverlay>
                </div>
                <div className="flex flex-none items-center gap-1.5 px-2 pt-2">
                  <span
                    className="grid size-[24px] flex-none place-items-center rounded-md text-white"
                    style={{ background: brand.fg }}
                  >
                    <PlayIcon aria-hidden="true" className="size-3" />
                  </span>
                  <Select fit>Pending</Select>
                  <Select>
                    <span className="relative inline-grid">
                      <motion.span
                        animate={{ opacity: assigned ? 0 : 1 }}
                        className="col-start-1 row-start-1"
                        initial={false}
                        transition={{ duration: reduce ? 0 : 0.2 }}
                      >
                        Unassigned
                      </motion.span>
                      <motion.span
                        animate={{
                          opacity: assigned ? 1 : 0,
                          y: assigned ? 0 : 4,
                        }}
                        className="col-start-1 row-start-1"
                        initial={false}
                        transition={reduce ? { duration: 0 } : SPRING}
                      >
                        Supervisor
                      </motion.span>
                    </span>
                  </Select>
                </div>
                <div className="flex-none px-2.5 pt-2 pb-2.5">
                  <span className="block text-[11px] font-medium">
                    Activity logs
                  </span>
                  <div className="relative mt-1 h-[30px]">
                    <motion.span
                      animate={{ opacity: assigned ? 0 : 1 }}
                      className="absolute inset-0 grid place-items-center text-center text-[9.5px] font-medium"
                      initial={false}
                      style={{ color: MUTED }}
                      transition={{ duration: reduce ? 0 : 0.2 }}
                    >
                      No activity yet
                    </motion.span>
                    <motion.span
                      animate={{
                        opacity: assigned ? 1 : 0,
                        y: assigned ? 0 : 6,
                        filter: assigned ? "blur(0px)" : "blur(6px)",
                      }}
                      className="absolute inset-0 flex items-center gap-1.5 rounded-md px-2 text-[9.5px] font-medium"
                      initial={false}
                      style={{ background: INSET }}
                      transition={{ duration: reduce ? 0 : 0.5, ease: EASE }}
                    >
                      <i
                        className="size-1.5 flex-none rounded-full"
                        style={{ background: brand.solid }}
                      />
                      Assigned to Supervisor
                      <span className="ml-auto" style={{ color: MUTED }}>
                        now
                      </span>
                    </motion.span>
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
        <div className={styles.homeIndicator} />
      </div>
    </VisualFrame>
  );
}

function Notice({
  title,
  body,
  time,
  fresh = false,
}: {
  title: string;
  body: string;
  time: string;
  fresh?: boolean;
}) {
  return (
    <div
      className="rounded-lg px-2.5 py-2"
      style={{
        background: BRAND.surface,
        boxShadow: fresh
          ? `0 0 0 1px color-mix(in srgb, ${TONES.positive.solid} 55%, transparent)`
          : undefined,
      }}
    >
      <span className="flex items-center gap-1.5">
        <span className="truncate text-[11px] font-medium">{title}</span>
        <span
          className="ml-auto flex-none text-[9px] font-medium"
          style={{ color: MUTED }}
        >
          {time}
        </span>
        <i
          className="size-1.5 flex-none rounded-full"
          style={{ background: TONES.positive.solid }}
        />
      </span>
      <span
        className="mt-0.5 block truncate text-[9.5px] font-medium"
        style={{ color: MUTED }}
      >
        {body}
      </span>
    </div>
  );
}

function Meta({
  icon: Icon,
  children,
}: {
  icon: React.ComponentType<{
    className?: string;
    style?: React.CSSProperties;
  }>;
  children: string;
}) {
  return (
    <span className="flex items-center gap-1.5">
      <Icon className="size-3 flex-none" style={{ color: MUTED }} />
      {children}
    </span>
  );
}

function Select({
  fit = false,
  children,
}: {
  /** Size to the label instead of sharing the row. */
  fit?: boolean;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`flex h-[24px] min-w-0 items-center justify-between gap-0.5 rounded-md border px-1 text-[9px] font-medium ${fit ? "flex-none" : "flex-1"}`}
      style={{ borderColor: LINE }}
    >
      <span className="truncate">{children}</span>
      <ChevronDownIcon
        aria-hidden="true"
        className="size-2.5 flex-none"
        style={{ color: MUTED }}
      />
    </span>
  );
}
