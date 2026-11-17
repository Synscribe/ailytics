import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { listJobSlugs } from "@/app/(en)/careers/_jobs";
import { getAllBlogPosts, type BlogPostSummary } from "@/lib/blog";
import {
  languageAlternates,
  LOCALES,
  localePath,
  translatedPaths,
  type TranslatedLocale,
} from "@/lib/i18n";
import { listNewsArticles } from "@/lib/news-content";
import { listPageContent } from "@/lib/page-content";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [useCases, industries, jobs, news] = await Promise.all([
    listPageContent("uses"),
    listPageContent("industries"),
    listJobSlugs(),
    listNewsArticles(),
  ]);
  let blogPosts: BlogPostSummary[] = [];

  try {
    blogPosts = (await getAllBlogPosts()).posts;
  } catch {
    // Keep the local routes discoverable during a temporary CMS outage.
  }

  const routes = [
    "/",
    "/use-cases",
    ...useCases.map((slug) => `/use-cases/${slug}`),
    "/industries",
    ...industries.map((slug) => `/industries/${slug}`),
    "/childsafe-vision",
    "/blog",
    "/about-us",
    "/partnerships",
    "/careers",
    ...jobs.map((slug) => `/careers/${slug}`),
    "/projects",
    "/contact",
    "/privacy-policy",
    "/eula",
  ];

  // A migrated news article takes precedence over a Wisp post with its slug.
  const newsSlugs = new Set(news.map((article) => article.slug));

  const toUrl = (path: string) => `${siteConfig.url}${path}`;
  // A translated page lists every language version, including its own.
  const localized = (route: string) => {
    const languages = languageAlternates(route, toUrl);
    return languages ? { alternates: { languages } } : {};
  };
  const translated = LOCALES.filter(
    (locale): locale is TranslatedLocale => locale !== "en",
  ).flatMap((locale) =>
    translatedPaths(locale).map((route) => ({
      url: toUrl(localePath(locale, route)),
      ...localized(route),
    })),
  );

  return [
    ...routes.map((route) => ({ url: toUrl(route), ...localized(route) })),
    ...translated,
    ...news.map((article) => ({
      url: `${siteConfig.url}/blog/${article.slug}`,
      lastModified: article.publishedAt,
    })),
    ...blogPosts
      .filter((post) => !newsSlugs.has(post.slug))
      .map((post) => ({
        url: `${siteConfig.url}/blog/${post.slug}`,
        lastModified: post.updatedAt,
      })),
  ];
}
