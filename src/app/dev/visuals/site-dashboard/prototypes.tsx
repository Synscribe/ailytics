"use client";
import { SiteCameraWall } from "@/components/site-camera-wall/site-camera-wall";
import Image from "next/image";
import { useState } from "react";
import { Bell, Check, Pause, Play, ArrowUpRight, MapPin } from "lucide-react";
import { useLoop } from "@/components/visuals/visuals/_kit";
import styles from "./prototypes.module.css";
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
const concepts = [
  [
    "Site map",
    "See where attention is needed",
    "A map connects every site. The plant alert opens into camera evidence, then confirms the supervisor was notified. Click any site to explore.",
  ],
  [
    "Camera wall",
    "Go from all sites to one incident",
    "Four site feeds stay visible. Each takes a turn in focus, with compliance and alerts alongside its footage. Click a feed to take over.",
  ],
  [
    "Alert inbox",
    "Follow an alert through to the team",
    "A compact site list opens into the selected camera clip. The alert moves from detected to supervisor notified without needing a click.",
  ],
];
function Demo({ kind }: { kind: number }) {
  const [paused, setPaused] = useState(false);
  const [manual, setManual] = useState<number | null>(null);
  const { ref, phase, reduce } = useLoop(4, 2200, !paused && manual === null);
  const selected = manual ?? (kind === 1 ? phase : 1);
  const site = sites[selected];
  const expanded = manual !== null || phase >= 1 || reduce;
  const notified = manual !== null || phase === 3 || reduce;
  const choose = (i: number) => setManual(i);
  const resume = () => {
    setManual(null);
    setPaused(false);
  };
  const evidence = (
    <div className={styles.evidence}>
      <div className={styles.photo}>
        <Image
          src={"/media/ailytics/stills/" + site.image}
          fill
          sizes="600px"
          alt={`${site.name} camera footage`}
        />
        <span>
          Cam {selected + 1} · {site.name}
        </span>
        {site.alerts > 0 && <i className={styles.detection} />}
      </div>
      <div className={styles.evidenceText}>
        <strong>
          {site.alerts ? "Workers under a suspended load" : "No open alerts"}
        </strong>
        <span>
          {site.alerts
            ? "Lifting area · 3 min ago"
            : `PPE compliance ${site.score}% today`}
        </span>
      </div>
      <div className={styles.delivery} data-done={notified}>
        <span>{notified ? <Check size={16} /> : <Bell size={16} />}</span>
        {site.alerts
          ? notified
            ? "Supervisor notified"
            : "Alert detected · checking footage"
          : "Site operating within configured rules"}
      </div>
    </div>
  );
  return (
    <div className={styles.demo} ref={ref}>
      <header>
        <div>
          <span className={styles.live} />
          <strong>All sites</strong>
          <span>Today</span>
        </div>
        <span>
          4 sites · <b>2 open alerts</b>
        </span>
      </header>
      {kind === 0 ? (
        <div className={styles.mapLayout}>
          <div className={styles.map} aria-label="Illustrative site map">
            <svg
              viewBox="0 0 600 440"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                className={styles.water}
                d="M400 -20 Q280 70 395 170 T440 300 T510 480"
              />
              <g className={styles.roads}>
                <path d="M-40 120L650 370M80 -20L370 460M-20 330L540 -20M290 -20L600 210" />
                <path d="M-40 210L550 420M10 -20L310 450M-20 420L560 45" />
              </g>
              <g className={styles.blocks}>
                <path d="M70 70h70v40H70zM180 110h85v46h-85zM280 230h65v45h-65zM90 270h70v50H90zM435 80h95v55h-95zM470 290h70v60h-70z" />
              </g>
            </svg>
            {sites.map((s, i) => (
              <button
                key={s.code}
                className={styles.pin}
                style={{ left: s.x + "%", top: s.y + "%" }}
                aria-pressed={expanded && selected === i}
                onClick={() => choose(i)}
                data-alert={s.alerts > 0}
              >
                <span>
                  <MapPin size={19} />
                  {s.alerts > 0 && <b>2</b>}
                </span>
                <strong>{s.name}</strong>
                <small>{s.score}% PPE</small>
              </button>
            ))}
            <span className={styles.mapNote}>Illustrative locations</span>
          </div>
          <div className={styles.mapDetail} data-open={expanded}>
            {expanded ? (
              evidence
            ) : (
              <div className={styles.overview}>
                <MapPin size={28} />
                <strong>Every site, one view</strong>
                <p>Watch compliance and open alerts across your projects.</p>
                <span>
                  Plant needs attention <ArrowUpRight size={16} />
                </span>
              </div>
            )}
          </div>
        </div>
      ) : kind === 1 ? (
        <SiteCameraWall />
      ) : (
        <div className={styles.inbox}>
          <div className={styles.siteList}>
            {sites.map((s, i) => (
              <button
                key={s.code}
                onClick={() => choose(i)}
                aria-pressed={selected === i}
              >
                <span className={styles.initial}>{s.code}</span>
                <span>
                  <strong>{s.name}</strong>
                  <small>{s.score}% PPE compliance</small>
                </span>
                <b data-alert={s.alerts > 0}>
                  {s.alerts || <Check size={14} />}
                </b>
              </button>
            ))}
          </div>
          {evidence}
        </div>
      )}
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
export function Prototypes() {
  return (
    <main id="main-content" className={styles.page}>
      <div className={styles.intro}>
        <p>Ailytics · Visual review</p>
        <h1>One view across every site</h1>
        <p>
          Three interactive directions. Each plays automatically; click a site
          to explore. Illustrative data and client footage.
        </p>
        <nav>
          {concepts.map((c, i) => (
            <a key={c[0]} href={"#concept-" + i}>
              {i + 1}. {c[0]}
            </a>
          ))}
        </nav>
      </div>
      {concepts.map((c, i) => (
        <section key={c[0]} id={"concept-" + i} className={styles.concept}>
          <div className={styles.description}>
            <span>
              0{i + 1} / {c[0]}
              {i === 0 ? " · Recommended" : ""}
            </span>
            <h2>{c[1]}</h2>
            <p>{c[2]}</p>
          </div>
          {i === 1 ? <SiteCameraWall /> : <Demo kind={i} />}
        </section>
      ))}
    </main>
  );
}
