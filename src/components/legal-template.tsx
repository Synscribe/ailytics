import Link from "next/link";

type LegalTemplateProps = {
  eyebrow: string;
  title: string;
  introduction: string;
  sections: Array<{ title: string; body: string }>;
};

export function LegalTemplate({
  eyebrow,
  title,
  introduction,
  sections,
}: LegalTemplateProps) {
  return (
    <main id="main-content">
      <article className="mx-auto w-full max-w-3xl px-5 pt-14 pb-20 sm:px-8 sm:pt-16 sm:pb-28 lg:pt-20">
        <p className="text-sm font-semibold text-ink-muted">{eyebrow}</p>
        <h1 className="brand-h1 mt-4">{title}</h1>
        <div className="brand-card mt-8 p-5 text-sm leading-6 text-ink-muted">
          <strong className="text-ink">Template status:</strong>{" "}
          TODO_CLIENT_LEGAL_REVIEW. This page is an implementation scaffold, not
          approved legal advice. Replace it with terms reviewed for the actual
          organization, product, data practices, and markets before production.
        </div>
        <p className="brand-lead mt-10">{introduction}</p>

        <div className="mt-14 space-y-10">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-2xl font-semibold tracking-tight">
                {section.title}
              </h2>
              <p className="mt-4 leading-7 text-ink-muted">{section.body}</p>
            </section>
          ))}
        </div>

        <p className="mt-16 text-sm text-ink-muted">
          Return to the{" "}
          <Link className="underline" href="/">
            homepage
          </Link>{" "}
          or review <code>docs/launch/checklist.md</code> before approving this
          route.
        </p>
      </article>
    </main>
  );
}
