"use client";

import { ProblemStory } from "@/components/content-page/problem-story.client";
import { ArrowDown } from "lucide-react";
import ppe from "@/content/pages/uses/ppe-detection.json";
import construction from "@/content/pages/industries/construction.json";
import s from "./preview.module.css";

export default function Preview() {
  return (
    <main className={s.page}>
      <header className={s.intro}>
        <p>Layout prototype</p>
        <h1>
          Show the risk.
          <br />
          Then explain the gap.
        </h1>
        <p>
          Scroll through each problem, or select one. These layouts are also
          applied to the PPE and Construction pages.
        </p>
        <nav>
          <a href="#ppe">
            PPE <ArrowDown size={16} />
          </a>
          <a href="#construction">
            Construction <ArrowDown size={16} />
          </a>
        </nav>
      </header>
      <ProblemStory id="ppe" kind="ppe" content={ppe.problems} />
      <ProblemStory
        id="construction"
        kind="construction"
        content={construction.problems}
      />
    </main>
  );
}
