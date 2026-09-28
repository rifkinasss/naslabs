type NotFoundStateProps = {
  label: string;
  title: string;
  description: string;
  statusLabel: string;
  statusCode: string;
  homeLabel: string;
  worksLabel: string;
  homeHref: string;
  worksHref: string;
};

export function NotFoundState({ label, title, description, statusLabel, statusCode, homeLabel, worksLabel, homeHref, worksHref }: NotFoundStateProps) {
  return (
    <main className="v2-scope v2-system-state">
      <div className="v2-system-state__grid">
        <section className="v2-system-state__copy" aria-labelledby="not-found-title">
          <p className="v2-label v2-system-state__status-label">{label}</p>
          <h1 id="not-found-title" className="v2-page-title">{title}</h1>
          <p className="v2-body-lg">{description}</p>
          <div className="v2-system-state__actions">
            <a className="v2-button v2-button-primary" href={homeHref}>{homeLabel}</a>
            <a className="v2-arrow-link" href={worksHref}>{worksLabel}<span aria-hidden="true">↗</span></a>
          </div>
        </section>
        <aside className="v2-system-state__signal" aria-label={statusLabel}>
          <span className="v2-label">{statusLabel}</span>
          <strong>{statusCode}</strong>
        </aside>
      </div>
      <div className="v2-system-state__rule" aria-hidden="true" />
    </main>
  );
}
