import { useTranslations } from "next-intl";

import { ArrowLink } from "@/components/ui/arrow-link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/motion/reveal";

export function AboutPreview({ sectionNumber }: { sectionNumber: number }) {
  const t = useTranslations("HomeV2");

  return (
    <Section className="v2-home__section v2-home__about">
      <Container className="v2-home__about-grid">
        <Reveal><SectionHeader eyebrow={`${String(sectionNumber).padStart(2, "0")} / ${t("about.eyebrow")}`} title={t("about.title")} /></Reveal>
        <Reveal className="v2-home__about-copy" delay={80}>
          <p className="v2-body-lg">{t("about.description")}</p>
          <p>{t("about.context")}</p>
          <div className="v2-home__about-facts"><span>{t("about.facts.role")}</span><span>{t("about.facts.education")}</span><span>{t("about.facts.areas")}</span></div>
          <ArrowLink href="/about">{t("about.cta")}</ArrowLink>
        </Reveal>
      </Container>
    </Section>
  );
}
