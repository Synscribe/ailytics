import { describe, expect, it } from "vitest";

import { listPageContent } from "@/lib/page-content";
import { isVisualId } from "@/lib/visuals";

import { INDUSTRY_GROUPS } from "./industries/_groups";
import { INDUSTRY_ROUTE_COPY } from "./industries/[slug]/_content";
import { USE_CASE_GROUPS } from "./uses/_groups";
import { USE_CASE_ROUTE_COPY } from "./uses/[slug]/_content";

const routes = [
  {
    kind: "uses",
    copy: USE_CASE_ROUTE_COPY,
    groups: USE_CASE_GROUPS,
  },
  {
    kind: "industries",
    copy: INDUSTRY_ROUTE_COPY,
    groups: INDUSTRY_GROUPS,
  },
] as const;

describe.each(routes)("/$kind content routes", ({ kind, copy, groups }) => {
  it("has route copy for every JSON page and no copy without a page", async () => {
    const slugs = await listPageContent(kind);

    expect(slugs.length).toBeGreaterThan(0);
    expect(Object.keys(copy).sort()).toEqual(slugs);
  });

  it("uses registered hero visuals", () => {
    for (const entry of Object.values(copy)) {
      expect(isVisualId(entry.heroVisualId)).toBe(true);
    }
  });

  it("lists every JSON page on the hub exactly once", async () => {
    const hubSlugs = groups.flatMap((group) =>
      group.items.map((item) => item.slug),
    );

    expect(new Set(hubSlugs).size).toBe(hubSlugs.length);
    for (const slug of await listPageContent(kind)) {
      expect(hubSlugs).toContain(slug);
    }
  });
});
