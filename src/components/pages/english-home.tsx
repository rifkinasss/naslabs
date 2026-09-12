import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { projects } from "@/content/projects";
import { siteConfig } from "@/lib/site";

const services = [
  { number: "01", slug: "custom-web-application", title: "Custom web applications", description: "Turn manual processes and scattered data into focused tools your team can rely on." },
  { number: "02", slug: "business-website", title: "Business websites", description: "A clear, responsive digital presence that helps the right people understand and trust your business." },
  { number: "03", slug: "backend-api-development", title: "Backend & APIs", description: "Well-structured APIs and business logic for products, integrations, and frontend teams." },
  { number: "04", slug: "existing-system-development", title: "Existing systems", description: "Improve, extend, and maintain software that already matters to your operation." },
];

const process = [
  ["01", "Discovery", "Understand the business, users, and outcome that matters."],
  ["02", "Planning", "Shape a practical scope, milestones, and technical direction."],
  ["03", "Development", "Build in focused iterations with regular, visible progress."],
  ["04", "Launch & support", "Ship carefully, then keep improving what we built together."],
];

export default function Home() {
  return (
    <main>

      <section className="hero section-shell" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-dot" /> Independent software development studio</p>
          <h1>Reliable software for <em>real</em> business needs.</h1>
          <p className="hero-intro">NasLabs helps businesses, startups, and organizations build practical web applications, websites, APIs, and digital systems.</p>
          <div className="hero-actions"><Button asChild className="button button-accent"><a href="#contact" data-analytics-event="start_conversation" data-analytics-category="cta">Start a conversation <ArrowUpRight aria-hidden="true" /></a></Button><a className="text-link" href="#services" data-analytics-event="explore_services" data-analytics-category="navigation">Explore services <ArrowDown aria-hidden="true" /></a></div>
        </div>
        <div className="hero-card" aria-label="NasLabs studio note">
          <div className="card-topline"><span>NASLABS / NOTE 01</span><span>2026</span></div>
          <div className="studio-note">
            <p>Good software begins with a clear understanding of the work it needs to support.</p>
            <span className="note-rule" />
            <p className="note-caption">A small, focused studio for useful digital products.</p>
          </div>
          <div className="hero-card-footer"><strong>Independent by design.</strong><span>Based in Indonesia · working globally</span></div>
        </div>
      </section>

      <section className="trust-strip" aria-label="NasLabs principles"><div className="section-shell trust-inner"><span>Working with businesses, startups, and teams</span><span>Web applications · websites · APIs</span></div></section>

      <section className="section-shell home-work section-block"><div className="section-heading"><p className="eyebrow">Selected work</p><h2>A little context<br /><em>goes a long way.</em></h2></div><div className="home-work-grid">{projects.map((project) => <Link href={`/work/${project.slug}`} key={project.slug}><Card className="work-card">{project.image && <Image className="work-card-image" src={project.image} alt={`${project.title} website screenshot`} width={1200} height={630} />}<CardHeader><span className="work-index">{project.category}</span><CardTitle>{project.title}</CardTitle></CardHeader><CardContent><p>{project.summary}</p><span className="text-link">Read case study <ArrowUpRight aria-hidden="true" /></span></CardContent></Card></Link>)}</div></section>

      <section className="section-shell section-block" id="services">
        <div className="section-heading"><p className="eyebrow">What we build</p><h2>Software that makes<br /><em>work clearer.</em></h2><p>Technology is a means to a useful outcome. We keep the scope grounded in your business and the implementation ready for change.</p></div>
        <div className="service-grid">{services.map((service) => <article className="service-card" key={service.number}><span className="service-number">{service.number}</span><h3>{service.title}</h3><p>{service.description}</p><Link className="service-arrow" href={`/services#${service.slug}`} aria-label={`Read more about ${service.title}`}>↗</Link></article>)}</div>
      </section>

      <section className="dark-panel" id="process"><div className="section-shell process-layout"><div className="section-heading light-heading"><p className="eyebrow">How we work</p><h2>Small steps.<br /><em>Strong foundations.</em></h2><p>A transparent process keeps decisions useful, progress visible, and delivery aligned with the original need.</p></div><div className="process-list">{process.map(([number, title, description]) => <div className="process-item" key={number}><span>{number}</span><div><h3>{title}</h3><p>{description}</p></div></div>)}</div></div></section>

      <section className="section-shell section-block about-layout" id="about"><div className="about-badge"><span>NL</span><small>FOUNDED<br />BY KINAS</small></div><div className="section-heading"><p className="eyebrow">A founder-led studio</p><h2>Engineering ideas into <em>digital products.</em></h2><p>NasLabs is founded and led by Rifki Anashirul (Kinas). It is a focused space for building reliable solutions, exploring better ways to work, and growing through real delivery.</p><div className="inline-links"><a className="text-link" href="#contact">Get to know NasLabs <ArrowUpRight aria-hidden="true" /></a><a className="text-link" href="/CV/CV_System%20Engineer.pdf" download="Rifki-Anashirul-CV-System-Engineer.pdf">Download CV <ArrowUpRight aria-hidden="true" /></a></div></div></section>

      <section className="section-shell tech-section"><p className="eyebrow">The toolkit</p><div className="tech-row"><span>Laravel</span><span>Next.js</span><span>TypeScript</span><span>PHP</span><span>PostgreSQL</span><span>Cloudflare</span></div></section>

      <section className="section-shell contact-panel" id="contact"><div><p className="eyebrow">Have a project in mind?</p><h2>Let&apos;s make it<br /><em>work.</em></h2></div><div className="contact-copy"><p>Tell us what you are trying to solve. We&apos;ll start with the problem, then find the right shape for the solution.</p><Button asChild className="button button-dark"><a href={`mailto:${siteConfig.contactEmail}`}>Start a conversation <ArrowUpRight aria-hidden="true" /></a></Button></div></section>

    </main>
  );
}
