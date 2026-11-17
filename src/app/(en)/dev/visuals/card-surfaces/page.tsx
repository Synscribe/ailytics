import Image from "next/image";
import Link from "next/link";
import { FlameIcon } from "lucide-react";
import { EventCard } from "@/components/visuals/visuals/_camera";
import s from "./surfaces.module.css";
export default function Page() {
  return (
    <main className={s.page}>
      <Link href="/dev/visuals">← Visual inventory</Link>
      <h1>Compare the card surface.</h1>
      <p>
        Same toast, size and position. All four stay visible for comparison.
      </p>
      <div className={s.grid}>
        {[
          {
            id: "original",
            title: "Original",
            detail: "Current solid white card.",
          },
          {
            id: "frosted",
            title: "Frosted",
            detail: "Translucent white, backdrop blur and a fine edge.",
          },
          {
            id: "crisp",
            title: "Crisp",
            detail: "Tighter corners, a precise border and minimal shadow.",
          },
          {
            id: "floating",
            title: "Floating",
            detail: "Soft white, an inner highlight and layered shadow.",
          },
        ].map((v) => (
          <section key={v.id}>
            <h2>{v.title}</h2>
            <p>{v.detail}</p>
            <div className={`${s.stage} ${s[v.id]}`}>
              <Image
                src="/media/ailytics/stills/fire-smoke-detection.jpg"
                alt="Smoke above an industrial roofline"
                fill
                sizes="(max-width:760px) 90vw, 650px"
                className={s.image}
              />
              <EventCard
                className={s.toast}
                show
                instant
                icon={<FlameIcon />}
                title="Smoke detected"
                meta="Smoke plume above the roofline · Camera 11"
              />
            </div>
          </section>
        ))}
      </div>
      <p>Preview only. The existing visuals are unchanged.</p>
    </main>
  );
}
