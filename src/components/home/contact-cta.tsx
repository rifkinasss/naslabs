import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/motion/reveal";

export function ContactCta({ sectionNumber }: { sectionNumber: number }) {
  const t = useTranslations("HomeV2");

  return (
    <Section className="v2-home__contact">
      <Container className="v2-home__contact-inner">
        <Reveal>
          <p className="v2-label">{String(sectionNumber).padStart(2, "0")} / {t("contact.eyebrow")}</p>
          <h2 className="v2-h2">{t("contact.title")}</h2>
        </Reveal>
        <Reveal className="v2-home__contact-copy" delay={70}>
          <p className="v2-body-lg">{t("contact.description")}</p>
          <Button asChild variant="v2-secondary"><Link href="/contact">{t("contact.cta")} <ArrowUpRight aria-hidden="true" size={16} /></Link></Button>
        </Reveal>
      </Container>
    </Section>
  );
}
