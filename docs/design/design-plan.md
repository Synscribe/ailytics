# Ailytics site design plan

Status: draft for review, 13 Oct 2026. Product truth lives in `PRODUCT.md`. This plan sets the visual system and page templates before more pages are built. When the first full pages are built and reviewed, impeccable's documenter turns the built system into `DESIGN.md` (with `.impeccable/design.json`); until then this file is the reference.

Direction is pinned by the user: the light "Homepage B" board on the design canvas, refined through review on 13 Oct (see the decisions log at the end).

## How each skill is used

| Stage            | Skill                                                         | Job                                                                                                                                      |
| ---------------- | ------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Product record   | impeccable `init`                                             | `PRODUCT.md` (done)                                                                                                                      |
| Page strategy    | impeccable surface briefs                                     | One direction contract per template (home, use case, industry), stored with `impeccable surface-brief`                                   |
| Build guardrails | design-taste-frontend                                         | Dials and the pre-flight checklist (no em dashes, one accent, one radius system, no eyebrow spam, no 3+ zigzags, CTA labels on one line) |
| Feature visuals  | micro-ui                                                      | One visual per feature id, through the visual registry                                                                                   |
| Line figures     | hairline-create                                               | Explainer figures where no client footage exists (for example camera to 3D ground plane)                                                 |
| Refinement       | impeccable `critique`, `audit`, `polish`, `typeset`, `layout` | Per page, after it is built                                                                                                              |
| Live tweaks      | impeccable `live`                                             | Adjust spacing and layout in the browser instead of describing changes                                                                   |
| Quality gate     | impeccable `detect`, finish reviewer; Playwright (to add)     | Mechanical slop checks, then a fresh review; browser tests for forms, mobile and keyboard                                                |
| System record    | impeccable documenter                                         | Writes `DESIGN.md` from the built pages                                                                                                  |

Not used: the image-generation skills (`imagegen-*`, `image-to-code`, `brandkit`) because this environment has no image generator; `stitch-design-taste` because impeccable owns `DESIGN.md`; `gpt-taste`, `industrial-brutalist-ui` and `minimalist-ui` because their aesthetics conflict with the pinned direction. One taste system at a time: design-taste-frontend for guardrails, impeccable for direction and review.

Build path: code-led (no image generation available).

## Taste dials

Persuade surfaces (marketing pages). Trust-first B2B for industrial buyers:

- Design variance 5: mostly calm and centred, with one asymmetric moment per page.
- Motion intensity 5: one signature motion per page, plus quiet reveals.
- Visual density 4: generous space, real footage, short copy.

## Visual system

### Theme

Light only, locked for every page. No dark sections. Darkness appears only inside camera footage and media frames. (A slate-panel version was rejected as "very ugly"; a fully dark site read as cold surveillance.)

### Colour roles

| Token     | Value   | Role                                                                                                           |
| --------- | ------- | -------------------------------------------------------------------------------------------------------------- |
| canvas    | #F9FBFD | Page ground (brand background)                                                                                 |
| paper     | #FFFFFF | Cards and media frames                                                                                         |
| ink       | #27405D | Headings and body text (brand slate)                                                                           |
| ink-muted | #52667D | Secondary text                                                                                                 |
| ink-faint | #7D8C9E | Icons and disabled states only, never body text                                                                |
| signal    | #34C1C4 | Primary buttons, focus rings, active states, detection frames. Never as text on light grounds (fails contrast) |
| mint      | #AEE6E7 | Soft accent fills, hover                                                                                       |
| alert     | #FF7A59 | Hazard detections and safety alerts only                                                                       |
| caution   | #FBC02D | Security events and warnings only                                                                              |

Brand gradient (teal to slate at 45 degrees) appears once per page: the closing call-to-action banner. Category colours on detections: Safety = alert, Security = caution, Productivity = signal.

### Type

- Face: Avenir Next (brand primary; needs a web licence for production). Poppins is the approved free fallback and is loaded today.
- Scale (desktop): display 64, h1 56, h2 44, h3 24, card title 20, lead 18, body 16, small 14, label 13.
- Weights: display and h1/h2 at medium (500) with tight tracking; card titles, labels, buttons, nav and anything that names a thing at semibold (600); body at regular.
- Sentence case everywhere. No monospace and no small all-caps tracked labels. At most one eyebrow per three sections.
- Headings balance their lines and paragraphs avoid orphans (`text-wrap: balance` and `pretty`).

### Shape and surfaces

- One radius rule: cards and media frames 16px (inner media 10px), buttons and chips full pill, inputs 12px.
- One card style: white, 1px slate border at 10%, soft slate-tinted shadow. Padding 24 (compact) or 32. Cards in a row share one height.
- No hairline rules between list rows or stats. Separate with space or a surface change.
- Brand motif: the logo's two offset squares become the detection frame (teal front square, slate square offset behind). Used on highlighted detections and the hero camera wall, nowhere decorative.

### Imagery

- Only client footage and screens. Light, neutral grading (no dark or grayscale grading). Burned-in timestamps on older clips are acceptable.
- Never show the gun-incident footage. Avoid legible faces, number plates and client codes.
- Product UI shown as rebuilt micro UIs (micro-ui) when the original screens look dated.

### Motion grammar (framer-motion)

- One signature motion per page; everything else is a quiet entrance (opacity and a small rise, once).
- Home signature: the camera wall catching hazards on its own (tile lights up in colour with the double-square frame, live alert line updates).
- How it works: one camera frame separating into layers (footage, detections, 3D ground plane, alert) as you scroll.
- Feature list: the active item darkens and the visual swaps (Cerebrium pattern).
- Statement lines fill from grey to ink as they enter (Riotters pattern), used once.
- Logo strip: the only marquee on the page.
- Everything respects reduced motion and is fully visible without JavaScript. No scroll listeners: `whileInView` or `useScroll` only.

### Icons

lucide-react, already in the project, stroke 1.75. One family only.

## Page templates

Each template uses at least four different layout families, with no three image-and-text splits in a row.

### Home

1. Hero: centred headline, subhead, two buttons, live alert line with Safety / Security / Productivity switch, tilted camera wall (signature).
2. Logos (marquee, colour) and three results.
3. The problem: one statement line (grey-to-ink fill).
4. How it works: camera frame splitting into layers.
5. Features: five-item list with swapping visual (2D to 3D, harsh conditions, ask your cameras, every site in one place, set up your way).
6. Use cases: eight clip tiles, "See all 50+ use cases" at the end of the title row.
7. Industries: core industries as photo cards, "See all industries".
8. Case studies: two result cards.
9. Security and privacy: four trust items with icons.
10. FAQ: accordion.
11. Closing banner (brand gradient), then footer.

### Use cases hub (`/uses`) and industries hub (`/industries`)

- Hero with the hub's search purpose, then category tabs (use cases: Safety, Security, Productivity, Progress; industries: Core, Other).
- Card grid with one visual per item. Other industries sit in their own section below core ones.

### Use case and industry pages (`/uses/{slug}`, `/industries/{slug}`)

Hero with breadcrumb and client media, problems (three cards), solution and how it works, features grouped by category (each feature has its own visual), value props, related pages (industry links to its use cases and back), FAQ, closing banner. Content comes from JSON in `src/content/pages/`.

### Still to design

Case studies hub and detail, blog index and article, request-a-demo page (form with the pre-demo questions: cameras, sites, data residency), about, security (trust centre), US gun-detection landing pages (separate, never linked from the homepage).

## Build order

1. Rebrand (done) and brand tokens in `globals.css`.
2. Feature visuals for construction and PPE detection (in progress).
3. Dynamic `/industries/{slug}` and `/uses/{slug}`, both hubs, remove the template sample pages.
4. Homepage from the scaffold, with the signature motions.
5. Request a demo page.
6. Impeccable finish review on home and one detail page, then the documenter writes `DESIGN.md`.

## Open decisions

- Avenir Next web licence, or ship Poppins.
- Which product names appear publicly (Ailyssa, AilyssaX, SceneTrace).
- Case-study naming and quotes (client approval).

## Decisions log (13 Oct)

- Light, on brand. A fully dark version felt cold; the slate-panel mix was rejected.
- Centred hero; the left/right split hero was rejected.
- Remove mono labels, all-caps eyebrows and hairline rules; they read as AI-made.
- Keep the camera wall with live alert line and category labels.
- Consistent cards and padding; semibold where something is named.
- Coloured customer logos in a loop, under the fold, with stats.
- Features condensed into one section; harsh-conditions accuracy added as a fifth feature.
- Industries: ports and airports combined; data centres added.
- Homepage results: logo loop, then three numbers.
- Homepage problem: one problem with the camera wall (2 of 12 cameras watched, hazards missed), then the payoff (every camera watched). Statement fills in on scroll, then the visual rises in when its turn comes. Prototype: https://claude.ai/artifact/9X1JmRbdGoHR16yrpXazsA
- How it works: pinned 2D to 3D scroll story on a real site photo (one camera, detect people and load, depth, drop zone, real distance). The picture grows to full width and fades into the page; one caption at a time above it.
- No progress dashes or step counters in scroll scenes.
- Homepage hero: A, the camera wall (tilted wall of real cameras, one lights up with a hazard every few seconds, live alert line above).
- Homepage features: stacking cards (each feature card settles at the top and the next slides over it), with the optional hover and drag extras inside each visual. Prototype: https://claude.ai/artifact/WXrKBL9Rdht7yKunK4ZbFR (option I).
- Homepage industries: industry and hazard pill cloud (links to industry and use case pages) replaces both the industry cards and the use-case tiles. Platform capabilities grid (6 items) follows it.
- Reversed: the pill cloud is dropped. Homepage industries go back to industry cards (6 core industries, name plus hazards line, 3x2), then "See all industries".
- Homepage use cases are back as their own section after the features: Safety / Security / Productivity tabs over tiles with each use case's own micro UI (6/3/3). Without JavaScript all three groups show. PPE links to its page; the rest go to /uses until their pages exist.
- Homepage gets two light mid-page CTA rows (after How it works, after case studies), not more banners.
- Hero Safety / Security / Productivity switch is clickable. A pick holds the wall on that category until it is clicked again or left alone for 12 s.
- How it works (desktop): the intro scrolls away, then the photo fills the pinned viewport at 16:10, is never cropped, and the step caption sits on it as a card top-left. Greyed side feeds (Cam 12, 13, 15, 16) show the camera wall at the start, then slide out.
- Homepage copy uses buyer language (EHS, exclusion zones, near misses, compliance reporting, cameras you already own). Term list: docs/research/ailytics/homepage-terms.md.
- Internal links inside feature copy are inline anchor text on the matching words, with a quiet underline. No separate "See X →" link under the highlights.
- Detail-page heroes use a page-specific camera visual on a clear, well-lit still: `ppe-hero` (each worker checked item by item) and `construction-hero` (one entrance camera checks PPE, excavator distance and the gate). Faces, company names and phone numbers are blurred.
- Later: "Use cases" and "Industries" in the nav open hover menus with icon, name and one-line description for each (reference: Wonderchat and Cyber Sierra menus). Not built yet.
- Later: refine each feature id's micro UI.
- Use case and industry pages follow the reglyr.com/uses structure: centred hero, centred problems, solution heading then features as alternating rows, how it works, value props, related, FAQ, closing banner. Hubs: title, intro, grouped sections of compact text cards.
