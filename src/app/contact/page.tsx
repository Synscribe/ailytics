import { CheckIcon } from "lucide-react";
import type { Metadata } from "next";

import { isContactDeliveryConfigured } from "@/lib/contact-delivery";
import { createPageMetadata } from "@/lib/seo";
import {
  TURNSTILE_CONTACT_ACTION,
  turnstileConfiguration,
} from "@/lib/turnstile";

import { ContactForm } from "./_components/contact-form";

export const dynamic = "force-dynamic";

export const metadata: Metadata = createPageMetadata({
  title: "Request a Demo of AI Video Analytics",
  description:
    "Request a demo of Ailytics AI video analytics. Tell us about your sites and cameras, and see which safety, security and productivity detections fit.",
  path: "/contact",
});

const usefulDetails = [
  "Your industry and the number of sites",
  "Roughly how many cameras you have",
  "The hazards or areas you want to monitor",
];

export default function ContactPage() {
  const deliveryConfigured = isContactDeliveryConfigured();
  const turnstile = turnstileConfiguration();

  return (
    <main
      className="overflow-hidden"
      data-contact-delivery={deliveryConfigured ? "configured" : "missing"}
      data-turnstile={turnstile.enabled ? "configured" : "disabled"}
      id="main-content"
    >
      <section className="brand-hero pt-14 pb-20 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-28">
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
          <div>
            <h1 className="brand-h1 max-w-2xl">
              Request a demo of AI video analytics
            </h1>
            <p className="brand-lead mt-6 max-w-xl">
              Tell us about your sites and cameras. We will show you which
              safety, security and productivity detections fit, running on the
              cameras you already have.
            </p>

            <div className="mt-10 hidden lg:block">
              <p className="text-sm font-medium">It helps to include:</p>
              <ul className="mt-5 space-y-4">
                {usefulDetails.map((detail) => (
                  <li
                    className="flex items-start gap-3 text-sm leading-6 text-ink-muted"
                    key={detail}
                  >
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-mint text-ink">
                      <CheckIcon className="size-3" aria-hidden="true" />
                    </span>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="brand-card self-start overflow-hidden p-5 sm:p-8 lg:p-10">
            <ContactForm
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
