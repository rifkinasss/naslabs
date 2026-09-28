import assert from "node:assert/strict";

import {
  getAllWorks,
  getFeaturedWorks,
  getWorkBySlug,
  getWorkSlugs,
} from "../src/lib/content/works-source.ts";
import { workSchema } from "../src/lib/content/contracts.ts";

const englishWorks = getAllWorks("en");
const indonesianWorks = getAllWorks("id");

assert.equal(englishWorks.length, 3);
assert.equal(indonesianWorks.length, 3);
assert.equal(getWorkBySlug("en", "pondflow")?.metadata.locale, "en");
assert.equal(getWorkBySlug("id", "pondflow")?.metadata.locale, "id");
assert.equal(getWorkBySlug("en", "missing-work"), null);
assert.deepEqual(getWorkSlugs("en"), ["pondflow", "cloud", "tanamin-bumi"]);
assert.deepEqual(getFeaturedWorks("en").map((work) => work.metadata.slug), ["pondflow"]);
assert.match(getWorkBySlug("en", "pondflow")?.body ?? "", /The challenge/);

assert.throws(() => getAllWorks("fr"), /Unsupported Works locale/);
assert.throws(() => getWorkBySlug("en", "..\/package"), /Invalid Work slug/);

const malformed = workSchema.safeParse({
  slug: "Invalid Slug",
  locale: "en",
  title: "Malformed",
  description: "Missing controlled status",
  category: "Test",
  featured: false,
  cover: "https://example.com/cover.png",
  stack: [],
  role: "Test",
  status: "done",
});

assert.equal(malformed.success, false);
console.log(`Validated ${englishWorks.length} English and ${indonesianWorks.length} Indonesian Works.`);
