export type RedirectRule = {
  source: string;
  destination: string;
  permanent: boolean;
};

/** The news articles migrated from the previous site, now served under /blog. */
const NEWS_ARCHIVE_SLUGS = [
  "ailytics-and-safie",
  "april-2026-business-times-feature",
  "industrial-video-intelligence-reimagined-ailytics-deploys-nvidia-cosmos-3-across-heavy-industry",
  "turning-five-our-2025-retrospective",
  "video-analytics-101-why-it-matters-how-to-pick-a-winner",
  "we-won-first-place-at-the-supernova-challenge",
  "winning-at-the-design-ai-and-tech-awards",
] as const;

/**
 * Legacy /ja-jp pages without a Japanese translation yet. They redirect
 * temporarily to English until translated. When a page ships in Japanese,
 * remove it here and list it in src/config/translations.json.
 */
const JA_JP_PENDING_PATHS = [
  "/about-us",
  "/use-cases",
  "/projects",
  "/partnerships",
  "/childsafe-vision",
  "/privacy-policy",
] as const;

/** Legacy /ja-jp pages that stay English, with their final English URL. */
const JA_JP_ENGLISH_ONLY: Record<string, string> = {
  "/ja-jp/careers": "/careers",
  "/ja-jp/eula": "/eula",
  "/ja-jp/news": "/blog?category=news",
  "/ja-jp/careers/enterprise-sales-director-anz":
    "/careers/founding-enterprise-account-executive-anz",
  "/ja-jp/careers/marketing-and-partnerships-executive":
    "/careers/marketing-and-partnerships-lead",
  ...Object.fromEntries(
    [
      "ai-systems-engineer",
      "branding-marketing-executive",
      "business-development-manager-india",
      "business-development-manager-middle-east",
      "junior-business-development-manager",
      "junior-product-manager",
      "qa-tester",
      "talent-acquisition-and-branding-executive",
    ].map((slug) => [`/ja-jp/careers/${slug}`, "/careers"]),
  ),
};

/**
 * Migration projects: add reviewed redirects here from docs/launch/url-map.csv.
 * Keep the destination final to avoid redirect chains.
 */
export const redirects: RedirectRule[] = [
  { source: "/news", destination: "/blog?category=news", permanent: true },
  ...NEWS_ARCHIVE_SLUGS.map((slug) => ({
    source: `/news/${slug}`,
    destination: `/blog/${slug}`,
    permanent: true,
  })),
  // Retired job postings, replaced by updated roles.
  {
    source: "/careers/enterprise-sales-director-anz",
    destination: "/careers/founding-enterprise-account-executive-anz",
    permanent: true,
  },
  {
    source: "/careers/marketing-and-partnerships-executive",
    destination: "/careers/marketing-and-partnerships-lead",
    permanent: true,
  },
  ...JA_JP_PENDING_PATHS.map((path) => ({
    source: `/ja-jp${path}`,
    destination: path,
    permanent: false,
  })),
  ...Object.entries(JA_JP_ENGLISH_ONLY).map(([source, destination]) => ({
    source,
    destination,
    permanent: true,
  })),
  ...NEWS_ARCHIVE_SLUGS.map((slug) => ({
    source: `/ja-jp/news/${slug}`,
    destination: `/blog/${slug}`,
    permanent: true,
  })),
  // Remaining legacy job posts keep the same slug in English.
  {
    source: "/ja-jp/careers/:slug",
    destination: "/careers/:slug",
    permanent: true,
  },
];
