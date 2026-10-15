import { ProblemStory } from "./problem-story.client";
import { ScrollSequence } from "./scroll-sequence.client";
import { FaqAccordion } from "@/components/faq-accordion/faq-accordion";
import { RevealGroup } from "@/components/reveal-group.client";
import { CustomerProof } from "@/components/customer-proof/customer-proof";
import { ArrowRightIcon, CheckIcon } from "lucide-react";
import Link from "next/link";

import { ProjectVisual } from "@/components/visuals/project-visual";
import { stripInlineLinks, type PageContent } from "@/lib/page-content";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  serializeJsonLd,
  type BreadcrumbJsonLdItem,
} from "@/lib/seo";
import type { VisualId } from "@/lib/visuals";

type Block = {
  title: string;
  description: string;
};

export type ContentPageProps = {
  content: PageContent;
  breadcrumbs: BreadcrumbJsonLdItem[];
  heroVisualId: VisualId;
  howItWorks: {
    title: string;
    introduction: string;
    steps: Block[];
  };
  /** Links words in a feature description to a related page, as anchor text. */
  featureLinks?: Record<string, { href: string; phrase: string }>;
  related?: {
    title: string;
    items: (Block & { href: string; label: string })[];
  };
  ctaHref?: string;
};

/**
 * The copy a detail route keeps next to its JSON page: everything the page
 * needs except the JSON content itself. `name` is the breadcrumb label.
 */
export type ContentPageRouteCopy = Omit<
  ContentPageProps,
  "content" | "breadcrumbs" | "ctaHref"
> & {
  name: string;
};

const sectionHeading = "brand-h2 max-w-3xl";

export function ContentPage({
  content,
  breadcrumbs,
  heroVisualId,
  howItWorks,
  featureLinks = {},
  related,
  ctaHref = "/contact",
}: ContentPageProps) {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd(breadcrumbs);
  const faqJsonLd = buildFaqJsonLd(
    content.faq.map((item) => ({
      question: item.question,
      answer: stripInlineLinks(item.answer),
    })),
  );
  const trail = breadcrumbs.slice(0, -1);
  const current = breadcrumbs[breadcrumbs.length - 1];

  return (
    <main id="main-content" className="detail-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqJsonLd) }}
      />

      <section className="brand-hero">
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 pt-10 pb-20 sm:px-8 sm:pt-12 sm:pb-24 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-center lg:gap-16">
          <div className="flex min-w-0 flex-col items-start">
            <nav
              aria-label="Breadcrumb"
              className="mb-10 text-sm text-ink-muted"
            >
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
            <h1 className="brand-h1">{content.hero.title}</h1>
            <p className="brand-lead mt-6 max-w-xl">
              {content.hero.description}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link className="brand-btn-primary" href={ctaHref}>
                {content.cta.buttonText}
                <ArrowRightIcon className="size-4" aria-hidden="true" />
              </Link>
              <Link className="brand-btn-secondary" href="#how-it-works">
                See how it works
              </Link>
            </div>
            <p className="mt-5 text-sm text-ink-muted">
              Live in under 2 weeks on your existing cameras.
            </p>
          </div>

          <div className="min-w-0">
            <ProjectVisual id={heroVisualId} priority />
          </div>
        </div>
      </section>
      <CustomerProof />

      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <ProblemStory
          kind={heroVisualId === "construction-hero" ? "construction" : "ppe"}
          content={content.problems}
        />
      </div>

      <section id="how-it-works" className="detail-section">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <h2 className={sectionHeading}>{content.solution.title}</h2>
          <p className="brand-lead mt-5 max-w-2xl">
            {content.solution.description}
          </p>
          <ScrollSequence items={howItWorks.steps} />
        </div>
      </section>

      <section id="features" className="detail-section">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <h2 className={sectionHeading}>{content.features.title}</h2>
            <p className="brand-lead mt-5 max-w-2xl">
              {content.features.description}
            </p>
          </div>

          <div className="mt-20 flex flex-col gap-24 sm:gap-28">
            {content.features.items.map((item, index) => {
              const link = featureLinks[item.id];
              return (
                <RevealGroup key={item.id}>
                  <article
                    className="grid min-w-0 scroll-mt-24 grid-cols-[minmax(0,1fr)] items-center gap-10 lg:grid-cols-2 lg:gap-20"
                    id={item.id}
                    key={item.id}
                  >
                    <div
                      data-reveal
                      className={`order-2 flex min-w-0 flex-col gap-4 ${index % 2 ? "lg:order-2" : "lg:order-1"}`}
                    >
                      <p className="text-sm font-medium text-ink-muted">
                        {item.eyebrow}
                      </p>
                      <h3 className="text-h3 text-balance">{item.title}</h3>
                      <p className="text-base leading-7 text-pretty text-ink-muted">
                        {link ? (
                          <AnchorPhrase link={link} text={item.description} />
                        ) : (
                          item.description
                        )}
                      </p>
                      <ul className="mt-2 flex flex-col gap-3">
                        {item.highlights.map((highlight) => (
                          <li
                            className="flex gap-3 text-sm leading-6 font-medium"
                            key={highlight}
                          >
                            <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-mint text-ink">
                              <CheckIcon
                                className="size-3"
                                aria-hidden="true"
                              />
                            </span>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div
                      data-reveal
                      className={
                        item.id === "real-time-alerts"
                          ? `order-1 min-w-0 p-3 ${index % 2 ? "lg:order-1" : "lg:order-2"}`
                          : `order-1 min-w-0 ${index % 2 ? "lg:order-1" : "lg:order-2"}`
                      }
                    >
                      <div
                        className={`relative w-full overflow-hidden ${item.id === "real-time-alerts" ? "h-[440px] lg:aspect-[4/3] lg:h-auto" : "aspect-[4/3] rounded-2xl border border-ink/10 bg-muted"}`}
                      >
                        <ProjectVisual
                          fill
                          id={item.id}
                          sizes="(min-width: 1024px) 45vw, 100vw"
                        />
                      </div>
                    </div>
                  </article>
                </RevealGroup>
              );
            })}
          </div>
        </div>
      </section>

      <section id="faq" className="detail-section">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <h2 className="brand-h2 max-w-xl">Frequently asked questions</h2>

          <FaqAccordion items={content.faq} />
        </div>
      </section>

      {related ? (
        <section id="related" className="detail-section">
          <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
            <h2 className={sectionHeading}>{related.title}</h2>
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {related.items.map((item) => (
                <Link
                  className="brand-card brand-card-link group flex flex-col gap-3 p-7 sm:p-8"
                  href={item.href}
                  key={item.href}
                >
                  <h3 className="text-title">{item.title}</h3>
                  <p className="text-base leading-7 text-pretty text-ink-muted">
                    {item.description}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-2 text-sm font-medium group-hover:underline">
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="pt-12 pb-28 sm:pb-32">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="brand-banner flex flex-col gap-8 p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between lg:p-16">
            <div>
              <h2 className="brand-h2 max-w-3xl">{content.cta.title}</h2>
              <p className="mt-3 max-w-[46ch] text-lead text-white/85">
                {content.cta.description}
              </p>
            </div>
            <Link
              className="brand-btn-light self-start lg:self-auto"
              href={ctaHref}
            >
              {content.cta.buttonText}
              <ArrowRightIcon className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function AnchorPhrase({
  text,
  link,
}: {
  text: string;
  link: { href: string; phrase: string };
}) {
  const at = text.indexOf(link.phrase);
  if (at === -1) return text;
  return (
    <>
      {text.slice(0, at)}
      <Link
        className="text-ink underline decoration-ink/25 underline-offset-[3px] transition-colors hover:decoration-ink"
        href={link.href}
      >
        {link.phrase}
      </Link>
      {text.slice(at + link.phrase.length)}
    </>
  );
}
