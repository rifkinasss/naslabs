import { ArrowUpRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { SelectedAchievements } from "@/components/about/selected-achievements";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/lib/site";

const areaKeys = ["web", "data", "systems", "infrastructure"] as const;
const philosophyKeys = ["build", "learn", "explore"] as const;

export function AboutPage() {
  const locale = useLocale();
  const t = useTranslations("AboutPage");
  const cv = siteConfig.cvByLocale[locale as "en" | "id"];

  return <main className="v2-scope v2-about-page"><section className="v2-about-page__intro"><Container><Reveal as="p" className="v2-label">{t("eyebrow")}</Reveal><div className="v2-about-page__intro-grid"><Reveal as="h1" className="v2-display" delay={70}>{t("introTitle")}</Reveal><div className="v2-about-page__intro-copy"><Reveal as="p" className="v2-body-lg" delay={140}>{t("introLead")}</Reveal><Reveal as="p" delay={200}>{t("introBody")}</Reveal><Reveal as="p" className="v2-about-page__principle" delay={270}>{siteConfig.principle}</Reveal></div></div></Container></section><section className="v2-about-page__section"><Container><Reveal className="v2-about-page__section-heading"><span className="v2-label">01</span><div><h2 className="v2-h2">{t("whatTitle")}</h2><p>{t("whatDescription")}</p></div></Reveal><Reveal className="v2-about-page__areas"><>{areaKeys.map((key) => <article key={key}><span className="v2-caption">{t(`areas.${key}.label`)}</span><h3 className="v2-h3">{t(`areas.${key}.title`)}</h3><p>{t(`areas.${key}.description`)}</p></article>)}</></Reveal></Container></section><section className="v2-about-page__section v2-about-page__philosophy"><Container><Reveal className="v2-about-page__section-heading"><span className="v2-label">02</span><div><h2 className="v2-h2">{t("philosophyTitle")}</h2><p>{t("philosophyDescription")}</p></div></Reveal><Reveal className="v2-about-page__philosophy-list"><>{philosophyKeys.map((key, index) => <article key={key}><span className="v2-caption">{String(index + 1).padStart(2, "0")}</span><h3 className="v2-h3">{t(`philosophy.${key}.title`)}</h3><p>{t(`philosophy.${key}.description`)}</p></article>)}</></Reveal></Container></section><section className="v2-about-page__section"><Container><div className="v2-about-page__profile"><Reveal><div><span className="v2-label">03 / {t("profileLabel")}</span><h2 className="v2-h2">{t("profileTitle")}</h2><p>{t("bio1")}</p><p>{t("bio2")}</p></div></Reveal><Reveal className="v2-about-page__profile-meta" distance={12}><dl><div><dt>{t("education")}</dt><dd>{t("educationDegree")}</dd></div><div><dt>{t("focus")}</dt><dd>Web engineering<br />Digital products</dd></div><div><dt>{t("basedIn")}</dt><dd>Indonesia</dd></div></dl></Reveal></div></Container></section><SelectedAchievements /><section className="v2-about-page__cta"><Container><Reveal><div><span className="v2-label">05 / {t("ctaEyebrow")}</span><h2 className="v2-h2">{t("ctaTitle")}</h2></div></Reveal><Reveal className="v2-about-page__cta-links-motion" delay={100}><div className="v2-about-page__cta-links"><a className="v2-arrow-link" href={cv.url} download={cv.downloadName}>{t("downloadCv")} <ArrowUpRight aria-hidden="true" /></a><Link className="v2-arrow-link" href="/contact">{t("ctaLink")} <ArrowUpRight aria-hidden="true" /></Link></div></Reveal></Container></section></main>;
}
