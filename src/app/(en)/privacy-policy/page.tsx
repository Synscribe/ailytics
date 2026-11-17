import type { Metadata } from "next";

import { LegalDocument } from "@/components/legal-document/legal-document";
import { getLegalDocument } from "@/lib/legal-content";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy Policy",
  description:
    "How Ailytics Pte Ltd collects, uses, discloses and safeguards personal data under Singapore's PDPA, including video analytics processed through Ailyssa, your rights, and how to contact our Data Protection Officer.",
  path: "/privacy-policy",
});

export default async function PrivacyPolicyPage() {
  const document = await getLegalDocument("privacy-policy");

  return (
    <LegalDocument
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Privacy Policy", path: "/privacy-policy" },
      ]}
      document={document}
    />
  );
}
