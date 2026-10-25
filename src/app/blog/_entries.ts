import { getBlogPosts, type BlogPostSummary } from "@/lib/blog";
import { listNewsArticles, type NewsArticle } from "@/lib/news-content";

import type { BlogCardPost } from "./_components/post-card";
import { labelForBlogTags, type BlogFilter } from "./blog.config";

/** One article on the blog index: a Wisp post or a migrated news article. */
export type BlogEntry = BlogCardPost & { label: string | null };

export function entryFromPost(
  post: Pick<
    BlogPostSummary,
    "slug" | "title" | "image" | "description" | "publishedAt" | "tags"
  >,
): BlogEntry {
  return {
    slug: post.slug,
    title: post.title,
    image: post.image,
    description: post.description,
    publishedAt: post.publishedAt,
    label: labelForBlogTags(post.tags),
  };
}

/** Midday UTC keeps the calendar date the same in every server time zone. */
export function newsPublishedAt(article: NewsArticle): string {
  return `${article.publishedAt}T12:00:00Z`;
}

export function entryFromNewsArticle(article: NewsArticle): BlogEntry {
  return {
    slug: article.slug,
    title: article.title,
    image: article.image,
    description: article.description,
    publishedAt: newsPublishedAt(article),
    label: article.category,
  };
}

function matchesQuery(article: NewsArticle, query: string): boolean {
  const haystack = [
    article.title,
    article.category,
    article.summary,
    article.description,
  ]
    .join(" ")
    .toLowerCase();
  return haystack.includes(query.toLowerCase());
}

function publishedTime(entry: BlogEntry): number {
  return entry.publishedAt ? new Date(entry.publishedAt).getTime() : 0;
}

/**
 * Every article for the index, newest first. The migrated news articles are
 * listed under "All" and under any filter that includes the news archive.
 * /blog/[slug] renders a news article before asking Wisp, so a Wisp post with
 * the same slug is left out here too. A Wisp outage leaves the news articles
 * listed and reports `cmsUnavailable`.
 */
export async function listBlogEntries({
  query = "",
  filter,
}: {
  query?: string;
  filter?: BlogFilter;
} = {}): Promise<{ entries: BlogEntry[]; cmsUnavailable: boolean }> {
  const includeNews = !filter || filter.includesNewsArchive === true;
  const [postsOutcome, news] = await Promise.all([
    getBlogPosts({
      limit: "all",
      query: query || null,
      tag: filter?.tag ?? null,
    }).then(
      ({ posts }) => ({ ok: true as const, posts }),
      () => ({ ok: false as const, posts: [] }),
    ),
    listNewsArticles(),
  ]);

  const newsEntries = includeNews
    ? news
        .filter((article) => !query || matchesQuery(article, query))
        .map(entryFromNewsArticle)
    : [];
  const newsSlugs = new Set(news.map((article) => article.slug));
  const postEntries = postsOutcome.posts
    .filter((post) => !newsSlugs.has(post.slug))
    .map(entryFromPost);

  return {
    entries: [...postEntries, ...newsEntries].sort(
      (a, b) => publishedTime(b) - publishedTime(a),
    ),
    cmsUnavailable: !postsOutcome.ok,
  };
}
