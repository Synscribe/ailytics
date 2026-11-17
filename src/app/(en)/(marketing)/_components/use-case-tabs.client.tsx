"use client";

import { type ReactNode, useEffect, useState } from "react";

import styles from "../home.module.css";

type Tab = { id: string; label: string; panel: ReactNode };

/**
 * Safety / Security / Productivity tabs over server-rendered tile grids.
 * Before hydration, and without JavaScript, every panel shows under its own
 * heading, so all tiles and links stay in the HTML.
 */
export function UseCaseTabs({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(tabs[0].id);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setReady(true), 0);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <div className={styles.ucTabs} data-ready={ready ? "true" : undefined}>
      <div
        className={`${styles.legend} ${styles.ucTablist}`}
        role="tablist"
        aria-label="Use case categories"
      >
        {tabs.map((t) => (
          <button
            key={t.id}
            id={`uc-tab-${t.id}`}
            type="button"
            role="tab"
            data-cat={t.id}
            data-on={t.id === active ? "true" : undefined}
            aria-selected={t.id === active}
            aria-controls={`uc-panel-${t.id}`}
            tabIndex={t.id === active ? 0 : -1}
            onClick={() => setActive(t.id)}
            onKeyDown={(e) => {
              if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
              const i = tabs.findIndex((x) => x.id === active);
              const step = e.key === "ArrowRight" ? 1 : -1;
              const next = tabs[(i + step + tabs.length) % tabs.length];
              setActive(next.id);
              document.getElementById(`uc-tab-${next.id}`)?.focus();
            }}
          >
            <span aria-hidden="true" />
            {t.label}
          </button>
        ))}
      </div>
      {tabs.map((t) => (
        <section
          key={t.id}
          id={`uc-panel-${t.id}`}
          role={ready ? "tabpanel" : undefined}
          aria-labelledby={ready ? `uc-tab-${t.id}` : undefined}
          hidden={ready && t.id !== active}
          className={styles.ucPanel}
        >
          <h3 className={styles.ucGroup}>{t.label}</h3>
          {t.panel}
        </section>
      ))}
    </div>
  );
}
