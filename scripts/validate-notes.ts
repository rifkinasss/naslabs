import assert from "node:assert/strict";

import { getAllNotes, getLatestNotes, getNoteBySlug, getPublishedNotes } from "../src/lib/content/notes-source.ts";
import { localeSchema, noteSchema } from "../src/lib/content/contracts.ts";

const valid = noteSchema.safeParse({
  slug: "content-boundaries",
  locale: "en",
  title: "Content boundaries",
  description: "A short note about content architecture.",
  publishedAt: "2026-09-26",
  draft: false,
});
assert.equal(valid.success, true);

const draft = noteSchema.safeParse({
  slug: "draft-note",
  locale: "en",
  title: "Draft note",
  description: "Not public yet.",
  publishedAt: "2026-09-26",
  draft: true,
});
assert.equal(draft.success, true);
assert.equal(draft.success && draft.data.draft, true);

assert.equal(noteSchema.safeParse({ ...valid.data, publishedAt: "26-09-2026" }).success, false);
assert.equal(noteSchema.safeParse({ ...valid.data, locale: "fr" }).success, false);
assert.equal(localeSchema.safeParse("fr").success, false);
assert.deepEqual(getAllNotes("en"), []);
assert.deepEqual(getPublishedNotes("id"), []);
assert.deepEqual(getLatestNotes("en", 3), []);
assert.equal(getNoteBySlug("en", "missing-note"), null);
assert.throws(() => getAllNotes("fr"), /Unsupported Notes locale/);
assert.throws(() => getNoteBySlug("en", "..\/package"), /Invalid Note slug/);

console.log("Validated Note contract, draft representation, locale isolation, empty public dataset, and slug safety.");
