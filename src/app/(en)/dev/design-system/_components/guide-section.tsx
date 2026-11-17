import type { GuideSectionEntry } from "./sections";

export function GuideSection({
  id,
  title,
  summary,
  children,
}: GuideSectionEntry & { children?: React.ReactNode }) {
  return (
    <section
      aria-labelledby={`${id}-title`}
      className="scroll-mt-24 border-t border-ink/10 py-16 first:border-t-0 first:pt-0"
      id={id}
    >
      <h2
        className="text-3xl font-medium tracking-[-0.025em]"
        id={`${id}-title`}
      >
        {title}
      </h2>
      <p className="mt-3 max-w-2xl text-base leading-7 text-ink-muted">
        {summary}
      </p>
      <div className="mt-10">
        {children ?? (
          <p className="rounded-2xl bg-paper px-6 py-5 text-sm text-ink-muted ring-1 ring-ink/10">
            Coming next. We review this part after type.
          </p>
        )}
      </div>
    </section>
  );
}
