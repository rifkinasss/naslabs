import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { NoteProse } from "@/components/notes/note-prose";
import { Container } from "@/components/ui/container";
import { Link } from "@/i18n/navigation";
import { getNoteBySlug, getNoteSlugs } from "@/lib/content/notes";
import { formatNoteDate, getReadingTimeMinutes } from "@/lib/content/reading-time";
import { localizedMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

type NotePageParams = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return (["en", "id"] as const).flatMap((locale) => getNoteSlugs(locale).map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: NotePageParams): Promise<Metadata> {
  const { locale, slug } = await params;
  const note = getNoteBySlug(locale, slug);
  if (!note) return {};
  const availableLocales = (["en", "id"] as const).filter((candidate) => getNoteBySlug(candidate, slug)) as ("en" | "id")[];
  const metadata = localizedMetadata(locale as "en" | "id", `/notes/${slug}`, note.metadata.title, note.metadata.description, { availableLocales });
  return { ...metadata, openGraph: { ...metadata.openGraph, type: "article", publishedTime: note.metadata.publishedAt, modifiedTime: note.metadata.updatedAt ?? note.metadata.publishedAt, images: note.metadata.cover ? [{ url: note.metadata.cover, alt: note.metadata.title }] : undefined }, twitter: { card: "summary_large_image", title: note.metadata.title, description: note.metadata.description, images: note.metadata.cover ? [note.metadata.cover] : undefined } };
}

export default async function NoteDetailPage({ params }: NotePageParams) {
  const { locale, slug } = await params;
  const typedLocale = locale as "en" | "id";
  const note = getNoteBySlug(locale, slug);
  if (!note) notFound();
  const t = await getTranslations("NotesV2");
  const readingTime = getReadingTimeMinutes(note.body);
  const noteUrl = `${siteConfig.url}${typedLocale === "en" ? "" : `/${typedLocale}`}/notes/${note.metadata.slug}`;
  const structuredData = { "@context": "https://schema.org", "@type": "BlogPosting", headline: note.metadata.title, description: note.metadata.description, datePublished: note.metadata.publishedAt, dateModified: note.metadata.updatedAt ?? note.metadata.publishedAt, url: noteUrl, author: { "@type": "Person", name: "Rifki Anashirul" }, ...(note.metadata.cover ? { image: `${siteConfig.url}${note.metadata.cover}` } : {}) };

  return (
    <main className="v2-scope v2-note-detail">
      <Container>
        <Link className="v2-arrow-link v2-note-detail__back" href="/notes"><ArrowLeft aria-hidden="true" />{t("back")}</Link>
        <article>
          <header className="v2-note-detail__hero">
            {note.metadata.category ? <p className="v2-label">{note.metadata.category}</p> : null}
            <div className="v2-note-detail__date"><time dateTime={note.metadata.publishedAt}>{formatNoteDate(note.metadata.publishedAt, typedLocale, "long")}</time><span aria-hidden="true">·</span><span>{t("readingTime", { minutes: readingTime })}</span>{note.metadata.updatedAt ? <><span aria-hidden="true">·</span><span>{t("updated", { date: formatNoteDate(note.metadata.updatedAt, typedLocale, "long") })}</span></> : null}</div>
            <h1 className="v2-display">{note.metadata.title}</h1>
            <p className="v2-body-lg">{note.metadata.description}</p>
          </header>
          {note.metadata.cover ? <figure className="v2-note-detail__cover"><Image src={note.metadata.cover} alt={note.metadata.title} width={1600} height={1000} sizes="(max-width: 76rem) 100vw, 76rem" /></figure> : null}
          <div className="v2-note-detail__body"><NoteProse source={note.body} /></div>
        </article>
      </Container>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </main>
  );
}
