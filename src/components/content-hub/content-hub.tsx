import { CustomerProof } from "@/components/customer-proof/customer-proof";
import Link from "next/link";
import type { ReactNode } from "react";

import { PictureCard } from "@/components/picture-card/picture-card";
import {
  buildBreadcrumbJsonLd,
  serializeJsonLd,
  type BreadcrumbJsonLdItem,
} from "@/lib/seo";
import type { VisualId } from "@/lib/visuals";
import { CtaBanner } from "@/components/cta-banner/cta-banner";

export type HubItem = {
  title: string;
  description: string;
  href: string;
  /** The detail page's hero visual, shown on its card. */
  visualId: VisualId;
};

export type HubGroup = {
  title: string;
  items: HubItem[];
};

export type ContentHubProps = {
  breadcrumbs: BreadcrumbJsonLdItem[];
  title: string;
  introduction: string;
  /** Shown in the hero's right column. */
  heroVisual?: ReactNode;
  /** Only built pages; empty groups are dropped before they reach the hub. */
  groups: HubGroup[];
  cta: {
    title: string;
    description: string;
    buttonText: string;
    href: string;
  };
};

function HubCard({ item }: { item: HubItem }) {
  return (
    <PictureCard
      body={item.description}
      href={item.href}
      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
      title={item.title}
      visualId={item.visualId}
    />
  );
}

/** A hub: title and introduction, then one section of linked cards per group. */
export function ContentHub({
  breadcrumbs,
  title,
  introduction,
  heroVisual,
  groups,
  cta,
}: ContentHubProps) {
  const trail = breadcrumbs.slice(0, -1);
  const current = breadcrumbs[breadcrumbs.length - 1];

  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(buildBreadcrumbJsonLd(breadcrumbs)),
        }}
      />

      <section
        className="brand-hero"
        data-glow={heroVisual ? "visual" : undefined}
      >
        <div className="mx-auto w-full max-w-7xl px-5 pt-10 pb-12 sm:px-8 sm:pt-12 sm:pb-16">
          <nav aria-label="Breadcrumb" className="mb-10 text-sm text-ink-muted">
            <ol className="flex flex-wrap gap-2">
              {trail.map((item) => (
                <li className="flex gap-2" key={item.path}>
                  <Link className="hover:text-ink" href={item.path}>
                    {item.name}
                  </Link>
                  <span aria-hidden="true">/</span>
                </li>
              ))}
              <li aria-current="page" className="text-ink">
                {current.name}
              </li>
            </ol>
          </nav>
          <div
            className={
              heroVisual
                ? "grid items-center gap-12 lg:mt-[var(--hub-shift,-60px)] lg:gap-24 lg:[grid-template-columns:minmax(0,var(--hub-text-fr,1fr))_minmax(0,var(--hub-visual-fr,1fr))]"
                : undefined
            }
          >
            <div>
              <h1 className="brand-h1 max-w-3xl">{title}</h1>
              <p className="brand-lead mt-5 max-w-2xl">{introduction}</p>
            </div>
            {heroVisual ? (
              // Bleeds past the right edge on large screens; the hero clips it.
              <div className="relative lg:-mr-[var(--hub-bleed,166px)]">
                <div aria-hidden className="brand-hero-glow" />
                {heroVisual}
              </div>
            ) : null}
          </div>
        </div>
      </section>
      <CustomerProof />

      {groups.map((group) => (
        <section className="pt-8 pb-8 sm:pt-12" key={group.title}>
          <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
            <h2 className="brand-h2">{group.title}</h2>
            <ul className="mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {group.items.map((item) => (
                <li className="flex aspect-[4/3]" key={item.href}>
                  <HubCard item={item} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <section className="pt-20 pb-28 sm:pb-32">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <CtaBanner
            buttonText={cta.buttonText}
            description={cta.description}
            href={cta.href}
            title={cta.title}
          />
        </div>
      </section>
    </main>
  );
}
