import { TYPE_TODAY } from "../_data/type-today";
import { ROLE_SAMPLES } from "./type-samples";
import { TYPE_TOKENS } from "./type-tokens";

const WEIGHTS = [
  { value: 300, name: "Light (today)" },
  { value: 400, name: "Regular (chosen)" },
  { value: 500, name: "Medium" },
  { value: 600, name: "Semibold" },
] as const;

export function TypeScale() {
  return (
    <div>
      <h3 className="text-xl font-medium">Proposed scale</h3>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-muted">
        Nine sizes for the site and three for app mockups. Headings grow
        smoothly from phone to desktop. Body text moves from 15 to 16px, the
        minimum for comfortable reading on phones.
      </p>

      <ul className="mt-8 space-y-3">
        {TYPE_TOKENS.map((token) => {
          const replaces = token.role
            ? TYPE_TODAY.filter((row) => row.role === token.role).length
            : 0;
          const sample = token.role
            ? ROLE_SAMPLES[token.role]
            : "Hard hat missing · Cam 04 · 14:02";
          return (
            <li
              className="grid gap-4 rounded-2xl bg-paper p-5 ring-1 ring-ink/10 md:grid-cols-[minmax(0,1fr)_14rem] md:gap-8 md:p-6"
              key={token.name}
            >
              <p
                className={`min-w-0 break-words text-pretty ${token.className}`}
              >
                {sample}
              </p>
              <dl className="grid grid-cols-[auto_1fr] content-start gap-x-3 gap-y-1 text-xs leading-5 md:border-l md:border-ink/10 md:pl-6">
                <dt className="text-ink-muted">Name</dt>
                <dd className="font-medium">{token.className.split(" ")[0]}</dd>
                <dt className="text-ink-muted">Size</dt>
                <dd>{token.size}</dd>
                <dt className="text-ink-muted">Weight</dt>
                <dd>{token.weight}</dd>
                <dt className="text-ink-muted">Use</dt>
                <dd>{token.use}</dd>
                {replaces > 0 ? (
                  <>
                    <dt className="text-ink-muted">Replaces</dt>
                    <dd>
                      {replaces} {replaces === 1 ? "style" : "styles"} today
                    </dd>
                  </>
                ) : null}
              </dl>
            </li>
          );
        })}
      </ul>

      <h3 className="mt-16 text-xl font-medium">Heading weight</h3>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-muted">
        Headings are light today. Regular is chosen for the hero, page and
        section headings. Compare the hero and a section heading at each weight.
      </p>
      <ul className="mt-8 grid gap-3">
        {WEIGHTS.map((weight) => (
          <li
            className="rounded-2xl bg-paper p-6 ring-1 ring-ink/10"
            key={weight.value}
          >
            <p className="text-label text-ink-muted">
              {weight.name} · {weight.value}
            </p>
            <p
              className="mt-4 text-display break-words text-balance"
              style={{ fontWeight: weight.value }}
            >
              {ROLE_SAMPLES.display}
            </p>
            <p
              className="mt-6 text-h2 break-words text-balance"
              style={{ fontWeight: weight.value }}
            >
              {ROLE_SAMPLES.h2}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
