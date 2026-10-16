import { PictureCard } from "@/components/picture-card/picture-card";
import type { VisualId } from "@/lib/visuals";

import styles from "./use-case-bento.module.css";

export type UseCaseTile = {
  id: VisualId;
  title: string;
  body: string;
  href: string;
};

/** Use-case picture cards in staggered columns of tall and short tiles. */
export function UseCaseBento({ items }: { items: UseCaseTile[] }) {
  return (
    <ul className={styles.bento}>
      {items.map((item) => (
        <li key={item.id}>
          <PictureCard
            body={item.body}
            href={item.href}
            title={item.title}
            visualId={item.id}
          />
        </li>
      ))}
    </ul>
  );
}
