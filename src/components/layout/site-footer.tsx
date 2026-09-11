import { ArrowUpRight, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/lib/site";
import { Link } from "@/i18n/navigation";

export function SiteFooter() {
  const t = useTranslations("Footer");
  const nav = useTranslations("Navigation");

  return (
    <footer className="site-footer">
      <div className="section-shell footer-inner">
        <div className="footer-brand"><Link className="wordmark" href="/" aria-label="NasLabs home"><span className="wordmark-mark">N</span><span>NasLabs</span></Link><p>{t("description").split("\n").map((line) => <span key={line}>{line}<br /></span>)}</p></div>
        <div className="footer-column"><span className="footer-label">{t("explore")}</span><Link href="/services">{nav("services")}</Link><Link href="/work">{nav("work")}</Link><Link href="/about">{nav("about")}</Link></div>
        <div className="footer-column footer-contact"><span className="footer-label">{t("conversation")}</span><a href={`mailto:${siteConfig.contactEmail}`} data-analytics-event="email_click" data-analytics-category="contact"><Mail aria-hidden="true" />{siteConfig.contactEmail}</a><Link href="/contact" data-analytics-event="start_project" data-analytics-category="cta">{t("tellUs")} <ArrowUpRight aria-hidden="true" /></Link></div>
      </div>
      <div className="section-shell footer-bottom"><span>© 2026 NasLabs</span><span>{t("location")}</span><Link href="#top">{t("backToTop")}</Link></div>
    </footer>
  );
}
