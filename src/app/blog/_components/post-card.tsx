import { ArrowUpRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatBlogDate } from "@/lib/blog-content";

export type BlogCardPost = {
  slug: string;
  title: string;
  image: string | null;
  description: string | null;
  publishedAt: Date | string | null;
};

export function PostCard({
  post,
  label = null,
  headingLevel = 2,
}: {
  post: BlogCardPost;
  label?: string | null;
  headingLevel?: 2 | 3;
}) {
  const Heading = `h${headingLevel}` as "h2" | "h3";

  return (
    <Card className="brand-card brand-card-link relative h-full gap-0 rounded-2xl py-0 ring-0">
      {post.image ? (
        <Link
          className="relative block aspect-[16/9] overflow-hidden border-b border-ink/10 bg-muted"
          href={`/blog/${post.slug}`}
          tabIndex={-1}
          aria-hidden="true"
        >
          <Image
            className="object-cover transition-transform duration-300 group-hover/card:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover/card:scale-100"
            src={post.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
          />
        </Link>
      ) : null}

      <CardContent className="flex flex-1 flex-col px-6 py-6 sm:px-7 sm:py-7">
        {label ? (
          <Badge className="mb-4 h-auto bg-mint/55 px-3 py-1 text-ink hover:bg-mint/55">
            {label}
          </Badge>
        ) : null}

        <Heading className="text-lg leading-snug font-medium tracking-[-0.015em] text-balance">
          <Link
            className="outline-none after:absolute after:inset-0 focus-visible:underline"
            href={`/blog/${post.slug}`}
          >
            {post.title}
          </Link>
        </Heading>

        {post.description ? (
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-pretty text-ink-muted">
            {post.description}
          </p>
        ) : null}

        <div className="mt-auto flex items-center justify-between gap-4 pt-6 text-sm">
          {post.publishedAt ? (
            <time
              className="text-ink-faint"
              dateTime={new Date(post.publishedAt).toISOString()}
            >
              {formatBlogDate(post.publishedAt)}
            </time>
          ) : (
            <span />
          )}
          <span className="inline-flex items-center gap-1.5 font-medium text-ink">
            Read
            <ArrowUpRightIcon
              className="size-4 text-mint-strong"
              aria-hidden="true"
            />
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
