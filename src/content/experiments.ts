import { experimentSchema, localeSchema, type Experiment, type Locale } from "@/lib/content/contracts";

type LocalizedExperiment = Omit<Experiment, "title" | "description" | "category"> & {
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  category: Record<Locale, string>;
};

// Keep this list evidence-based. Empty is intentional until a real exploration is ready to publish.
const experiments: LocalizedExperiment[] = [];

function assertLocale(value: string): asserts value is Locale {
  if (!localeSchema.safeParse(value).success) throw new RangeError(`Unsupported Experiments locale: ${value}`);
}

function localizeExperiment(experiment: LocalizedExperiment, locale: Locale): Experiment {
  return experimentSchema.parse({
    ...experiment,
    title: experiment.title[locale],
    description: experiment.description[locale],
    category: experiment.category[locale],
  });
}

export function getAllExperiments(locale: string): Experiment[] {
  assertLocale(locale);
  return experiments
    .map((experiment) => localizeExperiment(experiment, locale))
    .sort((left, right) => right.year - left.year || left.slug.localeCompare(right.slug));
}

export function getExperimentBySlug(locale: string, slug: string): Experiment | null {
  return getAllExperiments(locale).find((experiment) => experiment.slug === slug) ?? null;
}
