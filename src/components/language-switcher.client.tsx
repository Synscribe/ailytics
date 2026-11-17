"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  hasTranslation,
  LOCALE_SETTINGS,
  LOCALES,
  localePath,
  parseLocalePath,
  type Locale,
} from "@/lib/i18n";

/**
 * Links to this page in every other locale, or to that locale's homepage
 * when this page has no translation. Each label is in its own language.
 */
export function LanguageSwitcher({
  locale,
  className,
}: {
  locale: Locale;
  className?: string;
}) {
  const { path } = parseLocalePath(usePathname() ?? "/");
  const others = LOCALES.filter((other) => other !== locale);

  return (
    <>
      {others.map((other) => {
        const settings = LOCALE_SETTINGS[other];
        const href = localePath(
          other,
          hasTranslation(other, path) ? path : "/",
        );
        return (
          <Link
            className={className}
            href={href}
            hrefLang={settings.hreflang}
            key={other}
            lang={settings.htmlLang}
          >
            {settings.label}
          </Link>
        );
      })}
    </>
  );
}
