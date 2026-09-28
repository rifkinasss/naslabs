import type { Work } from "@/lib/content/contracts";

export function WorkMeta({ metadata, labels }: { metadata: Work; labels: { year: string; role: string; stack: string; status: string } }) {
  const items = [
    { key: "year", label: labels.year, value: metadata.year },
    { key: "role", label: labels.role, value: metadata.role },
    { key: "stack", label: labels.stack, value: metadata.stack.join(" · ") },
    { key: "status", label: labels.status, value: metadata.status === "completed" ? metadata.status : undefined },
  ].filter((item) => item.value);

  return <dl className="v2-work-meta">{items.map((item) => <div className={`v2-work-meta__item v2-work-meta__item--${item.key}`} key={item.key}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl>;
}
