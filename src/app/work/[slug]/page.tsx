import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import Image from "next/image";

import { getProject, projects } from "@/content/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Work", description: "Selected work and case studies from NasLabs.", alternates: { canonical: "/work" } };
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: { title: `${project.title} — NasLabs`, description: project.summary, url: `/work/${project.slug}`, type: "article", images: project.image ? [{ url: project.image, width: 1200, height: 630, alt: `${project.title} website screenshot` }] : undefined },
    twitter: { card: "summary_large_image", title: `${project.title} — NasLabs`, description: project.summary, images: project.image ? [project.image] : ["/opengraph-image"] },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return <main className="case-study section-shell"><Link className="back-link" href="/work"><ArrowLeft aria-hidden="true" /> Back to work</Link><header className="case-hero"><p className="eyebrow"><span className="eyebrow-dot" /> {project.category}</p><h1>{project.title}</h1><p>{project.summary}</p></header>{project.image && <Image className="case-image" src={project.image} alt={`${project.title} website hero screenshot`} width={1200} height={630} priority /> }<div className="case-meta"><div><span>Context</span><p>{project.context}</p></div><div><span>Role</span><p>{project.role}</p></div><div><span>Technology</span><p>{project.stack.join(" · ")}</p></div></div><div className="case-sections">{project.sections.map((section) => <section key={section.title}><span className="service-number">{section.title}</span><p>{section.body}</p></section>)}</div><section className="page-cta"><div><p className="eyebrow">Have a similar challenge?</p><h2>Let&apos;s talk<br /><em>through it.</em></h2></div><Link className="text-link" href="/contact">Start a conversation <ArrowUpRight aria-hidden="true" /></Link></section></main>;
}
