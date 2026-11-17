"use client";

import { useState } from "react";
import styles from "./context.module.css";
import { motion } from "framer-motion";
import { HardHatIcon, ChevronDown } from "lucide-react";

import {
  StatePill,
  CamBadge,
  CameraStage,
  CamOverlay,
  Frame,
  Tag,
  at,
  type Box,
} from "@/components/visuals/visuals/_camera";
import { EASE, useLoop } from "@/components/visuals/visuals/_kit";

const FRONT: Box = [548, 236, 146, 396];
const HAT: Box = [594, 234, 50, 32];
const VEST: Box = [578, 330, 90, 142];
const OTHERS: { box: Box; label: string; below: boolean }[] = [
  { box: [990, 100, 80, 230], label: "Worker 2", below: true },
  { box: [896, 244, 52, 92], label: "Worker 3", below: false },
];

const ITEMS = [
  { label: "Hard hat", at: 3 },
  { label: "Safety vest", at: 4 },
  { label: "Gloves", at: 5 },
];

/**
 * The PPE use-case hero. Ailytics finds every worker on one camera, checks
 * the front worker head to toe, then clears the other two. Everyone in this
 * frame is wearing PPE, so the outcome is a clear check, and the card says
 * what happens when an item is missing.
 */
export default function PpeHeroVisual() {
  const [manual, setManual] = useState<boolean | null>(null);
  const { ref, phase, reduce } = useLoop(9, 1000, manual === null);
  const expanded = manual ?? (phase >= 2 && phase < 7);
  const found = phase >= 1;
  const cleared = phase >= 5;

  return (
    <CameraStage innerRef={ref} src="/media/ailytics/stills/ppe-hero.jpg">
      <CamOverlay>
        <Frame box={HAT} instant={reduce} visible={phase >= 3} offset={5} />
        <Frame box={VEST} instant={reduce} visible={phase >= 4} offset={6} />
        <Frame box={FRONT} instant={reduce} visible={found} />
        {OTHERS.map((worker) => (
          <Frame
            box={worker.box}
            instant={reduce}
            key={worker.label}
            offset={6}
            visible={found}
          />
        ))}
      </CamOverlay>

      <Tag instant={reduce} visible={found} x={FRONT[0]} y={FRONT[1] - 9}>
        {cleared ? "Worker 1 · PPE on" : "Worker 1"}
      </Tag>
      {OTHERS.map((worker) => (
        <Tag
          instant={reduce}
          key={worker.label}
          visible={found}
          x={worker.box[0]}
          y={worker.below ? worker.box[1] + worker.box[3] : worker.box[1] - 7}
          below={worker.below}
        >
          {phase >= 6 ? `${worker.label} · PPE on` : worker.label}
        </Tag>
      ))}

      <motion.div
        className={styles.inspector}
        style={at(730, 380)}
        initial={false}
        animate={{ opacity: found ? 1 : 0, y: found ? 0 : 5 }}
        transition={{ duration: reduce ? 0 : 0.35 }}
      >
        <button
          className={styles.trigger}
          aria-expanded={expanded}
          onClick={() => setManual(!expanded)}
        >
          <span className={styles.checkMark}>
            <HardHatIcon size={17} />
          </span>
          <span>
            Worker 1{" "}
            <strong>
              PPE{" "}
              {phase >= 5
                ? "3/3"
                : phase >= 4
                  ? "2/3"
                  : phase >= 3
                    ? "1/3"
                    : "check"}
            </strong>
          </span>
          <ChevronDown
            size={12}
            style={{ transform: expanded ? "rotate(180deg)" : "none" }}
          />
        </button>
        <motion.div
          initial={false}
          animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
          transition={{ duration: reduce ? 0 : 0.35, ease: EASE }}
          className={styles.drawer}
        >
          <div className={styles.rows}>
            {ITEMS.map((item) => (
              <div key={item.label}>
                <span>{item.label}</span>
                <StatePill
                  instant={reduce}
                  offLabel="Checking"
                  on={phase >= item.at}
                  onLabel="Worn"
                  onTone="positive"
                />
              </div>
            ))}
          </div>
        </motion.div>
        {manual !== null && (
          <button className={styles.resume} onClick={() => setManual(null)}>
            Resume animation
          </button>
        )}
      </motion.div>

      <CamBadge camera="Camera 03" place="Basement level" />
    </CameraStage>
  );
}
