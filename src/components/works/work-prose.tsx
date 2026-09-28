import type { ReactNode } from "react";

import { Reveal } from "@/components/motion/reveal";

import { Callout, ProjectImage, WorkEvidence, WorkFlow } from "./mdx-components";

function inlineContent(value: string): ReactNode[] {
  const tokens = value.split(/(\[[^\]]+\]\([^\)]+\)|`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/g).filter(Boolean);

  return tokens.map((token, index) => {
    const link = token.match(/^\[([^\]]+)\]\(([^\)]+)\)$/);
    if (link) {
      const isExternal = /^https?:\/\//.test(link[2]);
      return isExternal ? (
        <a key={index} href={link[2]} target="_blank" rel="noopener noreferrer">{link[1]}</a>
      ) : (
        <a key={index} href={link[2]}>{link[1]}</a>
      );
    }
    if (token.startsWith("`") && token.endsWith("`")) return <code key={index}>{token.slice(1, -1)}</code>;
    if (token.startsWith("**") && token.endsWith("**")) return <strong key={index}>{token.slice(2, -2)}</strong>;
    if (token.startsWith("*") && token.endsWith("*")) return <em key={index}>{token.slice(1, -1)}</em>;
    return <span key={index}>{token}</span>;
  });
}

function headingWeight(title: string): "primary" | "anchor" | "supporting" | "closing" | "secondary" {
  const normalized = title.toLowerCase();
  if (["context", "konteks", "the problem", "masalah", "the challenge", "tantangan", "outcome", "hasil"].includes(normalized)) return "primary";
  if (["system approach", "pendekatan sistem", "system boundaries", "batas sistem", "operational model", "model operasional", "file lifecycle", "siklus file"].includes(normalized)) return "anchor";
  if (["engineering context", "konteks engineering", "recognition", "pengakuan", "engineering documentation", "dokumentasi engineering", "verification and deployment reality", "verifikasi dan kenyataan deployment"].includes(normalized)) return "supporting";
  if (["reflection", "refleksi"].includes(normalized)) return "closing";
  return "secondary";
}

function sectionVariant(title: string): "narrative" | "wide" | "split" | "technical" | "recognition" | "outcome" | "closing" | "default" {
  const normalized = title.toLowerCase();
  if (["context", "konteks"].includes(normalized)) return "narrative";
  if (["the problem", "masalah", "the challenge", "tantangan"].includes(normalized)) return "wide";
  if (["my role", "peran saya"].includes(normalized)) return "split";
  if (["system approach", "pendekatan sistem", "system boundaries", "batas sistem", "file lifecycle", "siklus file", "operational model", "model operasional"].includes(normalized)) return "technical";
  if (["recognition", "pengakuan"].includes(normalized)) return "recognition";
  if (["outcome", "hasil"].includes(normalized)) return "outcome";
  if (["reflection", "refleksi"].includes(normalized)) return "closing";
  return "default";
}

type SectionVariant = ReturnType<typeof sectionVariant>;
type ChapterKey = "overview" | "contribution" | "workflows" | "engineering" | "outcome" | "reflection";
type ParsedSection = { title: string; variant: SectionVariant; blocks: ReactNode[] };

function chapterFor(title: string): ChapterKey {
  const normalized = title.toLowerCase();
  if (["context", "konteks", "the problem", "masalah", "the challenge", "tantangan"].includes(normalized)) return "overview";
  if (["my role", "peran saya", "system approach", "pendekatan sistem", "system boundaries", "batas sistem", "authentication and authorization", "autentikasi dan otorisasi"].includes(normalized)) return "contribution";
  if (["engineering context", "konteks engineering", "engineering documentation", "dokumentasi engineering", "verification and deployment reality", "verifikasi dan kenyataan deployment", "technical direction", "arah teknis"].includes(normalized)) return "engineering";
  if (["recognition", "pengakuan", "outcome", "hasil"].includes(normalized)) return "outcome";
  if (["reflection", "refleksi"].includes(normalized)) return "reflection";
  return "workflows";
}

type ChapterLabels = Record<ChapterKey, string>;

function renderBlocks(source: string, labels?: ChapterLabels): ReactNode[] {
  const lines = source.split(/\r?\n/);
  const sections: ParsedSection[] = [];
  let sectionBlocks: ReactNode[] = [];
  let currentTitle = "";
  let currentVariant: SectionVariant = "default";
  let index = 0;
  let blockKey = 0;

  const flushSection = () => {
    if (!sectionBlocks.length) return;
    sections.push({ title: currentTitle, variant: currentVariant, blocks: sectionBlocks });
    sectionBlocks = [];
  };

  while (index < lines.length) {
    const line = lines[index].trim();
    if (!line) { index += 1; continue; }

    if (line === "---") {
      sectionBlocks.push(<hr key={blockKey++} />);
      index += 1;
      continue;
    }

    const image = line.match(/^!\[([^\]]*)\]\(([^\)]+)\)$/);
    if (image) {
      sectionBlocks.push(<ProjectImage key={blockKey++} src={image[2]} alt={image[1]} />);
      index += 1;
      continue;
    }

    const callout = line.match(/^<Callout>(.*)<\/Callout>$/);
    if (callout) {
      sectionBlocks.push(<Callout key={blockKey++}>{inlineContent(callout[1])}</Callout>);
      index += 1;
      continue;
    }

    const flow = line.match(/^<Flow(?: label="([^"]+)")?>(.*)<\/Flow>$/);
    if (flow) {
      sectionBlocks.push(<WorkFlow key={blockKey++} label={flow[1]}>{flow[2]}</WorkFlow>);
      index += 1;
      continue;
    }

    const evidence = line.match(/^<Evidence label="([^"]+)">(.*)<\/Evidence>$/);
    if (evidence) {
      sectionBlocks.push(<WorkEvidence key={blockKey++} label={evidence[1]}>{evidence[2]}</WorkEvidence>);
      index += 1;
      continue;
    }

    const fence = line.match(/^```(.*)$/);
    if (fence) {
      const codeLines: string[] = [];
      index += 1;
      while (index < lines.length && lines[index].trim() !== "```") {
        codeLines.push(lines[index]);
        index += 1;
      }
      index += 1;
      sectionBlocks.push(<pre key={blockKey++}><code className={fence[1] ? `language-${fence[1].trim()}` : undefined}>{codeLines.join("\n")}</code></pre>);
      continue;
    }

    const heading = line.match(/^(#{2,3})\s+(.+)$/);
    if (heading) {
      if (heading[1].length === 2) {
        flushSection();
        currentTitle = heading[2];
        currentVariant = sectionVariant(heading[2]);
      }
      const Heading = heading[1].length === 2 ? "h2" : "h3";
      const className = Heading === "h2" ? `v2-work-prose__heading--${headingWeight(heading[2])}` : undefined;
      sectionBlocks.push(<Heading className={className} key={blockKey++}>{inlineContent(heading[2])}</Heading>);
      index += 1;
      continue;
    }

    const listMatch = line.match(/^([-*]|\d+\.)\s+(.+)$/);
    if (listMatch) {
      const ordered = /^\d/.test(listMatch[1]);
      const items: ReactNode[] = [];
      while (index < lines.length) {
        const item = lines[index].trim().match(/^([-*]|\d+\.)\s+(.+)$/);
        if (!item || /^\d/.test(item[1]) !== ordered) break;
        items.push(<li key={items.length}>{inlineContent(item[2])}</li>);
        index += 1;
      }
      const List = ordered ? "ol" : "ul";
      sectionBlocks.push(<List key={blockKey++}>{items}</List>);
      continue;
    }

    if (line.startsWith("> ")) {
      const quote: string[] = [];
      while (index < lines.length && lines[index].trim().startsWith("> ")) {
        quote.push(lines[index].trim().slice(2));
        index += 1;
      }
      sectionBlocks.push(<blockquote key={blockKey++}>{inlineContent(quote.join(" "))}</blockquote>);
      continue;
    }

    const paragraph: string[] = [line];
    index += 1;
    while (index < lines.length && lines[index].trim() && !/^(#{2,3})\s|^([-*]|\d+\.)\s|^```|^>\s|^---$/.test(lines[index].trim())) {
      paragraph.push(lines[index].trim());
      index += 1;
    }
    sectionBlocks.push(<p key={blockKey++}>{inlineContent(paragraph.join(" "))}</p>);
  }

  flushSection();

  if (!labels) return sections.flatMap((section) => section.blocks);

  const chapters = new Map<ChapterKey, ParsedSection[]>();
  for (const section of sections) {
    const key = chapterFor(section.title);
    chapters.set(key, [...(chapters.get(key) ?? []), section]);
  }

  const chapterEntries = [...chapters.entries()].filter(([key]) => key !== "reflection");
  const rendered: ReactNode[] = [
    <nav className="v2-work-chapter-nav" aria-label="Work chapters" key="chapter-nav">
      {chapterEntries.map(([key], index) => <a href={`#work-chapter-${key}`} key={key}><span>{String(index + 1).padStart(2, "0")}</span>{labels[key]}</a>)}
    </nav>,
  ];

  for (const [index, [key, chapterSections]] of chapterEntries.entries()) {
    rendered.push(
      <Reveal as="section" elementProps={{ id: `work-chapter-${key}` }} className={`v2-work-chapter v2-work-chapter--${key}`} distance={12} key={`chapter-${key}`}>
        <header className="v2-work-chapter__heading"><span className="v2-work-chapter__index">{String(index + 1).padStart(2, "0")}</span><h3>{labels[key]}</h3></header>
        <div className="v2-work-chapter__sections">
          {chapterSections.map((section, sectionIndex) => <section className={`v2-work-section v2-work-section--${section.variant}`} key={`${key}-${section.title}-${sectionIndex}`}>{section.blocks}</section>)}
        </div>
      </Reveal>,
    );
  }

  const reflection = chapters.get("reflection");
  if (reflection) {
    rendered.push(<section className="v2-work-reflection" key="work-reflection"><div className="v2-work-reflection__inner">{reflection.map((section, index) => <section className={`v2-work-section v2-work-section--${section.variant}`} key={`reflection-${index}`}>{section.blocks}</section>)}</div></section>);
  }

  return rendered;
}

export function WorkProse({ source, labels, className = "v2-work-prose" }: { source: string; labels?: ChapterLabels; className?: string }) {
  return <div className={className}>{renderBlocks(source, labels)}</div>;
}
