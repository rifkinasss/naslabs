import { ArrowLeft, ArrowRight } from "lucide-react";

import { Link } from "@/i18n/navigation";
import type { WorkDocument } from "@/lib/content/works";

export function WorkNavigation({ previous, next, labels }: { previous?: WorkDocument; next?: WorkDocument; labels: { previous: string; next: string } }) {
  return <nav className="v2-work-navigation" aria-label="Work navigation">
    {previous ? <Link className="v2-work-navigation__previous v2-interactive" href={`/works/${previous.metadata.slug}`}><ArrowLeft aria-hidden="true" /><span><small>{labels.previous}</small><strong>{previous.metadata.title}</strong><em>{previous.metadata.description}</em></span></Link> : <span />}
    {next ? <Link className="v2-work-navigation__next" href={`/works/${next.metadata.slug}`}><span><small>{labels.next}</small><strong>{next.metadata.title}</strong><em>{next.metadata.description}</em></span><ArrowRight aria-hidden="true" /></Link> : <span />}
  </nav>;
}
