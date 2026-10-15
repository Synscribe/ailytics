import { ArrowUpRightIcon } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { RotatingWords } from "@/components/rotating-words.client";
import {
  buildBreadcrumbJsonLd,
  createPageMetadata,
  serializeJsonLd,
} from "@/lib/seo";

import { getJobs, groupJobsByDepartment } from "./_jobs";

function departmentId(name: string): string {
  return `dept-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
}

export const metadata: Metadata = createPageMetadata({
  title: "Careers at a Real Start-Up",
  description:
    "Careers at Ailytics: join a global team building vision AI that makes construction and manufacturing sites safer. See our open roles in engineering, business and operations.",
  path: "/careers",
});

const FEELS = [
  "meaningful",
  "different",
  "like a startup",
  "advanced",
  "red-tape free",
  "global",
] as const;

const REASONS = [
  {
    title: "Real-life Impact",
    body: "We specialize in empowering high risk workspaces, such as construction and manufacturing sites, with the most advanced vision AI solutions. Our work increases efficiency, minimizes risk, and reduce accidents.",
    image: "/media/careers/real-life-impact.webp",
    alt: "Ailytics engineers in hard hats reviewing a camera setup on site",
  },
  {
    title: "Big Ideas, Small Egos",
    body: "Just like our AI models, we're constantly developing and improving. We believe that the best ideas come from collaboration, not ego. No one-man shows here, only one team moving forward together.",
    image: "/media/careers/big-ideas-small-egos.webp",
    alt: "The Ailytics team around a table at a team meal",
  },
  {
    title: "We're Already Global",
    body: "Our headquarters are in Singapore, but our team and mission is global. With 11 different nationalities, 300+ projects across 10 countries; we're taking on the world.",
    image: "/media/careers/already-global.webp",
    alt: "The Ailytics team gathered for a group photo at dinner",
  },
] as const;

export default async function CareersPage() {
  const departments = groupJobsByDepartment(await getJobs());
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Careers", path: "/careers" },
  ]);

  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }}
      />

      <section className="brand-hero">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center px-5 pt-14 pb-16 text-center sm:px-8 sm:pt-16 sm:pb-20">
          <p className="text-sm font-medium text-signal-strong">Careers</p>
          <h1 className="brand-h1 mt-4 max-w-4xl">
            Work that actually feels{" "}
            <RotatingWords className="text-signal" words={FEELS} />
          </h1>
        </div>
      </section>

      <section
        aria-labelledby="envision-title"
        className="bg-mint/15 py-16 sm:py-20"
      >
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <h2 className="sr-only" id="envision-title">
            Let&apos;s Envision A Safer World
          </h2>
          <div className="flex flex-col gap-14 sm:gap-20">
            {REASONS.map((reason, index) => (
              <article
                className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16"
                key={reason.title}
              >
                <div
                  className={`relative aspect-[3/2] overflow-hidden rounded-2xl bg-muted ${index % 2 ? "lg:order-2" : ""}`}
                >
                  <Image
                    alt={reason.alt}
                    className="object-cover"
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    src={reason.image}
                  />
                </div>
                <div
                  className={`mx-auto max-w-md text-center lg:text-left ${index % 2 ? "lg:order-1 lg:ml-auto lg:mr-0" : "lg:mr-auto lg:ml-0"}`}
                >
                  <h3 className="text-h3 text-signal-strong">{reason.title}</h3>
                  <p className="mt-5 leading-7 text-ink-muted">{reason.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        aria-labelledby="openings-title"
        className="py-20 sm:py-24"
        id="openings"
      >
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <h2
            className="brand-h2 text-center text-signal-strong underline decoration-signal/60 decoration-2 underline-offset-8"
            id="openings-title"
          >
            Our Openings
          </h2>

          <div className="mt-14 flex flex-col gap-12">
            {departments.map((department) => (
              <section
                aria-labelledby={departmentId(department.name)}
                key={department.name}
              >
                <h3
                  className="flex items-center gap-3 text-xl font-medium tracking-[-0.015em] text-ink"
                  id={departmentId(department.name)}
                >
                  <span
                    aria-hidden="true"
                    className="h-5 w-1 rounded-full bg-mint-strong"
                  />
                  {department.name}
                </h3>
                <ul className="mt-4 divide-y divide-ink/10 border-y border-ink/10">
                  {department.jobs.map((job) => (
                    <li key={job.slug}>
                      <Link
                        className="group -mx-3 flex items-center justify-between gap-6 rounded-lg px-3 py-4 transition-colors hover:bg-paper"
                        href={`/careers/${job.slug}`}
                      >
                        <span className="text-base font-medium text-ink">
                          {job.title}
                        </span>
                        <span className="flex shrink-0 items-center gap-3 text-sm text-ink-muted">
                          {job.location}
                          <ArrowUpRightIcon
                            aria-hidden="true"
                            className="size-4 text-mint-strong transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
                          />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
