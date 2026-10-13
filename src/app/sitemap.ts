import type { MetadataRoute } from "next";

import { usesDefaultSiteUrl } from "@/config/env";
import { siteConfig } from "@/config/site";
import { getAllBlogPosts, type BlogPostSummary } from "@/lib/blog";
import { listPageContent } from "@/lib/page-content";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [useCases, industries] = await Promise.all([
    listPageContent("uses"),
    listPageContent("industries"),
  ]);
  let blogPosts: BlogPostSummary[] = [];

  try {
    blogPosts = (await getAllBlogPosts()).posts;
  } catch {
    // Keep the local routes discoverable during a temporary CMS outage.
  }

  const routes = [
    "/",
    "/uses",
    ...useCases.map((slug) => `/uses/${slug}`),
    "/industries",
    ...industries.map((slug) => `/industries/${slug}`),
    "/blog",
    "/contact",
  ];

  if (!usesDefaultSiteUrl) routes.push("/privacy", "/terms");

  return [
    ...routes.map((route) => ({ url: `${siteConfig.url}${route}` })),
    ...blogPosts.map((post) => ({
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: post.updatedAt,
    })),
  ];
}
