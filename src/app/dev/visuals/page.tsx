import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

import {
  ProjectVisual,
  VISUAL_ENTRIES,
} from "@/components/visuals/project-visual";
import { INDUSTRY_ROUTE_COPY } from "@/app/industries/[slug]/_content";
import { USE_CASE_ROUTE_COPY } from "@/app/uses/[slug]/_content";
import type { ContentPageRouteCopy } from "@/components/content-page/content-page";
import {
  getPageContent,
  listPageContent,
  type PageContentKind,
} from "@/lib/page-content";
import type { VisualId } from "@/lib/visuals";

type VisualPlacement = {
  href: string;
  label: string;
};

export default async function VisualInventoryPage() {
  const placements = new Map<VisualId, VisualPlacement[]>();
  const routeCopy: Record<
    PageContentKind,
    Record<string, ContentPageRouteCopy>
  > = {
    industries: INDUSTRY_ROUTE_COPY,
    uses: USE_CASE_ROUTE_COPY,
  };

  function place(id: VisualId, placement: VisualPlacement) {
    placements.set(id, [...(placements.get(id) ?? []), placement]);
  }

  for (const kind of ["industries", "uses"] as const) {
    for (const slug of await listPageContent(kind)) {
      const href = `/${kind}/${slug}`;
      const copy = routeCopy[kind][slug];
      const content = await getPageContent(kind, slug);
      const name = copy?.name ?? slug;
      if (copy) place(copy.heroVisualId, { href, label: `${name} hero` });
      for (const feature of content.features.items) {
        place(feature.id, { href, label: `${name}: ${feature.title}` });
      }
    }
  }

  return (
    <main className="bg-canvas px-5 py-14 sm:px-8 lg:py-20" id="main-content">
      <div className="mx-auto max-w-7xl">
        <p className="mb-6 text-sm">
          <Link
            className="underline underline-offset-4"
            href="/dev/visuals/hub-directions"
          >
            Compare PPE and Construction hub card directions
          </Link>
        </p>
        <Link
          className="inline-flex items-center gap-2 text-sm font-medium text-ink-muted hover:text-ink"
          href="/dev"
        >
          <ArrowLeftIcon className="size-4" />
          Visual workshop
        </Link>

        <header className="mt-10 max-w-4xl border-b border-ink/10 pb-10">
          <p className="text-xs font-medium tracking-[0.18em] text-signal-strong uppercase">
            {VISUAL_ENTRIES.length} registered visuals
          </p>
          <h1 className="mt-5 font-display text-5xl leading-[0.96] tracking-[-0.045em] sm:text-6xl">
            Feature and illustration inventory
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-ink-muted">
            This page renders the one typed visual source map used by the site
            and launch assets. Replace every template placeholder, inspect
            motion in the browser, and separately emulate reduced motion before
            approval.
          </p>
        </header>

        <div className="mt-12 grid gap-x-7 gap-y-12 lg:grid-cols-2">
          {VISUAL_ENTRIES.map((entry, index) => {
            const visualPlacements = placements.get(entry.id) ?? [];
            return (
              <article
                className="min-w-0"
                id={`visual-${entry.id}`}
                key={entry.id}
              >
                <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-medium tracking-[0.14em] text-ink-faint uppercase">
                      Visual {String(index + 1).padStart(2, "0")}
                    </p>
                    <h2 className="mt-2 text-2xl font-medium tracking-tight">
                      {entry.label}
                    </h2>
                  </div>
                  <div className="flex flex-wrap justify-end gap-2">
                    <span className="rounded-full border border-ink/10 bg-paper px-3 py-1.5 text-[10px] font-medium tracking-[0.1em] text-ink-muted uppercase">
                      {entry.kind}
                    </span>
                    <span className="rounded-full border border-signal/15 bg-signal/5 px-3 py-1.5 text-[10px] font-medium tracking-[0.1em] text-signal-strong uppercase">
                      {entry.status === "template-placeholder"
                        ? "Template placeholder"
                        : "Project visual"}
                    </span>
                  </div>
                </div>

                <div
                  className={
                    entry.id === "real-time-alerts"
                      ? "p-5 sm:p-7"
                      : "rounded-[2rem] border border-ink/10 bg-paper/70 p-5 sm:p-7"
                  }
                >
                  <ProjectVisual
                    id={entry.id}
                    sizes="(min-width: 1024px) 44vw, 100vw"
                  />
                </div>

                <div className="mt-4 rounded-2xl border border-ink/10 bg-paper px-4 py-4 text-sm">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <code className="text-xs text-ink-muted">{entry.id}</code>
                    <span className="text-xs text-ink-faint">
                      {entry.motionPattern ?? "Static"}
                    </span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2 border-t border-ink/10 pt-3">
                    {visualPlacements.length > 0 ? (
                      visualPlacements.map((placement) => (
                        <Link
                          className="rounded-full bg-canvas px-3 py-1.5 text-xs font-medium text-ink-muted hover:text-ink"
                          href={placement.href}
                          key={`${placement.href}-${placement.label}`}
                        >
                          {placement.label}
                        </Link>
                      ))
                    ) : (
                      <span className="text-xs text-ink-faint">
                        No content placement
                      </span>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
}
