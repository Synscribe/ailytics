import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import {
  chromeCopy,
  fillTemplate,
  localizedNavigation,
} from "@/config/chrome-copy";
import { localizedHref, type Locale } from "@/lib/i18n";

import { LanguageSwitcher } from "./language-switcher.client";
import { MobileNav } from "./mobile-nav";
import { NavDropdown } from "./nav-dropdown";

export function SiteHeader({ locale }: { locale: Locale }) {
  const copy = chromeCopy(locale);
  const navigation = localizedNavigation(locale);
  const primaryAction = {
    href: localizedHref(locale, "/contact"),
    label: copy.primaryAction,
  };

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-canvas/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
        <Link
          href={localizedHref(locale, "/")}
          className="group inline-flex items-center gap-2.5 font-medium tracking-tight"
          aria-label={copy.homeLabel}
        >
          <Image
            alt=""
            className="h-10 w-auto"
            height={434}
            priority
            src="/brand/ailytics/ailytics-lockup-v1-on-light.png"
            width={1441}
          />
        </Link>

        <nav aria-label={copy.primaryNavLabel} className="hidden md:block">
          <ul className="flex items-center gap-7 text-sm text-ink-muted">
            {navigation.map((item) => (
              <li key={item.label}>
                {"links" in item ? (
                  <NavDropdown
                    group={item}
                    showLabel={fillTemplate(copy.showGroup, {
                      label: item.label.toLowerCase(),
                    })}
                  />
                ) : (
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-ink"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          <LanguageSwitcher
            className="text-sm text-ink-muted transition-colors hover:text-ink"
            locale={locale}
          />
          <Link
            href={primaryAction.href}
            className="brand-btn-primary h-9 px-4 py-0 text-sm"
          >
            {primaryAction.label}
            <ArrowRightIcon
              className="size-4"
              data-icon="inline-end"
              aria-hidden="true"
            />
          </Link>
        </div>

        <MobileNav
          labels={copy.mobileNav}
          navigation={navigation}
          primaryAction={primaryAction}
        />
      </div>
    </header>
  );
}
