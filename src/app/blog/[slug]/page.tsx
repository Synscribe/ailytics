import { ArrowUpRightIcon } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  getBlogPost,
  getRelatedBlogPosts,
  type BlogPost,
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
  getNewsArticle,
  listNewsArticles,
  type NewsArticle,
} from "@/lib/news-content";
import {
  buildArticleJsonLd,
  buildBreadcrumbJsonLd,
  createPageMetadata,
} from "@/lib/seo";

import { entryFromNewsArticle, newsPublishedAt } from "../_entries";
import { BLOG_FILTERS, labelForBlogTags } from "../blog.config";
import { ArticleLayout } from "./_components/article-layout";
import styles from "./article.module.css";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

const NEWS_HREF = "/blog?category=news";

function isoDate(value: Date | string | null): string | undefined {
  return value ? new Date(value).toISOString() : undefined;
}

function hostname(url: string): string {
  return new URL(url).hostname.replace(/^www\./, "");
}

function breadcrumbJsonLd(title: string, path: string) {
  return buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: title, path },
  ]);
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getNewsArticle(slug);
  if (article) {
    return createPageMetadata({
      title: article.title,
      description: article.description,
      path: `/blog/${article.slug}`,
      imagePath: article.image,
    });
  }

  const { post } = await getBlogPost(slug);
  if (!post) notFound();

  return createPageMetadata({
    title: post.title,
    description: descriptionFromPost(post.description, post.content),
    path: `/blog/${post.slug}`,
    imagePath: post.image ?? undefined,
  });
}

async function NewsArticlePage({ article }: { article: NewsArticle }) {
  const path = `/blog/${article.slug}`;
  const { html, tableOfContents } = addBlogHeadingAnchors(article.html);
  const otherNews = (await listNewsArticles())
    .filter(({ slug }) => slug !== article.slug)
    .slice(0, 3)
    .map(entryFromNewsArticle);

  return (
    <ArticleLayout
      afterContent={
        article.externalUrl ? (
          <a
            className="brand-btn-primary mt-10"
            href={article.externalUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            Read the full story on {hostname(article.externalUrl)}
            <ArrowUpRightIcon aria-hidden="true" className="size-4" />
          </a>
        ) : null
      }
      category={{ label: "News", href: NEWS_HREF }}
      description={article.description}
      details={
        <>
          <p>{article.category}</p>
          <span aria-hidden="true" className="text-ink-faint">
            •
          </span>
          <p>
            <time dateTime={article.publishedAt}>
              {formatBlogDate(newsPublishedAt(article))}
            </time>
          </p>
          <span aria-hidden="true" className="text-ink-faint">
            •
          </span>
          <p>{estimateReadingMinutes(article.html)} min read</p>
        </>
      }
      html={html}
      image={article.image}
      jsonLd={[
        buildArticleJsonLd({
          headline: article.title,
          description: article.description,
          path,
          publishedAt: article.publishedAt,
          imagePath: article.image,
        }),
        breadcrumbJsonLd(article.title, path),
      ]}
      path={path}
      proseClassName={styles.newsArchive}
      related={{ posts: otherNews, href: NEWS_HREF, label: "All news" }}
      tableOfContents={tableOfContents}
      title={article.title}
    />
  );
}

async function WispArticlePage({ post }: { post: BlogPost }) {
  const path = `/blog/${post.slug}`;
  const description = descriptionFromPost(post.description, post.content);
  const publishedAt = isoDate(post.publishedAt);
  const updatedAt = isoDate(post.updatedAt);
  const sanitizedContent = sanitizeBlogContent(post.content, post.image);
  const { html, tableOfContents } = addBlogHeadingAnchors(sanitizedContent);
  const label = labelForBlogTags(post.tags);
  const filter = BLOG_FILTERS.find(({ tag }) => tag === post.tags[0]?.name);

  let relatedPosts: RelatedBlogPost[] = [];
  try {
    relatedPosts = (await getRelatedBlogPosts(post.slug, 3)).posts;
  } catch {
    // Related content is optional. The article remains useful without it.
  }

  return (
    <ArticleLayout
      category={
        label
          ? {
              label,
              href: filter ? `/blog?category=${filter.value}` : undefined,
            }
          : null
      }
      description={description}
      details={
        <>
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
        </>
      }
      html={html}
      image={post.image}
      jsonLd={[
        buildArticleJsonLd({
          headline: post.title,
          description,
          path,
          authorName: post.author.name ?? undefined,
          publishedAt,
          updatedAt,
          imagePath: post.image ?? undefined,
        }),
        breadcrumbJsonLd(post.title, path),
      ]}
      path={path}
      related={{ posts: relatedPosts, href: "/blog", label: "All articles" }}
      tableOfContents={tableOfContents}
      title={post.title}
    />
  );
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  // Migrated news articles are local files, so they are checked first.
  const article = await getNewsArticle(slug);
  if (article) return NewsArticlePage({ article });

  const { post } = await getBlogPost(slug);
  if (!post) notFound();
  return WispArticlePage({ post });
}
