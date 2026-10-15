# Ailytics site structure (SEO)

Proposed information architecture for the rebuild. Built from:

- the onboarding call (`docs/research/ailytics/onboarding-call-2026-10-12.md`)
- the product and proof notes (`docs/research/ailytics/product-and-proof.md`)
- competitor teardowns: `docs/research/competitors/intenseye.md` and `docs/research/competitors/viact.md`

The URL map (`docs/launch/url-map.csv`) decides where each old URL redirects. Update it once this structure is approved.

## Navigation (agreed 13 Oct, internal meeting)

Main nav:

1. **Use cases** (URL `/use-cases`): hub plus dropdown grouped by Safety, Security, Productivity
2. **Industries**: dropdown split into two groups. Working labels: "Core industries" (tier 1) and "Other industries" (tier 2, alternative label "Emerging verticals")
3. **Blog**: blog posts and news. News keeps its own listing under the blog section
4. **Case studies**: own page
5. **Request a demo**: button, replaces Contact

Footer: About us, Careers, Partner with us, Projects, legal pages.

- The current Projects page becomes a looping customer-logo strip on the homepage. The `/projects` page stays, linked from the footer only.
- About-us content (offices, partners, numbers) also feeds homepage sections.
- Case studies stay out of the homepage until approved case-study content is ready.
- Industry pages link to their use cases; use-case pages cross-link each other. This is the core link structure.

Build order:

1. Homepage scaffold
2. One sample industry page: **construction**
3. One sample use-case page (teammate picks which one)

The teammate supplies page content as JSON per page; this side builds the pages.

Open: where the demo videos go on each template; customer logos are not in the client asset pack, so they need to come from the live site or the client.

## What we take from each competitor

| From      | Keep                                                                                                                                                                               | Avoid                                                                                                                                                 |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Intenseye | Clean technical basics, FAQ schema on every commercial template, keyword-first detection-category titles, industry pages that list OSHA standards, trust/security page, `llms.txt` | No page per detection, no industries hub, near-identical industry H1s, 4 pages fighting over "AI workplace safety", thin event and whitepaper pages   |
| viAct     | One page per detection module, industry template that links to every relevant module, numbers-first case study titles, glossary, question-style H2s and FAQ in guides              | 41 copy-paste country pages, 92 noindexed blog categories, 2 to 4 pages per keyword, 195-character titles, self-awarded star ratings, broken demo CTA |

Neither has: a page per detection **and** a matching industry × hazard link graph, integrations (camera and video management system brands), comparison pages, a real US/OSHA angle, or proper localisation with hreflang. These are the gaps to take.

## Rules that keep the structure clean

1. **One keyword, one page.** Every page owns one primary keyword in the keyword map below. A blog post never targets a keyword a use-case page owns; it links to that page instead.
2. **Three hubs, many spokes.** Use cases, industries and blog each have a hub page that links to every child. Every child links back up and sideways.
3. **Industry × use case links both ways.** Each industry page links to its 6 to 10 most relevant use cases. Each use-case page links to the industries where it matters. This is the link graph neither competitor has.
4. **No thin pages in the index.** Pages under about 300 words of original text (events, gated downloads, tag pages, job filters) are `noindex` or not built.
5. **Flat, readable URLs.** Two levels deep at most. No dates, no `/post/`, no IDs.
6. **Breadcrumbs on every page below the homepage**, visible and marked up as BreadcrumbList.
7. **Default locale is US English.** Other locales live in subfolders with hreflang (see Localisation).

## URL tree

Items marked **(launch)** are needed for 26 Oct. Everything else follows in the content roadmap.

```
/                                   (launch) AI video analytics for heavy industry
/platform                           (launch, linked from homepage and use cases, not in main nav) Ailyssa: Safety, Security, Productivity on existing cameras
/platform/ask-your-cameras          (launch) AilyssaX VLM: SceneTrace search, AI Inspector, Insight Vault
/platform/3d-distance               (launch) Single-camera 2D to 3D distance
/platform/edge-and-deployment       How it runs: edge box, cloud, existing CCTV, setup in under 2 weeks
/platform/integrations              Camera and VMS brands, EHS platforms, alert channels
/platform/integrations/[brand]      Later: one page per major VMS or camera brand (Milestone, Genetec, Hikvision...)

/use-cases                          (launch) Hub: 50+ use cases grouped by Safety / Security / Productivity
/use-cases/[slug]                   (launch: top 10, then all) One page per detection
    e.g. machinery-proximity, open-edge-detection, under-suspended-load, ppe-detection,
         smoke-and-fire-detection, vehicle-reversing, exclusion-zone, slip-trip-fall,
         ergonomics, loitering, wrong-way-detection, license-plate-recognition, idle-machinery

/industries                         (launch) Hub: tier 1 industries
/industries/[tier-1]                (launch: construction, manufacturing, oil-and-gas, logistics-and-warehousing,
                                     ports-and-maritime; then airports, mining, energy-and-utilities, data-centers)
/industries/[tier-2]                Later, not in main nav: education, healthcare, elderly-care, childcare,
                                     correctional-facilities, dormitories
/childsafe-vision                   (launch) Old slug kept; listed under "Other industries" on the hub

/case-studies                       (launch) Hub: case studies filtered by industry
/case-studies/[slug]                (launch: the approved case studies) Numbers-first titles

/blog                               (launch) Hub for articles and news
/blog/[slug]                        Articles answering informational searches, each linking to one money page
                                     (the 3 current root-level articles 301 here)
/news                               (launch) News listing, linked from the blog section
/news/[slug]                        Keep existing URLs
/guides/[slug]                      Later: long pillar guides (e.g. OSHA construction camera monitoring guide)
/glossary/[term]                    Later: only where the term has real search volume

/request-a-demo                     (launch) Demo form, the main CTA everywhere

Footer only:
/about                              (launch) Company, offices, team
/careers                            (launch) Single page; job posts noindex unless JobPosting schema is added
/partnerships                       (launch) Partner with us (keep current URL)
/projects                           (launch) Global projects (keep current URL); its logos feed the homepage strip
/security                           (launch) Trust center: ISO 27001, SOC 2 status, data handling, privacy by design
/compare/[competitor]               Later: "Ailytics vs X" and "X alternatives" (Intenseye, viAct, Protex AI, Spot AI)

/us/weapon-detection                US only: gun detection landing pages. Not linked from homepage or main nav
/us/weapon-detection/[industry]     Later: per industry, excluding schools unless the client approves

/ja/...  /zh-tw/...  /ko/...        Month 3 onward: translated copies of the launch pages
/privacy-policy-policy  /eula  /eula      Legal
/llms.txt                           Plain-text summary for AI search tools
```

Not built: pricing (client never publishes pricing), events, gated e-book landing pages, tag and author archives, retail or F&B anything.

## Keyword map (owner pages)

| Primary keyword                                                              | Owner page                         |
| ---------------------------------------------------------------------------- | ---------------------------------- |
| AI video analytics (for construction / industrial safety)                    | `/`                                |
| AI video analytics platform                                                  | `/platform`                        |
| AI camera search / talk to your cameras / vision language model safety       | `/platform/ask-your-cameras`       |
| [industry] safety AI / AI video analytics for [industry]                     | `/industries/[industry]`           |
| [hazard] detection (e.g. machinery proximity detection, open edge detection) | `/use-cases/[slug]`                |
| AI safety monitoring use cases                                               | `/use-cases`                       |
| [brand] video analytics integration                                          | `/platform/integrations/[brand]`   |
| [competitor] alternative / Ailytics vs [competitor]                          | `/compare/[competitor]`            |
| gun detection camera / AI weapon detection                                   | `/us/weapon-detection`             |
| how to / what is (informational)                                             | `/blog/[slug]` or `/guides/[slug]` |

Keywords are placeholders until volume research is done. Fill in the real numbers before writing each page.

## Page templates

### Use case page (`/use-cases/[slug]`)

The highest-value template. Neither competitor does this well with real proof.

- Title: `[Hazard] Detection with AI Cameras | Ailytics` (50 to 60 characters)
- H1: `[Hazard] detection` + the result, e.g. "Machinery proximity detection that warns before contact"
- Hero: 30 to 65 words, short looping clip or hairline figure of the scene
- What it detects (with the double-frame detection visual)
- How it works: camera angle, height and range from the use-case guide, alert flow
- Settings you control: grace period, cooldown, zones (from the use-case guide)
- Where it matters: links to 3 to 6 industry pages
- Proof: a case-study stat if one applies, otherwise none
- Related use cases (same category)
- FAQ (4 to 6 questions, FAQPage schema)
- CTA: Book a demo
- Schema: BreadcrumbList, FAQPage, VideoObject if a clip is embedded

### Industry page (`/industries/[slug]`)

Modelled on viAct's industry page, with Intenseye's regulation section.

- Title: `AI Video Analytics for [Industry] Safety | Ailytics`
- H1: distinct per industry, keyword first, e.g. "Construction site safety AI that works with your existing CCTV"
- The industry's top hazards, each linking to its use-case page
- Regulations that apply (OSHA standards for US, HSE for UK, Safe Work Australia for AU)
- How it fits the site: existing cameras, outdoor, low light, multi-site overview
- Proof from that industry (case study, logos)
- Integrations commonly used in that industry
- FAQ with FAQPage schema
- CTA: Book a demo

### Case study (`/customers/[slug]`)

- Title leads with the result: `[Customer] cut [hazard] by [N]% with Ailytics`
- Challenge, solution (use cases used, cameras, timeframe), results
- Links to the industry page and every use-case page used
- Different "more stories" per page (same industry first)
- Only approved, consistent numbers (see the stat conflicts in `product-and-proof.md`)

### Blog post / guide

- Answers one question. Question-style H2s, short TLDR at the top, FAQ at the end
- Named author with a short bio (Person schema), published and updated dates
- Links to the one money page that owns the related keyword

## Technical requirements

- One H1 per page, self-referencing canonical, unique title and description on every page
- Titles 50 to 60 characters, descriptions 140 to 160 characters, keyword first (per `AGENTS.md`)
- Schema: Organization + WebSite on home, BreadcrumbList everywhere below home, FAQPage on commercial templates, VideoObject for embedded clips, Article + Person on blog posts. No self-awarded ratings
- XML sitemap of indexable pages only; robots.txt allows AI crawlers; `llms.txt` at the root
- 301 every old URL per `url-map.csv`; no redirect chains
- Image alt text that describes the scene (the current site has "Brnad Logo")
- Video clips with posters, lazy-loaded, captions where there is speech

## Localisation

- Subfolders: `/ja/`, `/zh-tw/`, `/ko/` (month 3 onward, in that order). UK and AU stay on the English site at launch; add `/en-gb/` or `/en-au/` only if the copy differs (spelling, regulations)
- hreflang on every translated page plus `x-default` pointing to US English
- Each locale gets real translated titles and descriptions. The current `/ja-jp` pages have English titles and machine-translated bodies; they should not be kept as-is
- No country-swap pages like viAct's 41 near-identical pages. A country page is built only if it has local proof, local regulations and local partners

## Open decisions for the client

- Approve the tier 1 industries for launch (proposed 5 above, the rest after launch)
- Which use cases launch first (proposed: the top 3 used plus 7 more with demo clips)
- Is gun detection under `/us/` acceptable, and are schools excluded
- Which case-study numbers are final (camera counts conflict across sources)
- Publish integrations by brand name? Needs a confirmed compatibility list
- Comparison pages: is the client comfortable naming competitors
