# Design system: guide page and type section, implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the gated `/dev/design-system` page with its intro and section layout, and fill the type section with a "Today" panel and a proposed type scale for the user to decide on.

**Architecture:** One route under the existing gated `/dev` layout. Proposed type styles are Tailwind v4 theme tokens (`--text-<name>` with `--line-height`, `--letter-spacing` and `--font-weight` sub-properties) in `globals.css`, so each becomes a `text-<name>` utility and a CSS variable for modules. This plan adds the tokens but applies none of them to public pages. Applying them is the next plan, after the user decides.

**Tech Stack:** Next.js 16.3 App Router, React 19.2, Tailwind 4.2, Vitest 4, Switzer (local font).

**Spec:** `docs/superpowers/specs/2026-10-15-design-system-design.md`

## Global Constraints

- Branch `feat/design-system` (created from `main` at `1b2abb9`).
- `/dev/*` stays gated by `VISUAL_REVIEW_ENABLED=true` through `src/app/dev/layout.tsx`. No nav or sitemap entries.
- No public page changes pixels in this plan.
- Copy: plain English, sentence case, no em dashes, no all-caps tracked labels, no mono. Run `humanizer` on page copy.
- No new dependencies.
- Commit only with the user's OK.

## Review Focus

- Page without `VISUAL_REVIEW_ENABLED=true` returns 404 (covered by the existing layout and `visual-review.test.ts`; Task 1 adds a route-listing test).
- Mobile width 375px: specimens with 64px type must wrap, never scroll sideways (Task 3, visual check).
- Fluid sizes: each proposed token shows its mobile and desktop size, so the user is not judging only one width (Task 3).
- Today panel must match the live site: each variant names the file it came from (Task 2 data test).
- Adding `--text-*` tokens must not change any existing utility such as `text-sm` (Task 3: names avoid Tailwind defaults, checked by test).

---

### Task 1: Guide page shell

**Files:**

- Create: `src/app/dev/design-system/page.tsx`
- Create: `src/app/dev/design-system/_components/guide-section.tsx`
- Modify: `src/app/dev/page.tsx` (add third tool card)
- Test: `src/app/dev/design-system/_components/sections.test.ts`

**Interfaces:**

- Produces: `GUIDE_SECTIONS: readonly { id: string; title: string; summary: string }[]` from `_components/sections.ts`; `<GuideSection id title summary>{children}</GuideSection>`.

- [ ] Step 1: write `sections.test.ts` asserting `GUIDE_SECTIONS` ids are exactly `["type","colour","spacing","buttons","cards","icons-motion-imagery","decisions"]` and unique.
- [ ] Step 2: run `pnpm vitest run src/app/dev/design-system`, expect FAIL (module missing).
- [ ] Step 3: create `sections.ts` with those seven entries and one-line summaries; create `guide-section.tsx` (`<section id={id} className="scroll-mt-24 py-20">` with h2 and summary); create `page.tsx` with intro (four feel rules: light and calm, real footage first, one teal action colour, sentence case and plain words), a link list to each section, and a `GuideSection` per entry. Sections other than type show "Coming next".
- [ ] Step 4: add the "Design system" card to `tools` in `src/app/dev/page.tsx` (`href: "/dev/design-system"`, `PaletteIcon`).
- [ ] Step 5: run the test, expect PASS. Run `VISUAL_REVIEW_ENABLED=true pnpm dev` and open `/dev/design-system`; without the variable it 404s.

### Task 2: Type "Today" panel

**Files:**

- Create: `src/app/dev/design-system/_data/type-today.ts`
- Create: `src/app/dev/design-system/_components/type-today.tsx`
- Test: `src/app/dev/design-system/_data/type-today.test.ts`

**Interfaces:**

- Produces: `TYPE_TODAY: { role: TypeRole; label: string; style: React.CSSProperties; sample: string; usedIn: string[] }[]` with `TypeRole = "display" | "h1" | "h2" | "h3" | "title" | "lead" | "body" | "small" | "label"`.

Data comes from the 15 Oct inventory (scratchpad `type-inventory.mjs`). One row per distinct style, grouped by role:

| Role    | Variants today (size, weight)                                                                                                                                | Files                                                                                                                              |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| display | clamp(40,5.6vw,68) w300; clamp(40,5vw,64) w300                                                                                                               | `home.module.css .heroHeadline`, `problem-story.module.css .intro h1`                                                              |
| h1      | clamp(40,5vw,60) w300; clamp(36,4vw,52); clamp(36,3.4vw,52); clamp(32,3.6vw,48)                                                                              | `globals.css .brand-h1`, `careers/[slug]`, `legal-document`, `blog/[slug]`, `news/[slug]`                                          |
| h2      | clamp(32,4vw,44) w300; clamp(30,3.2vw,40) w300; clamp(32,4vw,48); clamp(28,3vw,40); clamp(30,3vw,42); clamp(32,3.5vw,48); clamp(32,3.6vw,48); 30px; text-2xl | `home .h2`, `.brand-h2`, `problem-story .heading h2` (3), `construction-camera-story .copy h2`, `home .storyTitle`, `blog/page`    |
| h3      | clamp(24,2.6vw,36) w500; clamp(28,2.7vw,40) w500; clamp(24,2.4vw,30) w500; clamp(20,2vw,24) w500; text-3xl w500; 24px; 21px; clamp(19,1.65vw,23); 19px       | `home .pstate .payoff .ftext h3 .caseCard h3`, `content-page`, `problem-story .row h3`, `scroll-sequence .step h3`, `careers/page` |
| title   | 18px w500; text-lg; text-xl; 20px; 17px w500                                                                                                                 | `home .captions h3 .industryCard h3`, `content-hub`, `partnerships`, `customer-proof .proofTitle`, `faq-accordion .item h3`        |
| lead    | 17px; 18px; 16px                                                                                                                                             | `.brand-lead`, `home .lead .heroLead`, `careers/[slug]`                                                                            |
| body    | 15px; 15.2px; 15.5px; 16px                                                                                                                                   | `home .captions p .industryCard p`, `faq-accordion .answer p`, `problem-story .row p`, prose modules                               |
| small   | 14px; 13px; 12.5px; 12px                                                                                                                                     | `text-sm` (46 uses), `home .legend .alertCam`, `construction-camera-story .status`                                                 |
| label   | 11px; 11.5px; 12px; 10px                                                                                                                                     | `home .camLabel .hint`, `problem-story .cameraLabel`, `site-camera-wall .cameraGrid b`                                             |

- [ ] Step 1: write `type-today.test.ts`: every row has a non-empty `usedIn`, every `usedIn` path exists on disk (`fs.existsSync(path.join("src", p))`), every role in `TypeRole` has at least one row.
- [ ] Step 2: run it, expect FAIL.
- [ ] Step 3: write the data file from the table (style objects use the literal values, e.g. `{ fontSize: "clamp(2.5rem, 5.6vw, 4.25rem)", fontWeight: 300, lineHeight: 1.04, letterSpacing: "-0.035em" }`); write `type-today.tsx` rendering rows grouped by role, each showing the sample at its real style, the size and weight in plain words, and the files.
- [ ] Step 4: run the test, expect PASS. Check the page at 1440px and 375px.

### Task 3: Proposed type scale

**Files:**

- Modify: `src/app/globals.css` (`@theme inline` block: add tokens)
- Create: `src/app/dev/design-system/_components/type-scale.tsx`
- Test: `src/app/dev/design-system/_components/type-scale.test.ts`

**Interfaces:**

- Consumes: `TypeRole`, `TYPE_TODAY` from Task 2.
- Produces: utilities `text-display text-h1 text-h2 text-h3 text-title text-lead text-body text-small text-label` and app UI utilities `text-ui-xs text-ui-sm text-ui-md` (visuals only). CSS variables `--text-<name>` for modules.

Proposed values (mobile → desktop). Heading weight moves from 300 to 500 after the user found the hero too light (15 Oct, reference heronaiapp.com: 700, all caps, ~90px):

```css
--text-display: clamp(2.5rem, 5.4vw, 4rem); /* 40 → 64 */
--text-display--line-height: 1.04;
--text-display--letter-spacing: -0.035em;
--text-display--font-weight: 500;
--text-h1: clamp(2.25rem, 4.4vw, 3.5rem); /* 36 → 56 */
--text-h1--line-height: 1.06;
--text-h1--letter-spacing: -0.035em;
--text-h1--font-weight: 500;
--text-h2: clamp(1.875rem, 3.4vw, 2.75rem); /* 30 → 44 */
--text-h2--line-height: 1.1;
--text-h2--letter-spacing: -0.03em;
--text-h2--font-weight: 500;
--text-h3: clamp(1.375rem, 2.2vw, 1.75rem); /* 22 → 28 */
--text-h3--line-height: 1.2;
--text-h3--letter-spacing: -0.02em;
--text-h3--font-weight: 500;
--text-title: clamp(1.125rem, 1.4vw, 1.25rem); /* 18 → 20 */
--text-title--line-height: 1.3;
--text-title--letter-spacing: -0.01em;
--text-title--font-weight: 500;
--text-lead: 1.0625rem; /* 17 */
--text-lead--line-height: 1.65;
--text-body: 1rem; /* 16 */
--text-body--line-height: 1.6;
--text-small: 0.875rem; /* 14 */
--text-small--line-height: 1.5;
--text-label: 0.8125rem; /* 13 */
--text-label--line-height: 1.3;
--text-label--font-weight: 500;
--text-ui-xs: 0.6875rem; /* 11, visuals only */
--text-ui-xs--line-height: 1.25;
--text-ui-sm: 0.75rem; /* 12, visuals only */
--text-ui-sm--line-height: 1.3;
--text-ui-md: 0.8125rem; /* 13, visuals only */
--text-ui-md--line-height: 1.35;
```

- [ ] Step 1: write `type-scale.test.ts` reading `src/app/globals.css`: every proposed name is declared once; no name collides with Tailwind defaults (`xs sm base lg xl 2xl…9xl`).
- [ ] Step 2: run it, expect FAIL.
- [ ] Step 3: add the tokens to `@theme inline`. Check with `ui-ux-pro-max` (`"typography scale marketing heading line height" --domain typography`, `"minimum text size readability" --domain ux`) and note any conflict on the page.
- [ ] Step 4: write `type-scale.tsx`: one row per token with the sample at the token, its mobile and desktop size, weight, where it is used, and which Today variants it replaces (from `TYPE_TODAY` by role). Put Today and Proposed side by side on desktop, stacked on mobile.
- [ ] Step 4b: add a weight comparison row: display and h2 samples at 300, 400, 500 and 600, labelled in plain words.
- [ ] Step 5: run the test, `pnpm check`, `pnpm build`. Screenshot `/dev/design-system#type` at 1440 and 375 with agent-browser.
- [ ] Step 6: present the screenshots and the open questions to the user and stop. Open questions: which heading weight (300 to 600, or add Switzer 700); do card titles stay 500 or go to 600 (memory says semibold for named things, code ships 500); is 64px right for the hero.

## Next plan (after the decision)

Apply the chosen scale: replace each Today variant with its token across pages and modules, before and after screenshots of every public route, write the type section of `DESIGN.md`, remove the Today panel.
