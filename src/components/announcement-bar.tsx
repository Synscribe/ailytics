import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

/**
 * The site-wide bar above the header. Remove this component and its use in
 * the root layout when the announcement is no longer current.
 */
export function AnnouncementBar() {
  return (
    <Link
      className="group block bg-night text-white"
      href="/news/ailytics-series-a-announcement"
    >
      <span className="mx-auto flex w-full max-w-7xl items-center justify-center gap-3 px-5 py-2.5 text-center text-sm sm:px-8">
        <span>
          <span className="sm:hidden">Ailytics raises US$7.4M Series A</span>
          <span className="hidden sm:inline lg:hidden">
            Ailytics raises US$7.4M in an oversubscribed Series A led by Tin Men
            Capital
          </span>
          <span className="hidden lg:inline">
            Ailytics raises US$7.4M in an oversubscribed Series A led by Tin Men
            Capital to expand across APAC, the US and the Gulf
          </span>
        </span>
        <span className="inline-flex shrink-0 items-center gap-1 font-medium text-mint underline-offset-4 group-hover:underline">
          <span className="sm:hidden">Read more</span>
          <span className="hidden sm:inline">Read the announcement</span>
          <ArrowRightIcon
            aria-hidden="true"
            className="size-3.5 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
          />
        </span>
      </span>
    </Link>
  );
}
