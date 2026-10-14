import type { MetadataRoute } from "next";

import { usesDefaultSiteUrl } from "@/config/env";
import { siteConfig } from "@/config/site";
import { listJobSlugs } from "@/app/careers/_jobs";
import { getAllBlogPosts, type BlogPostSummary } from "@/lib/blog";
import { listPageContent } from "@/lib/page-content";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [useCases, industries, jobs] = await Promise.all([
    listPageContent("uses"),
    listPageContent("industries"),
    listJobSlugs(),
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
    "/blog",
    "/about-us",
    "/partnerships",
    "/careers",
    ...jobs.map((slug) => `/careers/${slug}`),
    "/projects",
    "/contact",
  ];

  if (!usesDefaultSiteUrl) routes.push("/privacy-policy", "/eula");

  return [
    ...routes.map((route) => ({ url: `${siteConfig.url}${route}` })),
    ...blogPosts.map((post) => ({
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: post.updatedAt,
    })),
  ];
}
