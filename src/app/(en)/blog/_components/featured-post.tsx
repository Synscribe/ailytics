import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { formatBlogDate } from "@/lib/blog-content";

import type { BlogCardPost } from "./post-card";

/** The lead article at the top of the index: cover, title, summary and date. */
export function FeaturedPost({
  post,
  label,
}: {
  post: BlogCardPost;
  label: string;
}) {
  return (
    <Link
      className="brand-card brand-card-link group grid overflow-hidden shadow-[0_24px_60px_-28px_rgba(39,64,93,0.35)] md:grid-cols-[minmax(0,11fr)_minmax(0,9fr)]"
      href={`/blog/${post.slug}`}
    >
      {post.image ? (
        <div className="relative aspect-[16/9] overflow-hidden border-b border-ink/10 bg-muted md:aspect-auto md:border-r md:border-b-0">
          <Image
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            src={post.image}
            alt=""
            fill
            priority
            sizes="(min-width: 768px) 55vw, 100vw"
          />
        </div>
      ) : null}

      <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-12">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-muted">
          <span className="rounded-full bg-mint/55 px-3 py-1 font-medium text-ink">
            {label}
          </span>
          {post.publishedAt ? (
            <time dateTime={new Date(post.publishedAt).toISOString()}>
              {formatBlogDate(post.publishedAt)}
            </time>
          ) : null}
        </p>
        <h2 className="mt-4 text-h3 text-balance">{post.title}</h2>
        {post.description ? (
          <p className="mt-3 line-clamp-3 text-base leading-7 text-pretty text-ink-muted">
            {post.description}
          </p>
        ) : null}
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-ink">
          Read the article
          <ArrowRightIcon
            className="size-4 text-mint-strong transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </span>
      </div>
    </Link>
  );
}
