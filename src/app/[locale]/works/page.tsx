import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/motion/reveal";
import { WorkList } from "@/components/works/work-list";
import { getAllWorks } from "@/lib/content/works";
import { localizedMetadata } from "@/lib/seo";

type WorksPageParams = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: WorksPageParams): Promise<Metadata> {
  const { locale } = await params;
  const isId = locale === "id";
  return localizedMetadata(locale as "en" | "id", "/works", isId ? "Karya" : "Works", isId ? "Karya yang dibangun, dibentuk, dan dipelajari NasLabs." : "Things NasLabs has built, shaped, and learned from.");
}

export default async function WorksPage({ params }: WorksPageParams) {
  const { locale } = await params;
  const t = await getTranslations("WorksV2");
  const works = getAllWorks(locale);

  return <main className="v2-scope v2-works-page"><section className="v2-works-page__intro"><Container><Reveal revealOnMount><SectionHeader eyebrow={t("eyebrow")} title={t("title")} description={t("description")} /></Reveal></Container></section><section className="v2-works-page__archive"><Container><Reveal as="div" className="v2-works-page__archive-heading"><h2 className="v2-h2">{t("archive")}</h2><span className="v2-caption">{works.length} {t("projects")}</span></Reveal><WorkList works={works} /></Container></section></main>;
}
