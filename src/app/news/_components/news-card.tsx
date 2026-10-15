import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { formatNewsDate, type NewsArticle } from "@/lib/news-content";

/** One /news hub row: cover on the left, category, title, date and teaser. */
export function NewsCard({
  article,
  priority = false,
}: {
  article: NewsArticle;
  priority?: boolean;
}) {
  const href = `/news/${article.slug}`;

  return (
    <article className="brand-card brand-card-link group relative grid overflow-hidden rounded-2xl bg-paper md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
      <div className="relative aspect-[16/9] overflow-hidden bg-muted md:aspect-auto md:min-h-60">
        <Image
          alt=""
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          fill
          priority={priority}
          sizes="(min-width: 768px) 40vw, 100vw"
          src={article.image}
        />
      </div>

      <div className="flex flex-col justify-center px-6 py-7 sm:px-9 sm:py-9">
        <Badge className="h-auto bg-mint/55 px-3 py-1 text-ink hover:bg-mint/55">
          {article.category}
        </Badge>
        <h2 className="mt-4 text-title text-balance">
          <Link
            className="outline-none after:absolute after:inset-0 focus-visible:underline"
            href={href}
          >
            {article.title}
          </Link>
        </h2>
        <p className="mt-2 text-sm text-ink-faint">
          <time dateTime={article.publishedAt}>
            {formatNewsDate(article.publishedAt)}
          </time>
        </p>
        <p className="mt-4 max-w-2xl leading-7 text-ink-muted">
          {article.summary}
        </p>
      </div>
    </article>
  );
}
