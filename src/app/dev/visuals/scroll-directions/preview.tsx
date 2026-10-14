import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { ConstructionCameraStory } from "@/app/industries/[slug]/_components/construction-camera-story.client";
import s from "./preview.module.css";
export default function Preview() {
  return (
    <main className={s.page}>
      <header className={s.intro}>
        <Link href="/dev/visuals">Visual workshop</Link>
        <span className={s.small}>SCROLL STUDY · PRIVATE PREVIEW</span>
        <h1>
          Make the camera story
          <br />
          part of the scroll.
        </h1>
        <p>
          Construction mosaic using your existing footage, colours and type.
          This is an isolated prototype, not an extra section on the
          Construction page.
        </p>
        <nav>
          <a href="#camera-coverage">
            View Construction mosaic <ArrowDown size={15} />
          </a>
        </nav>
      </header>
      <ConstructionCameraStory />
      <footer className={s.end}>
        <h2>
          The same footage.
          <br />A clearer sequence.
        </h2>
        <p>
          Construction moves from site coverage to one hazard, within a single
          feature visual.
        </p>
        <a href="#">Back to the top ↑</a>
      </footer>
    </main>
  );
}
