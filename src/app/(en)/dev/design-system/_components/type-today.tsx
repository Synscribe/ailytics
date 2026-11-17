import { TYPE_ROLES, TYPE_TODAY } from "../_data/type-today";
import { ROLE_NAMES, ROLE_SAMPLES } from "./type-samples";

export function TypeToday() {
  return (
    <div className="mt-16">
      <h3 className="text-xl font-medium">What the site uses today</h3>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-muted">
        Every text style on the public pages, grouped by role. Each one is shown
        at its real size, with the pages that use it. This list goes away once
        the new scale is applied.
      </p>

      <div className="mt-8 space-y-10">
        {TYPE_ROLES.map((role) => {
          const variants = TYPE_TODAY.filter((row) => row.role === role);
          return (
            <div key={role}>
              <p className="text-sm font-medium">
                {ROLE_NAMES[role]}{" "}
                <span className="font-normal text-ink-muted">
                  · {variants.length}{" "}
                  {variants.length === 1 ? "version" : "versions"}
                </span>
              </p>
              <ul className="mt-3 space-y-3">
                {variants.map((variant) => (
                  <li
                    className="rounded-2xl bg-paper p-5 ring-1 ring-ink/10"
                    key={`${variant.label}-${variant.usedIn[0]?.page}`}
                  >
                    <p
                      className="text-pretty break-words"
                      style={variant.style}
                    >
                      {ROLE_SAMPLES[role]}
                    </p>
                    <p className="mt-3 text-xs leading-5 text-ink-muted">
                      <span className="font-medium text-ink">
                        {variant.label}
                      </span>{" "}
                      · {variant.usedIn.map((use) => use.page).join(", ")}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
