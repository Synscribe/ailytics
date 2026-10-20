import { FaqAccordion } from "@/components/faq-accordion/faq-accordion";
import { CustomerProof } from "@/components/customer-proof/customer-proof";
import { ShieldCheckIcon, ServerIcon, ScanFaceIcon } from "lucide-react";
import type { Metadata } from "next";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { buildFaqJsonLd, createPageMetadata, serializeJsonLd } from "@/lib/seo";

import { DepthStory } from "./_components/depth-story.client";
import {
  AskVisual,
  DepthVisual,
  HarshVisual,
  SetupVisual,
  SitesVisual,
} from "./_components/feature-visuals.client";
import { HeroWall } from "./_components/hero-wall.client";
import { ProblemScene } from "./_components/problem-scene.client";
import styles from "./home.module.css";
import { CtaBanner } from "@/components/cta-banner/cta-banner";
import { type UseCaseTile, UseCaseBento } from "./_components/use-case-bento";
import {
  type Industry,
  IndustryList,
} from "./_components/industry-list.client";
import { CountUp } from "@/components/count-up.client";
import {
  type Capability,
  CapabilitySwitcher,
} from "./_components/capability-switcher.client";

export const metadata: Metadata = createPageMetadata({
  title: "AI Video Analytics for Construction & Heavy Industries",
  description:
    "AI video analytics for construction & heavy industries. Ailytics turns your existing CCTV into real-time safety, security and productivity alerts.",
  path: "/",
});

type Feature = {
  id: string;
  title: string;
  body: string;
  visual: ReactNode;
  link?: { href: string; label: string };
};

const FEATURES: Feature[] = [
  {
    id: "real-3d-distance",
    title: "Real 3D distance from one camera",
    body: "Measures how close workers are to plant, vehicles and lifted loads in real metres, from a single CCTV camera. No LiDAR or radar.",
    visual: <DepthVisual />,
    link: { href: "#how-it-works", label: "How 3D distance works" },
  },
  {
    id: "harsh-conditions",
    title: "Accurate in rain, dust and low light",
    body: "Built for live outdoor sites: night shifts, rain, dust and long-range cameras, with 85–99% detection accuracy in the field.",
    visual: <HarshVisual />,
  },
  {
    id: "ask-your-cameras",
    title: "Search footage in plain language",
    body: "Ask about smoke, idle machinery or unauthorized entry and get the matching clips with camera and time. Powered by Ailytics’ vision language model.",
    visual: <AskVisual />,
  },
  {
    id: "every-site",
    title: "Multi-site safety dashboard",
    body: "Site supervisors get alerts on their phones. EHS managers compare PPE compliance and open alerts across every project on one screen.",
    visual: <SitesVisual />,
  },
  {
    id: "set-up-your-way",
    title: "Rules that match your site",
    body: "Draw exclusion zones, set grace periods and alert cooldowns, and combine detections into your own rules to cut false alerts.",
    visual: <SetupVisual />,
  },
];

const USE_CASES: UseCaseTile[] = [
  {
    id: "ppe-detection",
    title: "PPE detection",
    body: "Missing hard hats, vests and gloves, flagged in each work area.",
    href: "/use-cases/ppe-detection",
  },
  {
    id: "machinery-proximity",
    title: "Machinery proximity",
    body: "Real distance between workers and moving plant, from one camera.",
    href: "/use-cases",
  },
  {
    id: "under-load-detection",
    title: "Under suspended loads",
    body: "Workers inside the drop zone of a lift, flagged for the lifting supervisor.",
    href: "/use-cases",
  },
  {
    id: "fire-smoke-detection",
    title: "Smoke and fire",
    body: "Early smoke and flame detection, so teams can respond quickly.",
    href: "/use-cases",
  },
  {
    id: "no-access-zones",
    title: "Restricted areas",
    body: "Unauthorized entry into barricaded or after-hours zones.",
    href: "/use-cases",
  },
  {
    id: "open-edge-detection",
    title: "Open edges",
    body: "Workers near unguarded edges and openings, flagged before a fall.",
    href: "/use-cases",
  },
];

const INDUSTRIES: Industry[] = [
  {
    label: "Construction",
    hazards: "Struck-by machinery, suspended loads, open edges, PPE",
    href: "/industries/construction",
    src: "/media/ailytics/stills/construction-hero.jpg",
  },
  {
    label: "Manufacturing",
    hazards: "Machine areas, forklifts, PPE, smoke and fire",
    href: "/industries",
    src: "/media/ailytics/stills/crowding.jpg",
  },
  {
    label: "Oil and gas",
    hazards: "Exclusion zones, PPE, smoke and fire",
    href: "/industries",
    src: "/media/projects/paxocean-shipyard.webp",
  },
  {
    label: "Logistics and warehousing",
    hazards: "Forklifts, reversing vehicles, restricted areas",
    href: "/industries",
    src: "/media/ailytics/stills/machinery-proximity.jpg",
  },
  {
    label: "Ports and airports",
    hazards: "Lifting, quayside and airside vehicles, restricted areas",
    href: "/industries",
    src: "/media/projects/changi-terminal-5.webp",
  },
  {
    label: "Data centers",
    hazards: "Restricted areas, contractor safety, smoke and fire",
    href: "/industries",
    // Stock photo until the client supplies one: Pexels 4508751, Pexels license.
    src: "/media/stock/data-center-server-racks.webp",
  },
];

const CAPABILITIES: Capability[] = [
  {
    visualId: "real-time-alerts",
    title: "Real-time alerts",
    body: "Each alert carries the event frame, time and location, and goes straight to the supervisor's phone and dashboard.",
  },
  {
    visualId: "unlimited-reporting",
    title: "Compliance reporting",
    body: "Automated weekly reports show alert trends by site, zone and hazard, ready for safety meetings and audits.",
  },
  {
    visualId: "multi-site-dashboard",
    title: "Multi-site view",
    body: "Every project and plant on one map, with open alerts and trends for each site.",
  },
  {
    visualId: "edge-engine",
    title: "Deployment that meets data-residency rules",
    body: "Run detection on the edge, on-premise or in the cloud, with regional hosting so video stays where your policies require.",
  },
  {
    visualId: "custom-use-cases",
    title: "Custom scenarios, two ways",
    body: "Build your own custom use case, or describe the scenario in plain language and let the vision language model check for it.",
  },
  {
    visualId: "hardware-agnostic",
    title: "Works with the cameras you own",
    body: "Any IP camera from 2MP up, connected over RTSP. No new hardware.",
  },
];

const CASES = [
  {
    industry: "Construction",
    value: "69.1%",
    claim: "fewer non-compliances on a construction site in 16 months",
    src: "/media/ailytics/stills/open-edge-detection.jpg",
    alt: "Camera view over a building under construction, with workers on an upper floor.",
  },
  {
    industry: "Manufacturing",
    value: "77%",
    claim: "fewer non-compliances at a manufacturing site",
    src: "/media/ailytics/stills/crowding.jpg",
    alt: "Camera view of workers in high-visibility clothing on a factory floor.",
  },
];

const TRUST = [
  {
    icon: ShieldCheckIcon,
    title: "ISO/IEC 27001 certified",
    body: "Independently audited information security.",
  },
  {
    icon: ServerIcon,
    title: "On-premise or cloud",
    body: "Run on-premise and video stays on your network.",
  },
  {
    icon: ScanFaceIcon,
    title: "Privacy blurring",
    body: "Blur faces or full bodies so workers stay anonymous.",
  },
];

const FAQS = [
  {
    question: "Do I need new cameras?",
    answer:
      "No. Ailytics works with the IP cameras you already have (2MP and up), connected over RTSP.",
  },
  {
    question: "Where is my video processed and stored?",
    answer:
      "On the edge, on your own servers or in the cloud. You choose. With on-premise deployment, video stays on your network. Ailytics is ISO/IEC 27001 certified.",
  },
  {
    question: "Does it work outdoors, at night and in bad weather?",
    answer:
      "Yes. The models are built for outdoor sites with poor lighting, rain, dust and vibration, and for long-range, small-object detection.",
  },
  {
    question: "What does “2D to 3D from one camera” mean?",
    answer:
      "Ailytics works out depth from a single standard camera, with no lidar, radar or second camera. That lets it measure real distance between people and machinery, and project where a lifted load would fall.",
  },
  {
    question: "How accurate is it?",
    answer:
      "Up to 99% detection accuracy in the field, depending on the scenario. Each use case can be tuned to your site.",
  },
  {
    question: "How long does it take to go live?",
    answer: "Under 2 weeks on the cameras you already have.",
  },
  {
    question: "Does it replace our EHS software or video management system?",
    answer:
      "No. Ailytics adds AI detection to your cameras and sends its alerts and reports to the systems you already use (your VMS and EHS platform).",
  },
  {
    question: "Can we choose which hazards to detect?",
    answer:
      "Yes. Pick from 50+ use cases and set each one’s zones, grace period and alert cooldown to match your site rules.",
  },
];

export default function HomePage() {
  const faqJsonLd = buildFaqJsonLd(FAQS);

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
            AI video monitoring for construction & heavy industries
          </h1>
          <p className={styles.heroHeadline}>
            Safety & Productivity Monitoring That Never Blinks
          </p>
          <p className={styles.heroLead}>
            Ailytics connects to the cameras you already own and alerts your EHS
            and site teams to PPE breaches, exclusion-zone entries, near misses
            and struck-by risk the moment they happen. Live in under 2 weeks on
            construction sites, plants, ports and yards, with no
            rip-and-replace.
          </p>
          <div className={styles.actions}>
            <Link href="/contact" className={styles.btnPrimary}>
              Request a demo
            </Link>
            <Link href="/use-cases" className={styles.btnSecondary}>
              See all use cases
            </Link>
          </div>
          <HeroWall />
        </div>
      </section>

      {/* 2. Customers and results */}
      <CustomerProof spacious />

      {/* 3. Problem */}
      <ProblemScene />

      {/* 4. How it works */}
      <DepthStory />

      {/* 5. Features */}
      <section
        className={`${styles.features} band-alt`}
        aria-labelledby="features-title"
      >
        <div className={styles.container}>
          <div className={styles.headRow}>
            <div className={styles.secHead}>
              <h2 id="features-title" className={styles.h2}>
                Why EHS and site safety teams choose Ailytics
              </h2>
              <p className={styles.lead}>
                Accurate on live sites, and simple to run across every project
                you manage.
              </p>
            </div>
            <Link href="/contact" className={styles.btnPrimary}>
              Request a demo
            </Link>
          </div>
          <div className={styles.fstack}>
            {FEATURES.map((f, i) => (
              <article
                key={f.id}
                id={f.id}
                className={styles.fcard}
                style={{ "--i": i } as never}
                aria-labelledby={`${f.id}-title`}
              >
                <div className={`${styles.fvis} surface-light`}>{f.visual}</div>
                <div className={styles.ftext}>
                  <h3 id={`${f.id}-title`}>{f.title}</h3>
                  <p>{f.body}</p>
                  {f.link ? (
                    <a href={f.link.href} className={styles.textLink}>
                      {f.link.label}
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Use cases */}
      <section className={styles.useCases} aria-labelledby="uses-title">
        <div className={styles.container}>
          <div className={styles.headRow}>
            <div className={styles.secHead}>
              <h2 id="uses-title" className={styles.h2}>
                AI video analytics use cases for every hazard on site
              </h2>
              <p className={styles.lead}>
                Switch on the detections each camera needs, from PPE and
                exclusion zones to idle machinery. 50+ ready to configure.
              </p>
            </div>
            <Link href="/use-cases" className={styles.btnSecondary}>
              See all use cases
            </Link>
          </div>
          <UseCaseBento items={USE_CASES} />
        </div>
      </section>

      {/* 7. Industries */}
      <section
        className={`${styles.industries} band-alt`}
        aria-labelledby="industries-title"
      >
        <div className={styles.container}>
          <div className={styles.headRow}>
            <div className={styles.secHead}>
              <h2 id="industries-title" className={styles.h2}>
                Built for heavy industry and critical infrastructure
              </h2>
              <p className={styles.lead}>
                Find your industry and the hazards Ailytics watches for on sites
                like yours.
              </p>
            </div>
            <Link href="/industries" className={styles.btnSecondary}>
              See all industries
            </Link>
          </div>
          <IndustryList items={INDUSTRIES} />
        </div>
      </section>

      {/* 7. Platform capabilities */}
      <section className={styles.capabilities} aria-labelledby="cap-title">
        <div className={styles.container}>
          <div className={styles.secHead}>
            <h2 id="cap-title" className={styles.h2}>
              Built for EHS reporting, compliance and IT
            </h2>
          </div>
          <CapabilitySwitcher items={CAPABILITIES} />
        </div>
      </section>

      {/* 8. Case studies */}
      <section
        className={`${styles.cases} band-alt`}
        aria-labelledby="cases-title"
      >
        <div className={styles.container}>
          <div className={styles.headRow}>
            <div className={styles.secHead}>
              <h2 id="cases-title" className={styles.h2}>
                Safety results on live projects
              </h2>
            </div>
            <Link href="/contact" className={styles.btnPrimary}>
              Request a demo
            </Link>
          </div>
          <div className={styles.caseGrid}>
            {CASES.map((c) => (
              <article key={c.value} className={styles.caseCard}>
                <Image
                  alt={c.alt}
                  fill
                  sizes="(min-width: 1024px) 600px, 92vw"
                  src={c.src}
                />
                <div className={styles.caseText}>
                  <span className={styles.caseIndustry}>{c.industry}</span>
                  <strong className={styles.caseValue}>
                    <CountUp value={c.value} />
                  </strong>
                  <h3>{c.claim}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className={styles.trust}
        id="security"
        aria-labelledby="trust-title"
      >
        <div className={`${styles.container} ${styles.trustGrid}`}>
          <div className={styles.secHead}>
            <h2 id="trust-title" className={styles.h2}>
              Your footage stays under your control
            </h2>
            <p className={styles.lead}>
              Choose where video is processed and stored, and keep the people on
              camera private.
            </p>
          </div>
          <ul className={styles.trustList}>
            {TRUST.map(({ icon: Icon, title, body }) => (
              <li key={title} className={styles.trustCard}>
                <Icon aria-hidden="true" strokeWidth={1.6} />
                <div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 10. FAQ */}
      <section className={`${styles.faq} band-alt`} aria-labelledby="faq-title">
        <div className={`${styles.container} ${styles.faqGrid}`}>
          <div className={styles.secHead}>
            <h2 id="faq-title" className={styles.h2}>
              Common questions
            </h2>
            <p className={styles.lead}>
              The questions safety, operations and IT teams ask before a demo.
            </p>
          </div>
          <FaqAccordion items={FAQS} />
        </div>
      </section>

      {/* 11. Closing banner */}
      <section className={styles.closing}>
        <div className={styles.container}>
          <CtaBanner
            buttonText="Request a demo"
            description="Book a demo and we’ll show you how Ailytics would work on your cameras."
            href="/contact"
            title="See Ailytics on a site like yours"
          />
        </div>
      </section>
    </main>
  );
}
