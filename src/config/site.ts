import { env } from "./env";

export type NavigationItem = {
  label: string;
  href: string;
};

export const siteConfig = Object.freeze({
  name: "Ailytics",
  description:
    "Ailytics adds AI video analytics to the CCTV you already own, detecting safety, security and productivity risks on construction sites, plants, ports and yards.",
  url: env.siteUrl,
  locale: "en-US",
  navigation: [
    { label: "Use cases", href: "/use-cases" },
    { label: "Industries", href: "/industries" },
    { label: "Blog", href: "/blog" },
  ] satisfies NavigationItem[],
  // Published profiles only; the footer omits the row when this is empty.
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/ailytics" },
  ] satisfies NavigationItem[],
});

export type SiteConfig = typeof siteConfig;
