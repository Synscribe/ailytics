import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { listJobSlugs } from "@/app/careers/_jobs";
import { getAllBlogPosts, type BlogPostSummary } from "@/lib/blog";
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
    "/news",
    "/about-us",
    "/partnerships",
    "/careers",
    ...jobs.map((slug) => `/careers/${slug}`),
    "/projects",
    "/contact",
    "/privacy-policy",
    "/eula",
  ];

  return [
    ...routes.map((route) => ({ url: `${siteConfig.url}${route}` })),
    ...news.map((article) => ({
      url: `${siteConfig.url}/news/${article.slug}`,
      lastModified: article.publishedAt,
    })),
    ...blogPosts.map((post) => ({
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: post.updatedAt,
    })),
  ];
}
