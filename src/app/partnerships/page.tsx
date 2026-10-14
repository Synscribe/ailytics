import type { Metadata } from "next";
import Image from "next/image";

import { isContactDeliveryConfigured } from "@/lib/contact-delivery";
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
    body: "Whether you're in Asia or the Americas, we've got you covered. Our support team is built for timely responses and global support whenever you need it.",
  },
  {
    title: "Designed For Flexibility First",
    body: "Available to deploy as a standalone solution, or integrate with existing platforms as part of a larger ecosystem. Training provided as well, of course.",
  },
  {
    title: "Constant Innovation",
    body: "“Good enough” isn't good enough for us. 50+ pre-built use cases and we're still constantly researching, developing, and expanding our capabilities.",
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
  const deliveryConfigured = isContactDeliveryConfigured();
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
            Built for every part of the ecosystem
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
                <h2 className="mt-5 text-lg font-medium text-signal-strong">
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
          <div className="mt-14 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <ol className="flex flex-col gap-10">
              {REASONS.map((reason, index) => (
                <li className="flex gap-5" key={reason.title}>
                  <span
                    aria-hidden="true"
                    className={`grid size-12 shrink-0 place-items-center rounded-lg text-lg font-medium text-paper ${index === 0 ? "bg-ink" : "bg-signal"}`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-xl font-medium text-ink">
                      {reason.title}
                    </h3>
                    <p className="mt-2 leading-7 text-ink-muted">
                      {reason.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="grid gap-4">
              <div className="relative aspect-[3/2] overflow-hidden rounded-2xl bg-muted">
                <Image
                  alt={PHOTOS[0].alt}
                  className="object-cover"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  src={PHOTOS[0].src}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                {PHOTOS.slice(1).map((photo) => (
                  <div
                    className="relative aspect-[3/2] overflow-hidden rounded-2xl bg-muted"
                    key={photo.src}
                  >
                    <Image
                      alt={photo.alt}
                      className="object-cover"
                      fill
                      sizes="(min-width: 1024px) 25vw, 50vw"
                      src={photo.src}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
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
              deliveryConfigured={deliveryConfigured}
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
