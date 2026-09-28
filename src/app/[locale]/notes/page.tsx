import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { NoteList } from "@/components/notes/note-list";
import { getPublishedNotes } from "@/lib/content/notes";
import { localizedMetadata } from "@/lib/seo";

type NotesPageParams = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: NotesPageParams): Promise<Metadata> {
  const { locale } = await params;
  const isId = locale === "id";
  return localizedMetadata(locale as "en" | "id", "/notes", isId ? "Catatan" : "Notes", isId ? "Catatan dari proses membangun, menjelajah, dan mempelajari sesuatu." : "Notes from the process of building, exploring, and learning.");
}

export default async function NotesPage({ params }: NotesPageParams) {
  const { locale } = await params;
  const typedLocale = locale as "en" | "id";
  const t = await getTranslations("NotesV2");
  const notes = getPublishedNotes(locale);

  return <main className="v2-scope v2-notes-page"><section className="v2-notes-page__intro"><Container><SectionHeader eyebrow={t("eyebrow")} title={t("title")} description={t("description")} /></Container></section><section className="v2-notes-page__archive"><Container>{notes.length > 0 ? <NoteList notes={notes} locale={typedLocale} readingTimeLabel={(minutes) => t("readingTime", { minutes })} readLabel={t("readNote")} /> : <div className="v2-notes-page__empty"><span className="v2-label">{t("empty.label")}</span><h2 className="v2-h2">{t("empty.title")}</h2><p className="v2-body-lg">{t("empty.description")}</p></div>}</Container></section></main>;
}
