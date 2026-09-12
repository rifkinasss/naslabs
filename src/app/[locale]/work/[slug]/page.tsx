import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { getLocalizedProject, projects } from "@/content/projects";
import { localizedMetadata } from "@/lib/seo";

export function generateStaticParams() { return projects.map((project) => ({ slug: project.slug })); }
export async function generateMetadata({ params }: PageProps<"/[locale]/work/[slug]">): Promise<Metadata> { const { slug, locale } = await params; const project = getLocalizedProject(slug, locale); return project ? localizedMetadata(locale as "en" | "id", `/work/${slug}`, project.title, project.summary) : {}; }

export default async function CaseStudyPage({ params }: PageProps<"/[locale]/work/[slug]">) {
  const { slug } = await params;
  const locale = await getLocale();
  const project = getLocalizedProject(slug, locale);
  const t = await getTranslations("CaseStudy");
  if (!project) notFound();
  return <main className="case-study section-shell"><Link className="back-link" href="/work"><ArrowLeft aria-hidden="true" /> {t("back")}</Link><header className="case-hero"><p className="eyebrow"><span className="eyebrow-dot" /> {project.category}</p><h1>{project.title}</h1><p>{project.summary}</p></header>{project.image && <div className={`case-image-frame case-image-frame--${project.slug}`}><Image className="case-image" src={project.image} alt={`${project.title} website hero screenshot`} fill sizes="(max-width: 900px) 100vw, 1200px" priority /></div>}<div className="case-meta"><div><span>{t("context")}</span><p>{project.context}</p></div><div><span>{t("role")}</span><p>{project.role}</p></div><div><span>{t("technology")}</span><p>{project.stack.join(" · ")}</p></div><div><span>{t("access")}</span>{project.access.url ? <a className="case-access-link" href={project.access.url} target="_blank" rel="noreferrer">{t("open")} <ArrowUpRight aria-hidden="true" /></a> : <p>{project.access.visibility === "private" ? t("private") : t("public")}</p>}</div></div><div className="case-sections">{project.sections.map((section) => <section key={section.title}><span className="service-number">{section.title}</span><p>{section.body}</p></section>)}</div><section className="page-cta"><div><p className="eyebrow">{t("ctaEyebrow")}</p><h2>{t("ctaTitle").split("\n").map((line, index) => <span key={line}>{index > 0 && <br />}{index === 1 ? <em>{line}</em> : line}</span>)}</h2></div><Link className="text-link" href="/contact">{t("ctaLink")} <ArrowUpRight aria-hidden="true" /></Link></section></main>;
}
