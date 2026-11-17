import { ScanFaceIcon, ServerIcon, ShieldCheckIcon } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { CountUp } from "@/components/count-up.client";
import { CtaBanner } from "@/components/cta-banner/cta-banner";
import { CustomerProof } from "@/components/customer-proof/customer-proof";
import { FaqAccordion } from "@/components/faq-accordion/faq-accordion";
import { ScannedHighlight } from "@/components/scanned-highlight/scanned-highlight";
import { LOCALE_SETTINGS, localizedHref, type Locale } from "@/lib/i18n";
import { buildFaqJsonLd, createPageMetadata, serializeJsonLd } from "@/lib/seo";
import { segmentWords } from "@/lib/text-segments";

import type { HomeCopy } from "../_copy/en";
import styles from "../home.module.css";
import {
  type Capability,
  CapabilitySwitcher,
} from "./capability-switcher.client";
import { DepthStory } from "./depth-story.client";
import {
  AskVisual,
  DepthVisual,
  HarshVisual,
  SetupVisual,
  SitesVisual,
} from "./feature-visuals.client";
import { HeroWall } from "./hero-wall.client";
import { type Industry, IndustryList } from "./industry-list.client";
import { ProblemScene } from "./problem-scene.client";
import { type UseCaseTile, UseCaseBento } from "./use-case-bento";

type FeatureId = keyof HomeCopy["features"]["items"];
type UseCaseId = keyof HomeCopy["useCases"]["items"] & UseCaseTile["id"];
type IndustryId = keyof HomeCopy["industries"]["items"];
type CapabilityId = keyof HomeCopy["capabilities"]["items"] &
  Capability["visualId"];

export function homeMetadata(copy: HomeCopy, locale: Locale): Metadata {
  return createPageMetadata({ ...copy.metadata, path: "/", locale });
}

const FEATURES: {
  id: FeatureId;
  visual: (copy: HomeCopy["visuals"]) => ReactNode;
  href?: string;
}[] = [
  {
    id: "real-3d-distance",
    visual: (copy) => <DepthVisual copy={copy.depth} />,
    href: "#how-it-works",
  },
  {
    id: "harsh-conditions",
    visual: (copy) => <HarshVisual copy={copy.harsh} />,
  },
  {
    id: "ask-your-cameras",
    visual: (copy) => <AskVisual copy={copy.ask} />,
  },
  { id: "every-site", visual: () => <SitesVisual /> },
  {
    id: "set-up-your-way",
    visual: (copy) => <SetupVisual copy={copy.setup} />,
  },
];

const USE_CASES: { id: UseCaseId; href: string }[] = [
  { id: "ppe-detection", href: "/use-cases/ppe-detection" },
  { id: "machinery-proximity", href: "/use-cases/pedestrian-detection-system" },
  { id: "under-load-detection", href: "/use-cases/suspended-load-safety" },
  { id: "fire-smoke-detection", href: "/use-cases" },
  { id: "no-access-zones", href: "/use-cases" },
  { id: "open-edge-detection", href: "/use-cases/open-edge-detection" },
];

const INDUSTRIES: { id: IndustryId; href: string; src: string }[] = [
  {
    id: "construction",
    href: "/industries/construction",
    src: "/media/ailytics/stills/construction-hero.jpg",
  },
  {
    id: "manufacturing",
    href: "/industries/manufacturing",
    src: "/media/ailytics/stills/crowding.jpg",
  },
  {
    id: "oil-and-gas",
    href: "/industries/oil-and-gas",
    src: "/media/projects/paxocean-shipyard.webp",
  },
  {
    id: "logistics",
    href: "/industries/logistics-and-warehousing",
    src: "/media/ailytics/stills/machinery-proximity.jpg",
  },
  {
    id: "ports-and-airports",
    href: "/industries",
    src: "/media/projects/changi-terminal-5.webp",
  },
  {
    id: "data-centers",
    href: "/industries/data-centers",
    // Stock photo until the client supplies one: Pexels 4508751, Pexels license.
    src: "/media/stock/data-center-server-racks.webp",
  },
];

const CAPABILITIES: CapabilityId[] = [
  "real-time-alerts",
  "unlimited-reporting",
  "multi-site-dashboard",
  "edge-engine",
  "custom-use-cases",
  "hardware-agnostic",
];

const CASES: {
  id: keyof HomeCopy["cases"]["items"];
  value: string;
  src: string;
}[] = [
  {
    id: "construction",
    value: "69.1%",
    src: "/media/ailytics/stills/open-edge-detection.jpg",
  },
  {
    id: "manufacturing",
    value: "77%",
    src: "/media/ailytics/stills/crowding.jpg",
  },
];

const TRUST = [
  { id: "iso", icon: ShieldCheckIcon },
  { id: "hosting", icon: ServerIcon },
  { id: "privacy", icon: ScanFaceIcon },
] as const;

/**
 * The homepage. English and every translation render this composition with
 * their own copy from `../_copy/`.
 */
export function HomePage({ copy, locale }: { copy: HomeCopy; locale: Locale }) {
  const href = (path: string) => localizedHref(locale, path);
  const lang = LOCALE_SETTINGS[locale].htmlLang;
  const faqJsonLd = buildFaqJsonLd(copy.faq.items);

  const useCases: UseCaseTile[] = USE_CASES.map((item) => ({
    ...copy.useCases.items[item.id],
    id: item.id,
    href: href(item.href),
  }));
  const industries: Industry[] = INDUSTRIES.map((item) => ({
    ...copy.industries.items[item.id],
    href: href(item.href),
    src: item.src,
  }));
  const capabilities: Capability[] = CAPABILITIES.map((id) => ({
    ...copy.capabilities.items[id],
    visualId: id,
  }));

  return (
    <main id="main-content" className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqJsonLd) }}
      />

      {/* 1. Hero */}
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroDots} aria-hidden="true" />
        <div className={styles.heroStack}>
          <h1 id="hero-title" className={styles.h1}>
            {copy.hero.title}
          </h1>
          <p className={styles.heroHeadline}>
            {copy.hero.headline}{" "}
            <ScannedHighlight>{copy.hero.highlight}</ScannedHighlight>
          </p>
          <p className={styles.heroLead}>{copy.hero.lead}</p>
          <div className={styles.actions}>
            <Link href={href("/contact")} className={styles.btnPrimary}>
              {copy.hero.primaryCta}
            </Link>
            <Link href={href("/use-cases")} className={styles.btnSecondary}>
              {copy.hero.secondaryCta}
            </Link>
          </div>
          <HeroWall copy={copy.heroWall} locale={locale} />
        </div>
      </section>

      {/* 2. Customers and results */}
      <CustomerProof locale={locale} spacious />

      {/* 3. Problem */}
      <ProblemScene
        copy={copy.problem}
        payoff={segmentWords(copy.problem.payoff, lang)}
        statements={copy.problem.statements.map((s) => segmentWords(s, lang))}
      />

      {/* 4. How it works */}
      <DepthStory copy={copy.depth} />

      {/* 5. Features */}
      <section
        className={`${styles.features}`}
        aria-labelledby="features-title"
      >
        <div className={styles.container}>
          <div className={styles.headRow}>
            <div className={styles.secHead}>
              <h2 id="features-title" className={styles.h2}>
                {copy.features.title}
              </h2>
              <p className={styles.lead}>{copy.features.lead}</p>
            </div>
            <Link href={href("/contact")} className={styles.btnPrimary}>
              {copy.features.cta}
            </Link>
          </div>
          <div className={styles.fstack}>
            {FEATURES.map((f, i) => {
              const text = copy.features.items[f.id];
              return (
                <article
                  key={f.id}
                  id={f.id}
                  className={styles.fcard}
                  style={{ "--i": i } as never}
                  aria-labelledby={`${f.id}-title`}
                >
                  <div className={`${styles.fvis} surface-light`}>
                    {f.visual(copy.visuals)}
                  </div>
                  <div className={styles.ftext}>
                    <h3 id={`${f.id}-title`}>{text.title}</h3>
                    <p>{text.body}</p>
                    {f.href && text.link ? (
                      <a href={f.href} className={styles.textLink}>
                        {text.link}
                      </a>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Use cases */}
      <section
        className={`${styles.useCases} band-blue`}
        aria-labelledby="uses-title"
      >
        <div className={styles.container}>
          <div className={styles.headRow}>
            <div className={styles.secHead}>
              <h2 id="uses-title" className={styles.h2}>
                {copy.useCases.title}
              </h2>
              <p className={styles.lead}>{copy.useCases.lead}</p>
            </div>
            <Link href={href("/use-cases")} className={styles.btnSecondary}>
              {copy.useCases.cta}
            </Link>
          </div>
          <UseCaseBento items={useCases} />
        </div>
      </section>

      {/* 7. Industries */}
      <section
        className={`${styles.industries}`}
        aria-labelledby="industries-title"
      >
        <div className={styles.container}>
          <div className={styles.headRow}>
            <div className={styles.secHead}>
              <h2 id="industries-title" className={styles.h2}>
                {copy.industries.title}
              </h2>
              <p className={styles.lead}>{copy.industries.lead}</p>
            </div>
            <Link href={href("/industries")} className={styles.btnSecondary}>
              {copy.industries.cta}
            </Link>
          </div>
          <IndustryList
            items={industries}
            more={{ label: copy.industries.more, href: href("/industries") }}
          />
        </div>
      </section>

      {/* 7. Platform capabilities */}
      <section
        className={`${styles.capabilities} band-blue`}
        aria-labelledby="cap-title"
      >
        <div className={styles.container}>
          <div className={styles.secHead}>
            <h2 id="cap-title" className={styles.h2}>
              {copy.capabilities.title}
            </h2>
          </div>
          <CapabilitySwitcher items={capabilities} />
        </div>
      </section>

      {/* 8. Case studies */}
      <section className={`${styles.cases}`} aria-labelledby="cases-title">
        <div className={styles.container}>
          <div className={styles.headRow}>
            <div className={styles.secHead}>
              <h2 id="cases-title" className={styles.h2}>
                {copy.cases.title}
              </h2>
            </div>
            <Link href={href("/contact")} className={styles.btnPrimary}>
              {copy.cases.cta}
            </Link>
          </div>
          <div className={styles.caseGrid}>
            {CASES.map((c) => {
              const text = copy.cases.items[c.id];
              return (
                <article key={c.id} className={styles.caseCard}>
                  <Image
                    alt={text.alt}
                    fill
                    sizes="(min-width: 1024px) 600px, 92vw"
                    src={c.src}
                  />
                  <div className={styles.caseText}>
                    <span className={styles.caseIndustry}>{text.industry}</span>
                    <strong className={styles.caseValue}>
                      <CountUp value={c.value} />
                    </strong>
                    <h3>{text.claim}</h3>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section
        className={`${styles.trust} band-blue`}
        id="security"
        aria-labelledby="trust-title"
      >
        <div className={`${styles.container} ${styles.trustGrid}`}>
          <div className={styles.secHead}>
            <h2 id="trust-title" className={styles.h2}>
              {copy.trust.title}
            </h2>
            <p className={styles.lead}>{copy.trust.lead}</p>
          </div>
          <ul className={styles.trustList}>
            {TRUST.map(({ id, icon: Icon }) => {
              const text = copy.trust.items[id];
              return (
                <li key={id} className={styles.trustCard}>
                  <Icon aria-hidden="true" strokeWidth={1.6} />
                  <div>
                    <h3>{text.title}</h3>
                    <p>{text.body}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* 10. FAQ */}
      <section className={`${styles.faq}`} aria-labelledby="faq-title">
        <div className={`${styles.container} ${styles.faqGrid}`}>
          <div className={styles.secHead}>
            <h2 id="faq-title" className={styles.h2}>
              {copy.faq.title}
            </h2>
            <p className={styles.lead}>{copy.faq.lead}</p>
          </div>
          <FaqAccordion items={copy.faq.items} />
        </div>
      </section>

      {/* 11. Closing banner */}
      <section className={styles.closing}>
        <div className={styles.container}>
          <CtaBanner
            buttonText={copy.closing.button}
            description={copy.closing.description}
            href={href("/contact")}
            title={copy.closing.title}
          />
        </div>
      </section>
    </main>
  );
}
