import type { Metadata } from "next";
import { Mail } from "lucide-react";

import { ContactForm } from "@/components/sections/contact-form";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = { title: "Contact", description: "Start a conversation about your software project with NasLabs.", alternates: { canonical: "/contact" } };

export default function ContactPage() {
  return <main className="inner-page section-shell contact-page"><div className="inner-hero"><p className="eyebrow"><span className="eyebrow-dot" /> Contact</p><h1>Start with the<br /><em>problem.</em></h1><p>Tell us what you are trying to solve, what you have tried, or what is still unclear. A useful first conversation does not need a perfect brief.</p></div><div className="contact-layout"><ContactForm /><aside className="contact-aside"><div className="contact-email"><Mail aria-hidden="true" /><span>Prefer email?</span><a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a></div><p>For a project discussion, include any useful context around the business, current system, desired outcome, and timing.</p></aside></div></main>;
}
