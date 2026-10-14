import { describe, expect, it } from "vitest";

import {
  assertRouteCopy,
  getPageContent,
  groupFeaturesByCategory,
  listPageContent,
  parseInlineLinks,
  parsePageContent,
  stripInlineLinks,
} from "./page-content";

describe("page content", () => {
  it("loads the construction industry page and links to PPE detection", async () => {
    const content = await getPageContent("industries", "construction");

    expect(content.hero.title).toBe("Construction Safety & Productivity");
    expect(content.hero.seoTitle).toBe(
      "AI Video Analytics for Construction Safety",
    );
    expect(content.features.items.map((item) => item.id)).toContain(
      "ppe-detection",
    );
    expect(
      content.faq.some((item) =>
        item.answer.includes("(/use-cases/ppe-detection)"),
      ),
    ).toBe(true);
  });

  it("loads the PPE detection page and links back to construction", async () => {
    const content = await getPageContent("uses", "ppe-detection");

    expect(content.hero.title).toBe(
      "PPE Detection for Construction Site Safety",
    );
    expect(
      content.faq.some((item) =>
        item.answer.includes("(/industries/construction)"),
      ),
    ).toBe(true);
  });

  it("lists the JSON page slugs of each kind", async () => {
    expect(await listPageContent("industries")).toContain("construction");
    expect(await listPageContent("uses")).toContain("ppe-detection");
    for (const slug of await listPageContent("uses")) {
      expect(slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    }
  });

  it("names the missing slug and the file to edit when route copy is missing", () => {
    expect(() => assertRouteCopy("uses", ["new-page"], {})).toThrow(
      'Missing route copy for src/content/pages/uses/new-page.json. Add "new-page" to src/app/use-cases/[slug]/_content.ts.',
    );
    expect(() =>
      assertRouteCopy("uses", ["ppe-detection"], { "ppe-detection": {} }),
    ).not.toThrow();
  });

  it("groups features by category in first-seen order", async () => {
    const content = await getPageContent("industries", "construction");
    const groups = groupFeaturesByCategory(content.features.items);

    expect(groups.map((group) => group.name)).toEqual([
      "Safety",
      "Security",
      "Productivity",
      "Progress",
    ]);
    expect(groups[0].items).toHaveLength(3);
  });

  it("splits and strips Markdown links", () => {
    const value = "See the [PPE page](/use-cases/ppe-detection) for more.";

    expect(parseInlineLinks(value)).toEqual([
      { kind: "text", value: "See the " },
      { kind: "link", value: "PPE page", href: "/use-cases/ppe-detection" },
      { kind: "text", value: " for more." },
    ]);
    expect(stripInlineLinks(value)).toBe("See the PPE page for more.");
  });

  it("rejects missing fields and dashes", () => {
    expect(() => parsePageContent({}, "bad.json")).toThrow("bad.json");
    expect(() =>
      parsePageContent(
        {
          hero: { title: "Title — dash", description: "Body" },
        },
        "dash.json",
      ),
    ).toThrow("dash.json");
  });

  it("rejects a feature id that has no registered visual", async () => {
    const content = await getPageContent("uses", "ppe-detection");
    const page = structuredClone(content) as unknown as {
      features: { items: { id: string }[] };
    };
    page.features.items[0].id = "unknown-feature";

    expect(() => parsePageContent(page, "unknown.json")).toThrow(
      'unknown.json: features.items[0].id must be a registered visual ID in src/lib/visuals.ts (got "unknown-feature")',
    );
  });

  it("maps every feature id on every page to a registered visual", async () => {
    const pages = await Promise.all(
      (["industries", "uses"] as const).flatMap(async (kind) =>
        Promise.all(
          (await listPageContent(kind)).map((slug) =>
            getPageContent(kind, slug),
          ),
        ),
      ),
    ).then((groups) => groups.flat());
    const ids = pages.flatMap((page) =>
      page.features.items.map((item) => item.id),
    );

    expect(ids.length).toBeGreaterThan(0);
  });
});
