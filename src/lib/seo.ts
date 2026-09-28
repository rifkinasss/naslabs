import type { Metadata } from "next";

import type { Locale } from "@/i18n/routing";
import { siteConfig } from "@/lib/site";

const copy = {
  en: {
    title: "NasLabs — Personal Digital Lab",
    description: "NasLabs is Rifki Anashirul's personal digital lab for building, learning, and exploring across web, data, systems, and infrastructure.",
  },
  id: {
    title: "NasLabs — Personal Digital Lab",
    description: "NasLabs adalah personal digital lab Rifki Anashirul untuk membangun, belajar, dan menjelajahi web, data, sistem, dan infrastruktur.",
  },
} satisfies Record<Locale, { title: string; description: string }>;

export function localizedMetadata(locale: Locale, path = "", title?: string, description?: string, options?: { availableLocales?: Locale[] }): Metadata {
  const localizedPath = locale === "en" ? path : `/id${path}`;
  const url = `${siteConfig.url}${localizedPath}`;
  const languagePath = path || "/";
  const availableLocales = options?.availableLocales ?? ["en", "id"];
  const languages: Record<string, string> = {};
  if (availableLocales.includes("en")) languages.en = `${siteConfig.url}${languagePath === "/" ? "" : languagePath}`;
  if (availableLocales.includes("id")) languages.id = `${siteConfig.url}/id${languagePath}`;
  if (availableLocales.includes("en")) languages["x-default"] = languages.en;

  const resolvedTitle = title ? (title.includes(siteConfig.name) ? title : `${title} — ${siteConfig.name}`) : copy[locale].title;
  const resolvedDescription = description ?? copy[locale].description;

  return {
    metadataBase: new URL(siteConfig.url),
    title: resolvedTitle,
    description: resolvedDescription,
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      title: resolvedTitle,
      description: resolvedDescription,
      url,
      siteName: siteConfig.name,
      type: "website",
      locale: locale === "id" ? "id_ID" : "en_US",
      alternateLocale: locale === "id" ? ["en_US"] : ["id_ID"],
    },
  };
}
