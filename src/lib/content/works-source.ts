import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

import { localeSchema, workSchema, workSlugSchema, type Locale, type Work } from "./contracts.ts";

export type WorkDocument = {
  metadata: Work;
  body: string;
  sourcePath: string;
};

const worksDirectory = path.resolve(process.cwd(), "content", "works");
const supportedExtension = ".mdx";

function assertLocale(value: string): asserts value is Locale {
  if (!localeSchema.safeParse(value).success) {
    throw new RangeError(`Unsupported Works locale: ${value}`);
  }
}

function assertSafeSlug(value: string): string {
  const result = workSlugSchema.safeParse(value);
  if (!result.success) {
    throw new RangeError(`Invalid Work slug: ${value}`);
  }
  return result.data;
}

function localeDirectory(locale: Locale): string {
  return path.join(worksDirectory, locale);
}

function parseWork(sourcePath: string): WorkDocument {
  const source = fs.readFileSync(sourcePath, "utf8");
  const parsed = matter(source);
  const result = workSchema.safeParse(parsed.data);

  if (!result.success) {
    const issues = result.error.issues
      .map((issue) => `${issue.path.join(".") || "frontmatter"}: ${issue.message}`)
      .join("; ");
    throw new Error(`Invalid Work frontmatter in ${sourcePath}: ${issues}`);
  }

  const expectedLocale = path.basename(path.dirname(sourcePath));
  if (result.data.locale !== expectedLocale) {
    throw new Error(`Work locale mismatch in ${sourcePath}: expected ${expectedLocale}, received ${result.data.locale}`);
  }

  return {
    metadata: result.data,
    body: parsed.content.trim(),
    sourcePath,
  };
}

function workFiles(locale: Locale): string[] {
  const directory = localeDirectory(locale);
  if (!fs.existsSync(directory)) return [];

  return fs.readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && path.extname(entry.name) === supportedExtension)
    .map((entry) => path.join(directory, entry.name))
    .sort((left, right) => left.localeCompare(right));
}

function sortWorks(items: WorkDocument[]): WorkDocument[] {
  return [...items].sort((left, right) => {
    const featuredOrder = Number(right.metadata.featured) - Number(left.metadata.featured);
    if (featuredOrder !== 0) return featuredOrder;

    const yearOrder = (right.metadata.year ?? 0) - (left.metadata.year ?? 0);
    if (yearOrder !== 0) return yearOrder;

    return left.metadata.slug.localeCompare(right.metadata.slug);
  });
}

export function getAllWorks(locale: string): WorkDocument[] {
  assertLocale(locale);
  return sortWorks(workFiles(locale).map(parseWork));
}

export function getFeaturedWorks(locale: string): WorkDocument[] {
  return getAllWorks(locale).filter((work) => work.metadata.featured);
}

export function getWorkBySlug(locale: string, slug: string): WorkDocument | null {
  assertLocale(locale);
  const safeSlug = assertSafeSlug(slug);
  const sourcePath = path.join(localeDirectory(locale), `${safeSlug}${supportedExtension}`);

  if (!fs.existsSync(sourcePath)) return null;
  return parseWork(sourcePath);
}

export function getWorkSlugs(locale: string): string[] {
  return getAllWorks(locale).map((work) => work.metadata.slug);
}
