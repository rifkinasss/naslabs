import type { Metadata } from "next";

import type { Locale } from "@/i18n/routing";
import { siteConfig } from "@/lib/site";

const copy = {
  en: {
    title: "Independent Software Development Studio",
    description: "NasLabs builds reliable web applications, websites, APIs, and digital systems for real business needs.",
  },
  id: {
    title: "Studio Pengembangan Software Independen",
    description: "NasLabs membangun aplikasi web, website, API, dan sistem digital yang dapat diandalkan untuk kebutuhan bisnis nyata.",
  },
} satisfies Record<Locale, { title: string; description: string }>;

export function localizedMetadata(locale: Locale, path = "", title?: string, description?: string): Metadata {
  const localizedPath = locale === "en" ? path : `/id${path}`;
  const url = `${siteConfig.url}${localizedPath}`;
  const languagePath = path || "/";

  return {
    title: title ?? copy[locale].title,
    description: description ?? copy[locale].description,
    alternates: {
      canonical: url,
      languages: {
        en: `${siteConfig.url}${languagePath === "/" ? "" : languagePath}`,
        id: `${siteConfig.url}/id${languagePath}`,
        "x-default": `${siteConfig.url}${languagePath === "/" ? "" : languagePath}`,
      },
    },
    openGraph: {
      title: title ?? copy[locale].title,
      description: description ?? copy[locale].description,
      url,
      siteName: siteConfig.name,
      type: "website",
      locale: locale === "id" ? "id_ID" : "en_US",
      alternateLocale: locale === "id" ? ["en_US"] : ["id_ID"],
    },
  };
}
