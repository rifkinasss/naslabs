import type { Metadata } from "next";
import { getLocale } from "next-intl/server";

import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  authors: [{ name: "Rifki Anashirul", url: siteConfig.url }],
  creator: "Rifki Anashirul",
  publisher: siteConfig.name,
  icons: { icon: "/icon.svg", shortcut: "/icon.svg", apple: "/icon.svg" },
  twitter: { card: "summary_large_image", images: [`${siteConfig.url}/opengraph-image`] },
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale();
  return <html lang={locale}><body id="main-content" className="min-h-full flex flex-col">{children}</body></html>;
}
