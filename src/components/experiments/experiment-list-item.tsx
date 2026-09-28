import { ArrowUpRight } from "lucide-react";

import type { Experiment } from "@/lib/content/contracts";

export function ExperimentListItem({ experiment, index }: { experiment: Experiment; index: number }) {
  return <article className="v2-experiment-item"><span className="v2-experiment-item__index" aria-hidden="true">{String(index).padStart(2, "0")}</span><div className="v2-experiment-item__content"><div className="v2-experiment-item__heading"><div><p className="v2-label">{experiment.category}</p><h2 className="v2-h3">{experiment.title}</h2></div><span className="v2-caption">{experiment.year}</span></div><p className="v2-experiment-item__description">{experiment.description}</p><div className="v2-experiment-item__details"><span>{experiment.technologies.join(" · ")}</span><span className="v2-experiment-item__status">{experiment.status}</span></div>{experiment.links.length > 0 ? <div className="v2-experiment-item__links">{experiment.links.map((link) => <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer">{link.label}<ArrowUpRight aria-hidden="true" size={14} /></a>)}</div> : null}</div></article>;
}
