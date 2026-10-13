import { CustomerProof } from "@/components/customer-proof/customer-proof";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

import { ProjectVisual } from "@/components/visuals/project-visual";
import {
  buildBreadcrumbJsonLd,
  serializeJsonLd,
  type BreadcrumbJsonLdItem,
} from "@/lib/seo";
import type { VisualId } from "@/lib/visuals";

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
    <Link
      className="brand-card brand-card-link group flex h-full flex-col overflow-hidden"
      href={item.href}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        <ProjectVisual
          fill
          id={item.visualId}
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-6">
        <h3 className="flex items-start justify-between gap-3 text-lg leading-7 font-semibold text-balance">
          {item.title}
          <ArrowRightIcon
            className="mt-1 size-4 shrink-0 text-ink-muted transition-transform group-hover:translate-x-0.5 group-hover:text-ink"
            aria-hidden="true"
          />
        </h3>
        <p className="text-sm leading-6 text-pretty text-ink-muted">
          {item.description}
        </p>
      </div>
    </Link>
  );
}

/** A hub: title and introduction, then one section of linked cards per group. */
export function ContentHub({
  breadcrumbs,
  title,
  introduction,
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

      <section className="brand-hero">
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
          <h1 className="brand-h1 max-w-3xl">{title}</h1>
          <p className="brand-lead mt-5 max-w-2xl">{introduction}</p>
        </div>
      </section>
      <CustomerProof />

      {groups.map((group) => (
        <section className="pt-8 pb-8 sm:pt-12" key={group.title}>
          <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
            <h2 className="brand-h2">{group.title}</h2>
            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {group.items.map((item) => (
                <li key={item.href}>
                  <HubCard item={item} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <section className="pt-20 pb-28 sm:pb-32">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="brand-banner flex flex-col gap-8 p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between lg:p-16">
            <div>
              <h2 className="brand-h2 max-w-3xl">{cta.title}</h2>
              <p className="mt-3 max-w-[46ch] text-[1.0625rem] leading-relaxed text-white/85">
                {cta.description}
              </p>
            </div>
            <Link
              className="brand-btn-light self-start lg:self-auto"
              href={cta.href}
            >
              {cta.buttonText}
              <ArrowRightIcon className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
