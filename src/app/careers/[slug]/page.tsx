import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { isApplicationDeliveryConfigured } from "@/lib/careers-delivery";
import {
  buildBreadcrumbJsonLd,
  createPageMetadata,
  serializeJsonLd,
} from "@/lib/seo";
import {
  TURNSTILE_CAREERS_ACTION,
  turnstileConfiguration,
} from "@/lib/turnstile";

import { getJob, jobSummary, listJobSlugs } from "../_jobs";
import { ApplicationForm } from "./_components/application-form";
import styles from "./job.module.css";

type JobPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return (await listJobSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: JobPageProps): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJob(slug);
  if (!job) notFound();

  return createPageMetadata({
    title: `${job.title} | Careers`,
    description: jobSummary(job),
    path: `/careers/${job.slug}`,
  });
}

export default async function JobPage({ params }: JobPageProps) {
  const { slug } = await params;
  const job = await getJob(slug);
  if (!job) notFound();

  const deliveryConfigured = isApplicationDeliveryConfigured();
  const turnstile = turnstileConfiguration();
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Careers", path: "/careers" },
    { name: job.title, path: `/careers/${job.slug}` },
  ]);

  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }}
      />

      <article>
        <header className="brand-hero">
          <div className="mx-auto w-full max-w-5xl px-5 pt-10 pb-10 sm:px-8 sm:pt-12 sm:pb-12">
            <nav
              aria-label="Breadcrumb"
              className="mb-10 text-sm text-ink-muted"
            >
              <ol className="flex flex-wrap gap-2">
                <li className="flex gap-2">
                  <Link className="hover:text-ink" href="/">
                    Home
                  </Link>
                  <span aria-hidden="true">/</span>
                </li>
                <li className="flex gap-2">
                  <Link className="hover:text-ink" href="/careers">
                    Careers
                  </Link>
                  <span aria-hidden="true">/</span>
                </li>
                <li aria-current="page" className="text-ink">
                  {job.title}
                </li>
              </ol>
            </nav>
            <p className="text-sm font-medium text-ink-muted">
              {job.department}
            </p>
            <h1 className="brand-h1 mt-3 max-w-3xl text-[clamp(2.25rem,4vw,3.25rem)]">
              {job.title}
            </h1>
            <p className="mt-4 text-lg font-medium text-signal-strong">
              {job.location}
            </p>
          </div>
        </header>

        <div className="mx-auto w-full max-w-5xl px-5 pt-4 pb-16 sm:px-8 sm:pb-20">
          <div
            className={styles.prose}
            dangerouslySetInnerHTML={{ __html: job.html }}
          />
        </div>
      </article>

      <section
        aria-labelledby="apply-title"
        className="pb-24 sm:pb-28"
        id="apply"
      >
        <div className="mx-auto grid w-full max-w-5xl gap-12 px-5 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-16">
          <div className="brand-card relative overflow-hidden p-5 sm:p-8">
            <ApplicationForm
              deliveryConfigured={deliveryConfigured}
              jobSlug={job.slug}
              jobTitle={job.title}
              turnstileAction={
                turnstile.enabled ? TURNSTILE_CAREERS_ACTION : undefined
              }
              turnstileSiteKey={
                turnstile.enabled ? turnstile.siteKey : undefined
              }
            />
          </div>
          <div className="lg:order-first lg:pr-4">
            <h2 className="brand-h2" id="apply-title">
              Let&apos;s envision a safer world{" "}
              <span className="text-signal">together.</span>
            </h2>
            <p className="brand-lead mt-6">
              We&apos;re a team of builders, engineers, and scientists working
              at the intersection of AI and real-world industries.
            </p>
            <p className="brand-lead mt-5">
              At Ailytics, you&apos;ll be joining a team of 11+ nationalities,
              and you&apos;ll be making an impact that&apos;ll actually show up
              on the ground.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
