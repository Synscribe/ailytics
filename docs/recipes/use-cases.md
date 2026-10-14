# Use-case and industry pages

Each detail page is one JSON file plus a short entry of route copy. The JSON holds the page content; the route copy holds how it works, value props, the hero visual and links.

## Add a page

1. Add `src/content/pages/uses/<slug>.json` (or `industries/<slug>.json`). Every `features.items[].id` must be a visual id in `src/lib/visuals.ts`. `src/lib/page-content.ts` validates the file.
2. Add an entry keyed by the same slug to `src/app/use-cases/[slug]/_content.ts` (or `src/app/industries/[slug]/_content.ts`). The build fails with a clear error if a JSON file has no entry.
3. Make sure the slug is listed in the hub list (`src/app/use-cases/_groups.ts` or `src/app/industries/_groups.ts`). The hub card becomes a link once the JSON page exists.
4. Link the new page from related industry or use-case pages (`related` and `featureLinks` in route copy, or Markdown links in FAQ answers).

The sitemap picks up every JSON page automatically.

## Remove

Delete `src/app/use-cases`, `src/app/industries`, `src/content/pages`, `src/lib/page-content.ts` and its test, `src/components/content-page`, `src/components/content-hub` and `src/app/content-routes.test.ts`. Remove the sitemap entries, navigation links and `/dev/visuals` placements, then run `pnpm check` and `pnpm build`.
