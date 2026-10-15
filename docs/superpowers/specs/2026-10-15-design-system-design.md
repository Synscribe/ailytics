# Design system and guide

Date: 15 Oct 2026. Status: draft for review.

## Goal

Tidy the site's visual system so every page uses one small set of named styles, and show that system on one page that works as both our working reference and the client guide.

Success looks like this:

- Every heading, text size, colour, spacing step, button, card and radius on the public pages comes from a named token or a shared style. No one-off values outside feature visuals.
- `/dev/design-system` shows each part of the system with live examples and short rules. The client can be shown it as their guide.
- `DESIGN.md` holds the written rules and decisions. It replaces `docs/design/design-plan.md`.
- Pages look the same to a visitor, apart from small snaps to the nearest step that you approved.

## What we know today

- Tokens live in `src/app/globals.css` (colours, one radius, one card shadow). There is no type scale, spacing scale or section rhythm token.
- Drift: 36 different hex colours in components and CSS modules, 77 different `font-size` values across 29 CSS modules, 15 arbitrary Tailwind text sizes, and five radius sizes used side by side.
- `docs/design/design-plan.md` is partly out of date (it names Poppins; the site ships Switzer).
- `/dev` is gated by `VISUAL_REVIEW_ENABLED=true` in `src/app/dev/layout.tsx`. New routes under it inherit the gate.

## How we work through it

One section at a time, in this order:

1. Headings and text (display, H1 to H3, card titles, lead, body, small, labels, links in copy)
2. Colour (roles, text colours, surfaces, category colours)
3. Spacing and section rhythm (section padding, gaps between heading and content, container widths)
4. Buttons and links (primary, secondary, inline links, CTA rows)
5. Cards and surfaces (padding, radius, border, shadow, media frames)
6. Icons, motion and imagery (rules only, with examples)

For each section:

1. **Inventory.** I scan the code and list every variant in use, with the pages and files that use it.
2. **Show.** The section on `/dev/design-system` renders each variant with its real classes in a "Today" panel, next to a proposed scale.
3. **Decide.** You pick or adjust the rule. I record it in `DESIGN.md` with a one-line reason.
4. **Apply.** I add the tokens or shared styles and replace the old values across the site.
5. **Check.** Before and after screenshots of each affected page at desktop and mobile, `pnpm check`, `pnpm build`. You approve the screenshots.
6. **Clean up.** The "Today" panel for that section is removed. What stays is the guide section.

Tools: `ui-ux-pro-max` for its typography, spacing and accessibility guidelines when I propose each scale. `humanizer` on the guide copy and `DESIGN.md` before you review them.

## Where things live

| Thing              | Location                                                             | Notes                                                                                                                    |
| ------------------ | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Token values       | `src/app/globals.css` `:root` and `@theme`                           | Only source of values. Adds type, spacing and radius tokens.                                                             |
| Shared text styles | Tailwind `@utility` classes in `globals.css` (for example `text-h2`) | Each sets size, line height, tracking and weight together. No React heading component unless a second real need appears. |
| Written rules      | `DESIGN.md` at the repo root                                         | Replaces `docs/design/design-plan.md`. Keeps the decisions log.                                                          |
| Guide page         | `src/app/dev/design-system/page.tsx` plus `_components/`             | Gated by the existing `/dev` layout. Linked from `/dev`. Not in nav or sitemap.                                          |

Guide page layout (borrowed from Webflow's brand system, IBM Carbon, Salesforce Lightning and Apple HIG):

1. Intro: what Ailytics should feel like in three or four short rules, then links to each section.
2. One section per part: live examples, the rule in one or two lines, Do and Don't pairs, and an "In use" example taken from a real page.
3. Decisions log with dates.

No search and no code snippets per variant.

The guide page imports the real tokens, utilities and components (`Button`, `Card`, `Badge`, FAQ, camera wall). It never copies values, so it cannot drift from the site.

## Feature visuals

Micro UI visuals (`src/components/visuals`) recreate app screens and use their own small scale (10 to 12px text). That scale stays separate. In step 1 we name it as an "app UI" scale (about three sizes) so the visuals stop using 10, 10.5, 11 and 11.5px side by side. Their layouts and motion are out of scope.

## Out of scope

- New pages, nav hover menus, and refining individual feature visuals.
- The Avenir Next licence decision. The guide shows the face in use today.
- A token export for Figma or other tools.

## Risks

- A wide replace can shift layouts on pages we don't look at. The before and after screenshots cover every public route, not just the ones we expect to change.
