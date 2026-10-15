import type { Metadata } from "next";

import { listNewsArticles } from "@/lib/news-content";
import {
  buildBreadcrumbJsonLd,
  createPageMetadata,
  serializeJsonLd,
} from "@/lib/seo";

import { NewsCard } from "./_components/news-card";

export const metadata: Metadata = createPageMetadata({
  title: "Ailytics News: Press Releases, Awards and Updates",
  description:
    "Ailytics news: press releases, partnerships, awards and media coverage, plus our thoughts on AI video analytics for safer construction and industrial sites.",
  path: "/news",
});

export default async function NewsPage() {
  const articles = await listNewsArticles();

  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(
            buildBreadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "News", path: "/news" },
            ]),
          ),
        }}
      />
      <header className="brand-hero">
        <div className="mx-auto w-full max-w-6xl px-5 pt-14 pb-10 sm:px-8 sm:pt-20 sm:pb-12">
          <h1 className="brand-h1">News</h1>
          <p className="brand-lead mt-4 max-w-2xl">
            The latest updates, achievements, and milestones from Ailytics.
          </p>
        </div>
      </header>

      <section
        aria-label="News articles"
        className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-5 pb-24 sm:px-8 sm:pb-28"
      >
        {articles.map((article, index) => (
          <NewsCard
            article={article}
            key={article.slug}
            priority={index === 0}
          />
        ))}
      </section>
    </main>
  );
}
