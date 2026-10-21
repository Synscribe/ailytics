"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CustomerProof } from "@/components/customer-proof/customer-proof";
import prose from "@/app/blog/[slug]/article.module.css";
import styles from "./preview.module.css";

type Article = {
  slug: string;
  title: string;
  description: string;
  image: string | null;
  content: string;
  headings: { id: string; text: string; level: number }[];
  minutes: number;
};
const directions = [
  {
    id: "editorial",
    label: "Editorial",
    description: "Large imagery, open cards and a quieter reading layout.",
  },
  {
    id: "product",
    label: "Product-led",
    description: "Camera footage, blue panels and prominent routes to a demo.",
  },
  {
    id: "refined",
    label: "Refined current",
    description: "The existing structure with cleaner spacing, type and cards.",
  },
] as const;

export function BlogDesigns({ articles }: { articles: Article[] }) {
  const [direction, setDirection] =
    useState<(typeof directions)[number]["id"]>("product");
  const [article, setArticle] = useState<Article | null>(null);
  const lead = articles[0];
  function showArticle(value: Article | null) {
    setArticle(value);
    window.scrollTo({ top: 0, behavior: "instant" });
  }
  return (
    <main
      id="main-content"
      className={styles.preview}
      data-direction={direction}
    >
      <div className={styles.toolbar}>
        <strong>Blog design review</strong>
        <div role="group" aria-label="Design direction">
          {directions.map((item) => (
            <button
              key={item.id}
              aria-pressed={direction === item.id}
              onClick={() => setDirection(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div role="group" aria-label="Page view">
          <button aria-pressed={!article} onClick={() => showArticle(null)}>
            Blog listing
          </button>
          <button
            disabled={!lead}
            aria-pressed={!!article}
            onClick={() => showArticle(article ?? lead)}
          >
            Article page
          </button>
        </div>
      </div>
      <p className={styles.reviewNote}>
        {directions.find((item) => item.id === direction)?.description} Real
        Wisp content; layout preview only.
      </p>
      {article ? (
        <>
          <header className={styles.articleHero}>
            <div className={styles.container}>
              <button className={styles.back} onClick={() => showArticle(null)}>
                ← All articles
              </button>
              <div className={styles.articleHeading}>
                <div>
                  <p className={styles.eyebrow}>
                    Ailytics insights · {article.minutes} min read
                  </p>
                  <h1>{article.title}</h1>
                  <p className={styles.lead}>{article.description}</p>
                </div>
                {article.image && (
                  <div className={styles.cover}>
                    <Image
                      src={article.image}
                      alt=""
                      fill
                      sizes="(min-width: 900px) 50vw, 100vw"
                      priority
                    />
                  </div>
                )}
              </div>
            </div>
          </header>
          <div className={styles.reading}>
            <aside className={styles.contents}>
              <details open>
                <summary>On this page</summary>
                <nav aria-label="Article contents">
                  {article.headings
                    .filter((h) => h.level === 2)
                    .map((h) => (
                      <a href={`#${h.id}`} key={h.id}>
                        {h.text}
                      </a>
                    ))}
                </nav>
              </details>
              {direction !== "editorial" && (
                <div className={styles.sidebarCta}>
                  <h2>See it on your cameras</h2>
                  <p>Explore how Ailytics would work on your site.</p>
                  <Link className="brand-btn-primary" href="/contact">
                    Request a demo →
                  </Link>
                </div>
              )}
            </aside>
            <div
              className={`${prose.prose} ${styles.body}`}
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>
          <section className={styles.container}>
            <h2 className={styles.sectionTitle}>Keep reading</h2>
            <div className={styles.grid}>
              {articles
                .filter((a) => a.slug !== article.slug)
                .map((a) => (
                  <Story
                    key={a.slug}
                    article={a}
                    onOpen={() => showArticle(a)}
                  />
                ))}
            </div>
          </section>
        </>
      ) : (
        <>
          <header className={styles.hero}>
            {direction === "product" && (
              <video
                aria-hidden
                muted
                autoPlay
                loop
                playsInline
                poster="/media/ailytics/article-slate.webp"
              >
                <source
                  src="/media/ailytics/detection-open-edge.mp4"
                  type="video/mp4"
                />
              </video>
            )}
            <div className={styles.container}>
              <p className={styles.eyebrow}>Insights from Ailytics</p>
              <h1>AI Video Analytics Blog</h1>
              <p className={styles.lead}>
                Software comparisons, detection use cases and practical advice
                for safer, more productive sites.
              </p>
              {direction === "product" && (
                <Link className="brand-btn-secondary" href="/contact">
                  See Ailytics on your cameras →
                </Link>
              )}
            </div>
          </header>
          <CustomerProof />
          <section className={styles.container}>
            {lead && (
              <button
                className={styles.featured}
                onClick={() => showArticle(lead)}
              >
                {lead.image && (
                  <div className={styles.cover}>
                    <Image
                      src={lead.image}
                      alt=""
                      fill
                      sizes="(min-width: 900px) 60vw, 100vw"
                      priority
                    />
                  </div>
                )}
                <div className={styles.featureCopy}>
                  <p className={styles.eyebrow}>
                    Latest article · {lead.minutes} min read
                  </p>
                  <h2>{lead.title}</h2>
                  <p>{lead.description}</p>
                  <span className={styles.read}>Read the article ↗</span>
                </div>
              </button>
            )}
            <h2 className={styles.sectionTitle}>More articles</h2>
            <div className={styles.grid}>
              {articles.slice(1).map((a) => (
                <Story key={a.slug} article={a} onOpen={() => showArticle(a)} />
              ))}
            </div>
            {!lead && <p>No published articles are available.</p>}
          </section>
        </>
      )}
      <section className={styles.closing}>
        <div className={styles.container}>
          <h2>See what your cameras could catch</h2>
          <p>Explore the detections that fit your sites and cameras.</p>
          <Link className="brand-btn-secondary" href="/contact">
            Request a demo →
          </Link>
        </div>
      </section>
    </main>
  );
}

function Story({ article, onOpen }: { article: Article; onOpen: () => void }) {
  return (
    <button className={styles.story} onClick={onOpen}>
      {article.image && (
        <div className={styles.cover}>
          <Image
            src={article.image}
            alt=""
            fill
            sizes="(min-width: 900px) 45vw, 100vw"
          />
        </div>
      )}
      <div className={styles.storyCopy}>
        <p className={styles.eyebrow}>{article.minutes} min read</p>
        <h3>{article.title}</h3>
        <p>{article.description}</p>
        <span className={styles.read}>Read article ↗</span>
      </div>
    </button>
  );
}
