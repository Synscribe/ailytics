"use client";
import Image from "next/image";
import { useState } from "react";
import { Camera, Play, Pause } from "lucide-react";
import { useLoop } from "@/components/visuals/visuals/_kit";
import styles from "./site-camera-wall.module.css";
const sites = [
  {
    name: "Tower",
    code: "A",
    score: 96,
    alerts: 0,
    image: "construction-hero.jpg",
    x: 24,
    y: 28,
  },
  {
    name: "Plant",
    code: "B",
    score: 88,
    alerts: 2,
    image: "under-load-detection.jpg",
    x: 62,
    y: 38,
  },
  {
    name: "Yard",
    code: "C",
    score: 98,
    alerts: 0,
    image: "machinery-proximity.jpg",
    x: 36,
    y: 72,
  },
  {
    name: "Port",
    code: "D",
    score: 94,
    alerts: 0,
    image: "timelapse-later.jpg",
    x: 80,
    y: 76,
  },
];
export function SiteCameraWall() {
  const [paused, setPaused] = useState(false);
  const [manual, setManual] = useState<number | null>(null);
  const { ref, phase } = useLoop(4, 2200, !paused && manual === null);
  const selected = manual ?? phase;
  const site = sites[selected];
  const choose = (i: number) => setManual(i);
  const resume = () => {
    setManual(null);
    setPaused(false);
  };
  return (
    <div
      ref={ref}
      className={styles.demo}
      aria-label="Illustrative multi-site camera dashboard"
    >
      <header>
        <div>
          <span className={styles.live} />
          <strong>All sites</strong>
          <span>Today</span>
        </div>
        <span>
          4 sites · <b>2 open alerts</b>
        </span>
      </header>{" "}
      <div className={styles.wallLayout}>
        <div className={styles.cameraGrid}>
          {sites.map((s, i) => (
            <button
              key={s.code}
              onClick={() => choose(i)}
              aria-pressed={selected === i}
            >
              <Image
                src={"/media/ailytics/stills/" + s.image}
                fill
                sizes="350px"
                alt={s.name + " site camera"}
              />
              <span>
                {s.name}
                <b>{s.alerts ? `${s.alerts} alerts` : "Clear"}</b>
              </span>
              {selected === i && <i />}
            </button>
          ))}
        </div>
        <div className={styles.wallFooter}>
          <div>
            <Camera size={20} />
            <strong>
              Site {site.code} · {site.name}
            </strong>
            <span>{site.score}% PPE compliance</span>
          </div>
          <p>
            {site.alerts
              ? "2 workers under a suspended load"
              : "No open alerts at this site"}
          </p>
          <small>
            {site.alerts
              ? "Supervisor notified · Lifting area"
              : "Monitoring all configured cameras"}
          </small>
        </div>
      </div>
      <footer>
        <span>
          {manual !== null
            ? "Exploring selected site"
            : paused
              ? "Paused"
              : "Automatic walkthrough"}
        </span>
        <button onClick={manual !== null ? resume : () => setPaused(!paused)}>
          {manual !== null ? (
            <Play size={14} />
          ) : paused ? (
            <Play size={14} />
          ) : (
            <Pause size={14} />
          )}{" "}
          {manual !== null ? "Resume tour" : paused ? "Play" : "Pause"}
        </button>
      </footer>
    </div>
  );
}
