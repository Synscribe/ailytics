"use client";

import { useEffect, useState } from "react";
import styles from "./section-annotator.module.css";

type Page = "home" | "ppe" | "construction";
type Mark = { dark: boolean; note: string; title?: string };
type Review = {
  blue: string;
  pages: Partial<Record<Page, Record<string, Mark>>>;
};
const KEY = "ailytics-section-review-v1";
const BLUES = ["#26517C", "#27405D", "#3E739E"];
const empty: Review = {
  blue: "#27405D",
  pages: {
    ppe: { s5: { dark: true, note: "" } },
    construction: { s5: { dark: true, note: "" } },
    home: Object.fromEntries(
      ["s2", "s5", "s7", "s9"].map((id) => [id, { dark: true, note: "" }]),
    ),
  },
};

function readReview(): Review {
  try {
    const encoded = new URL(location.href).searchParams.get("review");
    const raw = encoded ?? localStorage.getItem(KEY);
    if (!raw) return empty;
    const data = JSON.parse(raw) as Review;
    if (
      !BLUES.includes(data.blue) ||
      !data.pages ||
      typeof data.pages !== "object"
    )
      return empty;
    const pages: Review["pages"] = {};
    for (const page of ["home", "ppe", "construction"] as const) {
      const entries = data.pages[page];
      if (!entries || typeof entries !== "object") continue;
      pages[page] = Object.fromEntries(
        Object.entries(entries).filter(
          ([id, mark]) =>
            /^s\d+$/.test(id) &&
            mark &&
            typeof mark.dark === "boolean" &&
            typeof mark.note === "string",
        ),
      );
    }
    // Detail pages share section fills; notes and titles remain page-specific.
    const detail = pages.ppe ?? pages.construction ?? empty.pages.ppe!;
    for (const target of ["ppe", "construction"] as const) {
      const marks = { ...pages[target] };
      for (let i = 0; i < 8; i++) {
        const id = `s${i}`;
        marks[id] = {
          ...(marks[id] ?? { note: "", dark: false }),
          dark: detail[id]?.dark ?? false,
        };
      }
      pages[target] = marks;
    }
    return { blue: data.blue, pages };
  } catch {
    return empty;
  }
}

export function SectionAnnotator({ page }: { page: Page }) {
  const [review, setReview] = useState<Review>(empty);
  const [sections, setSections] = useState<{ id: string; title: string }[]>([]);
  const [open, setOpen] = useState(true);
  const [status, setStatus] = useState("");
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>(
      "[data-surface-preview] main > section",
    );
    const frame = requestAnimationFrame(() => {
      setSections(
        Array.from(nodes, (node, i) => {
          const id = `s${i}`;
          node.dataset.reviewSection = id;
          return {
            id,
            title:
              node.querySelector("h1,h2")?.textContent?.trim() ||
              "Closing call to action",
          };
        }),
      );
      const saved = readReview();
      const marks = { ...saved.pages[page] };
      nodes.forEach((node, index) => {
        const id = `s${index}`;
        marks[id] = {
          ...(marks[id] ?? { dark: false, note: "" }),
          title:
            node.querySelector("h1,h2")?.textContent?.trim() ||
            "Closing call to action",
        };
      });
      setReview({ ...saved, pages: { ...saved.pages, [page]: marks } });
      setReady(true);
    });
    return () => {
      cancelAnimationFrame(frame);
      document.documentElement.style.removeProperty("--review-brand-blue");
      nodes.forEach((node) => {
        delete node.dataset.reviewSection;
        delete node.dataset.sectionTone;
      });
    };
  }, [page]);
  useEffect(() => {
    if (!ready) return;
    document.documentElement.style.setProperty(
      "--review-brand-blue",
      review.blue,
    );
    document
      .querySelectorAll<HTMLElement>("[data-review-section]")
      .forEach((node) => {
        node.dataset.sectionTone = review.pages[page]?.[
          node.dataset.reviewSection!
        ]?.dark
          ? "dark"
          : "white";
        node.style.setProperty("--review-blue", review.blue);
      });
    const value = JSON.stringify(review);
    try {
      localStorage.setItem(KEY, value);
    } catch {
      /* URL remains available if storage is unavailable. */
    }
    const url = new URL(location.href);
    url.searchParams.set("review", value);
    history.replaceState(null, "", url);
  }, [review, page, ready]);
  function update(id: string, patch: Partial<Mark>) {
    setReview((previous) => {
      const pages = { ...previous.pages };
      pages[page] = {
        ...pages[page],
        [id]: { dark: false, note: "", ...pages[page]?.[id], ...patch },
      };
      if (page !== "home" && patch.dark !== undefined) {
        const other = page === "ppe" ? "construction" : "ppe";
        pages[other] = {
          ...pages[other],
          [id]: { note: "", ...pages[other]?.[id], dark: patch.dark },
        };
      }
      return { ...previous, pages };
    });
  }
  function visit(id: string) {
    const section = document.querySelector<HTMLElement>(
      `[data-review-section="${id}"]`,
    );
    section?.scrollIntoView({ behavior: "instant", block: "start" });
    if (window.innerWidth < 800) setOpen(false);
  }
  async function copy() {
    try {
      await navigator.clipboard.writeText(location.href);
      setStatus("Review link copied.");
    } catch {
      setStatus("Copy the address from your browser to share this review.");
    }
  }
  function download() {
    const payload = {
      ...review,
      currentPage: page,
      sectionNames: sections,
      instructions:
        "Checked sections use the selected brand blue. Unchecked sections remain white. Media keeps its own treatment.",
    };
    const url = URL.createObjectURL(
      new Blob([JSON.stringify(payload, null, 2)], {
        type: "application/json",
      }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "ailytics-section-review.json";
    a.click();
    URL.revokeObjectURL(url);
    setStatus("Review downloaded.");
  }
  return (
    <>
      <div className={styles.toolbar}>
        <strong>Section colour review</strong>
        <nav aria-label="Preview page">
          {(["home", "ppe", "construction"] as const).map((p) => (
            <a
              key={p}
              aria-current={p === page ? "page" : undefined}
              href={`?page=${p}&review=${encodeURIComponent(JSON.stringify(review))}`}
            >
              {p === "home" ? "Homepage" : p === "ppe" ? "PPE" : "Construction"}
            </a>
          ))}
        </nav>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="section-picker"
        >
          {open ? "Hide section picker" : "Choose sections"}
        </button>
      </div>
      {open && (
        <aside
          id="section-picker"
          className={styles.panel}
          aria-label="Annotate section colours"
        >
          <div className={styles.heading}>
            <h2>Choose the blue sections</h2>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close section picker"
            >
              ×
            </button>
          </div>
          <p>
            Tick for blue. Leave unticked for white. PPE and construction share
            the same section colours. Existing photos and demonstrations keep
            their own backgrounds.
          </p>
          <div className={styles.swatches} role="group" aria-label="Brand blue">
            {BLUES.map((blue) => (
              <button
                type="button"
                key={blue}
                style={{ background: blue }}
                aria-pressed={review.blue === blue}
                onClick={() => setReview({ ...review, blue })}
              >
                {blue}
              </button>
            ))}
          </div>
          <ol className={styles.list}>
            {sections.map(({ id, title }, index) => (
              <li key={id}>
                <div className={styles.row}>
                  <input
                    id={`mark-${id}`}
                    type="checkbox"
                    checked={review.pages[page]?.[id]?.dark ?? false}
                    onChange={(event) =>
                      update(id, { dark: event.target.checked })
                    }
                  />
                  <label htmlFor={`mark-${id}`}>
                    {index + 1}. {title}
                  </label>
                  <button
                    type="button"
                    onClick={() => visit(id)}
                    aria-label={`Show ${title}`}
                  >
                    View
                  </button>
                </div>
                <details>
                  <summary>Add a note</summary>
                  <textarea
                    aria-label={`Note for ${title}`}
                    placeholder="What should change here?"
                    value={review.pages[page]?.[id]?.note ?? ""}
                    onChange={(event) =>
                      update(id, { note: event.target.value })
                    }
                  />
                </details>
              </li>
            ))}
          </ol>
          <div className={styles.actions}>
            <button type="button" onClick={copy}>
              Copy review link
            </button>
            <button type="button" onClick={download}>
              Download notes
            </button>
          </div>
          <p role="status">
            {status || "Saved in this browser and in the URL."}
          </p>
        </aside>
      )}
    </>
  );
}
