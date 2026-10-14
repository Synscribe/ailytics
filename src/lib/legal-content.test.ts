import { describe, expect, it } from "vitest";

import { getLegalDocument, parseLegalDocument } from "./legal-content";

describe("legal content", () => {
  it("loads the privacy policy and EULA with their effective dates", async () => {
    for (const slug of ["privacy-policy", "eula"] as const) {
      const document = await getLegalDocument(slug);

      expect(document.slug).toBe(slug);
      expect(document.title).not.toBe("");
      expect(document.effectiveDate).toMatch(/\d{4}$/);
      expect(document.html).toContain("<p>");
      expect(document.html).not.toContain("Effective Date:");
      expect(document.html).not.toMatch(/<(script|style|img|iframe)/i);
    }
  });

  it("keeps the EULA link inside the privacy policy on this site", async () => {
    const document = await getLegalDocument("privacy-policy");
    expect(document.html).not.toContain("https://www.ailytics.ai/");
  });

  it("strips markup a legal document should never carry", () => {
    const document = parseLegalDocument(
      {
        slug: "eula",
        title: "EULA",
        html: '<p style="color:red">Clause<script>x()</script></p>',
      },
      "eula.json",
    );

    expect(document.html).toBe("<p>Clause</p>");
    expect(document.effectiveDate).toBe("");
  });
});
