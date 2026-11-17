import Image from "next/image";
import Link from "next/link";
import { Flame, TriangleAlert, Check } from "lucide-react";
import s from "./directions.module.css";
export default function Page() {
  return (
    <main className={s.page}>
      <Link href="/dev/visuals">← Visual inventory</Link>
      <h1>Three stronger toast directions.</h1>
      <p>Built from your references, on the existing smoke footage.</p>
      <div className={s.grid}>
        <section>
          <header>
            <span>01</span>
            <h2>Striped warning</h2>
          </header>
          <div className={s.scene}>
            <Photo />
            <div className={s.striped}>
              <TriangleAlert size={18} />
              <div>
                <strong>Smoke detected</strong>
                <small>Camera 11 · North perimeter</small>
              </div>
              <span className={s.time}>Just now</span>
            </div>
          </div>
          <p>
            A warm warning surface. The diagonal pattern fades behind the
            message.
          </p>
        </section>
        <section>
          <header>
            <span>02</span>
            <h2>Camera-edge tab</h2>
          </header>
          <div className={s.scene}>
            <Photo />
            <div className={s.notch}>
              <small>CAMERA 11 · NORTH PERIMETER</small>
              <div>
                <span className={s.pixel} />
                <strong>Smoke detected</strong>
              </div>
            </div>
          </div>
          <p>
            A compact tab attached to the camera frame. The status arrives from
            the edge.
          </p>
        </section>
        <section>
          <header>
            <span>03</span>
            <h2>Tinted incident</h2>
          </header>
          <div className={s.scene}>
            <Photo />
            <div className={s.tinted}>
              <span className={s.symbol}>
                <Flame size={16} />
              </span>
              <div>
                <strong>Smoke detected</strong>
                <small>Camera 11 · North perimeter</small>
              </div>
              <span className={s.time}>Just now</span>
            </div>
          </div>
          <p>
            A restrained dark alert with a coral tint, a fine edge and compact
            typography.
          </p>
        </section>
        <section>
          <header>
            <span>03 / POSITIVE STATE</span>
            <h2>Same treatment, PPE confirmed</h2>
          </header>
          <div className={s.scene}>
            <Image
              src="/media/ailytics/stills/ppe-hero.jpg"
              alt="Workers on a construction site"
              fill
              sizes="(max-width:760px) 90vw, 650px"
              className={s.photo}
            />
            <div className={`${s.tinted} ${s.success}`}>
              <span className={s.symbol}>
                <Check size={16} />
              </span>
              <div>
                <strong>PPE check complete</strong>
                <small>Worker 1 · Hard hat, vest and gloves worn</small>
              </div>
              <span className={s.time}>Verified</span>
            </div>
          </div>
          <p>
            The same visual language carries across alerts and successful
            checks.
          </p>
        </section>
      </div>
      <p>
        Style preview. All notifications stay visible. No changes to the live
        mapped visuals.
      </p>
    </main>
  );
}
function Photo() {
  return (
    <Image
      src="/media/ailytics/stills/fire-smoke-detection.jpg"
      alt="Smoke above an industrial roofline"
      fill
      sizes="(max-width:760px) 90vw, 650px"
      className={s.photo}
    />
  );
}
