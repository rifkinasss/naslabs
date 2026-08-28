"use client";

import Link from "next/link";
import { ArrowUpRight, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="wordmark" href="/" aria-label="NasLabs home"><span className="wordmark-mark">N</span><span>NasLabs</span></Link>
        <NavigationMenu className="main-nav" viewport={false} aria-label="Main navigation"><NavigationMenuList><NavigationMenuItem><NavigationMenuLink asChild className={navigationMenuTriggerStyle()}><Link href="/services">Services</Link></NavigationMenuLink></NavigationMenuItem><NavigationMenuItem><NavigationMenuLink asChild className={navigationMenuTriggerStyle()}><Link href="/work">Work</Link></NavigationMenuLink></NavigationMenuItem><NavigationMenuItem><NavigationMenuLink asChild className={navigationMenuTriggerStyle()}><Link href="/about">About</Link></NavigationMenuLink></NavigationMenuItem><li className="language-switch" aria-label="Choose language"><Link href="/">EN</Link><span>/</span><Link href="/id">ID</Link></li></NavigationMenuList></NavigationMenu>
        <Button asChild className="button button-small button-dark header-cta"><Link href="/contact" data-analytics-event="start_project" data-analytics-category="cta">Start a project <ArrowUpRight aria-hidden="true" /></Link></Button>
        <Sheet>
          <SheetTrigger asChild><Button variant="ghost" size="icon" className="mobile-menu" aria-label="Open navigation"><Menu aria-hidden="true" /></Button></SheetTrigger>
          <SheetContent className="mobile-sheet"><SheetHeader><SheetTitle><Link className="wordmark" href="/"><span className="wordmark-mark">N</span><span>NasLabs</span></Link></SheetTitle></SheetHeader><nav className="mobile-nav" aria-label="Mobile navigation"><Link href="/services">Services <ArrowUpRight aria-hidden="true" /></Link><Link href="/work">Work <ArrowUpRight aria-hidden="true" /></Link><Link href="/about">About <ArrowUpRight aria-hidden="true" /></Link><Link href="/contact">Start a project <ArrowUpRight aria-hidden="true" /></Link><div className="mobile-languages"><span>Language</span><Link href="/">English</Link><Link href="/id">Bahasa Indonesia</Link></div></nav></SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
