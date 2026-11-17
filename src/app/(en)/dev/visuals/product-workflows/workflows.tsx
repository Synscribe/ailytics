"use client";
import Link from "next/link";
import {
  Rules,
  Sites,
  Reports,
} from "@/components/visuals/visuals/workflows.client";
import s from "./workflows.module.css";
export default function Workflows() {
  return (
    <main className={s.page}>
      <Link href="/dev/visuals">← Mapped visuals</Link>
      <h1>Built around the actual product.</h1>
      <p>
        Three focused interactions drawn from the Ailyssa walkthrough.
        Simplified for the website, with illustrative data.
      </p>
      <section>
        <div className={s.copy}>
          <small>01 / CUSTOM USE CASES</small>
          <h2>Connect the detection to the response.</h2>
          <p>
            A node canvas assembles the rule. Select any node to hold that step.
          </p>
        </div>
        <Rules />
      </section>
      <section>
        <div className={s.copy}>
          <small>02 / MULTI-SITE</small>
          <h2>Choose a site. See what needs attention.</h2>
          <p>
            The map and camera evidence share one view. Select a site or let the
            tour run.
          </p>
        </div>
        <Sites />
      </section>
      <section>
        <div className={s.copy}>
          <small>03 / REPORTING</small>
          <h2>Start with the incident. Keep the evidence.</h2>
          <p>
            The camera record becomes a report. Open the report panel yourself,
            or watch the sequence.
          </p>
        </div>
        <Reports />
      </section>
      <p>These workflows now power the mapped site visuals.</p>
    </main>
  );
}
