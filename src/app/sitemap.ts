import type { MetadataRoute } from "next";

import { getAllExperiments } from "@/content/experiments";
import { getAllWorks } from "@/lib/content/works";
import { getPublishedNotes } from "@/lib/content/notes";
import { siteConfig } from "@/lib/site";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const hasExperiments = routing.locales.some((locale) => getAllExperiments(locale).length > 0);
  const hasNotes = routing.locales.some((locale) => getPublishedNotes(locale).length > 0);
  const routes = ["", "/works", ...(hasExperiments ? ["/experiments"] : []), ...(hasNotes ? ["/notes"] : []), "/about", "/contact"];
  const localizedRoutes = routing.locales.flatMap((locale) => routes.map((route) => ({
    url: `${siteConfig.url}${locale === routing.defaultLocale ? route : `/${locale}${route}`}`,
  })));
  return [...localizedRoutes, ...routing.locales.flatMap((locale) => getAllWorks(locale).map((work) => ({
    url: `${siteConfig.url}${locale === routing.defaultLocale ? "" : `/${locale}`}/works/${work.metadata.slug}`,
  }))), ...routing.locales.flatMap((locale) => getPublishedNotes(locale).map((note) => ({
    url: `${siteConfig.url}${locale === routing.defaultLocale ? "" : `/${locale}`}/notes/${note.metadata.slug}`,
    lastModified: new Date(note.metadata.updatedAt ?? note.metadata.publishedAt),
  })))];
}
