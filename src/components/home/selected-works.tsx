import { useTranslations } from "next-intl";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Link } from "@/i18n/navigation";
import type { WorkDocument } from "@/lib/content/works";

import { FeaturedWorksCarousel } from "./featured-works-carousel";

type SelectedWorksProps = { works: WorkDocument[]; sectionNumber: number };

export function SelectedWorks({ works, sectionNumber }: SelectedWorksProps) {
  const t = useTranslations("HomeV2");

  return (
    <Section className="v2-home__section v2-home__works">
      <Container>
        <SectionHeader eyebrow={`${String(sectionNumber).padStart(2, "0")} / ${t("works.eyebrow")}`} title={t("works.title")} description={t("works.description")} />
        <FeaturedWorksCarousel works={works.map((work) => work.metadata)} labels={{ region: t("works.carouselLabel"), previous: t("works.previous"), next: t("works.next"), position: t("works.position"), readMore: t("works.readMore") }} />
        <div className="v2-home__works-footer"><Link className="v2-arrow-link" href="/works">{t("works.viewAll")} <span aria-hidden="true">↗</span></Link></div>
      </Container>
    </Section>
  );
}
