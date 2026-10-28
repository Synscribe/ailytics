import { ScannedHighlight } from "@/components/scanned-highlight/scanned-highlight";
import { sceneFor } from "./scenes";
import { ProblemSwitcher } from "./problem-switcher.client";
import { StepScene } from "./step-scene.client";
import { FaqAccordion } from "@/components/faq-accordion/faq-accordion";
import { RevealGroup } from "@/components/reveal-group.client";
import {
  CustomerProof,
  type ProofStat,
} from "@/components/customer-proof/customer-proof";
import { ArrowRightIcon, CheckIcon } from "lucide-react";
import Link from "next/link";

import {
  isPhoneVisual,
  ProjectVisual,
} from "@/components/visuals/project-visual";
import { stripInlineLinks, type PageContent } from "@/lib/page-content";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  serializeJsonLd,
  type BreadcrumbJsonLdItem,
} from "@/lib/seo";
import type { VisualId } from "@/lib/visuals";
import { CtaBanner } from "@/components/cta-banner/cta-banner";

type Block = {
  title: string;
  description: string;
};

export type ContentPageProps = {
  content: PageContent;
  breadcrumbs: BreadcrumbJsonLdItem[];
  heroVisualId: VisualId;
  heroEmphasis?: string;
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
  /** Replaces the stat row under the customer logos. */
  proofStats?: ProofStat[];
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
  heroEmphasis,
  howItWorks,
  featureLinks = {},
  related,
  proofStats,
  ctaHref = "/contact",
}: ContentPageProps) {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd(breadcrumbs);
  const faqJsonLd = buildFaqJsonLd(
    content.faq.map((item) => ({
      question: item.question,
      answer: stripInlineLinks(item.answer),
    })),
  );
  const scene = sceneFor(heroVisualId);
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
            <h1 className="brand-h1">
              {heroEmphasis && content.hero.title.includes(heroEmphasis) ? (
                <>
                  {content.hero.title.slice(
                    0,
                    content.hero.title.indexOf(heroEmphasis),
                  )}
                  <ScannedHighlight>{heroEmphasis}</ScannedHighlight>
                  {content.hero.title.slice(
                    content.hero.title.indexOf(heroEmphasis) +
                      heroEmphasis.length,
                  )}
                </>
              ) : (
                content.hero.title
              )}
            </h1>
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
      <CustomerProof stats={proofStats} />

      <section id="problems" className="detail-section">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <h2 className={sectionHeading}>{content.problems.title}</h2>
          <p className="brand-lead mt-5 max-w-2xl">
            {content.problems.description}
          </p>
          <ProblemSwitcher
            items={content.problems.items.map((item, i) => ({
              title: item.title,
              body: item.description,
              visualId: scene.problemVisuals[i] ?? scene.problemVisuals[0],
            }))}
          />
        </div>
      </section>

      <section id="how-it-works" className="detail-section">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <StepScene
            scene={scene.howItWorks}
            steps={howItWorks.steps}
            introduction={{
              title: content.solution.title,
              description: content.solution.description,
            }}
          />
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
                        isPhoneVisual(item.id)
                          ? `order-1 min-w-0 p-3 ${index % 2 ? "lg:order-1" : "lg:order-2"}`
                          : `order-1 min-w-0 ${index % 2 ? "lg:order-1" : "lg:order-2"}`
                      }
                    >
                      <div
                        className={`relative w-full overflow-hidden ${isPhoneVisual(item.id) ? "h-[440px] lg:h-[500px]" : "aspect-[4/3] rounded-lg bg-muted"}`}
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

      <section id="faq" className="detail-section band-blue">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <h2 className="brand-h2 max-w-xl">Frequently asked questions</h2>

          <FaqAccordion items={content.faq} />
        </div>
      </section>

      {related ? (
        <section id="related" className="detail-section">
          <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
            <h2 className={sectionHeading}>{related.title}</h2>
            <div
              className={`mt-10 grid gap-4 md:grid-cols-2 ${related.items.length === 3 ? "lg:grid-cols-3" : ""}`}
            >
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

      <section className="detail-section">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <CtaBanner
            buttonText={content.cta.buttonText}
            description={content.cta.description}
            href={ctaHref}
            title={content.cta.title}
          />
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
