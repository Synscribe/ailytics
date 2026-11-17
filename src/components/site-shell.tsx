import { Suspense } from "react";

import { VisitorContextTracker } from "@/app/(en)/contact/_components/visitor-context-tracker";
import { switzer } from "@/app/fonts/switzer";
import { AnnouncementBar } from "@/components/announcement-bar";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { chromeCopy } from "@/config/chrome-copy";
import { LOCALE_SETTINGS, type Locale } from "@/lib/i18n";
import {
  buildOrganizationJsonLd,
  buildWebsiteJsonLd,
  serializeJsonLd,
} from "@/lib/seo";

/**
 * The document every root layout renders: `<html>` in the locale's language,
 * site-wide structured data, header, footer and announcement bar.
 */
export function SiteShell({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const organizationJsonLd = buildOrganizationJsonLd();
  const websiteJsonLd = buildWebsiteJsonLd();

  return (
    <html
      lang={LOCALE_SETTINGS[locale].htmlLang}
      data-scroll-behavior="smooth"
      className={switzer.variable}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(websiteJsonLd) }}
        />
        <Suspense fallback={null}>
          <VisitorContextTracker />
        </Suspense>
        <a className="skip-link" href="#main-content">
          {chromeCopy(locale).skipLink}
        </a>
        <div className="flex min-h-screen flex-col">
          <AnnouncementBar locale={locale} />
          <SiteHeader locale={locale} />
          <div className="flex-1">{children}</div>
          <SiteFooter locale={locale} />
        </div>
      </body>
    </html>
  );
}
