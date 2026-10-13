import { CustomerProof } from "@/components/customer-proof/customer-proof";
import {
  ArrowRightIcon,
  BellRingIcon,
  CctvIcon,
  CloudIcon,
  FileTextIcon,
  MapPinnedIcon,
  PlusIcon,
  ScanFaceIcon,
  ServerIcon,
  ShieldCheckIcon,
  WorkflowIcon,
} from "lucide-react";
import type { Metadata } from "next";

import { ProjectVisual } from "@/components/visuals/project-visual";
import type { VisualId } from "@/lib/visuals";
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
import { RevealGroup } from "./_components/reveal-group.client";
import styles from "./home.module.css";

export const metadata: Metadata = createPageMetadata({
  title: "AI Video Analytics for Heavy Industry Safety",
  description:
    "AI video analytics for heavy industry. Ailytics turns your existing CCTV into real-time alerts for safety, security and productivity, on the edge or in the cloud.",
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
    body: "Measures how close workers are to plant, vehicles and lifted loads in real meters, from a single CCTV camera. No LiDAR or radar.",
    visual: <DepthVisual />,
    link: { href: "#how-it-works", label: "How 3D distance works" },
  },
  {
    id: "harsh-conditions",
    title: "Accurate in rain, dust and low light",
    body: "Built for live outdoor sites: night shifts, rain, dust and long-range cameras, with 80 to 95% detection accuracy in the field.",
    visual: <HarshVisual />,
  },
  {
    id: "ask-your-cameras",
    title: "Search footage in plain English",
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
    body: "Draw exclusion zones, set grace periods and alert cooldowns, and combine detections into your own rules to cut false alarms.",
    visual: <SetupVisual />,
  },
];

type UseCaseTile = {
  id: VisualId;
  title: string;
  body: string;
  href: string;
};

const USE_CASES: UseCaseTile[] = [
  {
    id: "ppe-detection",
    title: "PPE detection",
    body: "Missing hard hats, vests and gloves, flagged in each work area.",
    href: "/uses/ppe-detection",
  },
  {
    id: "machinery-proximity",
    title: "Machinery proximity",
    body: "Real distance between workers and moving plant, from one camera.",
    href: "/uses",
  },
  {
    id: "under-load-detection",
    title: "Under suspended loads",
    body: "Workers inside the drop zone of a lift, flagged for the lifting supervisor.",
    href: "/uses",
  },
  {
    id: "fire-smoke-detection",
    title: "Smoke and fire",
    body: "Early smoke and flame detection, so teams can respond quickly.",
    href: "/uses",
  },
  {
    id: "no-access-zones",
    title: "Restricted areas",
    body: "Unauthorized entry into barricaded or after-hours zones.",
    href: "/uses",
  },
  {
    id: "machinery-usage",
    title: "Machinery utilization",
    body: "Working and idle hours for excavators, cranes and rigs.",
    href: "/uses",
  },
];

const INDUSTRIES = [
  {
    label: "Construction",
    hazards: "Struck-by machinery, suspended loads, open edges, PPE",
    href: "/industries/construction",
  },
  {
    label: "Manufacturing",
    hazards: "Machine areas, forklifts, PPE, smoke and fire",
    href: "/industries",
  },
  {
    label: "Oil and gas",
    hazards: "Exclusion zones, PPE, smoke and fire",
    href: "/industries",
  },
  {
    label: "Logistics and warehousing",
    hazards: "Forklifts, reversing vehicles, restricted areas",
    href: "/industries",
  },
  {
    label: "Ports and airports",
    hazards: "Lifting, quayside and airside vehicles, restricted areas",
    href: "/industries",
  },
  {
    label: "Data centers",
    hazards: "Restricted areas, contractor safety, smoke and fire",
    href: "/industries",
  },
];

const CAPABILITIES = [
  {
    icon: BellRingIcon,
    title: "Real-time alerts",
    body: "Each alert carries the event frame, time and location, and goes straight to the supervisor's phone and dashboard.",
  },
  {
    icon: FileTextIcon,
    title: "Compliance reporting",
    body: "Automated weekly reports show alert trends by site, zone and hazard, ready for safety meetings and audits.",
  },
  {
    icon: MapPinnedIcon,
    title: "Multi-site view",
    body: "Every project and plant on one map, with open alerts and trends for each site.",
  },
  {
    icon: CloudIcon,
    title: "Deployment that meets data residency rules",
    body: "Run detection on the edge, on-premise or in the cloud, with regional hosting so video stays where your policies require.",
  },
  {
    icon: WorkflowIcon,
    title: "Custom scenarios, two ways",
    body: "Train a dedicated detection model for a site-specific hazard, or describe the scenario in plain language and let the vision language model check for it.",
  },
  {
    icon: CctvIcon,
    title: "Works with the cameras you own",
    body: "Any IP camera from 2MP up, connected over RTSP. No new hardware.",
  },
];

const CASES = [
  {
    industry: "Construction",
    title: "69.1% fewer non-compliances on a construction site in 16 months",
    src: "/media/ailytics/stills/open-edge-detection.jpg",
    alt: "Camera view over a building under construction, with workers on an upper floor.",
  },
  {
    industry: "Manufacturing",
    title: "77% fewer non-compliances at a manufacturing site",
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
      "Ailytics maintains 80 to 95% detection accuracy across its projects in the field, and each use case can be tuned to your site.",
  },
  {
    question: "How long does it take to go live?",
    answer: "Under 2 weeks on the cameras you already have.",
  },
  {
    question: "Does it replace our EHS software or video management system?",
    answer:
      "No. Ailytics adds AI detection to your cameras and sends its alerts and reports to the systems you already use.",
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
            AI video analytics that turns your CCTV into a safety team
          </h1>
          <p className={styles.heroLead}>
            Ailytics connects to the CCTV you already own and alerts your EHS
            and site teams to PPE breaches, exclusion zone entries, near misses
            and idle equipment as they happen. Live in under 2 weeks on
            construction sites, plants, ports and yards.
          </p>
          <div className={styles.actions}>
            <Link href="/contact" className={styles.btnPrimary}>
              Request a demo
            </Link>
            <Link href="/uses" className={styles.btnSecondary}>
              See all use cases
            </Link>
          </div>
          <HeroWall />
        </div>
      </section>

      {/* 2. Customers and results */}
      <CustomerProof />

      {/* 3. Problem */}
      <ProblemScene />

      {/* 4. How it works */}
      <DepthStory />

      {/* 5. Features */}
      <section className={styles.features} aria-labelledby="features-title">
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
                <div className={styles.fvis}>{f.visual}</div>
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
            <Link href="/uses" className={styles.btnSecondary}>
              See all use cases
            </Link>
          </div>
          <ul className={styles.ucGrid}>
            {USE_CASES.map((uc) => (
              <li key={uc.id}>
                <Link href={uc.href} className={styles.ucCard}>
                  <div className={styles.ucVis}>
                    <ProjectVisual
                      fill
                      id={uc.id}
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
                    />
                  </div>
                  <h3>{uc.title}</h3>
                  <p>{uc.body}</p>
                  <ArrowRightIcon aria-hidden="true" strokeWidth={1.75} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 7. Industries */}
      <section className={styles.industries} aria-labelledby="industries-title">
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
          <RevealGroup>
            <ul className={styles.industryGrid}>
              {INDUSTRIES.map((ind) => (
                <li key={ind.label} data-reveal>
                  <Link href={ind.href} className={styles.industryCard}>
                    <h3>{ind.label}</h3>
                    <p>{ind.hazards}</p>
                    <ArrowRightIcon aria-hidden="true" strokeWidth={1.75} />
                  </Link>
                </li>
              ))}
            </ul>
          </RevealGroup>
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
          <ul className={styles.capGrid}>
            {CAPABILITIES.map(({ icon: Icon, title, body }) => (
              <li key={title}>
                <span className={styles.capIcon}>
                  <Icon aria-hidden="true" strokeWidth={1.75} />
                </span>
                <h3>{title}</h3>
                <p>{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 8. Case studies */}
      <section className={styles.cases} aria-labelledby="cases-title">
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
              <article key={c.title} className={styles.caseCard}>
                <div className={styles.caseMedia}>
                  <Image
                    alt={c.alt}
                    fill
                    sizes="(min-width: 1024px) 600px, 92vw"
                    src={c.src}
                  />
                  <span className={styles.caseChip}>{c.industry}</span>
                </div>
                <h3>{c.title}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Security and privacy */}
      <section className={styles.trust} aria-labelledby="trust-title">
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
                <span className={styles.capIcon}>
                  <Icon aria-hidden="true" strokeWidth={1.75} />
                </span>
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
      <section className={styles.faq} aria-labelledby="faq-title">
        <div className={`${styles.container} ${styles.faqGrid}`}>
          <div className={styles.secHead}>
            <h2 id="faq-title" className={styles.h2}>
              Common questions
            </h2>
            <p className={styles.lead}>
              The questions safety, operations and IT teams ask before a demo.
            </p>
          </div>
          <div className={styles.faqList}>
            {FAQS.map((f) => (
              <details key={f.question} className={styles.faqItem}>
                <summary>
                  <h3>{f.question}</h3>
                  <PlusIcon aria-hidden="true" strokeWidth={1.75} />
                </summary>
                <p>{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Closing banner */}
      <section className={styles.closing} aria-labelledby="closing-title">
        <div className={styles.container}>
          <div className={styles.banner}>
            <div>
              <h2 id="closing-title">See Ailytics on a site like yours</h2>
              <p>
                Book a demo and we’ll show you how Ailytics would work on your
                cameras.
              </p>
            </div>
            <Link href="/contact" className={styles.btnLight}>
              Request a demo
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
