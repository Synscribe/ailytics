import { siteConfig, type NavigationItem } from "@/config/site";
import { localizedHref, type Locale } from "@/lib/i18n";

import { en, type ChromeCopy } from "./en";
import { jaJp } from "./ja-jp";

export type { ChromeCopy };

const CHROME_COPY: Record<Locale, ChromeCopy> = { en, "ja-jp": jaJp };

export function chromeCopy(locale: Locale): ChromeCopy {
  return CHROME_COPY[locale];
}

/** Fills `{name}` placeholders in a copy template. */
export function fillTemplate(
  template: string,
  values: Record<string, string>,
): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? values[key] : match,
  );
}

/**
 * The site navigation for `locale`: translated labels, and links to the
 * translated page where one exists, otherwise to the English page.
 */
export function localizedNavigation(locale: Locale): NavigationItem[] {
  const { groups, links } = CHROME_COPY[locale].nav;
  const link = <T extends { label: string; href: string }>(item: T): T => ({
    ...item,
    ...links[item.href],
    href: localizedHref(locale, item.href),
  });

  return siteConfig.navigation.map((item) => {
    if (!("links" in item)) return link(item);
    const group = groups[item.label];
    return {
      ...item,
      label: group?.label ?? item.label,
      href: item.href ? localizedHref(locale, item.href) : undefined,
      links: item.links.map(link),
      footer: item.footer
        ? {
            label: group?.footer ?? item.footer.label,
            href: localizedHref(locale, item.footer.href),
          }
        : undefined,
    };
  });
}
