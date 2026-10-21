import { ScannedHighlight } from "@/components/scanned-highlight/scanned-highlight";
import type { Metadata } from "next";
import Image from "next/image";

import {
  buildBreadcrumbJsonLd,
  createPageMetadata,
  serializeJsonLd,
} from "@/lib/seo";
import {
  TURNSTILE_CONTACT_ACTION,
  turnstileConfiguration,
} from "@/lib/turnstile";

import { PartnerForm } from "./_components/partner-form";
import { WhyPartner } from "./_components/why-partner.client";

export const dynamic = "force-dynamic";

export const metadata: Metadata = createPageMetadata({
  title: "Partner With Us",
  description:
    "Partner with Ailytics as a system integrator, distributor, technology partner or consultant. Deliver, resell or integrate AI video analytics with 24/7 support and training.",
  path: "/partnerships",
});

const PARTNER_TYPES = [
  {
    title: "For Builders",
    body: "Deliver and deploy our solutions as part of your client projects.",
    icon: "/media/partnerships/icon-build.webp",
  },
  {
    title: "More Revenue",
    body: "Resell and distribute our solutions to expand your revenue streams.",
    icon: "/media/partnerships/icon-sell.webp",
  },
  {
    title: "Tech Partnerships",
    body: "Integrate our technology to enhance your platform's capabilities.",
    icon: "/media/partnerships/icon-integrate.webp",
  },
  {
    title: "Strategic Growth",
    body: "Collaborate with us to scale your organization or association across markets!",
    icon: "/media/partnerships/icon-grow.webp",
  },
] as const;

const REASONS = [
  {
    title: "Rapid 24/7 Coverage",
    body: "Our support team covers Asia and the Americas around the clock, so partners get fast answers in their own time zone.",
  },
  {
    title: "Designed For Flexibility First",
    body: "Available to deploy as a standalone solution, or integrate with existing platforms as part of a larger ecosystem. Training provided as well, of course.",
  },
  {
    title: "New detections every year",
    body: "“Good enough” isn't good enough for us. We offer 50+ pre-built use cases and keep adding more.",
  },
] as const;

const PHOTOS = [
  {
    src: "/media/partnerships/photo-podium.webp",
    alt: "A man standing at a podium, giving a speech",
  },
  {
    src: "/media/partnerships/photo-desk.webp",
    alt: "Man sitting at a desk looking at a laptop screen and monitor",
  },
  {
    src: "/media/partnerships/photo-presentation.webp",
    alt: "Man giving a presentation to a group of people",
  },
] as const;

export default function PartnershipsPage() {
  const turnstile = turnstileConfiguration();
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Partner With Us", path: "/partnerships" },
  ]);

  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }}
      />

      <section className="brand-hero">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center px-5 pt-14 pb-12 text-center sm:px-8 sm:pt-16 sm:pb-16">
          <p className="text-sm font-medium text-signal-strong">
            Partner With Us
          </p>
          <h1 className="brand-h1 mt-4 max-w-3xl">
            Built for every part of the{" "}
            <ScannedHighlight>ecosystem</ScannedHighlight>
          </h1>
          <p className="brand-lead mt-6 max-w-2xl">
            Designed for system integrators, distributors, technology partners,
            consultants, and more.
          </p>
        </div>
        <div className="mx-auto w-full max-w-7xl px-5 pb-16 sm:px-8 sm:pb-20">
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PARTNER_TYPES.map((type) => (
              <li
                className="brand-card flex flex-col items-center p-6 text-center sm:p-8"
                key={type.title}
              >
                <Image
                  alt=""
                  className="h-16 w-auto"
                  height={1131}
                  src={type.icon}
                  width={1600}
                />
                <h2 className="mt-5 text-title text-signal-strong">
                  {type.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-ink-muted">
                  {type.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="why-title" className="py-16 sm:py-20">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <h2
            className="brand-h2 text-center text-signal-strong"
            id="why-title"
          >
            Why partner with us
          </h2>
          <WhyPartner photos={PHOTOS} reasons={REASONS} />
        </div>
      </section>

      <section
        aria-labelledby="partner-form-title"
        className="pb-24 sm:pb-28"
        id="partner"
      >
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
          <div>
            <h2 className="brand-h2" id="partner-form-title">
              Ready to partner with us?
            </h2>
            <p className="brand-lead mt-6 max-w-xl">
              We partner with integrators, consultants, and technology providers
              to deliver AI-powered safety and productivity solutions.
            </p>
            <p className="brand-lead mt-4 max-w-xl">
              Reach out to explore partnership models, commercial structures, or
              how Ailytics can integrate into your projects!
            </p>
          </div>
          <div className="brand-card relative overflow-hidden p-5 sm:p-8">
            <PartnerForm
              turnstileAction={
                turnstile.enabled ? TURNSTILE_CONTACT_ACTION : undefined
              }
              turnstileSiteKey={
                turnstile.enabled ? turnstile.siteKey : undefined
              }
            />
          </div>
        </div>
      </section>
    </main>
  );
}
