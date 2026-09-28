import { useTranslations } from "next-intl";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import type { Experiment } from "@/lib/content/contracts";
import { Link } from "@/i18n/navigation";

export function ExperimentsPreview({ experiments, sectionNumber }: { experiments: Experiment[]; sectionNumber: number }) {
  const t = useTranslations("HomeV2");

  return (
    <Section className="v2-home__section v2-home__experiments">
      <Container>
        <div className="v2-home__dark-grid">
          <SectionHeader eyebrow={`${String(sectionNumber).padStart(2, "0")} / ${t("experiments.eyebrow")}`} title={t("experiments.title")} description={t("experiments.description")} />
          <div className="v2-home__experiment-preview"><div>{experiments.map((experiment, index) => <div className="v2-home__experiment-row" key={experiment.slug}><span className="v2-caption" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><div><strong>{experiment.title}</strong><span>{experiment.category} · {experiment.year}</span></div></div>)}</div><Link className="v2-arrow-link v2-home__experiment-link" href="/experiments">{t("experiments.viewAll")} <span aria-hidden="true">↗</span></Link></div>
        </div>
      </Container>
    </Section>
  );
}
