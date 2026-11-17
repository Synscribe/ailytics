import type { Metadata } from "next";

import { SiteShell } from "@/components/site-shell";
import { chromeCopy } from "@/config/chrome-copy";
import { siteConfig } from "@/config/site";

import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: chromeCopy("ja-jp").description,
};

/**
 * The root layout for Japanese pages. Only translated pages live under
 * `/ja-jp`; each one is listed in `src/config/translations.json`.
 */
export default function JapaneseLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <SiteShell locale="ja-jp">{children}</SiteShell>;
}
