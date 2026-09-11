"use client";

import { ArrowUpRight, Menu } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Link, usePathname } from "@/i18n/navigation";

export function SiteHeader() {
  const t = useTranslations("Navigation");
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="wordmark" href="/" aria-label="NasLabs home"><span className="wordmark-mark">N</span><span>NasLabs</span></Link>
        <NavigationMenu className="main-nav" viewport={false} aria-label="Main navigation"><NavigationMenuList><NavigationMenuItem><NavigationMenuLink asChild className={navigationMenuTriggerStyle()}><Link href="/services">{t("services")}</Link></NavigationMenuLink></NavigationMenuItem><NavigationMenuItem><NavigationMenuLink asChild className={navigationMenuTriggerStyle()}><Link href="/work">{t("work")}</Link></NavigationMenuLink></NavigationMenuItem><NavigationMenuItem><NavigationMenuLink asChild className={navigationMenuTriggerStyle()}><Link href="/about">{t("about")}</Link></NavigationMenuLink></NavigationMenuItem><li className="language-switch" aria-label={t("language")}><Link href={pathname} locale="en" aria-current={locale === "en" ? "page" : undefined}>EN</Link><span>/</span><Link href={pathname} locale="id" aria-current={locale === "id" ? "page" : undefined}>ID</Link></li></NavigationMenuList></NavigationMenu>
        <Button asChild className="button button-small button-dark header-cta"><Link href="/contact" data-analytics-event="start_project" data-analytics-category="cta">{t("startProject")} <ArrowUpRight aria-hidden="true" /></Link></Button>
        <Sheet>
          <SheetTrigger asChild><Button variant="ghost" size="icon" className="mobile-menu" aria-label="Open navigation"><Menu aria-hidden="true" /></Button></SheetTrigger>
          <SheetContent className="mobile-sheet"><SheetHeader><SheetTitle><Link className="wordmark" href="/"><span className="wordmark-mark">N</span><span>NasLabs</span></Link></SheetTitle></SheetHeader><nav className="mobile-nav" aria-label="Mobile navigation"><Link href="/services">{t("services")} <ArrowUpRight aria-hidden="true" /></Link><Link href="/work">{t("work")} <ArrowUpRight aria-hidden="true" /></Link><Link href="/about">{t("about")} <ArrowUpRight aria-hidden="true" /></Link><Link href="/contact">{t("startProject")} <ArrowUpRight aria-hidden="true" /></Link><div className="mobile-languages"><span>{t("language")}</span><Link href={pathname} locale="en">English</Link><Link href={pathname} locale="id">Bahasa Indonesia</Link></div></nav></SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
