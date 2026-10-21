import { CustomerProof } from "@/components/customer-proof/customer-proof";
import { ArrowRightIcon, SearchIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import {
  getBlogPost,
  getBlogPosts,
  isWispConfigured,
  type BlogPostSummary,
} from "@/lib/blog";
import {
  buildBreadcrumbJsonLd,
  createPageMetadata,
  serializeJsonLd,
} from "@/lib/seo";

import { BlogPagination } from "./_components/blog-pagination";
import { FeaturedPost } from "./_components/featured-post";
import { HeroFootage } from "./_components/hero-footage.client";
import { PostCard } from "./_components/post-card";
import {
  BLOG_FEATURED,
  BLOG_FILTERS,
  getBlogFilter,
  labelForBlogTags,
} from "./blog.config";
import { CtaBanner } from "@/components/cta-banner/cta-banner";

type BlogPageProps = {
  searchParams: Promise<{
    category?: string | string[];
    page?: string | string[];
    query?: string | string[];
  }>;
};

export const metadata: Metadata = {
  ...createPageMetadata({
    title: "AI Video Analytics Blog: Comparisons and Use Cases",
    description:
      "The Ailytics AI video analytics blog: software comparisons, detection use cases and advice on monitoring construction sites, plants and ports with CCTV.",
    path: "/blog",
  }),
  alternates: {
    canonical: "/blog",
    types: { "application/rss+xml": "/feed.xml" },
  },
};

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Blog", path: "/blog" },
];

const filterClassName =
  "h-auto rounded-full bg-paper px-4 py-2 text-sm aria-[current=page]:border-transparent aria-[current=page]:bg-signal aria-[current=page]:text-ink";

function firstValue(value?: string | string[]): string {
  return Array.isArray(value) ? (value[0] ?? "") : (value ?? "");
}

function filterHref(category: string, query: string): string {
  const params = new URLSearchParams();
  if (category !== "all") params.set("category", category);
  if (query) params.set("query", query);
  const suffix = params.toString();
  return suffix ? `/blog?${suffix}` : "/blog";
}

function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="brand-card px-6 py-10 sm:px-10">
      <h2 className="text-h3">{title}</h2>
      <p className="mt-3 max-w-2xl leading-7 text-ink-muted">{body}</p>
    </div>
  );
}

async function loadBlogIndex({ searchParams }: BlogPageProps) {
  const rawParams = await searchParams;
  const requestedPage = Number.parseInt(firstValue(rawParams.page), 10);
  const page =
    Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1;
  const query = firstValue(rawParams.query).trim().slice(0, 120);
  const selectedFilter = getBlogFilter(firstValue(rawParams.category));
  const category = selectedFilter?.value ?? "all";
  const tag = selectedFilter?.tag ?? null;
  const showFeatured = page === 1 && category === "all" && !query;
  const request = { page, query, category, selectedFilter };

  if (!isWispConfigured) return { ...request, status: "empty" as const };

  const [gridOutcome, featuredOutcome, pinnedOutcome] =
    await Promise.allSettled([
      getBlogPosts({ page, query: query || null, tag }),
      showFeatured && BLOG_FEATURED.tag
        ? getBlogPosts({
            page: 1,
            tag: BLOG_FEATURED.tag,
            limit: BLOG_FEATURED.limit,
          })
        : Promise.resolve(null),
      showFeatured && BLOG_FEATURED.heroSlug
        ? getBlogPost(BLOG_FEATURED.heroSlug)
        : Promise.resolve(null),
    ]);

  if (gridOutcome.status === "rejected") {
    return { ...request, status: "unavailable" as const };
  }

  const result = gridOutcome.value;
  const pinned =
    pinnedOutcome.status === "fulfilled" ? pinnedOutcome.value?.post : null;
  // A pinned slug leads when it exists; otherwise the newest article does.
  const lead: BlogPostSummary | null = showFeatured
    ? (pinned ?? result.posts[0] ?? null)
    : null;
  const featuredPosts =
    featuredOutcome.status === "fulfilled"
      ? (featuredOutcome.value?.posts ?? [])
          .filter((post) => post.slug !== lead?.slug)
          .slice(0, BLOG_FEATURED.limit)
      : [];
  const pinnedSlugs = new Set([
    ...(lead ? [lead.slug] : []),
    ...featuredPosts.map((post) => post.slug),
  ]);
  const posts = result.posts.filter((post) => !pinnedSlugs.has(post.slug));

  return {
    ...request,
    status: "ready" as const,
    lead,
    featuredPosts,
    posts,
    pagination: result.pagination,
  };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const index = await loadBlogIndex({ searchParams });
  const { query, category, selectedFilter } = index;
  const lead = index.status === "ready" ? index.lead : null;
  const isFiltered = Boolean(query) || category !== "all";

  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(buildBreadcrumbJsonLd(breadcrumbs)),
        }}
      />

      <section className="brand-hero">
        <HeroFootage />
        <div className="mx-auto w-full max-w-7xl px-5 pt-10 pb-16 sm:px-8 sm:pt-12 sm:pb-20">
          <div className="flex min-w-0 flex-col items-start lg:max-w-xl">
            <nav
              aria-label="Breadcrumb"
              className="mb-10 text-sm text-ink-muted"
            >
              <ol className="flex flex-wrap gap-2">
                <li className="flex gap-2">
                  <Link className="hover:text-ink" href="/">
                    Home
                  </Link>
                  <span aria-hidden="true">/</span>
                </li>
                <li aria-current="page" className="text-ink">
                  Blog
                </li>
              </ol>
            </nav>
            <h1 className="brand-h1 max-w-3xl">AI Video Analytics Blog</h1>
            <p className="brand-lead mt-6 max-w-xl">
              The latest in AI video analytics and monitoring technology for
              construction sites, plants, ports and critical infrastructure.
              Read software comparisons, new detection use cases and practical
              advice on getting more from the CCTV you already have.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link className="brand-btn-primary" href="/contact">
                Request a demo
                <ArrowRightIcon className="size-4" aria-hidden="true" />
              </Link>
              <Link className="brand-btn-secondary" href="/use-cases">
                See all use cases
              </Link>
            </div>
            <p className="mt-5 text-sm text-ink-muted">
              Company announcements and awards are in{" "}
              <Link
                className="font-medium text-ink underline decoration-ink/25 underline-offset-[3px] hover:decoration-ink"
                href="/news"
              >
                News
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <CustomerProof />

      <section
        aria-labelledby="articles-title"
        className="scroll-mt-24 pt-6 pb-12 sm:pb-16"
        id="articles"
      >
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          {lead ? (
            <div className="relative mb-16 sm:mb-20">
              <FeaturedPost
                label={labelForBlogTags(lead.tags) ?? "Latest article"}
                post={lead}
              />
            </div>
          ) : null}

          {index.status === "ready" && index.featuredPosts.length > 0 ? (
            <div className="mb-16 sm:mb-20">
              <h2 className="brand-h2">Featured articles</h2>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {index.featuredPosts.map((post) => (
                  <PostCard
                    headingLevel={3}
                    key={post.id}
                    label={labelForBlogTags(post.tags)}
                    post={post}
                  />
                ))}
              </div>
            </div>
          ) : null}

          <div className="mb-9 flex flex-col gap-6 border-b border-ink/10 pb-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="brand-h2" id="articles-title">
                {query
                  ? "Search results"
                  : (selectedFilter?.label ??
                    (lead ? "More articles" : "All articles"))}
              </h2>
              {BLOG_FILTERS.length > 0 ? (
                <nav aria-label="Filter articles by tag" className="mt-6">
                  <ul className="flex flex-wrap gap-3">
                    <li>
                      <Link
                        aria-current={category === "all" ? "page" : undefined}
                        className={buttonVariants({
                          variant: category === "all" ? "default" : "outline",
                          className: filterClassName,
                        })}
                        href={filterHref("all", query)}
                      >
                        All
                      </Link>
                    </li>
                    {BLOG_FILTERS.map((filter) => (
                      <li key={filter.value}>
                        <Link
                          aria-current={
                            category === filter.value ? "page" : undefined
                          }
                          className={buttonVariants({
                            variant:
                              category === filter.value ? "default" : "outline",
                            className: filterClassName,
                          })}
                          href={filterHref(filter.value, query)}
                        >
                          {filter.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              ) : null}
            </div>

            <form
              action="/blog#articles"
              className="relative w-full sm:w-80"
              role="search"
            >
              {category !== "all" ? (
                <input name="category" type="hidden" value={category} />
              ) : null}
              <label className="sr-only" htmlFor="blog-search">
                Search articles
              </label>
              <SearchIcon
                className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-ink-faint"
                aria-hidden="true"
              />
              <input
                className="min-h-11 w-full rounded-full border border-ink/15 bg-paper py-2.5 pr-4 pl-10 text-sm text-ink outline-none placeholder:text-ink-faint focus-visible:border-signal focus-visible:ring-3 focus-visible:ring-signal/20"
                defaultValue={query}
                id="blog-search"
                name="query"
                placeholder="Search articles"
                type="search"
              />
              <button className="sr-only" type="submit">
                Search
              </button>
            </form>
          </div>

          {index.status === "empty" ? (
            <EmptyState
              title="No articles yet"
              body="Articles will appear here once the blog is published."
            />
          ) : index.status === "unavailable" ? (
            <EmptyState
              title="Articles are temporarily unavailable"
              body="Please check back in a little while."
            />
          ) : (
            <>
              {isFiltered ? (
                <div
                  className="mb-7 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-ink-muted"
                  aria-live="polite"
                >
                  <p>
                    {index.pagination.totalPosts} result
                    {index.pagination.totalPosts === 1 ? "" : "s"}
                    {query ? ` for “${query}”` : ""}
                    {selectedFilter ? ` in ${selectedFilter.label}` : ""}
                  </p>
                  {query ? (
                    <Link
                      className="font-medium text-signal-strong"
                      href={filterHref(category, "")}
                    >
                      Clear search
                    </Link>
                  ) : null}
                </div>
              ) : null}

              {index.posts.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {index.posts.map((post) => (
                    <PostCard
                      headingLevel={3}
                      key={post.id}
                      label={labelForBlogTags(post.tags)}
                      post={post}
                    />
                  ))}
                </div>
              ) : isFiltered || !lead ? (
                <EmptyState
                  title={isFiltered ? "No articles found" : "No articles yet"}
                  body={
                    isFiltered
                      ? "Try a shorter search or browse all articles."
                      : "Articles will appear here once the first one is published."
                  }
                />
              ) : null}

              <BlogPagination
                category={category}
                currentPage={index.pagination.page}
                query={query}
                totalPages={index.pagination.totalPages}
              />
            </>
          )}
        </div>
      </section>

      <section className="pt-20 pb-28 sm:pb-32">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <CtaBanner
            buttonText="Request a demo"
            description="Tell us about your sites and cameras. We will show you which detections fit and how alerts reach your team."
            href="/contact"
            title="See AI video analytics on your own cameras"
          />
        </div>
      </section>
    </main>
  );
}
