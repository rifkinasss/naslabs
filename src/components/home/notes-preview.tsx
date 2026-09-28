import { useTranslations } from "next-intl";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import type { Locale } from "@/lib/content/contracts";
import type { NoteDocument } from "@/lib/content/notes";
import { formatNoteDate, getReadingTimeMinutes } from "@/lib/content/reading-time";
import { Link } from "@/i18n/navigation";

export function NotesPreview({ notes, locale, sectionNumber }: { notes: NoteDocument[]; locale: Locale; sectionNumber: number }) {
  const t = useTranslations("HomeV2");

  return (
    <Section className="v2-home__section v2-home__notes">
      <Container>
        <SectionHeader eyebrow={`${String(sectionNumber).padStart(2, "0")} / ${t("notes.eyebrow")}`} title={t("notes.title")} description={t("notes.description")} />
        <div className="v2-home__notes-preview"><div>{notes.map((note) => <Link className="v2-home__note-row" href={`/notes/${note.metadata.slug}`} key={note.metadata.slug}><span className="v2-caption">{formatNoteDate(note.metadata.publishedAt, locale)}</span><span><strong>{note.metadata.title}</strong><small>{note.metadata.category ?? t("notes.label")} · {getReadingTimeMinutes(note.body)} {t("notes.minutes")}</small></span></Link>)}</div><Link className="v2-arrow-link" href="/notes">{t("notes.viewAll")} <span aria-hidden="true">↗</span></Link></div>
      </Container>
    </Section>
  );
}
