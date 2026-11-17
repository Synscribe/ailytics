"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Play, Pause, FileText, ArrowUpRight } from "lucide-react";
import { useLoop } from "@/components/visuals/visuals/_kit";
import { ProjectVisual } from "@/components/visuals/project-visual";
import s from "./prototypes.module.css";

const shots = [
  "/media/ailytics/stills/machinery-proximity.jpg",
  "/media/ailytics/stills/ppe-detection.jpg",
  "/media/ailytics/stills/under-load-detection.jpg",
];
function Photo({ src, alt = "" }: { src: string; alt?: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 760px) 90vw, 650px"
      className={s.photo}
    />
  );
}
function Playback({ paused, toggle }: { paused: boolean; toggle: () => void }) {
  return (
    <button className={s.play} onClick={toggle}>
      {paused ? <Play size={14} /> : <Pause size={14} />}{" "}
      {paused ? "Resume tour" : "Pause"}
    </button>
  );
}

function Hardware() {
  const [selected, setSelected] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const { ref, phase, reduce } = useLoop(6, 1400, !paused && selected === null);
  const active = selected ?? Math.min(2, Math.floor(phase / 2));
  return (
    <div ref={ref} className={s.hardware}>
      <div className={s.hardwareTop}>
        <span className={s.eyebrow}>YOUR EXISTING CAMERAS</span>
        <Playback
          paused={paused || selected !== null}
          toggle={() => {
            setSelected(null);
            setPaused(!(paused || selected !== null));
          }}
        />
      </div>
      <div className={s.cameras}>
        {["Bullet camera", "Dome camera", "PTZ camera"].map((name, i) => (
          <button
            key={name}
            onClick={() => setSelected(i)}
            aria-pressed={active === i}
            className={s.camera}
          >
            <svg viewBox="0 0 120 72" aria-hidden="true">
              <g fill="var(--paper)" stroke="currentColor" strokeWidth="2">
                {i === 0 ? (
                  <>
                    <path d="M20 17h62l15 12-12 22H27z" />
                    <path d="M48 51v13H25" />
                    <ellipse cx="86" cy="35" rx="8" ry="13" />
                  </>
                ) : i === 1 ? (
                  <>
                    <path d="M24 24h72v9H24z" />
                    <path d="M30 33a30 30 0 0 0 60 0" />
                    <circle cx="60" cy="45" r="10" />
                  </>
                ) : (
                  <>
                    <path d="M42 12h37v15H42zM32 27h56v17a28 24 0 0 1-56 0z" />
                    <circle cx="60" cy="46" r="11" />
                  </>
                )}
              </g>
            </svg>
            <span>{name}</span>
            <small>
              <Check size={12} /> {reduce || phase >= i ? "Connected" : "Ready"}
            </small>
          </button>
        ))}
      </div>
      <div className={s.connections}>
        <svg viewBox="0 0 600 50" preserveAspectRatio="none" aria-hidden="true">
          {[100, 300, 500].map((x, i) => (
            <path
              key={x}
              d={`M${x} 0 V18 Q${x} 28 ${x < 300 ? x + 12 : x > 300 ? x - 12 : x} 28 H300 V50`}
              stroke={active === i ? "var(--signal)" : "var(--line)"}
              strokeWidth={active === i ? 3 : 1.5}
              fill="none"
            />
          ))}
        </svg>
        <span>RTSP / ONVIF</span>
      </div>
      <div className={s.receiver}>
        <div className={s.feed}>
          <Photo src={shots[active]} />
          <span className={s.feedLabel}>
            <i /> Camera 0{active + 1}
          </span>
        </div>
        <div className={s.receiverCopy}>
          <span className={s.eyebrow}>AILYTiCS</span>
          <h3>One connected view.</h3>
          <p>Bring the cameras you already own.</p>
          <span className={s.connected}>
            <Check size={14} /> Feed connected
          </span>
        </div>
      </div>
    </div>
  );
}
const moments = [
  { time: "07:00", state: "Working", note: "Loading bay activity" },
  { time: "08:30", state: "Idle", note: "No machinery activity" },
  { time: "09:15", state: "Working", note: "Loading resumes" },
  { time: "11:30", state: "Idle", note: "Machine remains stationary" },
  { time: "12:30", state: "Working", note: "Afternoon activity" },
  { time: "15:00", state: "Working", note: "Shift review complete" },
];
function Machinery() {
  const [manual, setManual] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const { ref, phase } = useLoop(6, 1400, manual === null && !paused);
  const index = manual ?? phase;
  const m = moments[index];
  return (
    <div className={s.machine} ref={ref}>
      <div className={s.machineImage}>
        <Photo src={shots[0]} />
        <div className={s.imageTop}>
          <span>Camera 02 · Loading bay</span>
          <span>{m.time}</span>
        </div>
        <div className={s.machineBox} data-idle={m.state === "Idle"}>
          <span>Forklift 02 · {m.state}</span>
        </div>
        <div className={s.caption}>
          <strong>{m.state}</strong>
          <span>{m.note}</span>
        </div>
      </div>
      <div className={s.timelinePanel}>
        <div className={s.hardwareTop}>
          <strong>A working day, at a glance.</strong>
          <Playback
            paused={paused || manual !== null}
            toggle={() => {
              setManual(null);
              setPaused(!(paused || manual !== null));
            }}
          />
        </div>
        <div className={s.track}>
          {moments.map((item, i) => (
            <button
              key={item.time}
              aria-label={`${item.time}: ${item.state}`}
              aria-pressed={index === i}
              onClick={() => setManual(i)}
              data-idle={item.state === "Idle"}
              data-active={index === i}
            />
          ))}
        </div>
        <input
          aria-label="Review machinery timeline"
          type="range"
          min={0}
          max={5}
          value={index}
          onChange={(e) => setManual(Number(e.target.value))}
        />
        <div className={s.timeLabels}>
          <span>07:00</span>
          <span>11:00</span>
          <span>15:00</span>
        </div>
        <div className={s.legend}>
          <span>
            <i /> Working
          </span>
          <span>
            <i className={s.idle} /> Idle
          </span>
          <small>Illustrative shift · drag to explore</small>
        </div>
      </div>
    </div>
  );
}
function Reporting() {
  const [manual, setManual] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const { ref, phase, reduce } = useLoop(6, 1400, manual === null && !paused);
  const step = manual ?? Math.min(2, Math.floor(phase / 2));
  return (
    <div className={s.reporting} ref={ref}>
      <div className={s.reportTabs}>
        {["Evidence", "Trends", "Report"].map((label, i) => (
          <button
            key={label}
            aria-pressed={step === i}
            onClick={() => setManual(i)}
          >
            <span>0{i + 1}</span>
            {label}
          </button>
        ))}
      </div>
      <div className={s.sheet}>
        <div className={s.sheetHead}>
          <FileText size={22} />
          <span>
            Site safety report<small>Illustrative preview</small>
          </span>
          <span className={s.reportStatus}>
            {step === 2 ? "Ready to review" : "Assembling"}
          </span>
        </div>
        <h3>From incidents to evidence.</h3>
        <p>Camera footage, detections and trends in one report.</p>
        <div className={s.evidence}>
          {shots.slice(1).map((src, i) => (
            <div key={src}>
              <div className={s.thumb}>
                <Photo src={src} />
                <span>0{i + 1}</span>
              </div>
              <strong>
                {i === 0 ? "PPE compliance" : "Lifting operations"}
              </strong>
              <small>Camera evidence attached</small>
            </div>
          ))}
        </div>
        <div className={s.chart} style={{ opacity: step >= 1 ? 1 : 0.25 }}>
          <span>
            Detection activity <small>Sample trend</small>
          </span>
          <svg
            viewBox="0 0 440 64"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d="M0 58H440 M0 30H440" stroke="var(--line)" fill="none" />
            <path
              d="M0 12L40 20L80 15L120 35L160 25L200 43L240 31L280 50L320 43L360 51L400 46L440 57"
              stroke="var(--signal)"
              strokeWidth="3"
              fill="none"
              style={{
                strokeDasharray: 520,
                strokeDashoffset: step >= 1 ? 0 : 520,
                transition: reduce ? "none" : "stroke-dashoffset 1s ease",
              }}
            />
          </svg>
        </div>
        <div className={s.sheetFooter}>
          <Check size={16} />
          {step === 2
            ? "Evidence and trend summary compiled"
            : "Collecting the details that matter"}
          <span>01</span>
        </div>
      </div>
      <div className={s.reportControls}>
        <span>Evidence → trends → report</span>
        <Playback
          paused={paused || manual !== null}
          toggle={() => {
            setManual(null);
            setPaused(!(paused || manual !== null));
          }}
        />
      </div>
    </div>
  );
}
export function Alternatives() {
  return (
    <main className={s.page}>
      <header className={s.header}>
        <Link href="/dev/visuals">← Visual inventory</Link>
        <p className={s.eyebrow}>FEATURE VISUALS / THREE ALTERNATIVES</p>
        <h1>Show the feature in action.</h1>
        <p>
          Autoplay tells the full story. Select a camera, scrub a shift, or
          explore a report.
        </p>
        <nav>
          <a href="#hardware">01 Connections</a>
          <a href="#machinery">02 Machinery</a>
          <a href="#reporting">03 Reporting</a>
        </nav>
      </header>
      <section id="hardware" className={s.section}>
        <div className={s.copy}>
          <span className={s.eyebrow}>01 / HARDWARE-AGNOSTIC</span>
          <h2>
            Your cameras.
            <br />
            One connected view.
          </h2>
          <p>
            An open connection diagram becomes a live camera preview. Try
            selecting a different camera.
          </p>
          <details>
            <summary>
              Compare current visual <ArrowUpRight size={14} />
            </summary>
            <div className={s.current}>
              <ProjectVisual id="hardware-agnostic" />
            </div>
          </details>
        </div>
        <Hardware />
      </section>
      <section id="machinery" className={s.section}>
        <div className={s.copy}>
          <span className={s.eyebrow}>02 / MACHINERY-USAGE</span>
          <h2>
            See where the
            <br />
            working day goes.
          </h2>
          <p>
            Footage leads, with working and idle periods below it. Scrub the
            timeline to inspect each moment.
          </p>
          <details>
            <summary>
              Compare current visual <ArrowUpRight size={14} />
            </summary>
            <div className={s.current}>
              <ProjectVisual id="machinery-usage" />
            </div>
          </details>
        </div>
        <Machinery />
      </section>
      <section id="reporting" className={s.section}>
        <div className={s.copy}>
          <span className={s.eyebrow}>03 / UNLIMITED-REPORTING</span>
          <h2>
            A report you
            <br />
            can actually picture.
          </h2>
          <p>
            Evidence collects on a document, followed by the trend and a
            finished summary. Select a step to inspect it.
          </p>
          <details>
            <summary>
              Compare current visual <ArrowUpRight size={14} />
            </summary>
            <div className={s.current}>
              <ProjectVisual id="unlimited-reporting" />
            </div>
          </details>
        </div>
        <Reporting />
      </section>
      <footer className={s.footer}>
        Private prototypes. Illustrative data and still footage. Existing mapped
        visuals remain unchanged.
      </footer>
    </main>
  );
}
