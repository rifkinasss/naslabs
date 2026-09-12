import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { getProjects } from "@/content/projects";
import { localizedMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/work">): Promise<Metadata> { const { locale } = await params; return localizedMetadata(locale as "en" | "id", "/work", locale === "id" ? "Karya pilihan" : "Selected work", locale === "id" ? "Case study produk yang dibangun NasLabs." : "Case studies from NasLabs."); }

export default function WorkPage() {
  const t = useTranslations("WorkPage");
  const projects = getProjects(useLocale());
  return <main className="inner-page section-shell"><div className="inner-hero"><p className="eyebrow"><span className="eyebrow-dot" /> {t("eyebrow")}</p><h1>{t("title").split("\n").map((line, index) => <span key={line}>{index > 0 && <br />}{index === 1 ? <em>{line}</em> : line}</span>)}</h1><p>{t("intro")}</p></div><section className="work-grid">{projects.map((project) => <Link href={`/work/${project.slug}`} key={project.slug}><Card className="work-card">{project.image && <Image className="work-card-image" src={project.image} alt={`${project.title} website screenshot`} width={1200} height={630} />}<CardHeader><span className="work-index">{project.category}</span><CardTitle>{project.title}</CardTitle></CardHeader><CardContent><p>{project.summary}</p><span className="text-link">{t("readCaseStudy")} <ArrowUpRight aria-hidden="true" /></span></CardContent></Card></Link>)}</section></main>;
}
