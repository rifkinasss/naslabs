import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { projects } from "@/content/projects";

export const metadata: Metadata = { title: "Work", description: "Selected work and case studies from NasLabs.", alternates: { canonical: "/work" } };

export default function WorkPage() {
  return <main className="inner-page section-shell"><div className="inner-hero"><p className="eyebrow"><span className="eyebrow-dot" /> Selected work</p><h1>Proof over<br /><em>promises.</em></h1><p>Good work deserves context. These notes document the problems, decisions, and outcomes behind the products NasLabs builds.</p></div><section className="work-grid">{projects.map((project) => <Link href={`/work/${project.slug}`} key={project.slug}><Card className="work-card">{project.image && <Image className="work-card-image" src={project.image} alt={`${project.title} website screenshot`} width={1200} height={630} />}<CardHeader><span className="work-index">{project.category}</span><CardTitle>{project.title}</CardTitle></CardHeader><CardContent><p>{project.summary}</p><span className="text-link">Read case study <ArrowUpRight aria-hidden="true" /></span></CardContent></Card></Link>)}</section></main>;
}
