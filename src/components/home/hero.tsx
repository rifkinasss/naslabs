import { ArrowDown } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { ArrowLink } from "@/components/ui/arrow-link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/lib/site";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/motion/reveal";

export function Hero() {
  const locale = useLocale();
  const t = useTranslations("HomeV2");
  const cv = siteConfig.cvByLocale[locale as "en" | "id"];

  return (
    <Section className="v2-home__hero">
      <Container className="v2-home__hero-inner">
        <div className="v2-home__hero-copy">
          <Reveal as="p" className="v2-label v2-home__eyebrow" revealOnMount>{t("hero.eyebrow")}</Reveal>
          <Reveal as="h1" className="v2-display" delay={40} revealOnMount>{t("hero.title")}</Reveal>
          <Reveal as="p" className="v2-body-lg v2-home__hero-description" delay={80} revealOnMount>{t("hero.description")}</Reveal>
          <Reveal className="v2-home__hero-actions" delay={120} revealOnMount>
            <Button asChild variant="v2-primary">
              <Link href="/works">{t("hero.exploreWorks")} <ArrowDown aria-hidden="true" size={16} /></Link>
            </Button>
            <ArrowLink href="/about">{t("hero.about")}</ArrowLink>
            <a className="v2-arrow-link v2-interactive v2-home__hero-cv" href={cv.url} download={cv.downloadName}>
              <span>{t("hero.downloadCv")}</span>
              <ArrowDown aria-hidden="true" size={16} />
            </a>
          </Reveal>
        </div>
        <Reveal as="aside" className="v2-home__signature" delay={160} revealOnMount elementProps={{ "aria-label": t("hero.signatureLabel") }}>
          <div className="v2-home__signature-top"><span>NASLABS</span><span>2026</span></div>
          <p className="v2-home__signature-principle">{siteConfig.principle.split(" ").map((word) => <span key={word}>{word}</span>)}</p>
          <div className="v2-home__signature-areas" aria-label={t("hero.signatureLabel")}>
            {[
              ["01", "Web"],
              ["02", "Data"],
              ["03", "Systems"],
              ["04", "Infrastructure"],
            ].map(([index, label]) => (
              <span className="v2-home__signature-area" key={label} tabIndex={0}>
                <span className="v2-home__signature-index" aria-hidden="true">{index}</span>
                <span>{label}</span>
              </span>
            ))}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
