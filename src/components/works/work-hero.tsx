import type { Work } from "@/lib/content/contracts";

type WorkHeroProps = {
  metadata: Work;
  index: number;
  labels: { workNumber: string; selected: string };
};

export function WorkHero({ metadata, index, labels }: WorkHeroProps) {
  return (
    <header className="v2-work-detail__hero">
      <div className="v2-work-detail__hero-main">
        <p className="v2-label">{metadata.category}</p>
        <h1 className="v2-page-title">{metadata.title}</h1>
        <p className="v2-body-lg">{metadata.description}</p>
      </div>
      <div className="v2-work-detail__hero-index">
        <span className="v2-label">{labels.workNumber}</span>
        <span className="v2-caption">{String(index + 1).padStart(2, "0")} <span aria-hidden="true">·</span> {metadata.year ?? labels.selected}</span>
      </div>
    </header>
  );
}
