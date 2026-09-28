import type { WorkDocument } from "@/lib/content/works";

import { Reveal } from "@/components/motion/reveal";
import { WorkCard } from "./work-card";

export function WorkList({ works }: { works: WorkDocument[] }) {
  return <div className="v2-work-list">{works.map((work, index) => <Reveal as="div" className="v2-work-card-reveal" delay={index * 70} distance={10} key={work.metadata.slug}><WorkCard work={work} index={index + 1} /></Reveal>)}</div>;
}
