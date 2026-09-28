"use client";

import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

export default function LocaleError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const t = useTranslations("System");

  return (
    <main className="v2-scope v2-system-state">
      <div className="v2-system-state__grid">
        <section className="v2-system-state__copy" aria-labelledby="runtime-error-title">
          <p className="v2-label v2-system-state__status-label">{t("error.label")}</p>
          <h1 id="runtime-error-title" className="v2-page-title">{t("error.title")}</h1>
          <p className="v2-body-lg">{t("error.description")}</p>
          <div className="v2-system-state__actions">
            <button className="v2-button v2-button-primary" type="button" onClick={() => reset()}>{t("error.retry")}</button>
            <Link className="v2-arrow-link" href="/">{t("error.home")}<span aria-hidden="true">↗</span></Link>
          </div>
        </section>
        <aside className="v2-system-state__signal" aria-label={t("error.statusLabel")}>
          <span className="v2-label">{t("error.statusLabel")}</span>
          <strong>RUNTIME_ERROR</strong>
        </aside>
      </div>
      <div className="v2-system-state__rule" aria-hidden="true" />
    </main>
  );
}
