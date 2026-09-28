import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { useTranslations } from "next-intl";

import { ContactForm } from "@/components/sections/contact-form";
import { siteConfig } from "@/lib/site";
import { localizedMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/contact">): Promise<Metadata> { const { locale } = await params; return localizedMetadata(locale as "en" | "id", "/contact", locale === "id" ? "Kontak" : "Contact", locale === "id" ? "Mulai percakapan tentang kebutuhan software Anda bersama NasLabs." : "Start a conversation about your software project with NasLabs."); }

export default function ContactPage() {
  const t = useTranslations("ContactPage");
  return <main className="v2-scope v2-contact-page"><section className="v2-contact-page__intro"><div className="v2-container"><p className="v2-label v2-contact-page__eyebrow">{t("eyebrow")} / {t("startLabel")}</p><div className="v2-contact-page__intro-grid"><div><h1 className="v2-display">{t("titleV2")}</h1><p className="v2-body-lg">{t("introV2")}</p></div><aside className="v2-contact-page__roadmap" aria-label={t("roadmapLabel")}><span className="v2-label">{t("roadmapLabel")}</span><div className="v2-contact-page__roadmap-list"><div><span>01</span><p><strong>{t("roadmap.context")}</strong>{t("roadmap.contextText")}</p></div><div><span>02</span><p><strong>{t("roadmap.direction")}</strong>{t("roadmap.directionText")}</p></div><div><span>03</span><p><strong>{t("roadmap.message")}</strong>{t("roadmap.messageText")}</p></div></div></aside></div></div></section><section className="v2-contact-page__body"><div className="v2-container"><div className="v2-contact-workspace"><header className="v2-contact-workspace__heading"><span className="v2-label">{t("workspaceEyebrow")}</span><p>{t("workspaceIntro")}</p></header><ContactForm /><div className="v2-contact-page__email"><span>{t("preferEmail")}</span><a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}<Mail aria-hidden="true" size={15} /></a></div></div></div></section></main>;
}
