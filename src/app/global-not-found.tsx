import type { Metadata } from "next";

import { SiteShell } from "@/components/site-shell";
import { siteConfig } from "@/config/site";

import NotFound from "./(en)/not-found";
import "./globals.css";

// The site has one root layout per locale, so a URL that matches no route
// renders here, outside every layout.
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: `Page not found | ${siteConfig.name}`,
  robots: { index: false, follow: false },
};

export default function GlobalNotFound() {
  return (
    <SiteShell locale="en">
      <NotFound />
    </SiteShell>
  );
}
