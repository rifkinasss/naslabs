import { z } from "zod";

export const localeSchema = z.enum(["en", "id"]);
export const workStatusSchema = z.enum(["completed", "in-progress", "archived", "concept"]);
export const localAssetPathSchema = z.string().regex(/^\/[A-Za-z0-9._~!$&'()*+,;=:@%/-]+$/, "cover must be a local public asset path");
export const workSlugSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug must contain lowercase letters, numbers, and hyphens only");

export const workSchema = z.object({
  slug: workSlugSchema,
  locale: localeSchema,
  title: z.string().min(1),
  description: z.string().min(1),
  year: z.number().int().min(1900).max(2200).optional(),
  category: z.string().min(1),
  featured: z.boolean(),
  cover: localAssetPathSchema,
  stack: z.array(z.string()),
  role: z.string().min(1),
  status: workStatusSchema,
  externalUrl: z.string().url().optional(),
  repositoryUrl: z.string().url().optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
}).strict();

export const experimentLinkSchema = z.object({
  label: z.string().min(1),
  url: z.string().url(),
});

export const experimentStatusSchema = z.enum(["active", "paused", "completed", "archived"]);

export const experimentSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  category: z.string().min(1),
  year: z.number().int(),
  status: experimentStatusSchema,
  technologies: z.array(z.string()),
  links: z.array(experimentLinkSchema),
  image: z.string().min(1).optional(),
});

export const noteSummarySchema = z.object({
  slug: z.string().min(1),
  locale: localeSchema,
  title: z.string().min(1),
  description: z.string().min(1),
  publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "publishedAt must use YYYY-MM-DD"),
  updatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "updatedAt must use YYYY-MM-DD").optional(),
  category: z.string().min(1).optional(),
  tags: z.array(z.string().min(1)).optional(),
  cover: localAssetPathSchema.optional(),
  draft: z.boolean().default(false),
});

export const noteSchema = noteSummarySchema.extend({
  body: z.string().optional(),
});

export const navigationItemSchema = z.object({
  key: z.string().min(1),
  label: z.string().min(1),
  href: z.string().min(1).optional(),
  externalUrl: z.string().url().optional(),
  visible: z.boolean().optional(),
  legacy: z.boolean().optional(),
});

export type Locale = z.infer<typeof localeSchema>;
export type Work = z.infer<typeof workSchema>;
export type Experiment = z.infer<typeof experimentSchema>;
export type NoteSummary = z.infer<typeof noteSummarySchema>;
export type Note = z.infer<typeof noteSchema>;
export type NavigationItem = z.infer<typeof navigationItemSchema>;
