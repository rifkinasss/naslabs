import type { MetadataRoute } from "next";

import { projects } from "@/content/projects";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/services", "/work", "/about", "/contact"];
  return [...routes.map((route) => ({ url: `${siteConfig.url}${route}`, lastModified: new Date() })), ...projects.map((project) => ({ url: `${siteConfig.url}/work/${project.slug}`, lastModified: new Date() }))];
}
