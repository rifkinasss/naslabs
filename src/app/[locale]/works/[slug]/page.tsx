import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { Link } from "@/i18n/navigation";
import { WorkCover } from "@/components/works/work-cover";
import { WorkHero } from "@/components/works/work-hero";
import { WorkMeta } from "@/components/works/work-meta";
import { WorkNavigation } from "@/components/works/work-navigation";
import { WorkProse } from "@/components/works/work-prose";
import { getAllWorks, getWorkBySlug, getWorkSlugs } from "@/lib/content/works";
import { localizedMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

type WorkPageParams = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return (["en", "id"] as const).flatMap((locale) => getWorkSlugs(locale).map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: WorkPageParams): Promise<Metadata> {
  const { locale, slug } = await params;
  const work = getWorkBySlug(locale, slug);
  if (!work) return {};
  const seo = localizedMetadata(locale as "en" | "id", `/works/${slug}`, work.metadata.title, work.metadata.description);
  return { ...seo, openGraph: { ...seo.openGraph, type: "article", images: [{ url: work.metadata.cover, alt: `${work.metadata.title} cover` }] }, twitter: { card: "summary_large_image", title: work.metadata.title, description: work.metadata.description, images: [work.metadata.cover] } };
}

export default async function WorkDetailPage({ params }: WorkPageParams) {
  const { locale, slug } = await params;
  const work = getWorkBySlug(locale, slug);
  if (!work) notFound();

  const t = await getTranslations("WorksV2");
  const allWorks = getAllWorks(locale);
  const index = allWorks.findIndex((item) => item.metadata.slug === slug);
  const previous = index > 0 ? allWorks[index - 1] : undefined;
  const next = index >= 0 && index < allWorks.length - 1 ? allWorks[index + 1] : undefined;
  const { metadata } = work;

  return <main className="v2-scope v2-work-detail"><Container><Reveal revealOnMount><Link className="v2-arrow-link v2-work-detail__back" href="/works"><ArrowLeft aria-hidden="true" />{t("back")}</Link></Reveal><article><div className="v2-work-detail__opening"><div className="v2-work-detail__opening-copy"><Reveal revealOnMount><WorkHero metadata={metadata} index={index} labels={{ workNumber: t("workNumber"), selected: t("selected") }} /></Reveal><Reveal delay={90} revealOnMount><WorkMeta metadata={metadata} labels={{ year: t("meta.year"), role: t("meta.role"), stack: t("meta.stack"), status: t("meta.status") }} /></Reveal><Reveal delay={140} revealOnMount><div className="v2-work-detail__links">{metadata.externalUrl ? <a className="v2-arrow-link" href={metadata.externalUrl} target="_blank" rel="noopener noreferrer">{t("openProject")}<ArrowUpRight aria-hidden="true" /></a> : null}{metadata.repositoryUrl ? <a className="v2-arrow-link" href={metadata.repositoryUrl} target="_blank" rel="noopener noreferrer">{t("repository")}<ArrowUpRight aria-hidden="true" /></a> : null}</div></Reveal></div><WorkCover src={metadata.cover} alt={`${metadata.title} project cover`} /></div><div className="v2-work-detail__body"><WorkProse source={work.body} labels={{ overview: t("chapters.overview"), contribution: t("chapters.contribution"), workflows: t("chapters.workflows"), engineering: t("chapters.engineering"), outcome: t("chapters.outcome"), reflection: t("chapters.reflection") }} /></div></article><WorkNavigation previous={previous} next={next} labels={{ previous: t("previous"), next: t("next") }} /></Container><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "CreativeWork", name: metadata.title, description: metadata.description, url: `${siteConfig.url}${locale === "en" ? "" : `/${locale}`}/works/${metadata.slug}`, image: `${siteConfig.url}${metadata.cover}`, creator: { "@type": "Person", name: "Rifki Anashirul" } }) }} /></main>;
}
