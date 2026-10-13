import type { Metadata } from "next";

import { ContentHub } from "@/components/content-hub/content-hub";
import { listPageContent } from "@/lib/page-content";
import { createPageMetadata } from "@/lib/seo";

import { INDUSTRY_ROUTE_COPY } from "./[slug]/_content";
import { INDUSTRY_GROUPS } from "./_groups";

export const metadata: Metadata = createPageMetadata({
  title: "AI Video Analytics by Industry and Hazard",
  description:
    "AI video analytics by industry for construction, manufacturing, oil and gas, logistics, ports and more, with detections chosen for each site's hazards.",
  path: "/industries",
});

export default async function IndustriesPage() {
  const pages = new Set(await listPageContent("industries"));

  return (
    <ContentHub
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Industries", path: "/industries" },
      ]}
      title="Industries"
      introduction="AI video analytics for heavy industry and critical infrastructure, with detections chosen for the hazards of each industry."
      groups={INDUSTRY_GROUPS.map((group) => ({
        title: group.title,
        items: group.items
          .filter(({ slug }) => pages.has(slug))
          .map(({ slug, title, description }) => ({
            title,
            description,
            href: `/industries/${slug}`,
            visualId: INDUSTRY_ROUTE_COPY[slug].heroVisualId,
          })),
      })).filter((group) => group.items.length > 0)}
      cta={{
        title: "See what Ailytics would watch on your sites",
        description:
          "Tell us about your industry, sites and cameras. We will show you the detections that fit your hazards.",
        buttonText: "Request a demo",
        href: "/contact",
      }}
    />
  );
}
