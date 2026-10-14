"use client";
import { useState } from "react";
import Image from "next/image";
import {
  User,
  HardHat,
  Bell,
  Check,
  Play,
  Pause,
  FileText,
  ChevronRight,
  MapPin,
} from "lucide-react";
import { useLoop } from "@/components/visuals/visuals/_kit";
import s from "./workflows.module.css";
function Photo({ src }: { src: string }) {
  return (
    <Image
      src={src}
      alt="Illustrative camera evidence"
      fill
      sizes="(max-width:760px) 90vw, 700px"
      className={s.photo}
    />
  );
}
function Control({
  paused,
  onClick,
}: {
  paused: boolean;
  onClick: () => void;
}) {
  return (
    <button className={s.control} onClick={onClick}>
      {paused ? <Play size={12} /> : <Pause size={12} />}{" "}
      {paused ? "Resume demo" : "Pause"}
    </button>
  );
}
export function Rules() {
  const [paused, setPaused] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const { ref, phase } = useLoop(8, 1000, !paused && selected === null);
  const step = selected ?? phase;
  return (
    <div ref={ref} className={s.app}>
      <div className={s.toolbar}>
        <span>
          Use cases <ChevronRight size={12} />{" "}
          <strong>PPE at loading bay</strong>
        </span>
        <span className={s.state}>{step >= 6 ? "● Running" : "Draft"}</span>
      </div>
      <div className={s.ruleCanvas}>
        <div className={s.gridDots} />
        <svg
          className={s.wires}
          viewBox="0 0 600 310"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M135 92H190Q205 92 205 107V167Q205 182 220 182H260 M390 182H430Q445 182 445 167V92Q445 77 460 77H485"
            fill="none"
            stroke="var(--line)"
            strokeWidth="2"
          />
          <path
            d="M135 92H190Q205 92 205 107V167Q205 182 220 182H260 M390 182H430Q445 182 445 167V92Q445 77 460 77H485"
            fill="none"
            stroke="var(--signal)"
            strokeWidth="2"
            strokeDasharray="650"
            strokeDashoffset={step >= 4 ? 0 : step >= 2 ? 330 : 650}
            style={{ transition: "stroke-dashoffset 1s ease" }}
          />
        </svg>
        <button
          className={`${s.node} ${s.person}`}
          data-active={step < 2}
          onClick={() => setSelected(1)}
        >
          <span className={s.nodeType}>
            <User size={14} /> DETECT
          </span>
          <strong>Person</strong>
          <small>Camera 02 · Loading bay</small>
          <i />
        </button>
        <button
          className={`${s.node} ${s.condition}`}
          data-active={step >= 2 && step < 4}
          onClick={() => setSelected(3)}
        >
          <span className={s.nodeType}>
            <HardHat size={14} /> CONDITION
          </span>
          <strong>Missing hard hat</strong>
          <small>Inside the selected zone</small>
          <i />
        </button>
        <button
          className={`${s.node} ${s.action}`}
          data-active={step >= 4}
          onClick={() => setSelected(5)}
        >
          <span className={s.nodeType}>
            <Bell size={14} /> ACTION
          </span>
          <strong>Alert supervisor</strong>
          <small>Include camera evidence</small>
        </button>
        <div className={s.canvasCaption}>
          {step >= 6 ? (
            <>
              <Check size={13} /> Rule connected and running
            </>
          ) : step >= 4 ? (
            "Choose the response"
          ) : step >= 2 ? (
            "Add the condition to check"
          ) : (
            "Start with what to detect"
          )}
        </div>
      </div>
      <div className={s.bottom}>
        <span>
          {selected !== null
            ? "Inspecting selected step"
            : "Detect → check → alert"}
        </span>
        <Control
          paused={paused || selected !== null}
          onClick={() => {
            setSelected(null);
            setPaused(!(paused || selected !== null));
          }}
        />
      </div>
    </div>
  );
}
const sites = [
  {
    name: "North yard",
    x: 28,
    y: 32,
    alerts: 0,
    src: "/media/ailytics/stills/machinery-proximity.jpg",
  },
  {
    name: "Plant 2",
    x: 65,
    y: 28,
    alerts: 3,
    src: "/media/ailytics/stills/under-load-detection.jpg",
  },
  {
    name: "Tower site",
    x: 48,
    y: 61,
    alerts: 1,
    src: "/media/ailytics/stills/ppe-detection.jpg",
  },
];
export function Sites() {
  const [manual, setManual] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const { ref, phase } = useLoop(6, 1400, manual === null && !paused);
  const active = manual ?? Math.floor(phase / 2);
  const site = sites[active];
  return (
    <div ref={ref} className={s.app}>
      <div className={s.toolbar}>
        <span>
          <strong>Global view</strong>
          <span className={s.muted}>3 sites · illustrative data</span>
        </span>
        <Control
          paused={paused || manual !== null}
          onClick={() => {
            setManual(null);
            setPaused(!(paused || manual !== null));
          }}
        />
      </div>
      <div className={s.siteLayout}>
        <div className={s.map}>
          <svg
            viewBox="0 0 600 430"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <rect width="600" height="430" fill="var(--muted)" />
            <path
              d="M420 0Q350 80 435 180T395 430H600V0Z"
              fill="var(--signal)"
              opacity=".14"
            />
            <g fill="var(--paper)" stroke="var(--line)">
              {Array.from({ length: 20 }, (_, i) => (
                <rect
                  key={i}
                  x={20 + (i % 5) * 78}
                  y={16 + Math.floor(i / 5) * 110}
                  width={60}
                  height={78}
                  rx={3}
                />
              ))}
            </g>
            <g fill="none" stroke="var(--paper)" strokeWidth="15">
              <path d="M0 112L400 92L600 140M0 260L420 290M125 0L155 430M330 0L280 430" />
            </g>
          </svg>
          {sites.map((item, i) => (
            <button
              key={item.name}
              className={s.pin}
              data-active={active === i}
              data-alert={item.alerts > 0}
              style={{ left: `${item.x}%`, top: `${item.y}%` }}
              onClick={() => setManual(i)}
              aria-pressed={active === i}
            >
              <MapPin size={21} />
              <span>{item.name}</span>
            </button>
          ))}
          <span className={s.mapNote}>Illustrative site locations</span>
        </div>
        <aside className={s.sitePanel}>
          <div className={s.sitePhoto}>
            <Photo src={site.src} />
          </div>
          <small>SITE OVERVIEW</small>
          <h3>{site.name}</h3>
          <div className={s.siteAlert} data-alert={site.alerts > 0}>
            <span>{site.alerts}</span>
            <div>
              <strong>Open alerts</strong>
              <small>
                {site.alerts ? "Review camera evidence" : "No open alerts"}
              </small>
            </div>
          </div>
          <div className={s.siteRow}>
            <span>Camera feed</span>
            <strong>Connected</strong>
          </div>
          <div className={s.siteRow}>
            <span>Monitoring</span>
            <strong>Active</strong>
          </div>
        </aside>
      </div>
    </div>
  );
}
export function Reports() {
  const [paused, setPaused] = useState(false);
  const [manual, setManual] = useState<number | null>(null);
  const { ref, phase } = useLoop(8, 1000, !paused && manual === null);
  const step = manual ?? phase;
  return (
    <div ref={ref} className={s.app}>
      <div className={s.toolbar}>
        <span>
          Alerts <ChevronRight size={12} />
          <strong>Incident evidence</strong>
        </span>
        <Control
          paused={paused || manual !== null}
          onClick={() => {
            setManual(null);
            setPaused(!(paused || manual !== null));
          }}
        />
      </div>
      <div className={s.reportBody}>
        <div className={s.evidenceImage}>
          <Photo src="/media/ailytics/stills/ppe-detection.jpg" />
          <span className={s.evidenceLabel}>Camera 04 · Gate 2</span>
          <div className={s.evidenceBox} />
        </div>
        <div className={s.eventInfo}>
          <div>
            <small>ILLUSTRATIVE INCIDENT</small>
            <h3>Missing hard hat</h3>
            <p>Camera evidence and event details attached.</p>
          </div>
          <button
            className={s.reportButton}
            onClick={() => setManual(step >= 3 ? 1 : 7)}
          >
            <FileText size={14} />{" "}
            {step >= 3 ? "Close report" : "Prepare report"}
          </button>
        </div>
        <div className={s.exportPanel} data-open={step >= 3}>
          <div className={s.exportHead}>
            <FileText size={16} />
            <strong>Incident report</strong>
            <span>{step >= 6 ? "Ready" : "Preparing"}</span>
          </div>
          {["Event details", "Camera evidence", "Review history"].map(
            (label, i) => (
              <div className={s.exportRow} key={label}>
                <span>{label}</span>
                <span>{step >= i + 4 ? <Check size={13} /> : "—"}</span>
              </div>
            ),
          )}
          <div className={s.exportFooter}>
            <span>
              {step >= 6
                ? "Report compiled with supporting evidence"
                : "Collecting the incident record"}
            </span>
            <span>PDF</span>
          </div>
        </div>
      </div>
      <div className={s.bottom}>
        <span>Evidence → event record → report</span>
        <span>Illustrative workflow</span>
      </div>
    </div>
  );
}
