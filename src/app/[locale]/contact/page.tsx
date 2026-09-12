import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { useTranslations } from "next-intl";

import { ContactForm } from "@/components/sections/contact-form";
import { siteConfig } from "@/lib/site";
import { localizedMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/contact">): Promise<Metadata> { const { locale } = await params; return localizedMetadata(locale as "en" | "id", "/contact", locale === "id" ? "Kontak" : "Contact", locale === "id" ? "Mulai percakapan tentang kebutuhan software Anda bersama NasLabs." : "Start a conversation about your software project with NasLabs."); }

export default function ContactPage() {
  const t = useTranslations("ContactPage");
  return <main className="inner-page section-shell contact-page"><div className="inner-hero"><p className="eyebrow"><span className="eyebrow-dot" /> {t("eyebrow")}</p><h1>{t("title").split("\n").map((line, index) => <span key={line}>{index > 0 && <br />}{index === 1 ? <em>{line}</em> : line}</span>)}</h1><p>{t("intro")}</p></div><div className="contact-layout"><ContactForm /><aside className="contact-aside"><div className="contact-email"><Mail aria-hidden="true" /><span>{t("preferEmail")}</span><a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a></div><p>{t("aside")}</p></aside></div></main>;
}
