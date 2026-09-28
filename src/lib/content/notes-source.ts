import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

import { localeSchema, noteSchema, workSlugSchema, type Locale, type Note } from "./contracts.ts";

export type NoteDocument = { metadata: Note; body: string; sourcePath: string };

const notesDirectory = path.resolve(process.cwd(), "content", "notes");

function assertLocale(value: string): asserts value is Locale {
  if (!localeSchema.safeParse(value).success) throw new RangeError(`Unsupported Notes locale: ${value}`);
}

function assertSafeSlug(value: string): string {
  const result = workSlugSchema.safeParse(value);
  if (!result.success) throw new RangeError(`Invalid Note slug: ${value}`);
  return result.data;
}

function parseNote(sourcePath: string): NoteDocument {
  const parsed = matter(fs.readFileSync(sourcePath, "utf8"));
  const result = noteSchema.safeParse({ ...parsed.data, body: parsed.content.trim() });
  if (!result.success) {
    const issues = result.error.issues.map((issue) => `${issue.path.join(".") || "frontmatter"}: ${issue.message}`).join("; ");
    throw new Error(`Invalid Note frontmatter in ${sourcePath}: ${issues}`);
  }
  const expectedLocale = path.basename(path.dirname(sourcePath));
  if (result.data.locale !== expectedLocale) throw new Error(`Note locale mismatch in ${sourcePath}: expected ${expectedLocale}, received ${result.data.locale}`);
  return { metadata: result.data, body: parsed.content.trim(), sourcePath };
}

function noteFiles(locale: Locale): string[] {
  const directory = path.join(notesDirectory, locale);
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && path.extname(entry.name) === ".mdx")
    .map((entry) => path.join(directory, entry.name))
    .sort((left, right) => left.localeCompare(right));
}

function sortNotes(items: NoteDocument[]): NoteDocument[] {
  return [...items].sort((left, right) => right.metadata.publishedAt.localeCompare(left.metadata.publishedAt) || left.metadata.slug.localeCompare(right.metadata.slug));
}

export function getAllNotes(locale: string): NoteDocument[] {
  assertLocale(locale);
  return sortNotes(noteFiles(locale).map(parseNote));
}

export function getPublishedNotes(locale: string): NoteDocument[] {
  return getAllNotes(locale).filter((note) => !note.metadata.draft);
}

export function getLatestNotes(locale: string, limit = 3): NoteDocument[] {
  return getPublishedNotes(locale).slice(0, Math.max(0, limit));
}

export function getNoteBySlug(locale: string, slug: string): NoteDocument | null {
  assertLocale(locale);
  const safeSlug = assertSafeSlug(slug);
  const sourcePath = path.join(notesDirectory, locale, `${safeSlug}.mdx`);
  if (!fs.existsSync(sourcePath)) return null;
  const note = parseNote(sourcePath);
  return note.metadata.draft ? null : note;
}

export function getNoteSlugs(locale: string): string[] {
  return getPublishedNotes(locale).map((note) => note.metadata.slug);
}
