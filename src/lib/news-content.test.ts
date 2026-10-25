import { existsSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import {
  getNewsArticle,
  listNewsArticles,
  parseNewsArticle,
} from "./news-content";

describe("news content", () => {
  it("loads every article from the previous site, newest first", async () => {
    const articles = await listNewsArticles();

    expect(articles.map((article) => article.slug)).toEqual([
      "industrial-video-intelligence-reimagined-ailytics-deploys-nvidia-cosmos-3-across-heavy-industry",
      "ailytics-and-safie",
      "winning-at-the-design-ai-and-tech-awards",
      "we-won-first-place-at-the-supernova-challenge",
      "april-2026-business-times-feature",
      "turning-five-our-2025-retrospective",
      "video-analytics-101-why-it-matters-how-to-pick-a-winner",
    ]);
  });

  it("serves every cover and body image from public/media/news", async () => {
    for (const article of await listNewsArticles()) {
      const sources = [
        article.image,
        ...[...article.html.matchAll(/<img src="([^"]+)"/g)].map((m) => m[1]),
      ];
      for (const source of sources) {
        expect(source).toMatch(/^\/media\/news\//);
        expect(existsSync(path.join(process.cwd(), "public", source))).toBe(
          true,
        );
      }
    }
  });

  it("keeps a single H1 by demoting the source's section headings", async () => {
    for (const article of await listNewsArticles()) {
      expect(article.html).not.toMatch(/<h[1456]/);
      expect(article.description.length).toBeGreaterThanOrEqual(120);
      expect(article.description.length).toBeLessThanOrEqual(160);
    }
  });

  it("links media coverage out to the original story", async () => {
    const article = await getNewsArticle("april-2026-business-times-feature");

    expect(article?.externalUrl).toMatch(/^https:\/\/www\.businesstimes/);
  });

  it("returns null for unknown or unsafe slugs", async () => {
    expect(await getNewsArticle("missing-article")).toBeNull();
    expect(await getNewsArticle("../legal/eula")).toBeNull();
  });

  it("strips markup and remote images an article should never carry", () => {
    const article = parseNewsArticle(
      {
        slug: "example",
        title: "Example",
        category: "Press Release",
        publishedAt: "2026-01-02",
        summary: "Summary",
        description: "Description",
        image: "/media/news/example/cover.webp",
        html: '<h4>Section</h4><p style="color:red">Body<br><br></p><p><em> </em></p><h6>— Name</h6><img src="https://cdn.example.com/x.png"><a href="https://example.com">Out</a><script>x()</script>',
      },
      "example.json",
    );

    expect(article.html).toBe(
      '<h2>Section</h2><p>Body</p><p class="attribution">— Name</p><a href="https://example.com" target="_blank" rel="noopener noreferrer">Out</a>',
    );
    expect(article.externalUrl).toBeNull();
  });
});
