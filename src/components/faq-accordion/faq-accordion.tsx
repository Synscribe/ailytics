import Link from "next/link";
import { parseInlineLinks } from "@/lib/page-content";
import styles from "./faq-accordion.module.css";

/** Native disclosures retain keyboard, link and no-JavaScript behaviour. */
export function FaqAccordion({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  return (
    <div className={styles.accordion}>
      {items.map((item) => (
        <details className={styles.item} name="page-faq" key={item.question}>
          <summary>
            <h3>{item.question}</h3>
            <span className={styles.icon} aria-hidden="true" />
          </summary>
          <div className={styles.answer}>
            <p>
              {parseInlineLinks(item.answer).map((part, i) =>
                part.kind === "link" ? (
                  <Link href={part.href} key={i}>
                    {part.value}
                  </Link>
                ) : (
                  <span key={i}>{part.value}</span>
                ),
              )}
            </p>
          </div>
        </details>
      ))}
    </div>
  );
}
