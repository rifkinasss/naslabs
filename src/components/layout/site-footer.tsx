import { Mail } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/lib/site";
import { primaryNavigation, supportingNavigation } from "@/config/navigation";
import { BackToTop } from "@/components/ui/back-to-top";

export function SiteFooter() {
  const t = useTranslations("Footer");
  const nav = useTranslations("Navigation");

  return (
    <footer className="v2-site-footer">
      <div className="v2-site-footer__inner v2-container">
        <div className="v2-site-footer__brand"><Link className="v2-site-header__wordmark v2-interactive" href="/" aria-label="NasLabs home"><span className="v2-site-header__mark">N</span><span>NasLabs</span></Link><p className="v2-body-sm">{siteConfig.descriptor}</p><p className="v2-site-footer__principle">{siteConfig.principle}</p></div>
        <nav className="v2-site-footer__nav" aria-label={t("navigation")}><span className="v2-label">{t("navigation")}</span>{primaryNavigation.map((item) => <Link className="v2-interactive" href={item.href} key={item.href}>{nav(item.key)}</Link>)}{supportingNavigation.map((item) => <Link className="v2-interactive" href={item.href} key={item.href}>{nav(item.key)}</Link>)}</nav>
        <div className="v2-site-footer__contact"><span className="v2-label">{t("contact")}</span><a className="v2-interactive" href={`mailto:${siteConfig.contactEmail}`}><Mail aria-hidden="true" size={15} />{siteConfig.contactEmail}</a></div>
      </div>
      <div className="v2-site-footer__bottom v2-container"><span>© {new Date().getFullYear()} NasLabs</span><span>{siteConfig.principle}</span><BackToTop>{t("backToTop")}</BackToTop></div>
    </footer>
  );
}
