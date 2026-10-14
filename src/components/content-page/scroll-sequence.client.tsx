import styles from "./scroll-sequence.module.css";

type Item = { title: string; description: string };

export function ScrollSequence({
  items,
  tone = "signal",
}: {
  items: Item[];
  tone?: "signal" | "alert";
}) {
  return (
    <ol
      className={styles.sequence}
      data-tone={tone}
      style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}
    >
      {items.map((item, index) => (
        <li className={styles.step} key={item.title}>
          {tone === "signal" && (
            <span className={styles.number} aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
          )}
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </li>
      ))}
    </ol>
  );
}
