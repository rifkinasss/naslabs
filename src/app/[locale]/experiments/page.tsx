import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { ExperimentList } from "@/components/experiments/experiment-list";
import { getAllExperiments } from "@/content/experiments";
import { localizedMetadata } from "@/lib/seo";

type ExperimentsPageParams = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: ExperimentsPageParams): Promise<Metadata> {
  const { locale } = await params;
  const isId = locale === "id";
  return localizedMetadata(locale as "en" | "id", "/experiments", isId ? "Eksperimen" : "Experiments", isId ? "Eksplorasi kecil, prototipe, dan sistem yang sedang dipelajari NasLabs." : "Small explorations, prototypes, and systems NasLabs is learning from.");
}

export default async function ExperimentsPage({ params }: ExperimentsPageParams) {
  const { locale } = await params;
  const t = await getTranslations("ExperimentsV2");
  const experiments = getAllExperiments(locale);

  return <main className="v2-scope v2-experiments-page"><section className="v2-experiments-page__intro"><Container><SectionHeader eyebrow={t("eyebrow")} title={t("title")} description={t("description")} /></Container></section><section className="v2-experiments-page__archive"><Container>{experiments.length > 0 ? <><div className="v2-experiments-page__archive-heading"><h2 className="v2-h2">{t("archive")}</h2><span className="v2-caption">{experiments.length} {t("entries")}</span></div><ExperimentList experiments={experiments} /></> : <div className="v2-experiments-page__empty"><span className="v2-label">{t("empty.label")}</span><h2 className="v2-h2">{t("empty.title")}</h2><p className="v2-body-lg">{t("empty.description")}</p></div>}</Container></section></main>;
}
