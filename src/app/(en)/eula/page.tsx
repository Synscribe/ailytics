import type { Metadata } from "next";

import { LegalDocument } from "@/components/legal-document/legal-document";
import { getLegalDocument } from "@/lib/legal-content";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "End-User License Agreement (EULA)",
  description:
    "The Ailytics End-User License Agreement: licence terms for Ailytics software including Ailyssa, data collection and AI training, restrictions, warranties, liability, governing law and termination.",
  path: "/eula",
});

export default async function EulaPage() {
  const document = await getLegalDocument("eula");

  return (
    <LegalDocument
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "EULA", path: "/eula" },
      ]}
      document={document}
    />
  );
}
