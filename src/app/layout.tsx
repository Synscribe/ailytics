import type { Metadata } from "next";
import localFont from "next/font/local";
import { Suspense } from "react";

import { VisitorContextTracker } from "@/app/contact/_components/visitor-context-tracker";
import { AnnouncementBar } from "@/components/announcement-bar";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/config/site";
import {
  buildOrganizationJsonLd,
  buildWebsiteJsonLd,
  serializeJsonLd,
} from "@/lib/seo";

import "./globals.css";

const switzer = localFont({
  src: [
    { path: "./fonts/Switzer-300.woff2", weight: "300" },
    { path: "./fonts/Switzer-400.woff2", weight: "400" },
    { path: "./fonts/Switzer-500.woff2", weight: "500" },
    { path: "./fonts/Switzer-600.woff2", weight: "600" },
  ],
  variable: "--font-switzer",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const organizationJsonLd = buildOrganizationJsonLd();
  const websiteJsonLd = buildWebsiteJsonLd();

  return (
    <html lang="en" data-scroll-behavior="smooth" className={switzer.variable}>
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
          Skip to content
        </a>
        <div className="flex min-h-screen flex-col">
          <AnnouncementBar />
          <SiteHeader />
          <div className="flex-1">{children}</div>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
