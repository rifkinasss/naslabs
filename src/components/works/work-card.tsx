import Image from "next/image";

import { Link } from "@/i18n/navigation";
import type { WorkDocument } from "@/lib/content/works";

export function WorkCard({ work, index }: { work: WorkDocument; index: number }) {
  const { metadata } = work;
  return (
    <Link className="v2-work-card" href={`/works/${metadata.slug}`}>
      <span className="v2-work-card__index" aria-hidden="true">{String(index).padStart(2, "0")}</span>
      <span className="v2-work-card__visual"><Image src={metadata.cover} alt={`${metadata.title} cover`} width={1200} height={760} sizes="(max-width: 48rem) 100vw, 38rem" /></span>
      <span className="v2-work-card__content">
        <span className="v2-label">{metadata.category}</span>
        <span className="v2-h3">{metadata.title}</span>
        <span className="v2-work-card__description">{metadata.description}</span>
        <span className="v2-work-card__meta">{metadata.year ?? ""}{metadata.year && metadata.stack.length ? " · " : ""}{metadata.stack.slice(0, 3).join(" · ")}</span>
      </span>
    </Link>
  );
}
