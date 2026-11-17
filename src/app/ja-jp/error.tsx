"use client";

import { jaJp } from "@/config/chrome-copy/ja-jp";

const copy = jaJp.error;

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main
      id="main-content"
      className="brand-hero grid min-h-[70vh] w-full place-items-center px-5 py-24 text-center sm:px-8"
    >
      <div className="mx-auto max-w-3xl">
        <h1 className="brand-h1">{copy.heading}</h1>
        <p className="brand-lead mx-auto mt-6 max-w-xl">{copy.body}</p>
        <button
          type="button"
          onClick={reset}
          className="brand-btn-primary mt-9"
        >
          {copy.action}
        </button>
      </div>
    </main>
  );
}
