import Link from "next/link";
import Pose from "./poor-ergonomics";
import Smoke from "./fire-smoke-detection";
import Ppe from "./ppe-hero";
import s from "./context.module.css";
export default function Page() {
  return (
    <main className={s.page}>
      <Link href="/dev/visuals">← Visual inventory</Link>
      <h1>Context, attached to the scene.</h1>
      <p>Three alternatives to notification cards. Each plays automatically.</p>
      <section>
        <div className={s.copy}>
          <span>01 / ATTACHED ANNOTATION</span>
          <h2>The measurement belongs beside the movement.</h2>
          <p>
            The angle resolves beside the worker, connected to the pose by a
            fine line.
          </p>
        </div>
        <div className={s.stage}>
          <Pose />
        </div>
      </section>
      <section>
        <div className={s.copy}>
          <span>02 / CAMERA STATUS</span>
          <h2>The camera tells you what changed.</h2>
          <p>
            The smoke grid stays intact. A slim frame-edge strip changes from
            monitoring to detection.
          </p>
        </div>
        <div className={s.stage}>
          <Smoke />
        </div>
      </section>
      <section>
        <div className={s.copy}>
          <span>03 / EXPANDABLE INSPECTOR</span>
          <h2>Details appear when they matter.</h2>
          <p>
            A worker label opens into the PPE check, then closes to a compact
            result. Click it to inspect or collapse.
          </p>
        </div>
        <div className={s.stage}>
          <Ppe />
        </div>
      </section>
      <p>Private prototypes. Existing mapped visuals are unchanged.</p>
    </main>
  );
}
