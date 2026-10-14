# Page content

Page copy JSON now lives with the app so the build reads it directly:

- `src/content/pages/industries/<slug>.json` renders at `/industries/<slug>`
- `src/content/pages/uses/<slug>.json` renders at `/use-cases/<slug>`

Schema: `hero`, `problems`, `solution`, `features` (items with `id`, `eyebrow`, `title`, `description`, `highlights`), `faq`, `cta`. It is validated by `src/lib/page-content.ts`. Links inside FAQ answers use Markdown, for example `[PPE detection page](/use-cases/ppe-detection)`. Feature `eyebrow` is the category the page groups features by.

"How it works" and value props are written in each route's `page.tsx`, not in JSON.
