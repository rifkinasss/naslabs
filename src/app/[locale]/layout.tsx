import type { Metadata } from "next";
import "../globals.css";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Analytics } from "@/components/analytics";
import { Chatbot } from "@/components/sections/chatbot";
import { Toaster } from "@/components/ui/sonner";
import { siteConfig } from "@/lib/site";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: "NasLabs — Independent Software Development Studio", template: "%s | NasLabs" },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: "Rifki Anashirul", url: siteConfig.url }],
  creator: "Rifki Anashirul",
  publisher: siteConfig.name,
  alternates: { canonical: "/" },
  icons: { icon: "/icon.svg", shortcut: "/icon.svg", apple: "/icon.svg" },
  openGraph: { title: "NasLabs — Independent Software Development Studio", description: siteConfig.description, url: siteConfig.url, siteName: siteConfig.name, type: "website", locale: "en_US", images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "NasLabs — Independent Software Development Studio" }] },
  twitter: { card: "summary_large_image", title: "NasLabs — Independent Software Development Studio", description: siteConfig.description, images: ["/opengraph-image"] },
};

export function generateStaticParams() {
  return ["en", "id"].map((locale) => ({ locale }));
}

export default async function RootLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) notFound();
  const messages = await getMessages();

  return (
    <html lang={locale} className="h-full antialiased">
      <body className="min-h-full flex flex-col"><NextIntlClientProvider messages={messages}><SiteHeader />{children}<SiteFooter /><Chatbot /><Toaster /><Analytics /></NextIntlClientProvider><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "ProfessionalService", name: siteConfig.name, url: siteConfig.url, description: siteConfig.description, founder: { "@type": "Person", name: "Rifki Anashirul", alternateName: "Kinas" }, areaServed: "Worldwide", serviceType: "Software development" }) }} /></body>
    </html>
  );
}
