import type { Metadata } from "next";
import "../globals.css";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Analytics } from "@/components/analytics";
import { Toaster } from "@/components/ui/sonner";
import { siteConfig } from "@/lib/site";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { localizedMetadata } from "@/lib/seo";
import { SkipLink } from "@/components/ui/skip-link";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Traveller } from "@/components/motion/traveller";

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const seo = localizedMetadata(locale as "en" | "id");
  return { metadataBase: new URL(siteConfig.url), ...seo, title: { default: seo.title as string, template: "%s" }, applicationName: siteConfig.name, authors: [{ name: "Rifki Anashirul", url: siteConfig.url }], creator: "Rifki Anashirul", publisher: siteConfig.name, icons: { icon: "/icon.svg", shortcut: "/icon.svg", apple: "/icon.svg" }, twitter: { card: "summary_large_image", title: seo.title as string, description: seo.description, images: [`${siteConfig.url}/opengraph-image`] } };
}

export function generateStaticParams() {
  return ["en", "id"].map((locale) => ({ locale }));
}

export default async function RootLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) notFound();
  const messages = await getMessages();

  return (
    <div lang={locale} className="contents"><SkipLink /><ThemeProvider defaultTheme="system" enableSystem disableTransitionOnChange><NextIntlClientProvider messages={messages}><Traveller /><SiteHeader />{children}<SiteFooter /><Toaster /><Analytics /></NextIntlClientProvider></ThemeProvider><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": [{ "@type": "WebSite", name: siteConfig.name, url: siteConfig.url, description: siteConfig.description, inLanguage: ["en", "id"] }, { "@type": "Person", name: "Rifki Anashirul", alternateName: "Kinas", url: `${siteConfig.url}/about` }] }) }} /></div>
  );
}
