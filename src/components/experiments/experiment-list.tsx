import type { Experiment } from "@/lib/content/contracts";

import { ExperimentListItem } from "./experiment-list-item";

export function ExperimentList({ experiments }: { experiments: Experiment[] }) {
  return <div className="v2-experiment-list">{experiments.map((experiment, index) => <ExperimentListItem key={experiment.slug} experiment={experiment} index={index + 1} />)}</div>;
}
