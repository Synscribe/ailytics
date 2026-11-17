---
name: translate-page
description: Translate a page of this website into another locale (Japanese first, later Taiwanese Chinese and Korean), or update a translation after its English copy changed. Use when asked to translate, localise or localize a page, add a page to /ja-jp, fix stale translations reported by `pnpm i18n --check`, or ship the next page on the localisation priority list.
---

# Translate a page

English is the source. A translation is a typed copy file beside the English one, a thin route under the locale folder, and an entry in the translation manifest. Claude writes the translation; the scripts track whether it is current.

## Read first

- `docs/localisation/README.md`: how localisation fits together and the page priority list.
- `docs/localisation/<locale>.md`: tone, glossary, keyword map and typography. Follow it exactly. If a term is missing from the glossary, choose one, use it consistently and add it.
- The On-page SEO and Brand voice sections of `AGENTS.md`.
- The English route, its `_copy/en.ts` if one exists, and every component it renders.

## Workflow

### 1. Check the state

Run `pnpm i18n`. It lists every translation, whether it is current, and any page missing from the manifest. For a stale entry, diff the English source since the entry's `updated` date (`git log -p --since=<date> -- <source>`) and translate only what changed.

### 2. Extract the English copy (first translation of a page only)

Move every visible string, `alt` text, `aria-label`, metadata field and FAQ entry for the page into `src/app/(en)/<route>/_copy/en.ts`, exported as `en`, with `export type <Page>Copy = typeof en`. Keep data that is not copy (image paths, hrefs, IDs, visual IDs, numbers) in the components.

- Key lists of items by ID with a typed `Record` when the items have IDs. Use arrays only for ordered lists, and add their lengths to `src/lib/i18n.test.ts`.
- Pass copy to client components as props. Do not import copy files into client components except as types.
- Text split word by word on the client must be split on the server with `segmentWords` from `src/lib/text-segments.ts`.
- Links inside the composition go through `localizedHref(locale, href)`.
- Move the page composition into `_components/<page>-page.tsx`, taking `copy` and `locale`. The English `page.tsx` becomes a thin wrapper, as in `src/app/(en)/(marketing)/page.tsx`.
- Confirm the English page renders identically before translating: same HTML text, same metadata.

### 3. Translate

Write `_copy/<locale>.ts`, exporting a constant typed as the English copy type (`export const jaJp: HomeCopy = { ... }`).

- Choose the primary keyword from the locale guide's keyword map before writing. Put it first in the metadata title, near the start of the description, at the start of the H1 and early in the opening paragraph.
- Translate meaning, not words. Rewrite English idioms and negative contrasts as direct statements.
- Keep every claim, number, product name and customer name exactly. Never add a claim the English does not make.
- Keep template placeholders such as `{metres}` unchanged.
- Read every heading aloud in the target language. Rewrite anything that sounds translated.

### 4. Publish the route

- Add `src/app/<prefix>/<route>/page.tsx` exporting `metadata` and rendering the shared composition with the translated copy. Put it inside a route group, such as `src/app/ja-jp/(home)/page.tsx`, when it would otherwise share a segment with the locale layout, so the ` | Ailytics` title suffix applies.
- Pass `locale` to `createPageMetadata` with the English `path`. Canonical and hreflang follow from the manifest.
- Add an entry to `src/config/translations.json` with `id`, `locale`, `path` (the English pathname), `source` and `target` files.
- Remove the page's legacy redirect from `JA_JP_PENDING_PATHS` in `src/config/redirects.ts`, and update its row in `docs/launch/url-map.csv`.
- If the shared chrome changed (navigation, footer, announcement), update `src/config/chrome-copy/<locale>.ts` too.

### 5. Stamp and verify

```bash
pnpm exec prettier --write <changed files>
pnpm i18n --stamp <id>           # after formatting; the hash covers the formatted source
pnpm check
pnpm build
```

Then start the app and check the translated page in agent-browser (run `agent-browser skills get core` first) at 1440px and 390px wide:

- `<html lang>` is the locale, the title has the ` | Ailytics` suffix, the canonical and hreflang links are present, and the English page lists the translation too;
- no English text remains outside product UI mockups, and no text overflows or breaks mid-word;
- word-by-word animations reveal the translated text, and the page still reads correctly with reduced motion.

Run `pnpm launch:audit --url http://localhost:3000 --mode template` for page work.

### 6. Report

Tell the user which page shipped, its primary keyword, anything left in English and why, and that the page is `machine` status until a native speaker reviews it. After review, the reviewer's fixes go into the copy file, then run `pnpm i18n --stamp <id> --reviewed`.

## Do not

- Do not add an i18n library, a message catalogue, a CMS or a translation API dependency.
- Do not create a locale URL for an untranslated page, or fill one with English.
- Do not translate legal pages (privacy policy, EULA) without client and counsel approval.
- Do not edit `docs/launch/checklist.md` directly.
