"use client";

import { AnimatePresence, motion } from "framer-motion";
import { HardHatIcon } from "lucide-react";

import {
  CamBadge,
  CameraStage,
  CamOverlay,
  EventCard,
  Frame,
  StatePill,
  Tag,
  at,
  type Box,
} from "./_camera";
import { EASE, TONES, useLoop } from "./_kit";

const PERSON: Box = [421, 285, 231, 544];
const HAT: Box = [634, 552, 88, 104];

const ITEMS = [
  { label: "Hard hat", at: 3 },
  { label: "Safety vest", at: 4 },
];

/**
 * A head-to-toe scan runs down a worker at a site entrance. Each PPE item
 * resolves as the scan passes it: the hard hat is in his hand, not on his
 * head, and there is no vest, so the frame turns to a hazard.
 */
export default function PpeDetectionVisual() {
  const { ref, phase, cycle, running, reduce } = useLoop(8, 1000);
  const found = phase >= 1;
  const scanning = running && phase >= 2 && phase <= 4;
  const hazard = phase >= 5;
  const [x, y, w, h] = PERSON;

  return (
    <CameraStage innerRef={ref} src="/media/ailytics/stills/ppe-detection.jpg">
      <CamOverlay>
        <defs>
          <linearGradient id="ppe-scan" x1="0" x2="0" y1="0" y2="1">
            <stop
              offset="0"
              style={{ stopColor: "var(--signal)", stopOpacity: 0 }}
            />
            <stop
              offset="1"
              style={{ stopColor: "var(--signal)", stopOpacity: 0.38 }}
            />
          </linearGradient>
        </defs>
        <AnimatePresence>
          {scanning ? (
            <motion.g
              animate={{ y: h }}
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
              initial={{ y: 0 }}
              key={`scan-${cycle}`}
              transition={{ duration: 2.7, ease: [0.45, 0, 0.55, 1] }}
            >
              <rect
                fill="url(#ppe-scan)"
                height={90}
                width={w}
                x={x}
                y={y - 90}
              />
              <line
                stroke="var(--signal)"
                strokeWidth={2.5}
                vectorEffect="non-scaling-stroke"
                x1={x - 14}
                x2={x + w + 14}
                y1={y}
                y2={y}
              />
            </motion.g>
          ) : null}
        </AnimatePresence>
        <Frame box={HAT} instant={reduce} visible={phase >= 3} />
        <Frame
          box={PERSON}
          instant={reduce}
          tone={hazard ? "hazard" : "detect"}
          visible={found}
        />
      </CamOverlay>

      <Tag
        instant={reduce}
        tone="detect"
        visible={phase >= 3}
        x={HAT[0]}
        y={HAT[1] + HAT[3]}
        below
      >
        Hard hat, in hand
      </Tag>
      <Tag
        instant={reduce}
        tone={hazard ? "hazard" : "detect"}
        visible={found}
        x={x}
        y={y - 9}
      >
        {hazard ? "Missing PPE" : "Person"}
      </Tag>

      {/* What the check found, item by item. */}
      <motion.div
        animate={{ opacity: phase >= 2 ? 1 : 0, x: phase >= 2 ? 0 : 8 }}
        className="absolute z-10 flex w-[158px] flex-col gap-1.5 rounded-xl p-2 shadow-md"
        initial={false}
        style={{
          ...at(752, 300),
          background: "var(--paper)",
          color: "var(--ink)",
        }}
        transition={{ duration: reduce ? 0 : 0.5, ease: EASE }}
      >
        <span className="flex items-center gap-1.5 px-0.5 text-[10.5px] font-semibold">
          <HardHatIcon
            aria-hidden="true"
            className="size-3"
            style={{ color: "var(--ink-faint)" }}
          />
          PPE check
        </span>
        {ITEMS.map((item) => (
          <span
            className="flex items-center justify-between gap-2 rounded-lg px-1.5 py-1 text-[10.5px] font-medium whitespace-nowrap"
            key={item.label}
            style={{ background: "var(--muted)" }}
          >
            {item.label}
            <StatePill
              instant={reduce}
              offLabel="Checking"
              on={phase >= item.at}
              onLabel="Missing"
            />
          </span>
        ))}
      </motion.div>

      <CamBadge camera="Camera 06" place="Site entrance" />
      <EventCard
        badge={
          <span
            className="rounded-full px-2 py-[3px] text-[10.5px] font-semibold"
            style={{ background: TONES.human.tint, color: TONES.human.fg }}
          >
            Alert sent
          </span>
        }
        icon={<HardHatIcon aria-hidden="true" />}
        instant={reduce}
        meta="No hard hat, no vest · Camera 06"
        show={phase >= 6}
        title="Missing PPE at site entrance"
      />
    </CameraStage>
  );
}
