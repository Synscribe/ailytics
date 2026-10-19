import { env } from "./env";

export type NavigationLink = {
  label: string;
  href: string;
};

/** A top-nav label that opens a dropdown of links instead of navigating. */
export type NavigationGroup = {
  label: string;
  links: NavigationLink[];
};

export type NavigationItem = NavigationLink | NavigationGroup;

const navigation: NavigationItem[] = [
  {
    label: "Company",
    links: [
      { label: "About us", href: "/about-us" },
      { label: "Partner with us", href: "/partnerships" },
      { label: "Careers", href: "/careers" },
      { label: "News", href: "/news" },
    ],
  },
  { label: "Use cases", href: "/use-cases" },
  { label: "Industries", href: "/industries" },
  { label: "Blog", href: "/blog" },
];

export const siteConfig = Object.freeze({
  name: "Ailytics",
  description:
    "Ailytics adds AI video analytics to the CCTV you already own, detecting safety, security and productivity risks on construction sites, plants, ports and yards.",
  url: env.siteUrl,
  locale: "en-US",
  navigation,
  // Published profiles only; the footer omits the row when this is empty.
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/ailytics" },
  ] satisfies NavigationLink[],
});

export type SiteConfig = typeof siteConfig;
