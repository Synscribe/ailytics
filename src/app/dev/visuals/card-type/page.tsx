import Image from "next/image";
import Link from "next/link";
import { FlameIcon } from "lucide-react";
import { EventCard } from "@/components/visuals/visuals/_camera";
import s from "./type.module.css";
export default function Page() {
  return (
    <main className={s.page}>
      <Link href="/dev/visuals">← Visual inventory</Link>
      <h1>Is it the icon, the type, or both?</h1>
      <p>
        Same white card, content and size. Each version changes only the icon or
        typography.
      </p>
      <div className={s.grid}>
        {[
          {
            id: "original",
            title: "Original",
            detail: "Current font and icon circle.",
          },
          {
            id: "icon",
            title: "Icon only",
            detail: "Same type. Flame icon without its pastel circle.",
          },
          {
            id: "type",
            title: "Typography only",
            detail:
              "Neutral system font. Strong finding, quieter supporting text.",
          },
          {
            id: "combined",
            title: "Icon + typography",
            detail: "Both changes together. Original white card retained.",
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
