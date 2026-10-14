import Link from "next/link";

import type { LegalDocument as LegalDocumentContent } from "@/lib/legal-content";
import {
  buildBreadcrumbJsonLd,
  serializeJsonLd,
  type BreadcrumbJsonLdItem,
} from "@/lib/seo";

import styles from "./legal-document.module.css";

/** A migrated legal document: title, effective date and the sanitized body. */
export function LegalDocument({
  document,
  breadcrumbs,
}: {
  document: LegalDocumentContent;
  breadcrumbs: BreadcrumbJsonLdItem[];
}) {
  const trail = breadcrumbs.slice(0, -1);
  const current = breadcrumbs[breadcrumbs.length - 1];

  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(buildBreadcrumbJsonLd(breadcrumbs)),
        }}
      />
      <article>
        <header className="brand-hero">
          <div className="mx-auto w-full max-w-4xl px-5 pt-10 pb-10 sm:px-8 sm:pt-12 sm:pb-12">
            <nav
              aria-label="Breadcrumb"
              className="mb-10 text-sm text-ink-muted"
            >
              <ol className="flex flex-wrap gap-2">
                {trail.map((item) => (
                  <li className="flex gap-2" key={item.path}>
                    <Link className="hover:text-ink" href={item.path}>
                      {item.name}
                    </Link>
                    <span aria-hidden="true">/</span>
                  </li>
                ))}
                <li aria-current="page" className="text-ink">
                  {current.name}
                </li>
              </ol>
            </nav>
            <h1 className="brand-h1 text-[clamp(2.25rem,4vw,3.25rem)]">
              {document.title}
            </h1>
            {document.effectiveDate ? (
              <p className="mt-4 text-sm font-medium text-ink-muted">
                Effective date: {document.effectiveDate}
              </p>
            ) : null}
          </div>
        </header>
        <div className="mx-auto w-full max-w-4xl px-5 pt-4 pb-24 sm:px-8 sm:pb-28">
          <div
            className={styles.prose}
            dangerouslySetInnerHTML={{ __html: document.html }}
          />
        </div>
      </article>
    </main>
  );
}
