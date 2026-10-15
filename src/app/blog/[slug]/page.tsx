import { ArrowRightIcon } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  getBlogPost,
  getRelatedBlogPosts,
  type RelatedBlogPost,
} from "@/lib/blog";
import {
  addBlogHeadingAnchors,
  descriptionFromPost,
  estimateReadingMinutes,
  formatBlogDate,
  sanitizeBlogContent,
} from "@/lib/blog-content";
import {
  buildArticleJsonLd,
  buildBreadcrumbJsonLd,
  createPageMetadata,
  absoluteUrl,
  serializeJsonLd,
} from "@/lib/seo";

import { labelForBlogTags } from "../blog.config";
import { PostCard } from "../_components/post-card";
import { ArticleSidebar } from "./_components/article-sidebar";
import styles from "./article.module.css";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

function isoDate(value: Date | string | null): string | undefined {
  return value ? new Date(value).toISOString() : undefined;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { post } = await getBlogPost(slug);
  if (!post) notFound();

  return createPageMetadata({
    title: post.title,
    description: descriptionFromPost(post.description, post.content),
    path: `/blog/${post.slug}`,
    imagePath: post.image ?? undefined,
  });
}

async function Article({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const { post } = await getBlogPost(slug);
  if (!post) notFound();

  const path = `/blog/${post.slug}`;
  const description = descriptionFromPost(post.description, post.content);
  const publishedAt = isoDate(post.publishedAt);
  const updatedAt = isoDate(post.updatedAt);
  const sanitizedContent = sanitizeBlogContent(post.content, post.image);
  const { html: content, tableOfContents } =
    addBlogHeadingAnchors(sanitizedContent);
  const category = labelForBlogTags(post.tags);
  const articleJsonLd = buildArticleJsonLd({
    headline: post.title,
    description,
    path,
    authorName: post.author.name ?? undefined,
    publishedAt,
    updatedAt,
    imagePath: post.image ?? undefined,
  });
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path },
  ]);

  let relatedPosts: RelatedBlogPost[] = [];
  try {
    relatedPosts = (await getRelatedBlogPosts(post.slug, 3)).posts;
  } catch {
    // Related content is optional. The article remains useful without it.
  }

  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }}
      />

      <article>
        <header className="brand-hero">
          <div
            className={`mx-auto grid w-full max-w-7xl gap-12 px-5 pt-10 pb-16 sm:px-8 sm:pt-12 sm:pb-20 lg:gap-16 ${post.image ? "lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:items-center" : ""}`}
          >
            <div className="flex min-w-0 flex-col items-start">
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
                  <li className="flex gap-2">
                    <Link className="hover:text-ink" href="/blog">
                      Blog
                    </Link>
                    {category ? <span aria-hidden="true">/</span> : null}
                  </li>
                  {category ? <li className="text-ink">{category}</li> : null}
                </ol>
              </nav>

              <h1 className="brand-h1">{post.title}</h1>

              <p className="brand-lead mt-6 max-w-2xl">{description}</p>

              <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-ink-muted">
                {updatedAt ? (
                  <>
                    <p>
                      Last updated{" "}
                      <time dateTime={updatedAt}>
                        {formatBlogDate(post.updatedAt)}
                      </time>
                    </p>
                    <span aria-hidden="true" className="text-ink-faint">
                      •
                    </span>
                  </>
                ) : null}
                <p>{estimateReadingMinutes(post.content)} min read</p>
              </div>
            </div>

            {post.image ? (
              <div className="brand-card relative aspect-[16/10] min-w-0 overflow-hidden bg-muted">
                <Image
                  className="object-cover"
                  src={post.image}
                  alt=""
                  fill
                  priority
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />
              </div>
            ) : null}
          </div>
        </header>

        <div className="pt-10 pb-20 sm:pt-14 lg:pt-16 lg:pb-24">
          <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:gap-8">
            <ArticleSidebar
              items={tableOfContents}
              title={post.title}
              url={absoluteUrl(path)}
            />
            <div
              className={`${styles.prose} order-2 min-w-0 lg:order-1 lg:col-span-8`}
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </div>
      </article>

      {relatedPosts.length > 0 ? (
        <section className="border-t border-ink/10 pt-16 sm:pt-20 lg:pt-24">
          <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
            <div className="mb-9 flex items-end justify-between gap-6">
              <h2 className="brand-h2">Keep reading</h2>
              <Link
                className="brand-btn-secondary hidden sm:inline-flex"
                href="/blog"
              >
                All articles
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <PostCard
                  headingLevel={3}
                  key={relatedPost.id}
                  post={relatedPost}
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="pt-20 pb-28 sm:pt-24 sm:pb-32">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="brand-banner flex flex-col gap-8 p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between lg:p-16">
            <div>
              <h2 className="brand-h2 max-w-3xl">
                Find out what your cameras could catch
              </h2>
              <p className="mt-3 max-w-[46ch] text-[1.0625rem] leading-relaxed text-white/85">
                Tell us about your sites and cameras. We will show you which
                detections fit and how alerts reach your team.
              </p>
            </div>
            <Link
              className="brand-btn-light self-start lg:self-auto"
              href="/contact"
            >
              Request a demo
              <ArrowRightIcon className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  return Article({ params });
}
