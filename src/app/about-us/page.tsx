import { ArrowRightIcon } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import {
  buildBreadcrumbJsonLd,
  createPageMetadata,
  serializeJsonLd,
} from "@/lib/seo";

import {
  TeamCarousel,
  type TeamPhoto,
} from "./_components/team-carousel.client";

export const metadata: Metadata = createPageMetadata({
  title: "About Ailytics, Our Growth and Team",
  description:
    "About Ailytics: born as a Singapore R&D project in 2019, now deployed in 15 countries. Meet the team making industrial workplaces safer and smarter with vision AI.",
  path: "/about-us",
});

const PRESS = [
  {
    name: "Tech in Asia",
    href: "https://www.techinasia.com/spent-day-construction-site-ai-protects-workers",
    src: "/brand/press/tech-in-asia.png",
    width: 301,
    height: 300,
    // The source image has wide padding around the mark.
    className: "h-20",
  },
  {
    name: "The Business Times",
    href: "https://www.businesstimes.com.sg/events-awards/emerging-enterprise/creating-safer-simpler-world-technology",
    src: "/brand/press/business-times.jpg",
    width: 200,
    height: 200,
    className: "h-14",
  },
  {
    name: "Infocomm Media Development Authority",
    href: "https://www.imda.gov.sg/resources/blog/blog-articles/2024/08/how-vision-ai-sees-the-world",
    src: "/brand/press/imda.webp",
    width: 277,
    height: 70,
    className: "h-11",
  },
  {
    name: "The Straits Times",
    href: "https://www.straitstimes.com/fastest-growing-companies-2026",
    src: "/brand/press/straits-times.png",
    width: 512,
    height: 512,
    className: "h-14",
  },
  {
    name: "BeAmp",
    href: "https://www.beamp.sg/stories/building-real-time-visibility-into-the-construction-site",
    src: "/brand/press/beamp.png",
    width: 1848,
    height: 895,
    className: "h-16",
  },
] as const;

const STATS = [
  {
    value: "7",
    label: "Years in Development",
    body: "We started as a R&D project between National University of Singapore and the Singapore Housing & Development Board back in 2019!",
  },
  {
    value: "15",
    label: "Countries Deployed",
    body: "You can find Ailytics in Asia, Europe, Australia, and the Americas.",
    link: { href: "/projects", label: "Check out our map here!" },
  },
  {
    value: "11",
    label: "Team Nationalities",
    body: "A team spanning 11 nationalities, giving us diverse perspectives on safety challenges across regions and cultures.",
  },
  {
    value: "4.2+",
    label: "Million Total Hazards",
    body: "We've detected over 4.2 million total hazards since we've launched!",
    note: "( as per January 2026 )",
  },
  {
    value: "500+",
    label: "Million Square Meters",
    body: "That's how many meters of workspace that we're currently covering.",
    note: "( as per January 2026 )",
  },
] as const;

const TEAM_PHOTOS: readonly TeamPhoto[] = [
  {
    src: "/media/about/team-01-stage-speech.webp",
    alt: "Man on stage giving a speech",
  },
  {
    src: "/media/about/team-02-holding-box.webp",
    alt: "Three guys posing for a photo while holding a box",
  },
  { src: "/media/about/team-03-boat.webp", alt: "Group of people on a boat" },
  {
    src: "/media/about/team-04-instructor.webp",
    alt: "Group of people receiving instructions from an instructor",
  },
  {
    src: "/media/about/team-05-office.webp",
    alt: "Candid photo of people at an office setting",
  },
  {
    src: "/media/about/team-06-expo-booth.webp",
    alt: "Man standing in front of an expo booth with his arms crossed",
  },
  {
    src: "/media/about/team-07-bus.webp",
    alt: "Group of people posing for a photo on a bus",
  },
  {
    src: "/media/about/team-08-podium.webp",
    alt: "Man giving a speech behind a podium on a stage",
  },
  {
    src: "/media/about/team-09-dock.webp",
    alt: "Group of people posing for a photo on a dock",
  },
  {
    src: "/media/about/team-10-presentation.webp",
    alt: "Man giving a presentation in front of a small crowd",
  },
  {
    src: "/media/about/team-11-banner.webp",
    alt: "Three people posing next to a banner",
  },
];

export default function AboutPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about-us" },
  ]);

  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }}
      />

      <section className="brand-hero">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center px-5 pt-14 pb-12 text-center sm:px-8 sm:pt-16 sm:pb-16">
          <p className="text-sm font-medium text-signal-strong">About Us</p>
          <h1 className="brand-h1 mt-4 max-w-3xl">
            We&apos;re here to make workplaces safer and{" "}
            <span className="text-signal">smarter</span>
          </h1>
          <p className="brand-lead mt-6 max-w-2xl">
            Ailytics is purpose-built for real-world industrial operations. We
            empower workplaces with 24/7 monitoring, real-time actionable
            insights, and better outcomes.
          </p>
        </div>
      </section>

      <section aria-labelledby="press-title" className="py-10">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-7 px-5 sm:px-8">
          <h2 className="text-sm font-medium text-ink-muted" id="press-title">
            Featured On
          </h2>
          <ul className="grid w-full grid-cols-3 items-center justify-items-center gap-x-8 gap-y-8 sm:grid-cols-5">
            {PRESS.map((item) => (
              <li key={item.name}>
                <a
                  className="inline-flex items-center transition hover:-translate-y-0.5 motion-reduce:transition-none"
                  href={item.href}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Image
                    alt={`${item.name} logo`}
                    className={`${item.className} w-auto mix-blend-multiply`}
                    height={item.height}
                    src={item.src}
                    width={item.width}
                  />
                  <span className="sr-only">Read the {item.name} article</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="journey-title" className="py-16 sm:py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-5 px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-3">
          <div className="flex flex-col items-center justify-center p-6 text-center sm:p-8">
            <h2 className="brand-h2 text-signal-strong" id="journey-title">
              Our Journey In Progress
            </h2>
            <Link
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-ink hover:text-signal-strong"
              href="/use-cases"
            >
              How We Turn Vision Into Impact
              <ArrowRightIcon className="size-4" aria-hidden="true" />
            </Link>
            <p className="mt-5 text-sm leading-6 text-ink-muted">
              Born in Singapore, now deployed across the globe.
            </p>
          </div>
          {STATS.map((stat) => (
            <div className="brand-card p-6 sm:p-8" key={stat.label}>
              <p className="text-5xl leading-none font-normal tracking-[-0.03em] text-signal">
                {stat.value}
              </p>
              <h3 className="mt-5 text-base font-medium text-ink">
                {stat.label}
              </h3>
              <p className="mt-3 text-sm leading-6 text-ink-muted">
                {stat.body}
              </p>
              {"link" in stat ? (
                <Link
                  className="mt-3 inline-block text-sm font-medium text-ink underline underline-offset-4 hover:text-signal-strong"
                  href={stat.link.href}
                >
                  {stat.link.label}
                </Link>
              ) : null}
              {"note" in stat ? (
                <p className="mt-3 text-xs text-ink-faint italic">
                  {stat.note}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="experts-title" className="pb-24 sm:pb-28">
        <div className="mx-auto w-full max-w-7xl px-5 text-center sm:px-8">
          <h2 className="brand-h2 text-signal-strong" id="experts-title">
            Built by real experts on the ground
          </h2>
          <p className="brand-lead mx-auto mt-5 max-w-3xl">
            Our team is made up of engineers, operators, and industry experts
            that understand not just AI but also the real nuances of heavy
            industries.
          </p>
        </div>
        <div className="mt-12">
          <TeamCarousel photos={TEAM_PHOTOS} />
        </div>
      </section>
    </main>
  );
}
