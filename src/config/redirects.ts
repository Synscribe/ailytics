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
];
