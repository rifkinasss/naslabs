import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";


export const metadata: Metadata = { title: "Services", description: "Practical software development services from NasLabs.", alternates: { canonical: "/services" } };

const services: Array<[string, string, string, string[]]> = [
  ["01", "Custom Web Application", "For teams moving beyond manual workflows, spreadsheets, or disconnected data.", ["Admin dashboards", "Business workflows", "User management", "Reporting & deployment"]],
  ["02", "Business Website", "For businesses and professionals who need a clear, credible, and useful digital presence.", ["Company profile", "Landing pages", "Portfolio & services", "SEO foundation"]],
  ["03", "Backend & API Development", "For products and frontend teams that need dependable business logic and integrations.", ["REST API design", "Authentication", "Database design", "Documentation & testing"]],
  ["04", "Existing System Development", "For software that needs new features, thoughtful refactoring, or a second pair of engineering hands.", ["Bug fixing", "Feature implementation", "Technical debt", "Performance & integration"]],
];

export default function ServicesPage() {
  return <main className="inner-page section-shell"><div className="inner-hero"><p className="eyebrow"><span className="eyebrow-dot" /> Services</p><h1>Useful software,<br /><em>carefully built.</em></h1><p>NasLabs helps turn real business needs into reliable web products and systems. Each engagement starts with the problem, not a framework.</p></div><div className="service-detail-list">{services.map(([number, title, description, deliverables]) => <article className="service-detail" key={number}><span className="service-number">{number}</span><div><h2>{title}</h2><p>{description}</p></div><ul>{deliverables.map((item) => <li key={item}>{item}</li>)}</ul></article>)}</div><section className="page-cta"><div><p className="eyebrow">Not sure where to start?</p><h2>Bring the messy<br /><em>version.</em></h2></div><Link className="text-link" href="/contact">Talk through your project <ArrowUpRight aria-hidden="true" /></Link></section></main>;
}
