import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

import { chromeCopy } from "@/config/chrome-copy";
import { localizedHref, type Locale } from "@/lib/i18n";

/**
 * The site-wide bar above the header. Remove this component, its copy in
 * `src/config/chrome-copy/`, and its use in the site shell when the
 * announcement is no longer current.
 */
export function AnnouncementBar({ locale }: { locale: Locale }) {
  const copy = chromeCopy(locale).announcement;

  return (
    <Link
      className="group block bg-night text-white"
      href={localizedHref(locale, "/blog/ailytics-series-a-announcement")}
    >
      <span className="mx-auto flex w-full max-w-7xl items-center justify-center gap-3 px-5 py-2.5 text-center text-sm sm:px-8">
        <span>
          <span className="sm:hidden">{copy.short}</span>
          <span className="hidden sm:inline lg:hidden">{copy.medium}</span>
          <span className="hidden lg:inline">{copy.long}</span>
        </span>
        <span className="inline-flex shrink-0 items-center gap-1 font-medium text-mint underline-offset-4 group-hover:underline">
          <span className="sm:hidden">{copy.ctaShort}</span>
          <span className="hidden sm:inline">{copy.ctaLong}</span>
          <ArrowRightIcon
            aria-hidden="true"
            className="size-3.5 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
          />
        </span>
      </span>
    </Link>
  );
}
