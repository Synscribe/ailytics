import Smoke from "./fire-smoke-detection";
import Ppe from "./ppe-hero";
import OriginalSmoke from "@/components/visuals/visuals/fire-smoke-detection.client";
import OriginalPpe from "@/components/visuals/visuals/ppe-hero.client";
import Link from "next/link";
import s from "./review.module.css";
export default function Page() {
  return (
    <main className={s.page}>
      <Link href="/dev/visuals">← All mapped visuals</Link>
      <h1>Same detection. Quieter overlays.</h1>
      <p>
        Left: existing. Right: proposed. Watch each loop to see the alert
        appear.
      </p>
      <h2>Smoke alert</h2>
      <div className={s.pair}>
        <div>
          <h3>Existing · full-width notification</h3>
          <div className={s.stage}>
            <OriginalSmoke />
          </div>
        </div>
        <div>
          <h3>Proposed · compact incident label</h3>
          <div className={s.stage}>
            <Smoke />
          </div>
        </div>
      </div>
      <h2>PPE inspector</h2>
      <div className={s.pair}>
        <div>
          <h3>Existing · stacked pills</h3>
          <div className={s.stage}>
            <OriginalPpe />
          </div>
        </div>
        <div>
          <h3>Proposed · plain rows and fine dividers</h3>
          <div className={s.stage}>
            <Ppe />
          </div>
        </div>
      </div>
      <p>
        Private comparison only. The existing site visuals have not changed.
      </p>
    </main>
  );
}
