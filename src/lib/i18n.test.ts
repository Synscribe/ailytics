import { describe, expect, it } from "vitest";

import { en as homeEn } from "@/app/(en)/(marketing)/_copy/en";
import { jaJp as homeJaJp } from "@/app/(en)/(marketing)/_copy/ja-jp";
import { en as chromeEn } from "@/config/chrome-copy/en";
import { jaJp as chromeJaJp } from "@/config/chrome-copy/ja-jp";
import { localizedNavigation } from "@/config/chrome-copy";
import { redirects } from "@/config/redirects";
import { siteConfig } from "@/config/site";

import {
  hasTranslation,
  languageAlternates,
  localePath,
  localizedHref,
  LOCALES,
  parseLocalePath,
  translatedPaths,
  type TranslatedLocale,
} from "./i18n";

const toUrl = (path: string) => `https://example.com${path}`;

describe("locale paths", () => {
  it("prefixes English pathnames for each locale", () => {
    expect(localePath("en", "/contact")).toBe("/contact");
    expect(localePath("ja-jp", "/")).toBe("/ja-jp");
    expect(localePath("ja-jp", "/contact/")).toBe("/ja-jp/contact");
  });

  it("parses a public pathname back to its locale", () => {
    expect(parseLocalePath("/ja-jp")).toEqual({ locale: "ja-jp", path: "/" });
    expect(parseLocalePath("/ja-jp/contact")).toEqual({
      locale: "ja-jp",
      path: "/contact",
    });
    expect(parseLocalePath("/ja-jpx")).toEqual({
      locale: "en",
      path: "/ja-jpx",
    });
  });

  it("links to the translated page only when one exists", () => {
    expect(localizedHref("ja-jp", "/")).toBe("/ja-jp");
    expect(localizedHref("ja-jp", "/eula")).toBe("/eula");
    expect(localizedHref("ja-jp", "#how-it-works")).toBe("#how-it-works");
    expect(localizedHref("en", "/contact?x=1")).toBe("/contact?x=1");
  });

  it("builds hreflang alternates with an English x-default", () => {
    expect(languageAlternates("/", toUrl)).toEqual({
      en: "https://example.com/",
      ja: "https://example.com/ja-jp",
      "x-default": "https://example.com/",
    });
    expect(languageAlternates("/eula", toUrl)).toBeUndefined();
  });
});

describe("translations", () => {
  const translated = LOCALES.filter(
    (locale): locale is TranslatedLocale => locale !== "en",
  );

  it("translates every navigation label", () => {
    for (const item of siteConfig.navigation) {
      if ("links" in item) {
        expect(chromeJaJp.nav.groups[item.label]?.label).toBeTruthy();
        if (item.footer) {
          expect(chromeJaJp.nav.groups[item.label]?.footer).toBeTruthy();
        }
        for (const link of item.links) {
          expect(chromeJaJp.nav.links[link.href]?.label).toBeTruthy();
          expect(chromeJaJp.nav.links[link.href]?.description).toBeTruthy();
        }
      } else {
        expect(chromeJaJp.nav.links[item.href]?.label).toBeTruthy();
      }
    }
    expect(Object.keys(chromeEn.nav.links)).toHaveLength(0);
  });

  it("keeps navigation links to untranslated pages in English", () => {
    const nav = localizedNavigation("ja-jp");
    const blog = nav.find((item) => !("links" in item));
    expect(blog).toMatchObject({ label: "ブログ", href: "/blog" });
  });

  it("keeps translated lists the same length as English", () => {
    const lists = (copy: typeof homeEn) => [
      copy.heroWall.cams,
      copy.heroWall.events,
      copy.problem.statements,
      copy.depth.steps,
      copy.visuals.ask.questions,
      copy.faq.items,
    ];
    const english = lists(homeEn).map((list) => list.length);
    expect(lists(homeJaJp).map((list) => list.length)).toEqual(english);
    expect(chromeJaJp.proof.stats).toHaveLength(chromeEn.proof.stats.length);
  });

  it("keeps template placeholders in translations", () => {
    expect(homeJaJp.visuals.depth.distance).toContain("{metres}");
    expect(homeJaJp.visuals.setup.graceValue).toContain("{seconds}");
    expect(chromeJaJp.showGroup).toContain("{label}");
    expect(chromeJaJp.socialLabel).toContain("{profile}");
  });

  it("never redirects a translated page away", () => {
    const sources = new Set(redirects.map((rule) => rule.source));
    for (const locale of translated) {
      for (const path of translatedPaths(locale)) {
        expect(sources.has(localePath(locale, path))).toBe(false);
      }
    }
    expect(hasTranslation("ja-jp", "/")).toBe(true);
  });
});
