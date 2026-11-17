# Localisation

The site is published in US English at the root and in Japanese under `/ja-jp`. Taiwan (`/zh-tw`) and Korea (`/ko-kr`) follow the same pattern later. Each locale only carries the pages that have been translated. A missing translation is a missing page, so visitors never land on English text under a Japanese URL.

## How it fits together

| Part                     | Where                                                     | What it does                                                                                                                             |
| ------------------------ | --------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Locale settings          | `src/lib/i18n.ts`                                         | Locale list, URL prefixes, `<html lang>`, hreflang values, path helpers                                                                  |
| Translation manifest     | `src/config/translations.json`                            | Every translated page and shared copy file, with a hash of the English source and its review status. Pages listed here get hreflang tags |
| Root layouts             | `src/app/(en)/layout.tsx`, `src/app/ja-jp/layout.tsx`     | One per locale, both rendering `src/components/site-shell.tsx`                                                                           |
| Shared copy              | `src/config/chrome-copy/<locale>.ts`                      | Header, navigation labels, footer, announcement bar, customer proof, error pages                                                         |
| Page copy                | `src/app/(en)/<route>/_copy/<locale>.ts`                  | All copy for one page, typed against the English file                                                                                    |
| Locale route             | `src/app/ja-jp/<route>/page.tsx`                          | A thin page that renders the English route's composition with Japanese copy                                                              |
| Legacy `/ja-jp` redirect | `src/config/redirects.ts`                                 | Old Japanese URLs go to English until their page is translated                                                                           |
| Staleness check          | `scripts/i18n.ts` (`pnpm i18n`, runs inside `pnpm check`) | Fails when English copy changes after translation, or a locale page is missing from the manifest                                         |
| Translation workflow     | `.agents/skills/translate-page/SKILL.md`                  | The steps Claude Code follows to translate a page                                                                                        |
| Locale guide             | `docs/localisation/ja-jp.md`                              | Tone, glossary, keyword map and typography notes for Japanese                                                                            |

English stays the source. Change English copy first, then update each translation and run `pnpm i18n --stamp <id>`.

What happens automatically for a page listed in the manifest:

- `createPageMetadata` adds a self-referencing canonical and hreflang alternates (`en`, `ja`, `x-default` pointing to English).
- The sitemap lists the translated URL with its alternates.
- Shared navigation links point to the translated page; untranslated pages keep linking to English.
- The language switcher in the header and footer links to the same page in the other language, or to that language's homepage.

## Page priority for Japanese

| Tier          | Pages                                                                                                                                                                                                           | Why                                                                                                                               |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Done          | Homepage (`/ja-jp`), shared header, navigation and footer                                                                                                                                                       | First page Japanese visitors land on                                                                                              |
| 1             | `/contact` (and form labels, errors and confirmation), `/use-cases`, `/use-cases/ppe-detection`, `/use-cases/pedestrian-detection-system`, `/use-cases/suspended-load-safety`, `/use-cases/open-edge-detection` | Every call to action ends at `/contact`. These use cases carry the most Japanese search demand (保護具, 重機接近, 吊り荷, 開口部) |
| 2             | `/industries`, `/industries/construction`, `/industries/manufacturing`, `/industries/logistics-and-warehousing`, `/partnerships`, `/projects`, `/about-us`                                                      | Japanese buyers often buy through partners and system integrators, and look for reference projects                                |
| 3             | `/childsafe-vision`, selected news posts (`ailytics-and-safie` first), `/privacy-policy`                                                                                                                        | Needs a client decision, or legal review under Japan's privacy law (APPI) once Japanese leads are collected                       |
| Stays English | Careers, job posts, EULA, blog                                                                                                                                                                                  | Legacy `/ja-jp` URLs for these redirect permanently to English                                                                    |

When a tier 1 to 3 page ships in Japanese, remove its entry from `JA_JP_PENDING_PATHS` in `src/config/redirects.ts`.

## Adding a locale

1. Add it to `LOCALES` and `LOCALE_SETTINGS` in `src/lib/i18n.ts`, and to `PREFIXES` in `scripts/i18n.ts`.
2. Add `src/config/chrome-copy/<locale>.ts` and register it in `src/config/chrome-copy/index.ts`.
3. Add `src/app/<prefix>/layout.tsx`, `not-found.tsx` and `error.tsx`, copying the Japanese ones.
4. Add a font fallback and typography block for the language in `src/app/globals.css` (see the `:lang(ja)` block).
5. Write `docs/localisation/<locale>.md` before translating anything.
6. Translate the homepage first with the translate-page skill.

## Known gaps

- The shared product visuals (`src/components/visuals`, `site-camera-wall`) still show English interface labels on Japanese pages. Translate them only if the product itself ships a Japanese interface.
- The social sharing image (`src/app/opengraph-image.tsx`) is English on every locale. A Japanese version needs a Japanese font file passed to `ImageResponse`.
- An unknown `/ja-jp/...` URL shows the English 404 page, because unmatched URLs render `src/app/global-not-found.tsx` outside every layout.
