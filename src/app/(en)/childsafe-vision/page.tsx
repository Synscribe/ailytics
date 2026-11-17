import { ScannedHighlight } from "@/components/scanned-highlight/scanned-highlight";
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
  CheckIcon,
  SearchIcon,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import {
  buildBreadcrumbJsonLd,
  buildSoftwareApplicationJsonLd,
  createPageMetadata,
  serializeJsonLd,
} from "@/lib/seo";
import { CtaBanner } from "@/components/cta-banner/cta-banner";

const PATH = "/childsafe-vision";

export const metadata: Metadata = createPageMetadata({
  title: "ChildSafe Vision: AI Video Safety for Preschools",
  description:
    "Transform existing preschool CCTV into a proactive child-safety system with real-time alerts, AI-assisted incident review and privacy-first on-site analytics.",
  path: PATH,
});

const BREADCRUMBS = [
  { name: "Home", path: "/" },
  { name: "Industries", path: "/industries" },
  { name: "ChildSafe Vision", path: PATH },
];

const IMAGES = {
  hero: {
    src: "/media/childsafe-vision/unsupervised-child-alert.webp",
    alt: "ChildSafe Vision unsupervised-child alert with CCTV playback and automated analysis.",
    width: 1162,
    height: 732,
  },
  roughHandling: {
    src: "/media/childsafe-vision/rough-handling-review.webp",
    alt: "ChildSafe Vision incident review showing rough-handling analysis and operator controls.",
    width: 871,
    height: 545,
  },
  distress: {
    src: "/media/childsafe-vision/distress-review.webp",
    alt: "ChildSafe Vision distress detection review with CCTV footage and AI analysis results.",
    width: 790,
    height: 497,
  },
  investigation: {
    src: "/media/childsafe-vision/ai-incident-review.webp",
    alt: "AI-assisted incident review showing video frames, analysis results and detected anomalies.",
    width: 748,
    height: 520,
  },
} as const;

const HERO_POINTS = [
  "Works with existing CCTV",
  "On-site AI processing",
  "PDPA-first architecture",
] as const;

const TRUST = [
  { value: "24/7", label: "Continuous monitoring" },
  { value: "Under 10s", label: "Advanced trigger review" },
  { value: "Existing CCTV", label: "No rip-and-replace" },
  { value: "SG ready", label: "Built for local context" },
] as const;

const VALUES = [
  {
    title: "Detect risk early",
    body: "Monitor supervision gaps, falls, distress, unauthorised access and camera issues across every connected feed.",
  },
  {
    title: "Respond with context",
    body: "Send actionable alerts with the event frame, time, location and AI-generated summary to the right people.",
  },
  {
    title: "Investigate confidently",
    body: "Search incidents in natural language, review the evidence and export a consistent chain-of-custody record.",
  },
] as const;

const CAPABILITIES = [
  {
    title: "Unsupervised child",
    body: "Detect children in configured areas without an adult present, with pre-alert, alert and escalation logic.",
    tag: "Supervision",
  },
  {
    title: "Intrusion & loitering",
    body: "Define high-sensitivity zones and time-based rules for unknown or unauthorised individuals.",
    tag: "Access",
  },
  {
    title: "Falls & rough handling",
    body: "Use pose and behavioural analysis to surface possible falls or concerning interactions for review.",
    tag: "Incident",
  },
  {
    title: "Distress signals",
    body: "Identify isolation, prolonged stillness and body-language cues that may indicate a child needs help.",
    tag: "Wellbeing",
  },
  {
    title: "Face indexing",
    body: "Support consent-based staff and visitor lists, unknown-person review and privacy masking for sharing.",
    tag: "Identity",
  },
  {
    title: "Tamper & feed loss",
    body: "Alert centre leaders when a camera is blocked, defocused, moved or no longer transmitting.",
    tag: "System health",
  },
] as const;

const EVIDENCE = [
  {
    image: IMAGES.roughHandling,
    label: "Incident review",
    eyebrow: "Contextual review",
    title: "See why an event was flagged",
    body: "Operators receive the relevant clip, a concise summary and the detected behaviour, not a context-free notification.",
  },
  {
    image: IMAGES.distress,
    label: "Distress detection",
    eyebrow: "Behavioural signals",
    title: "Look beyond simple motion",
    body: "Behavioural analysis considers posture, isolation and stillness to help teams identify situations that warrant attention.",
  },
] as const;

const FLOW = [
  {
    location: "Customer site",
    title: "Existing IP cameras & NVR",
    body: "Connect over your secure LAN using RTSP, ONVIF or supported vendor integrations.",
    note: "Video retention remains under centre control",
  },
  {
    location: "On-site edge",
    title: "Real-time AI appliance",
    body: "Detection, tracking, pose analysis, behavioural reasoning and escalation logic run locally.",
    note: "Fast alerts with minimal data movement",
    featured: true,
  },
  {
    location: "Secure services",
    title: "Dashboard, alerts & updates",
    body: "Manage multiple centres, push mobile alerts and receive signed model updates.",
    note: "Only approved metadata and clips traverse the link",
  },
] as const;

const INVESTIGATION = [
  {
    title: "Natural-language search",
    body: "Search by person, action, location or context.",
  },
  {
    title: "AI-assisted incident summary",
    body: "Surface observations and anomalies for human review.",
  },
  {
    title: "Controlled evidence export",
    body: "Support time-bounded access and chain-of-custody records.",
  },
] as const;

const PRIVACY = [
  {
    title: "Data residency",
    body: "Video remains on the centre's NVR. On-appliance storage is encrypted at rest.",
  },
  {
    title: "Consent controls",
    body: "Face databases and retraining samples follow defined, consent-led retention rules.",
  },
  {
    title: "Secure updates",
    body: "Signed model updates and documented change control protect deployed systems.",
  },
  {
    title: "Audit ready",
    body: "ISO/IEC 27001 certified processes with third-party vulnerability assessment support.",
  },
] as const;

const STEPS = [
  { title: "Site survey", body: "Camera, NVR and network audit." },
  { title: "Configure", body: "Zones, rules and escalation paths." },
  { title: "Deploy", body: "Edge appliance and integration tests." },
  { title: "Train", body: "Centre leader and staff onboarding." },
  { title: "Operate", body: "Health reports, support and updates." },
] as const;

const STRUCTURED_DATA = [
  buildBreadcrumbJsonLd(BREADCRUMBS),
  buildSoftwareApplicationJsonLd({
    name: "ChildSafe Vision",
    description:
      "AI-powered video safety system that transforms existing preschool CCTV into a proactive child-safety platform with real-time alerts, AI-assisted incident review and privacy-first on-site analytics.",
    path: PATH,
    applicationCategory: "SecurityApplication",
    operatingSystem: "On-premise edge appliance",
    audienceType: "Preschools and early childhood care centres",
    featureList: [
      "24/7 continuous monitoring",
      "Unsupervised child detection",
      "Intrusion and loitering alerts",
      "Falls and rough handling detection",
      "Distress signal identification",
      "Face indexing with consent controls",
      "Camera tamper and feed loss alerts",
      "Natural-language incident search",
      "AI-assisted incident summary",
      "On-site edge processing for privacy",
      "Existing CCTV integration",
    ],
    screenshots: [
      IMAGES.hero,
      IMAGES.roughHandling,
      IMAGES.distress,
      IMAGES.investigation,
    ].map((image) => ({
      path: image.src,
      caption: image.alt.replace(/\.$/, ""),
    })),
  }),
];

function number(index: number) {
  return String(index + 1).padStart(2, "0");
}

function Eyebrow({
  children,
  light = false,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <p
      className={`text-sm font-medium ${light ? "text-mint" : "text-signal-strong"}`}
    >
      {children}
    </p>
  );
}

export default function ChildSafeVisionPage() {
  const trail = BREADCRUMBS.slice(0, -1);

  return (
    <main id="main-content">
      {STRUCTURED_DATA.map((data) => (
        <script
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
          key={data["@type"]}
          type="application/ld+json"
        />
      ))}

      <section className="brand-hero">
        <div className="mx-auto w-full max-w-7xl px-5 pt-10 pb-16 sm:px-8 sm:pt-12 sm:pb-20">
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
                ChildSafe Vision
              </li>
            </ol>
          </nav>

          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <div>
              <Eyebrow>AI video safety for preschools</Eyebrow>
              <h1 className="brand-h1 mt-4 max-w-xl">
                Real-time AI protection for{" "}
                <ScannedHighlight>every child</ScannedHighlight> in your care.
              </h1>
              <p className="brand-lead mt-6 max-w-xl">
                ChildSafe Vision transforms your existing CCTV into a proactive
                safety system that detects risk, alerts staff and makes incident
                review faster and clearer.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link className="brand-btn-primary" href="/contact">
                  Request a centre assessment
                  <ArrowUpRightIcon className="size-4" aria-hidden="true" />
                </Link>
                <a className="brand-btn-secondary" href="#how-it-works">
                  See how it works
                  <ArrowDownIcon className="size-4" aria-hidden="true" />
                </a>
              </div>
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-ink-muted">
                {HERO_POINTS.map((point) => (
                  <li className="flex items-center gap-2" key={point}>
                    <CheckIcon
                      className="size-4 shrink-0 text-signal"
                      aria-hidden="true"
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <figure className="relative">
              <div className="brand-card overflow-hidden p-2 sm:p-3">
                <p className="flex items-center gap-2 px-2 pt-1 pb-3 text-xs font-medium text-ink-muted">
                  <span
                    aria-hidden="true"
                    className="size-2 rounded-full bg-alert"
                  />
                  Live incident review
                </p>
                <Image
                  alt={IMAGES.hero.alt}
                  className="h-auto w-full rounded-lg"
                  height={IMAGES.hero.height}
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  src={IMAGES.hero.src}
                  width={IMAGES.hero.width}
                />
              </div>
              <div className="brand-card absolute top-12 right-3 hidden px-4 py-3 shadow-[0_12px_32px_-12px_rgba(39,64,93,0.3)] sm:block lg:top-16 lg:-right-8">
                <p className="text-xs font-medium text-ink-faint">
                  Live monitoring
                </p>
                <p className="mt-0.5 flex items-center gap-2 text-sm font-medium text-ink">
                  <span
                    aria-hidden="true"
                    className="size-2 rounded-full bg-signal"
                  />
                  All cameras connected
                </p>
              </div>
              <div className="brand-card absolute bottom-16 left-3 hidden items-center gap-3 px-4 py-3 shadow-[0_12px_32px_-12px_rgba(39,64,93,0.3)] sm:flex lg:bottom-20 lg:-left-10">
                <span
                  aria-hidden="true"
                  className="grid size-8 place-items-center rounded-full bg-alert/15 text-sm font-medium text-alert"
                >
                  !
                </span>
                <div>
                  <p className="text-xs font-medium text-ink-faint">
                    Supervision alert
                  </p>
                  <p className="text-sm font-medium text-ink">Review ready</p>
                </div>
              </div>
              <figcaption className="mt-4 flex items-center justify-end gap-2 text-sm font-medium text-ink-muted">
                <CheckIcon className="size-4 text-signal" aria-hidden="true" />
                Video stays on your NVR
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section aria-label="At a glance" className="bg-night text-paper">
        <ul className="mx-auto grid w-full max-w-7xl gap-8 px-5 py-10 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
          {TRUST.map((item) => (
            <li key={item.label}>
              <p className="text-2xl font-normal tracking-[-0.02em]">
                {item.value}
              </p>
              <p className="mt-1 text-sm text-paper/70">{item.label}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="proactive-title" className="py-20 sm:py-28">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>From reactive to proactive</Eyebrow>
            <h2 className="brand-h2 mt-4" id="proactive-title">
              See the moments that need attention,{" "}
              <ScannedHighlight>as they happen.</ScannedHighlight>
            </h2>
            <p className="brand-lead mt-5">
              Staff cannot watch every camera every second. ChildSafe Vision
              works quietly in the background, escalating only the situations
              that matter and maintaining a clear audit trail.
            </p>
          </div>
          <ol className="mt-14 grid gap-5 md:grid-cols-3">
            {VALUES.map((value, index) => (
              <li className="brand-card p-6 sm:p-8" key={value.title}>
                <span
                  aria-hidden="true"
                  className={`grid size-10 place-items-center rounded-lg text-sm font-medium text-paper ${index === 0 ? "bg-ink" : "bg-signal"}`}
                >
                  {number(index)}
                </span>
                <h3 className="mt-6 text-lg font-medium text-ink">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-ink-muted">
                  {value.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        aria-labelledby="capabilities-title"
        className="bg-muted py-20 sm:py-28"
      >
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>One safety layer. Six critical capabilities.</Eyebrow>
            <h2 className="brand-h2 mt-4" id="capabilities-title">
              Designed around the realities of{" "}
              <ScannedHighlight>early childhood care.</ScannedHighlight>
            </h2>
          </div>
          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map((capability, index) => (
              <li
                className="brand-card flex flex-col p-6 sm:p-8"
                key={capability.title}
              >
                <span
                  aria-hidden="true"
                  className="text-sm font-medium text-signal"
                >
                  {number(index)}
                </span>
                <h3 className="mt-3 text-lg font-medium text-ink">
                  {capability.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-ink-muted">
                  {capability.body}
                </p>
                <p className="mt-6 self-start rounded-full bg-muted px-3 py-1 text-xs font-medium text-ink-muted">
                  {capability.tag}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="evidence-title" className="py-20 sm:py-28">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>Incidents become actionable</Eyebrow>
            <h2 className="brand-h2 mt-4" id="evidence-title">
              From a camera frame to a{" "}
              <ScannedHighlight>clear next step.</ScannedHighlight>
            </h2>
            <p className="brand-lead mt-5">
              Each event combines visual evidence with an AI assessment,
              confidence level and operator review workflow.
            </p>
          </div>
          <ul className="mt-14 grid gap-5 lg:grid-cols-2">
            {EVIDENCE.map((item) => (
              <li className="brand-card overflow-hidden" key={item.title}>
                <div className="relative border-b border-ink/10 bg-muted p-3 sm:p-4">
                  <p className="absolute top-6 left-6 z-10 rounded-full bg-night px-3 py-1 text-xs font-medium text-paper sm:top-7 sm:left-7">
                    {item.label}
                  </p>
                  <Image
                    alt={item.image.alt}
                    className="aspect-[16/10] w-full rounded-lg object-cover object-top"
                    height={item.image.height}
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    src={item.image.src}
                    width={item.image.width}
                  />
                </div>
                <div className="p-6 sm:p-8">
                  <p className="text-sm font-medium text-signal">
                    {item.eyebrow}
                  </p>
                  <h3 className="mt-2 text-lg font-medium text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-ink-muted">
                    {item.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        aria-labelledby="how-it-works-title"
        className="scroll-mt-24 bg-night py-20 text-paper sm:py-28"
        id="how-it-works"
      >
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow light>How it works</Eyebrow>
            <h2 className="brand-h2 mt-4" id="how-it-works-title">
              Your existing cameras.{" "}
              <ScannedHighlight>A smarter safety layer.</ScannedHighlight>
            </h2>
            <p className="mt-5 text-[1.0625rem] leading-relaxed text-pretty text-paper/75">
              Analytics run on-site for low latency and data control, while
              secure services support dashboards, updates and authorised
              investigations.
            </p>
          </div>
          <ol className="mt-14 grid gap-5 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-stretch">
            {FLOW.map((step, index) => (
              <li className="contents" key={step.title}>
                {index > 0 ? (
                  <ArrowRightIcon
                    aria-hidden="true"
                    className="mx-auto hidden size-5 self-center text-paper/50 lg:block"
                  />
                ) : null}
                <div
                  className={`flex flex-col rounded-2xl p-6 sm:p-8 ${
                    "featured" in step
                      ? "bg-paper text-ink"
                      : "border border-paper/15 bg-paper/5"
                  }`}
                >
                  <p
                    className={`flex items-center gap-3 text-sm font-medium ${"featured" in step ? "text-signal-strong" : "text-mint"}`}
                  >
                    <span
                      aria-hidden="true"
                      className="grid size-8 place-items-center rounded-lg bg-signal text-xs text-paper"
                    >
                      {number(index)}
                    </span>
                    {step.location}
                  </p>
                  <h3 className="mt-6 text-lg font-medium">{step.title}</h3>
                  <p
                    className={`mt-2 flex-1 text-sm leading-6 ${"featured" in step ? "text-ink-muted" : "text-paper/75"}`}
                  >
                    {step.body}
                  </p>
                  <p
                    className={`mt-6 border-t pt-4 text-xs font-medium ${"featured" in step ? "border-ink/10 text-ink" : "border-paper/25 text-paper/85"}`}
                  >
                    {step.note}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mx-auto mt-10 flex max-w-3xl gap-3 rounded-2xl border border-paper/15 bg-paper/5 px-5 py-4 text-sm leading-6 text-paper/80">
            <span
              aria-hidden="true"
              className="mt-2 size-2 shrink-0 rounded-full bg-signal"
            />
            <span>
              <strong className="text-paper">Privacy by design:</strong> video
              stays on the customer NVR by default. Cloud transfer is limited to
              event metadata and explicitly approved clips.
            </span>
          </p>
        </div>
      </section>

      <section aria-labelledby="investigation-title" className="py-20 sm:py-28">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <Eyebrow>AI-native investigation</Eyebrow>
            <h2 className="brand-h2 mt-4" id="investigation-title">
              Find the incident without scrubbing through hours of footage.
            </h2>
            <p className="brand-lead mt-5">
              Use plain-language queries to locate relevant moments, review
              AI-generated summaries and export a consistent investigation
              record.
            </p>
            <ul className="mt-8 flex flex-col gap-5">
              {INVESTIGATION.map((item) => (
                <li className="flex gap-4" key={item.title}>
                  <span
                    aria-hidden="true"
                    className="grid size-7 shrink-0 place-items-center rounded-full bg-signal/15 text-signal"
                  >
                    <CheckIcon className="size-4" />
                  </span>
                  <div>
                    <h3 className="font-medium text-ink">{item.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-ink-muted">
                      {item.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <figure className="rounded-2xl bg-night p-3 sm:p-4">
            <figcaption className="flex items-center gap-2 px-2 pt-1 pb-3 text-xs font-medium text-paper/80">
              <span
                aria-hidden="true"
                className="size-2 rounded-full bg-signal"
              />
              AI incident analysis
            </figcaption>
            <Image
              alt={IMAGES.investigation.alt}
              className="h-auto w-full rounded-lg"
              height={IMAGES.investigation.height}
              sizes="(min-width: 1024px) 45vw, 100vw"
              src={IMAGES.investigation.src}
              width={IMAGES.investigation.width}
            />
            <p className="mt-3 flex items-center gap-3 rounded-full bg-paper px-4 py-3 text-sm text-ink">
              <SearchIcon
                className="size-4 shrink-0 text-ink-faint"
                aria-hidden="true"
              />
              Show all unusual interactions near the entrance
            </p>
          </figure>
        </div>
      </section>

      <section
        aria-labelledby="privacy-title"
        className="bg-muted py-20 sm:py-28"
      >
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <div>
            <Eyebrow>Privacy, security & compliance</Eyebrow>
            <h2 className="brand-h2 mt-4" id="privacy-title">
              Child safety without compromising{" "}
              <ScannedHighlight>data responsibility.</ScannedHighlight>
            </h2>
            <p className="brand-lead mt-5 max-w-xl">
              Designed for Singapore&apos;s early childhood environment with
              clear data controls, secure deployment and auditable operating
              processes.
            </p>
          </div>
          <ul className="grid gap-5 sm:grid-cols-2">
            {PRIVACY.map((item, index) => (
              <li className="brand-card p-6" key={item.title}>
                <span
                  aria-hidden="true"
                  className="text-sm font-medium text-signal"
                >
                  {number(index)}
                </span>
                <h3 className="mt-3 text-lg font-medium text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-ink-muted">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        aria-labelledby="implementation-title"
        className="py-20 sm:py-28"
      >
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>Implementation & support</Eyebrow>
            <h2 className="brand-h2 mt-4" id="implementation-title">
              From site survey to{" "}
              <ScannedHighlight>ongoing operations.</ScannedHighlight>
            </h2>
          </div>
          <ol className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
            {STEPS.map((step, index) => (
              <li
                className="flex flex-col items-center text-center"
                key={step.title}
              >
                <span
                  aria-hidden="true"
                  className={`grid size-12 place-items-center rounded-xl text-lg font-medium text-paper ${index === 2 ? "bg-signal" : "bg-ink"}`}
                >
                  {index + 1}
                </span>
                <h3 className="mt-5 font-medium text-ink">{step.title}</h3>
                <p className="mt-1 text-sm leading-6 text-ink-muted">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="pb-28 sm:pb-32">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <CtaBanner
            buttonText="Request a centre assessment"
            description="Tell us a little about what you're looking for and we'll get back to you shortly."
            footage={null}
            href="/contact"
            title="Talk to us"
          />
        </div>
      </section>
    </main>
  );
}
