import { ScannedHighlight } from "@/components/scanned-highlight/scanned-highlight";
import { ArrowLeftIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { GuideSection } from "./_components/guide-section";
import { GUIDE_SECTIONS } from "./_components/sections";
import { TypeScale } from "./_components/type-scale";
import { TypeToday } from "./_components/type-today";

export const metadata: Metadata = {
  title: "Design system",
};

const FEEL = [
  {
    title: "Light and calm",
    body: "White pages with selected dark blue sections. Keep existing cards, layouts and interactions.",
  },
  {
    title: "Real footage first",
    body: "Show what the cameras see on real sites. Rebuild product screens as clean, moving UI.",
  },
  {
    title: "One action colour",
    body: "Blue buttons on white. White buttons on blue or photographic banners. Teal, coral and yellow remain detection colours.",
  },
  {
    title: "Plain words",
    body: "Sentence case, short sentences and the words safety and site teams already use.",
  },
] as const;

export default function DesignSystemPage() {
  return (
    <main className="bg-canvas px-5 py-14 sm:px-8 lg:py-20" id="main-content">
      <div className="mx-auto max-w-6xl">
        <Link
          className="inline-flex items-center gap-2 text-sm font-medium text-ink-muted hover:text-ink"
          href="/dev"
        >
          <ArrowLeftIcon aria-hidden className="size-4" />
          Visual workshop
        </Link>

        <header className="mt-10 max-w-3xl">
          <h1 className="text-5xl font-medium tracking-[-0.035em] sm:text-6xl">
            Ailytics design system
          </h1>
          <p className="mt-5 text-lg leading-8 text-ink-muted">
            The type, colour, spacing and components every Ailytics page uses.
            Each part shows the rule, live examples and where it appears on the
            site.
          </p>
        </header>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEEL.map((item) => (
            <li
              className="rounded-2xl bg-paper p-6 ring-1 ring-ink/10"
              key={item.title}
            >
              <h2 className="text-lg font-medium">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-ink-muted">
                {item.body}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-16 grid gap-12 lg:grid-cols-[12rem_minmax(0,1fr)]">
          <nav
            aria-label="Design system sections"
            className="lg:sticky lg:top-8 lg:self-start"
          >
            <ul className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
              {GUIDE_SECTIONS.map((section) => (
                <li key={section.id}>
                  <a
                    className="block rounded-full px-3 py-1.5 text-sm font-medium text-ink-muted ring-1 ring-ink/10 hover:text-ink lg:rounded-lg lg:ring-0 lg:hover:bg-paper"
                    href={`#${section.id}`}
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="min-w-0">
            {GUIDE_SECTIONS.map((section) => (
              <GuideSection key={section.id} {...section}>
                {section.id === "type" ? (
                  <>
                    <div className="mb-10 rounded-lg bg-paper p-6 ring-1 ring-ink/10">
                      <h3 className="text-h2">
                        Make workplaces{" "}
                        <ScannedHighlight>safer and smarter</ScannedHighlight>
                      </h3>
                      <p className="mt-4 text-ink-muted">
                        Heading emphasis uses a translucent teal scan, once on
                        entering view. Keep the text colour and font unchanged.
                        Highlight one short outcome or subject; leave
                        navigation, FAQs, article titles and legal headings
                        plain. Reduced motion shows the finished highlight.
                      </p>
                    </div>
                    <TypeScale />
                    <TypeToday />
                  </>
                ) : section.id === "colour" ? (
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="brand-card p-6">
                      <h3 className="text-title">White canvas</h3>
                      <p className="mt-3 text-ink-muted">
                        Blue text #27405D, muted text #52667D. Choose section
                        fills by content, never by alternating rows.
                      </p>
                    </div>
                    <div className="band-blue rounded-lg p-6">
                      <h3 className="text-title">Brand blue #27405D</h3>
                      <p className="mt-3 text-ink-muted">
                        White headings and #DCE8F3 body text. Keep product
                        screens on their own light surfaces.
                      </p>
                    </div>
                  </div>
                ) : section.id === "buttons" ? (
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="brand-card p-6">
                      <Link href="/contact" className="brand-btn-primary">
                        Request a demo
                      </Link>
                      <p className="mt-4 text-ink-muted">
                        Primary action on white.
                      </p>
                    </div>
                    <div className="band-blue rounded-lg p-6">
                      <Link href="/contact" className="brand-btn-secondary">
                        Request a demo
                      </Link>
                      <p className="mt-4 text-ink-muted">
                        White action on blue. Photographic closing banners use
                        the same button.
                      </p>
                    </div>
                  </div>
                ) : section.id === "cards" ? (
                  <p className="text-ink-muted">
                    Related items stay in white bordered cards. On blue
                    sections, the capability list sits directly on the
                    background, with a 6% white panel behind its visual. Avoid
                    nested gradient containers.
                  </p>
                ) : undefined}
              </GuideSection>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
