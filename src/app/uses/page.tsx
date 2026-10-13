import type { Metadata } from "next";

import { ContentHub } from "@/components/content-hub/content-hub";
import { listPageContent } from "@/lib/page-content";
import { createPageMetadata } from "@/lib/seo";

import { USE_CASE_ROUTE_COPY } from "./[slug]/_content";
import { USE_CASE_GROUPS } from "./_groups";

export const metadata: Metadata = createPageMetadata({
  title: "AI Video Analytics Use Cases for Industrial Sites",
  description:
    "AI video analytics use cases for safety, security and productivity. 50+ detections run on the cameras you already have, with real-time alerts and evidence.",
  path: "/uses",
});

export default async function UsesPage() {
  const pages = new Set(await listPageContent("uses"));

  return (
    <ContentHub
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Use cases", path: "/uses" },
      ]}
      title="Use cases"
      introduction="50+ ready-made detections that run on the cameras you already have, grouped by what they help you manage."
      groups={USE_CASE_GROUPS.map((group) => ({
        title: group.title,
        items: group.items
          .filter(({ slug }) => pages.has(slug))
          .map(({ slug, title, description }) => ({
            title,
            description,
            href: `/uses/${slug}`,
            visualId: USE_CASE_ROUTE_COPY[slug].heroVisualId,
          })),
      })).filter((group) => group.items.length > 0)}
      cta={{
        title: "See these detections on your own cameras",
        description:
          "Tell us about your sites and cameras. We will show you which use cases fit and how alerts reach your team.",
        buttonText: "Request a demo",
        href: "/contact",
      }}
    />
  );
}
