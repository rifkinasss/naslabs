import type { NoteDocument } from "@/lib/content/notes";

import { NoteListItem } from "./note-list-item";

export function NoteList({ notes, locale, readingTimeLabel, readLabel }: { notes: NoteDocument[]; locale: "en" | "id"; readingTimeLabel: (minutes: number) => string; readLabel: string }) {
  return <div className="v2-note-list">{notes.map((note, index) => <NoteListItem key={note.metadata.slug} note={note} locale={locale} index={index + 1} readingTimeLabel={readingTimeLabel} readLabel={readLabel} />)}</div>;
}
