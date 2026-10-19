import { ArrowUpRightIcon } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  formatNewsDate,
  getNewsArticle,
  listNewsArticles,
} from "@/lib/news-content";
import {
  buildArticleJsonLd,
  buildBreadcrumbJsonLd,
  createPageMetadata,
  serializeJsonLd,
} from "@/lib/seo";

import styles from "./article.module.css";

type NewsArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await listNewsArticles()).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: NewsArticlePageProps): Promise<Metadata> {
  const article = await getNewsArticle((await params).slug);
  if (!article) notFound();

  return createPageMetadata({
    title: article.title,
    description: article.description,
    path: `/news/${article.slug}`,
    imagePath: article.image,
  });
}

function hostname(url: string): string {
  return new URL(url).hostname.replace(/^www\./, "");
}

export default async function NewsArticlePage({
  params,
}: NewsArticlePageProps) {
  const article = await getNewsArticle((await params).slug);
  if (!article) notFound();

  const path = `/news/${article.slug}`;

  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(
            buildArticleJsonLd({
              headline: article.title,
              description: article.description,
              path,
              publishedAt: article.publishedAt,
              imagePath: article.image,
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(
            buildBreadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "News", path: "/news" },
              { name: article.title, path },
            ]),
          ),
        }}
      />

      <article>
        <header className="slate-hero">
          <div className="mx-auto w-full max-w-5xl px-5 pt-12 pb-10 text-center sm:px-8 sm:pt-16 sm:pb-12">
            <Link
              className="text-sm font-medium text-mint-strong hover:text-ink"
              href="/news"
            >
              News
            </Link>
            <h1 className="brand-h1 mx-auto mt-4 max-w-4xl">{article.title}</h1>
            <p className="mt-5 text-sm text-ink-muted">
              {article.category}
              <span aria-hidden="true" className="mx-2 text-ink-faint">
                •
              </span>
              <time dateTime={article.publishedAt}>
                {formatNewsDate(article.publishedAt)}
              </time>
            </p>
          </div>
          <div className="mx-auto w-full max-w-4xl px-5 pb-12 sm:px-8 sm:pb-16">
            <div className="brand-card relative aspect-[16/9] overflow-hidden rounded-2xl bg-muted">
              <Image
                alt=""
                className="object-cover"
                fill
                priority
                sizes="(min-width: 896px) 832px, 100vw"
                src={article.image}
              />
            </div>
          </div>
        </header>

        <div className="mx-auto w-full max-w-3xl px-5 pt-12 pb-24 sm:px-8 sm:pt-14 sm:pb-28">
          <div
            className={styles.prose}
            dangerouslySetInnerHTML={{ __html: article.html }}
          />

          {article.externalUrl ? (
            <a
              className="brand-btn-light brand-btn-primary mt-10"
              href={article.externalUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              Read the full story on {hostname(article.externalUrl)}
              <ArrowUpRightIcon aria-hidden="true" className="size-4" />
            </a>
          ) : null}

          <p className="mt-16 border-t border-line pt-8">
            <Link
              className="text-sm font-medium text-ink hover:text-mint-strong"
              href="/news"
            >
              ← Back to all news
            </Link>
          </p>
        </div>
      </article>
    </main>
  );
}
