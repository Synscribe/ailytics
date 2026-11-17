"use client";
import { useState, type ReactNode } from "react";
import Link from "next/link";
import { ProjectVisual } from "@/components/visuals/project-visual";
import type { VisualId } from "@/lib/visuals";
import Water from "./water";
import Custom from "@/components/visuals/visuals/custom-use-cases.client";
import Report from "@/components/visuals/visuals/unlimited-reporting.client";
import Sites from "@/components/visuals/visuals/multi-site-dashboard.client";
import Hours from "@/components/visuals/visuals/man-hour-tracking.client";
import Machinery from "@/components/visuals/visuals/machinery-usage.client";
import Hardware from "@/components/visuals/visuals/hardware-agnostic.client";
import Edge from "@/components/visuals/visuals/edge-engine.client";
import s from "./review.module.css";
function Sample({
  id,
  title,
  note,
  children,
  kind = "",
}: {
  id: VisualId;
  title: string;
  note: string;
  children: ReactNode;
  kind?: string;
}) {
  const [original, setOriginal] = useState(false);
  return (
    <section>
      <header>
        <div>
          <small>{id}</small>
          <h2>{title}</h2>
        </div>
        <button onClick={() => setOriginal(!original)} aria-pressed={original}>
          {original ? "Show refinement" : "Compare original"}
        </button>
      </header>
      <div
        className={`${s.stage} ${!original ? s.refined : ""} ${kind ? s[kind] : ""}`}
      >
        {original ? <ProjectVisual id={id} fill /> : children}
      </div>
      <p>{note}</p>
    </section>
  );
}
export default function Review() {
  return (
    <main className={s.page}>
      <Link href="/dev/visuals">← Mapped visuals</Link>
      <h1>Less framing. More clarity.</h1>
      <p>
        The same animated stories with one surface, finer borders and fewer
        pills. Compare each against its current version.
      </p>
      <div className={s.grid}>
        <Sample
          id="water-hazard"
          title="A person, not a pointer"
          note="The dot now carries a Person label. Only the last two footsteps remain, so the line no longer looks like a callout."
          kind="water"
        >
          <Water />
        </Sample>
        <Sample
          id="custom-use-cases"
          title="A rule assembled in steps"
          note="Flat, squared rule rows with a connecting spine. The selected values lead; labels stay secondary."
          kind="rules"
        >
          <Custom />
        </Sample>
        <Sample
          id="unlimited-reporting"
          title="Evidence in a report"
          note="A document-like surface with fine dividers. Report controls and status no longer compete with the evidence."
          kind="report"
        >
          <Report />
        </Sample>
        <Sample
          id="multi-site-dashboard"
          title="Sites and exceptions"
          note="The map gets a single boundary. Site statuses sit in a clean list rather than separate pill-shaped containers."
          kind="sites"
        >
          <Sites />
        </Sample>
        <Sample
          id="man-hour-tracking"
          title="Time by work area"
          note="An open chart with a clear total. Narrower marks and quieter labels make the data the focus."
          kind="hours"
        >
          <Hours />
        </Sample>
        <Sample
          id="machinery-usage"
          title="Working and idle time"
          note="Three unboxed numbers above the timeline. Colour is reserved for the activity itself."
          kind="machinery"
        >
          <Machinery />
        </Sample>
        <Sample
          id="hardware-agnostic"
          title="Existing camera connections"
          note="A technical diagram with smaller corner radii and fine outlines, without nested frames."
          kind="hardware"
        >
          <Hardware />
        </Sample>
        <Sample
          id="edge-engine"
          title="Where processing happens"
          note="A restrained site boundary and flatter processing nodes. Only the active destination receives emphasis."
          kind="edge"
        >
          <Edge />
        </Sample>
      </div>
      <p>Private styling study. Production visuals are unchanged.</p>
    </main>
  );
}
