import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { localizedMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/services">): Promise<Metadata> { const { locale } = await params; return localizedMetadata(locale as "en" | "id", "/services", locale === "id" ? "Layanan" : "Services", locale === "id" ? "Layanan pengembangan software praktis dari NasLabs." : "Practical software development services from NasLabs."); }
const serviceKeys = ["custom", "website", "backend", "existing"] as const;

export default function ServicesPage() {
  const t = useTranslations("ServicesPage");
  return <main className="inner-page section-shell"><div className="inner-hero"><p className="eyebrow"><span className="eyebrow-dot" /> {t("eyebrow")}</p><h1>{t("title").split("\n").map((line, index) => <span key={line}>{index > 0 && <br />}{index === 1 ? <em>{line}</em> : line}</span>)}</h1><p>{t("intro")}</p></div><div className="service-detail-list">{serviceKeys.map((key, index) => <article className="service-detail" key={key}><span className="service-number">{String(index + 1).padStart(2, "0")}</span><div><h2>{t(`items.${key}.title`)}</h2><p>{t(`items.${key}.description`)}</p></div><ul>{(t.raw(`items.${key}.deliverables`) as string[]).map((item) => <li key={item}>{item}</li>)}</ul></article>)}</div><section className="page-cta"><div><p className="eyebrow">{t("ctaEyebrow")}</p><h2>{t("ctaTitle").split("\n").map((line, index) => <span key={line}>{index > 0 && <br />}{index === 1 ? <em>{line}</em> : line}</span>)}</h2></div><Link className="text-link" href="/contact">{t("ctaLink")} <ArrowUpRight aria-hidden="true" /></Link></section></main>;
}
