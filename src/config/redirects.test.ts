import { describe, expect, it } from "vitest";

import { listNewsArticles } from "@/lib/news-content";

import { redirects } from "./redirects";

describe("redirects", () => {
  it("sends the News hub to the blog's News tab", () => {
    expect(redirects).toContainEqual({
      source: "/news",
      destination: "/blog?category=news",
      permanent: true,
    });
  });

  it("moves every migrated news article to the same slug under /blog", async () => {
    const slugs = (await listNewsArticles()).map(({ slug }) => slug).sort();
    const articleRules = redirects.filter(({ source }) =>
      source.startsWith("/news/"),
    );

    expect(articleRules.map(({ source }) => source.slice(6)).sort()).toEqual(
      slugs,
    );
    for (const rule of articleRules) {
      expect(rule.destination).toBe(`/blog/${rule.source.slice(6)}`);
      expect(rule.permanent).toBe(true);
    }
  });
});
