import translations from "@/config/translations.json";

/**
 * Locales the site is published in. English is served at the root; every
 * other locale lives under its own path prefix with only the pages that have
 * been translated. Add a locale here, then add its root layout under
 * `src/app/<prefix>/` and its shared copy in `src/config/chrome-copy/`.
 */
export const LOCALES = ["en", "ja-jp"] as const;

export type Locale = (typeof LOCALES)[number];
export type TranslatedLocale = Exclude<Locale, "en">;

export const DEFAULT_LOCALE = "en" satisfies Locale;

type LocaleSettings = {
  /** URL prefix, empty for the default locale. */
  prefix: string;
  /** The `<html lang>` value. */
  htmlLang: string;
  /** The hreflang value Google reads. */
  hreflang: string;
  /** Open Graph `og:locale`. */
  openGraphLocale: string;
  /** schema.org `inLanguage`. */
  inLanguage: string;
  /** The locale's own name, shown in the language switcher. */
  label: string;
};

export const LOCALE_SETTINGS: Record<Locale, LocaleSettings> = {
  en: {
    prefix: "",
    htmlLang: "en",
    hreflang: "en",
    openGraphLocale: "en_US",
    inLanguage: "en-US",
    label: "English",
  },
  "ja-jp": {
    prefix: "/ja-jp",
    htmlLang: "ja",
    hreflang: "ja",
    openGraphLocale: "ja_JP",
    inLanguage: "ja-JP",
    label: "日本語",
  },
};

export type TranslationStatus = "machine" | "reviewed";

export type TranslationEntry = {
  id: string;
  locale: TranslatedLocale;
  /** The English pathname this translation publishes, when it is a page. */
  path?: string;
  source: string[];
  target: string[];
  sourceHash: string;
  status: TranslationStatus;
  updated: string;
};

export const TRANSLATIONS = translations.entries as TranslationEntry[];

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

function normalizePathname(pathname: string): string {
  if (pathname === "" || pathname === "/") return "/";
  return pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
}

/** English pathnames with a published translation in `locale`. */
export function translatedPaths(locale: TranslatedLocale): string[] {
  return TRANSLATIONS.filter(
    (entry) => entry.locale === locale && entry.path !== undefined,
  ).map((entry) => normalizePathname(entry.path as string));
}

export function hasTranslation(locale: Locale, pathname: string): boolean {
  if (locale === DEFAULT_LOCALE) return true;
  return translatedPaths(locale).includes(normalizePathname(pathname));
}

/** Prefixes an English pathname for `locale`, without checking it exists. */
export function localePath(locale: Locale, pathname: string): string {
  const path = normalizePathname(pathname);
  const { prefix } = LOCALE_SETTINGS[locale];
  if (!prefix) return path;
  return path === "/" ? prefix : `${prefix}${path}`;
}

/**
 * The link for an English href on a page in `locale`: the translated page
 * when one exists, otherwise the English page. Query strings, hashes and
 * external links pass through unchanged.
 */
export function localizedHref(locale: Locale, href: string): string {
  if (locale === DEFAULT_LOCALE || !href.startsWith("/")) return href;
  const match = href.match(/^([^?#]*)(.*)$/);
  const pathname = match?.[1] ?? href;
  const rest = match?.[2] ?? "";
  if (!hasTranslation(locale, pathname)) return href;
  return `${localePath(locale, pathname)}${rest}`;
}

/** Splits a public pathname into its locale and English pathname. */
export function parseLocalePath(pathname: string): {
  locale: Locale;
  path: string;
} {
  const path = normalizePathname(pathname);
  for (const locale of LOCALES) {
    const { prefix } = LOCALE_SETTINGS[locale];
    if (!prefix) continue;
    if (path === prefix) return { locale, path: "/" };
    if (path.startsWith(`${prefix}/`)) {
      return { locale, path: path.slice(prefix.length) };
    }
  }
  return { locale: DEFAULT_LOCALE, path };
}

/**
 * hreflang alternates for an English pathname, keyed by hreflang value, or
 * undefined when the page has no translation. Includes `x-default`, which
 * points to the English page.
 */
export function languageAlternates(
  pathname: string,
  toUrl: (path: string) => string,
): Record<string, string> | undefined {
  const available = LOCALES.filter((locale) =>
    hasTranslation(locale, pathname),
  );
  if (available.length < 2) return undefined;
  const alternates: Record<string, string> = {};
  for (const locale of available) {
    alternates[LOCALE_SETTINGS[locale].hreflang] = toUrl(
      localePath(locale, pathname),
    );
  }
  alternates["x-default"] = toUrl(localePath(DEFAULT_LOCALE, pathname));
  return alternates;
}
