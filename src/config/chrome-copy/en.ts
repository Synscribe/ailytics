import { siteConfig } from "@/config/site";

/**
 * Copy for the parts of the site every page shares: header, navigation,
 * footer, announcement bar, customer proof and error pages. Translations live
 * beside this file and must match its shape. Navigation labels come from
 * `src/config/site.ts`, so a change there also needs a translation. After
 * either changes, update each translation and run `pnpm i18n --stamp chrome`.
 */
export const en = {
  skipLink: "Skip to content",
  homeLabel: "Ailytics home",
  primaryNavLabel: "Primary navigation",
  footerNavLabel: "Footer navigation",
  mobileNav: {
    open: "Open navigation",
    close: "Close navigation",
    dialog: "Site navigation",
    nav: "Mobile navigation",
  },
  /** `{label}` is the dropdown group's name. */
  showGroup: "Show {label}",
  primaryAction: "Request a demo",
  /**
   * Translated labels for `siteConfig.navigation`. Groups are keyed by their
   * English label, links by href. English leaves both empty and uses the
   * navigation as written.
   */
  nav: {
    groups: {} as Record<string, { label: string; footer?: string }>,
    links: {} as Record<string, { label: string; description?: string }>,
  },
  description: siteConfig.description as string,
  footerGroups: {
    company: "Company",
    product: "Product",
    contact: "Contact",
  },
  footerLinks: {
    aboutUs: "About Us",
    partnerships: "Partner With Us",
    careers: "Careers",
    news: "News",
    useCases: "Use cases",
    industries: "Industries",
    projects: "Projects",
    blog: "Blog",
    demo: "Request a demo",
    privacy: "Privacy Policy",
    eula: "EULA",
  },
  rightsReserved: "All rights reserved.",
  /** `{profile}` is the social network, such as LinkedIn. */
  socialLabel: "Ailytics on {profile}",
  languageLabel: "Language",
  announcement: {
    short: "Ailytics raises US$7.4M Series A",
    medium:
      "Ailytics raises US$7.4M in an oversubscribed Series A led by Tin Men Capital",
    long: "Ailytics raises US$7.4M in an oversubscribed Series A led by Tin Men Capital to expand across APAC, the US and the Gulf",
    ctaShort: "Read more",
    ctaLong: "Read the announcement",
  },
  proof: {
    title: "Trusted on 400+ projects worldwide",
    customersLabel: "Customers",
    stats: [
      { value: "60–80%", label: "reduction in safety non-compliance" },
      {
        value: "50+",
        label: "configurable safety, security and productivity use cases",
      },
      { value: "<2 weeks", label: "to go live on the cameras you already own" },
    ],
  },
  notFound: {
    title: "Page not found",
    heading: "We could not find that page",
    body: "The link may be out of date, or the page may have moved. Try the homepage, or browse use cases and industries.",
    action: "Return home",
  },
  error: {
    heading: "Something went wrong on this page",
    body: "Please try again. If it keeps happening, go back to the homepage or contact the team.",
    action: "Try again",
  },
};

export type ChromeCopy = typeof en;
