import Link from "next/link";

import { ProjectVisual } from "@/components/visuals/project-visual";
import type { VisualId } from "@/lib/visuals";

import styles from "./picture-card.module.css";

/**
 * A linked card whose picture fills it: a greyscale camera view with only the
 * AI's boxes in colour, and the title and summary on a slate shade. Hover
 * brings the colour back. It fills its parent, so the layout sets the size.
 */
export function PictureCard({
  href,
  title,
  body,
  visualId,
  sizes = "(min-width: 1024px) 34vw, 92vw",
}: {
  href: string;
  title: string;
  body: string;
  visualId: VisualId;
  sizes?: string;
}) {
  return (
    <Link className={styles.card} href={href}>
      <div className={styles.vis}>
        <ProjectVisual fill id={visualId} sizes={sizes} />
      </div>
      <div className={styles.text}>
        <h3>{title}</h3>
        <p>{body}</p>
      </div>
    </Link>
  );
}
