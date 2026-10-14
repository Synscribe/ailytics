import Link from "next/link";
import { ProjectVisual } from "@/components/visuals/project-visual";
import type { VisualId } from "@/lib/visuals";
import s from "./preview.module.css";

const cards: {
  title: string;
  description: string;
  href: string;
  visualId: VisualId;
}[] = [
  {
    title: "PPE detection",
    description: "Spots missing hard hats, vests and gloves in each work area.",
    href: "/uses/ppe-detection",
    visualId: "ppe-hero",
  },
  {
    title: "Construction",
    description:
      "Machinery, open edges, suspended loads and missing PPE on busy outdoor sites.",
    href: "/industries/construction",
    visualId: "construction-hero",
  },
];

export default function Preview() {
  return (
    <main className={s.page} id="main-content">
      <header className={s.intro}>
        <Link href="/dev/visuals">Visual workshop</Link>
        <h1>Hub cards</h1>
        <p>
          PPE and Construction, using the same animations as their hero
          sections.
        </p>
      </header>
      <div className={s.pair}>
        {cards.map((card) => (
          <article key={card.href} className={s.card}>
            <Link href={card.href} className={s.cardLink}>
              <div className={s.media}>
                <ProjectVisual
                  id={card.visualId}
                  fill
                  sizes="(min-width: 1024px) 42vw, (min-width: 701px) 45vw, 92vw"
                />
              </div>
              <div className={s.copy}>
                <h2>{card.title}</h2>
                <p>{card.description}</p>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}
