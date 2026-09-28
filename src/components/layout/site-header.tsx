"use client";

import { Menu, Moon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Link, usePathname } from "@/i18n/navigation";
import { externalNavigation, primaryNavigation, supportingNavigation } from "@/config/navigation";

export function SiteHeader() {
  const t = useTranslations("Navigation");
  const locale = useLocale();
  const pathname = usePathname();
  const links = primaryNavigation.map((item) => ({ ...item, label: t(item.key) }));
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="v2-site-header">
      <div className="v2-site-header__inner">
        <Link className="v2-site-header__wordmark" href="/" aria-label="NasLabs home"><span className="v2-site-header__mark">N</span><span>NasLabs</span></Link>
        <nav className="v2-site-header__nav" aria-label={t("mainNavigation")}>
          {links.map((link) => <Link className="v2-interactive" href={link.href} key={link.href} aria-current={isActive(link.href) ? "page" : undefined}>{link.label}</Link>)}
          <a className="v2-interactive v2-site-header__external" href={externalNavigation[0].href} target="_blank" rel="noopener noreferrer">{t(externalNavigation[0].key)} <span className="v2-site-header__external-mark" aria-hidden="true">↗</span></a>
        </nav>
        <div className="v2-site-header__actions">
          <Link className="v2-site-header__contact v2-interactive" href={supportingNavigation[0].href}>{t(supportingNavigation[0].key)}</Link>
          <ThemeToggle />
          <div className="v2-site-header__languages" aria-label={t("language")}><Link className="v2-interactive" href={pathname} locale="en" aria-current={locale === "en" ? "page" : undefined}>EN</Link><span>/</span><Link className="v2-interactive" href={pathname} locale="id" aria-current={locale === "id" ? "page" : undefined}>ID</Link></div>
        </div>
        <Sheet>
          <SheetTrigger asChild><Button variant="v2-ghost" size="icon" className="v2-site-header__mobile-trigger" aria-label={t("menu")}><Menu aria-hidden="true" /></Button></SheetTrigger>
          <SheetContent className="v2-site-header__mobile-sheet">
            <SheetHeader><SheetTitle><Link className="v2-site-header__wordmark" href="/"><span className="v2-site-header__mark">N</span><span>NasLabs</span></Link></SheetTitle></SheetHeader>
            <nav className="v2-site-header__mobile-nav" aria-label={t("mobileNavigation")}>
              {links.map((link) => <Link className="v2-interactive" href={link.href} key={link.href} aria-current={isActive(link.href) ? "page" : undefined}>{link.label}</Link>)}
              <Link className="v2-interactive" href={supportingNavigation[0].href} aria-current={isActive(supportingNavigation[0].href) ? "page" : undefined}>{t(supportingNavigation[0].key)}</Link>
              <a className="v2-interactive v2-site-header__external" href={externalNavigation[0].href} target="_blank" rel="noopener noreferrer">{t(externalNavigation[0].key)} <span className="v2-site-header__external-mark" aria-hidden="true">↗</span></a>
              <div className="v2-site-header__mobile-theme"><Moon aria-hidden="true" size={16} /><ThemeToggle /></div>
              <div className="v2-site-header__mobile-languages"><span>{t("language")}</span><Link className="v2-interactive" href={pathname} locale="en" aria-current={locale === "en" ? "page" : undefined}>English</Link><Link className="v2-interactive" href={pathname} locale="id" aria-current={locale === "id" ? "page" : undefined}>Bahasa Indonesia</Link></div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
