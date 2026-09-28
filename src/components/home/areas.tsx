import { useTranslations } from "next-intl";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/motion/reveal";

export function Areas({ sectionNumber }: { sectionNumber: number }) {
  const t = useTranslations("HomeV2");
  const areas = ["web", "data", "systems", "infrastructure"] as const;

  return (
    <Section className="v2-home__section v2-home__areas">
      <Container>
        <SectionHeader eyebrow={`${String(sectionNumber).padStart(2, "0")} / ${t("areas.eyebrow")}`} title={t("areas.title")} description={t("areas.description")} />
        <div className="v2-area-list">
          {areas.map((area, index) => (
            <Reveal className="v2-area-item" key={area} delay={index * 55}>
              <span className="v2-area-item__index">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="v2-h3">{t(`areas.items.${area}.title`)}</h3>
              <p className="v2-body-sm">{t(`areas.items.${area}.description`)}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
