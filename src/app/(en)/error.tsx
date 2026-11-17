"use client";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main
      id="main-content"
      className="brand-hero grid min-h-[70vh] w-full place-items-center px-5 py-24 text-center sm:px-8"
    >
      <div className="mx-auto max-w-3xl">
        <h1 className="brand-h1">Something went wrong on this page</h1>
        <p className="brand-lead mx-auto mt-6 max-w-xl">
          Please try again. If it keeps happening, go back to the homepage or
          contact the team.
        </p>
        <button
          type="button"
          onClick={reset}
          className="brand-btn-primary mt-9"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
