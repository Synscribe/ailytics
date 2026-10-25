import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

import { CtaBanner } from "@/components/cta-banner/cta-banner";
import type { BlogTableOfContentsItem } from "@/lib/blog-content";
import { absoluteUrl, serializeJsonLd } from "@/lib/seo";

import { PostCard, type BlogCardPost } from "../../_components/post-card";
import styles from "../article.module.css";
import { ArticleSidebar } from "./article-sidebar";

/**
 * The article page shared by Wisp posts and migrated news articles: hero,
 * contents and share sidebar, sanitized body, related cards and demo banner.
 */
export function ArticleLayout({
  title,
  description,
  path,
  category,
  details,
  image,
  html,
  proseClassName,
  tableOfContents,
  afterContent,
  jsonLd,
  related,
}: {
  title: string;
  description: string;
  path: string;
  category: { label: string; href?: string } | null;
  /** Dates and reading time under the lead paragraph. */
  details: ReactNode;
  image: string | null;
  /** Sanitized HTML with heading anchors already added. */
  html: string;
  proseClassName?: string;
  tableOfContents: BlogTableOfContentsItem[];
  afterContent?: ReactNode;
  jsonLd: unknown[];
  related: { posts: BlogCardPost[]; href: string; label: string };
}) {
  return (
    <main id="main-content">
      {jsonLd.map((value, index) => (
        <script
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(value) }}
          key={index}
          type="application/ld+json"
        />
      ))}

      <article>
        <header className="band-blue">
          <div
            className={`mx-auto grid w-full max-w-7xl gap-12 px-5 pt-10 pb-16 sm:px-8 sm:pt-12 sm:pb-20 lg:gap-16 ${image ? "lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:items-center" : ""}`}
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
                  {category ? (
                    <li className="text-ink">
                      {category.href ? (
                        <Link className="hover:text-ink" href={category.href}>
                          {category.label}
                        </Link>
                      ) : (
                        category.label
                      )}
                    </li>
                  ) : null}
                </ol>
              </nav>

              <h1 className="brand-h1">{title}</h1>

              <p className="brand-lead mt-6 max-w-2xl">{description}</p>

              <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-ink-muted">
                {details}
              </div>
            </div>

            {image ? (
              <div className="min-w-0 overflow-hidden rounded-lg">
                <Image
                  className="block h-auto w-full"
                  src={image}
                  alt=""
                  width={1280}
                  height={720}
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
              title={title}
              url={absoluteUrl(path)}
            />
            <div className="order-2 min-w-0 lg:order-1 lg:col-span-8">
              <div
                className={`${styles.prose} ${proseClassName ?? ""}`}
                dangerouslySetInnerHTML={{ __html: html }}
              />
              {afterContent}
            </div>
          </div>
        </div>
      </article>

      {related.posts.length > 0 ? (
        <section className="border-t border-ink/10 pt-16 sm:pt-20 lg:pt-24">
          <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
            <div className="mb-9 flex items-end justify-between gap-6">
              <h2 className="brand-h2">Keep reading</h2>
              <Link
                className="brand-btn-secondary hidden sm:inline-flex"
                href={related.href}
              >
                {related.label}
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.posts.map((relatedPost) => (
                <PostCard
                  headingLevel={3}
                  key={relatedPost.slug}
                  post={relatedPost}
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="pt-20 pb-28 sm:pt-24 sm:pb-32">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <CtaBanner
            buttonText="Request a demo"
            description="Tell us about your sites and cameras. We will show you which detections fit and how alerts reach your team."
            href="/contact"
            title="Find out what your cameras could catch"
          />
        </div>
      </section>
    </main>
  );
}
