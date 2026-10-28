import { env } from "./env";

export type NavigationLink = {
  label: string;
  href: string;
};

/** A dropdown link, shown on desktop with a line and a photo. */
export type NavigationGroupLink = NavigationLink & {
  description: string;
  /** A photo from public/media, shown as a thumbnail. */
  image: string;
};

/**
 * A top-nav label that opens a dropdown of links. With `href`, the label also
 * navigates there and the dropdown opens on hover or from its chevron.
 */
export type NavigationGroup = {
  label: string;
  href?: string;
  links: NavigationGroupLink[];
  /** A link set apart at the foot of the desktop dropdown. */
  footer?: NavigationLink;
};

export type NavigationItem = NavigationLink | NavigationGroup;

const navigation: NavigationItem[] = [
  {
    label: "Company",
    links: [
      {
        label: "About us",
        href: "/about-us",
        description: "The team behind Ailytics",
        image: "/media/about/team-05-office.webp",
      },
      {
        label: "Partner with us",
        href: "/partnerships",
        description: "Sell, integrate or build with Ailytics",
        image: "/media/partnerships/photo-podium.webp",
      },
      {
        label: "Careers",
        href: "/careers",
        description: "Join the Ailytics team",
        image: "/media/careers/big-ideas-small-egos.webp",
      },
      {
        label: "News",
        href: "/blog?category=news",
        description: "Funding, awards and announcements",
        image: "/media/news/turning-five-our-2025-retrospective/cover.webp",
      },
    ],
  },
  {
    label: "Use cases",
    href: "/use-cases",
    links: [
      {
        label: "PPE detection",
        href: "/use-cases/ppe-detection",
        description: "Missing hard hats, vests and gloves",
        image: "/media/ailytics/stills/ppe-detection.jpg",
      },
      {
        label: "Pedestrian detection",
        href: "/use-cases/pedestrian-detection-system",
        description: "People too close to moving machinery",
        image: "/media/ailytics/stills/warehouse-forklift.jpg",
      },
      {
        label: "Suspended load safety",
        href: "/use-cases/suspended-load-safety",
        description: "Workers under crane loads",
        image: "/media/ailytics/stills/under-load-detection.jpg",
      },
      {
        label: "Open edge detection",
        href: "/use-cases/open-edge-detection",
        description: "Workers near unprotected edges",
        image: "/media/ailytics/stills/open-edge-shaft.jpg",
      },
    ],
    footer: { label: "See all use cases", href: "/use-cases" },
  },
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
