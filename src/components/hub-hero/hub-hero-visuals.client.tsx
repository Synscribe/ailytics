"use client";

import { useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const M = "/media/ailytics";

type Group = "Safety" | "Security" | "Productivity";

const DOT: Record<Group, string> = {
  Safety: "bg-alert",
  Security: "bg-caution",
  Productivity: "bg-signal",
};

type Feed = { src: string; cam: string; video?: string; pos?: string };

const FEEDS: Feed[] = [
  {
    src: `${M}/detection-machinery-proximity-poster.jpg`,
    cam: "Cam 01 · Tower A",
    video: "detection-machinery-proximity",
  },
  {
    src: `${M}/detection-low-light-ppe-poster.jpg`,
    cam: "Cam 02 · Plant 2",
  },
  { src: `${M}/stills/speeding-wrong-way.jpg`, cam: "Cam 03 · Gate" },
  {
    src: `${M}/detection-open-edge-poster.jpg`,
    cam: "Cam 04 · Tower A",
    pos: "60% 30%",
  },
  {
    src: `${M}/detection-smoke-fire-poster.jpg`,
    cam: "Cam 05 · Generator yard",
    video: "detection-smoke-fire",
  },
  { src: `${M}/stills/crowding.jpg`, cam: "Cam 06 · Dock", pos: "50% 40%" },
  {
    src: `${M}/stills/suspended-load-safe.jpg`,
    cam: "Cam 07 · Tower B",
    pos: "50% 20%",
  },
  { src: `${M}/stills/no-access-zones.jpg`, cam: "Cam 08 · Plant 2" },
  {
    src: `${M}/detection-vehicle-reversing-poster.jpg`,
    cam: "Cam 09 · Yard",
  },
];

type Event = {
  feed: number;
  group: Group;
  tag: string;
  text: string;
  /** Detection box in % of the tile: left, top, width, height. */
  box: [number, number, number, number];
};

const EVENTS: Event[] = [
  {
    feed: 0,
    group: "Safety",
    tag: "1.8 m from excavator",
    text: "Worker too close to excavator",
    box: [18, 38, 22, 44],
  },
  {
    feed: 2,
    group: "Security",
    tag: "Wrong way",
    text: "Wrong-way vehicle at gate",
    box: [40, 40, 30, 32],
  },
  {
    feed: 4,
    group: "Safety",
    tag: "Smoke",
    text: "Smoke in generator yard",
    box: [30, 18, 40, 40],
  },
  {
    feed: 5,
    group: "Productivity",
    tag: "14 on shift",
    text: "14 workers on shift at dock",
    box: [20, 30, 60, 50],
  },
  {
    feed: 7,
    group: "Security",
    tag: "Restricted area · 23:14",
    text: "After-hours entry, restricted area",
    box: [44, 34, 18, 46],
  },
  {
    feed: 1,
    group: "Safety",
    tag: "No hard hat",
    text: "Missing hard hat in low light",
    box: [52, 30, 16, 50],
  },
];

const EVENT_MS = 3000;

function useTick(length: number, ms = EVENT_MS) {
  const [n, setN] = useState(0);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setN((i) => i + 1), ms);
    return () => window.clearInterval(id);
  }, [reduce, ms]);
  return n % length;
}

function Tile({
  feed,
  event,
  dense,
}: {
  feed: Feed;
  event?: Event;
  dense?: boolean;
}) {
  const on = Boolean(event);
  return (
    <div
      className={`relative overflow-hidden rounded-md bg-night transition-shadow duration-500 ${on ? "ring-2 ring-alert" : "ring-1 ring-white/10"}`}
    >
      {feed.video ? (
        <video
          autoPlay
          className={`absolute inset-0 size-full object-cover transition-[filter,opacity] duration-500 ${on ? "" : "opacity-70 [filter:grayscale(var(--hub-grey,1))]"}`}
          loop
          muted
          playsInline
          poster={feed.src}
        >
          <source src={`${M}/${feed.video}.webm`} type="video/webm" />
          <source src={`${M}/${feed.video}.mp4`} type="video/mp4" />
        </video>
      ) : (
        <Image
          alt=""
          className={`object-cover transition-[filter,opacity] duration-500 ${on ? "" : "opacity-70 [filter:grayscale(var(--hub-grey,1))]"}`}
          fill
          sizes="240px"
          src={feed.src}
          style={{ objectPosition: feed.pos ?? "50% 50%" }}
        />
      )}
      <span
        className={`absolute top-1.5 left-1.5 rounded bg-black/55 px-1.5 py-0.5 font-medium text-white ${dense ? "text-[9px]" : "text-ui-xs"}`}
      >
        {feed.cam}
      </span>
      {event ? (
        <>
          <span
            className="absolute rounded-sm border-2 border-alert"
            style={{
              left: `${event.box[0]}%`,
              top: `${event.box[1]}%`,
              width: `${event.box[2]}%`,
              height: `${event.box[3]}%`,
            }}
          />
          <span
            className={`absolute bottom-1.5 left-1.5 rounded bg-alert px-1.5 py-0.5 font-medium text-white ${dense ? "text-[9px]" : "text-ui-xs"}`}
          >
            {event.tag}
          </span>
        </>
      ) : null}
    </div>
  );
}

function Toast({ event, time }: { event: Event; time: string }) {
  return (
    <div
      className="flex items-center gap-3 rounded-xl bg-paper px-3.5 py-2.5 shadow-[0_12px_32px_-12px_rgba(39,64,93,0.45)] ring-1 ring-ink/10"
      key={event.text}
    >
      <span
        aria-hidden
        className={`size-2 shrink-0 rounded-full ${DOT[event.group]}`}
      />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-ui-md font-medium text-ink">
          {event.text}
        </span>
        <span className="block text-ui-xs text-ink-muted">
          {FEEDS[event.feed].cam} · {time}
        </span>
      </span>
      <span className="text-ui-xs font-medium text-signal-strong">View</span>
    </div>
  );
}

/** Use cases hub: a 3x3 camera wall from one site. One feed lights up at a time and its alert lands below. */
export function ControlRoomWall() {
  const i = useTick(EVENTS.length);
  const event = EVENTS[i];
  return (
    <div
      aria-label="Illustration: a wall of nine site cameras. One camera at a time flags a hazard and sends an alert."
      className="relative pb-8"
      role="img"
    >
      <div className="rounded-2xl bg-paper p-2.5 shadow-[0_24px_60px_-24px_rgba(39,64,93,0.4)] ring-1 ring-ink/10">
        <div className="flex items-center justify-between px-1.5 pt-0.5 pb-2.5">
          <span className="flex items-center gap-2 text-ui-sm font-medium text-ink">
            <span className="size-1.5 animate-pulse rounded-full bg-alert" />
            Live · 9 cameras
          </span>
          <span className="text-ui-sm text-ink-muted">Tower A site</span>
        </div>
        <div className="grid aspect-[4/3] grid-cols-3 grid-rows-3 gap-1.5">
          {FEEDS.map((feed, f) => (
            <Tile
              dense
              event={event.feed === f ? event : undefined}
              feed={feed}
              key={feed.cam}
            />
          ))}
        </div>
      </div>
      <div className="absolute right-6 bottom-0 left-6 sm:right-auto sm:w-80">
        <Toast event={event} time="Just now" />
      </div>
    </div>
  );
}

const SITES: { name: string; type: string; feeds: number[]; alert: number }[] =
  [
    { name: "Tower A", type: "Construction", feeds: [0, 3, 6, 1], alert: 0 },
    { name: "Berth 3", type: "Port", feeds: [5, 8, 2, 7], alert: 5 },
    { name: "Plant 2", type: "Manufacturing", feeds: [1, 7, 4, 3], alert: 1 },
    { name: "Gen yard", type: "Energy", feeds: [4, 2, 8, 0], alert: 4 },
  ];

/** Industries hub: four sites in different industries, four cameras each. Alerts move from site to site. */
export function MultiSiteWall() {
  const i = useTick(SITES.length);
  return (
    <div
      aria-label="Illustration: four sites in construction, ports, manufacturing and energy, four cameras each, watched from one view."
      role="img"
      className="rounded-2xl bg-paper p-2.5 shadow-[0_24px_60px_-24px_rgba(39,64,93,0.4)] ring-1 ring-ink/10"
    >
      <div className="flex items-center justify-between px-1.5 pt-0.5 pb-2.5">
        <span className="text-ui-sm font-medium text-ink">
          All sites · 4 sites · 16 cameras
        </span>
        <span className="flex items-center gap-1.5 text-ui-sm text-ink-muted">
          <span className="size-1.5 rounded-full bg-alert" />1 alert now
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        {SITES.map((site, s) => {
          const active = s === i;
          const ev = EVENTS.find((e) => e.feed === site.alert);
          return (
            <div
              className={`rounded-xl p-2 transition-colors duration-500 ${active ? "bg-alert/10 ring-1 ring-alert/40" : "bg-canvas"}`}
              key={site.name}
            >
              <p className="flex items-center justify-between pb-1.5 text-ui-sm">
                <span className="font-medium text-ink">{site.name}</span>
                <span className="text-ink-muted">{site.type}</span>
              </p>
              <div className="grid aspect-[4/3] grid-cols-2 grid-rows-2 gap-1">
                {site.feeds.map((f, k) => (
                  <Tile
                    dense
                    event={active && k === 0 ? ev : undefined}
                    feed={FEEDS[f]}
                    key={`${site.name}-${f}`}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
