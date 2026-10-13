import { CustomerProof } from "@/components/customer-proof/customer-proof";
import { ArrowRightIcon, PlusIcon } from "lucide-react";
import Link from "next/link";

import { ProjectVisual } from "@/components/visuals/project-visual";
import {
  parseInlineLinks,
  stripInlineLinks,
  type PageContent,
} from "@/lib/page-content";
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
  valueProps: {
    title: string;
    items: Block[];
  };
  /** Links words in a feature description to a related page, as anchor text. */
  featureLinks?: Record<string, { href: string; phrase: string }>;
  related?: {
    title: string;
    items: (Block & { href: string; label: string })[];
  };
  proof?: Block & { value: string; context: string };
  deployment: { title: string; items: Block[] };
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

function InlineCopy({ value }: { value: string }) {
  return parseInlineLinks(value).map((segment, index) =>
    segment.kind === "link" ? (
      <Link
        className="font-semibold text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
        href={segment.href}
        key={index}
      >
        {segment.value}
      </Link>
    ) : (
      <span key={index}>{segment.value}</span>
    ),
  );
}

const sectionHeading = "brand-h2 max-w-3xl";

export function ContentPage({
  content,
  breadcrumbs,
  heroVisualId,
  howItWorks,
  valueProps,
  featureLinks = {},
  related,
  proof,
  deployment,
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

      <section id="problems" className="detail-section">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <h2 className={sectionHeading}>{content.problems.title}</h2>
            <p className="brand-lead mt-5 max-w-2xl">
              {content.problems.description}
            </p>
          </div>

          <div
            className={`mt-12 grid gap-4 sm:grid-cols-2 ${content.problems.items.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}
          >
            {content.problems.items.map((item) => (
              <article className="brand-card p-7" key={item.title}>
                <h3 className="text-lg font-semibold tracking-tight text-balance">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-pretty text-ink-muted">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="detail-section">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <h2 className={sectionHeading}>{content.solution.title}</h2>
          <p className="brand-lead mt-5 max-w-2xl">
            {content.solution.description}
          </p>
          <ol className="mt-12 grid gap-8 border-t border-ink/10 pt-8 sm:grid-cols-2 lg:grid-cols-4">
            {howItWorks.steps.map((step, index) => (
              <li className="flex flex-col gap-3" key={step.title}>
                <span className="text-sm font-semibold text-signal-strong">
                  0{index + 1}
                </span>
                <h3 className="text-lg font-semibold tracking-tight">
                  {step.title}
                </h3>
                <p className="text-sm leading-6 text-pretty text-ink-muted">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
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

          <div className="mt-12 grid items-start gap-x-8 gap-y-14 lg:grid-cols-2">
            {content.features.items.map((item) => {
              const link = featureLinks[item.id];
              return (
                <article
                  className="flex min-w-0 scroll-mt-24 flex-col gap-6"
                  id={item.id}
                  key={item.id}
                >
                  <div className="order-2 flex min-w-0 flex-col gap-3">
                    <p className="text-sm font-semibold text-ink-muted">
                      {item.eyebrow}
                    </p>
                    <h3 className="text-balance text-2xl leading-[1.2] font-semibold tracking-[-0.025em]">
                      {item.title}
                    </h3>
                    <p className="text-base leading-7 text-pretty text-ink-muted">
                      {link ? (
                        <AnchorPhrase link={link} text={item.description} />
                      ) : (
                        item.description
                      )}
                    </p>
                  </div>
                  <div
                    className={
                      item.id === "real-time-alerts"
                        ? "order-1 w-full min-w-0 p-2"
                        : "brand-card order-1 w-full min-w-0 overflow-hidden p-2"
                    }
                  >
                    <div
                      className={`relative w-full overflow-hidden ${item.id === "real-time-alerts" ? "h-[440px] lg:aspect-[4/3] lg:h-auto" : "aspect-[4/3] rounded-xl bg-muted"}`}
                    >
                      <ProjectVisual
                        fill
                        id={item.id}
                        sizes="(min-width: 1024px) 45vw, 100vw"
                      />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="value" className="detail-section">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <h2 className={sectionHeading}>{valueProps.title}</h2>
          <div className="mt-12 grid gap-x-14 gap-y-10 sm:grid-cols-2">
            {valueProps.items.map((item) => (
              <div className="flex flex-col gap-3" key={item.title}>
                <h3 className="text-lg font-semibold tracking-tight text-balance">
                  {item.title}
                </h3>
                <p className="text-sm leading-6 text-pretty text-ink-muted">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {proof ? (
        <section id="results" className="detail-section">
          <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 sm:px-8 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold text-ink-muted">
                {proof.context}
              </p>
              <p className="mt-4 text-7xl font-medium tracking-tight text-ink">
                {proof.value}
              </p>
            </div>
            <div>
              <h2 className={sectionHeading}>{proof.title}</h2>
              <p className="brand-lead mt-5">{proof.description}</p>
            </div>
          </div>
        </section>
      ) : null}
      <section id="deployment" className="detail-section">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <h2 className={sectionHeading}>{deployment.title}</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {deployment.items.map((item) => (
              <article key={item.title} className="border-t border-ink/15 pt-6">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-ink-muted">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="detail-section">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <h2 className="brand-h2 max-w-xl">Frequently asked questions</h2>

          <div className="flex flex-col gap-3">
            {content.faq.map((item) => (
              <details className="brand-card brand-faq" key={item.question}>
                <summary className="flex items-center justify-between gap-4 px-6 py-5">
                  <h3 className="text-[1.0625rem] leading-snug font-semibold">
                    {item.question}
                  </h3>
                  <PlusIcon
                    className="size-5 shrink-0 text-ink-muted"
                    aria-hidden="true"
                  />
                </summary>
                <p className="max-w-[62ch] px-6 pb-6 text-[0.97rem] leading-7 text-pretty text-ink-muted">
                  <InlineCopy value={item.answer} />
                </p>
              </details>
            ))}
          </div>
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
                  <h3 className="text-xl font-semibold tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-base leading-7 text-pretty text-ink-muted">
                    {item.description}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-2 text-sm font-semibold group-hover:underline">
                    {item.label}
                    <ArrowRightIcon className="size-4" aria-hidden="true" />
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
              <p className="mt-3 max-w-[46ch] text-[1.0625rem] leading-relaxed text-white/85">
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
