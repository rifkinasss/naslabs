export function getReadingTimeMinutes(source: string): number {
  const words = source.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function formatNoteDate(value: string, locale: "en" | "id", style: "short" | "long" = "short"): string {
  return new Intl.DateTimeFormat(locale === "id" ? "id-ID" : "en-US", { year: "numeric", month: style, day: "numeric" }).format(new Date(`${value}T00:00:00Z`));
}
