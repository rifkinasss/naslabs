import { ArrowUpRight } from "lucide-react";

import { Link } from "@/i18n/navigation";
import type { NoteDocument } from "@/lib/content/notes";
import { formatNoteDate, getReadingTimeMinutes } from "@/lib/content/reading-time";

export function NoteListItem({ note, locale, index, readingTimeLabel, readLabel }: { note: NoteDocument; locale: "en" | "id"; index: number; readingTimeLabel: (minutes: number) => string; readLabel: string }) {
  const minutes = getReadingTimeMinutes(note.body);
  return <article className="v2-note-item"><span className="v2-note-item__index" aria-hidden="true">{String(index).padStart(2, "0")}</span><div className="v2-note-item__content"><div className="v2-note-item__heading"><div>{note.metadata.category ? <p className="v2-label">{note.metadata.category}</p> : null}<h2 className="v2-h3"><Link href={`/notes/${note.metadata.slug}`}>{note.metadata.title}</Link></h2></div><time className="v2-caption" dateTime={note.metadata.publishedAt}>{formatNoteDate(note.metadata.publishedAt, locale)}</time></div><p className="v2-note-item__description">{note.metadata.description}</p><div className="v2-note-item__details"><span>{readingTimeLabel(minutes)}</span>{note.metadata.tags?.length ? <span>{note.metadata.tags.join(" · ")}</span> : null}</div><Link className="v2-arrow-link v2-note-item__link" href={`/notes/${note.metadata.slug}`}>{readLabel} <ArrowUpRight aria-hidden="true" size={14} /></Link></div></article>;
}
