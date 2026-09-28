import { Fragment, type CSSProperties } from "react";
import Image from "next/image";

type ProjectImageProps = {
  src: string;
  alt: string;
};

export function ProjectImage({ src, alt }: ProjectImageProps) {
  return (
    <figure className="v2-work-prose__figure">
      <Image src={src} alt={alt} width={1600} height={1000} sizes="(max-width: 76rem) 100vw, 76rem" />
    </figure>
  );
}

export function Callout({ children }: { children: React.ReactNode }) {
  return <aside className="v2-work-prose__callout">{children}</aside>;
}

export function WorkFlow({ label, children }: { label?: string; children: React.ReactNode }) {
  const steps = typeof children === "string" ? children.split(/\s*→\s*/).map((step) => step.trim()).filter(Boolean) : null;
  const flowKind = label?.toLowerCase().includes("location") || label?.toLowerCase().includes("lokasi")
    ? "hierarchy"
    : label?.toLowerCase().includes("architecture") || label?.toLowerCase().includes("lapisan") || label?.toLowerCase().includes("boundary") || label?.toLowerCase().includes("batas")
      ? "architecture"
      : label?.toLowerCase().includes("model")
        ? "model"
        : label?.toLowerCase().includes("lifecycle") || label?.toLowerCase().includes("siklus")
          ? "lifecycle"
          : "process";

  return (
    <div className={`v2-work-flow v2-work-flow--${flowKind}`} role="group" aria-label={label}>
      {label ? <span className="v2-label">{label}</span> : null}
      {steps ? (
        <div className="v2-work-flow__steps">
          {steps.map((step, index) => (
            <Fragment key={`${step}-${index}`}>
              {index > 0 ? <span className="v2-work-flow__arrow" style={{ "--flow-delay": `${(index - 1) * 55}ms` } as CSSProperties} aria-hidden="true">→</span> : null}
              <span className="v2-work-flow__step" style={{ "--flow-delay": `${index * 55}ms` } as CSSProperties}><span className="v2-work-flow__number">{String(index + 1).padStart(2, "0")}</span><span>{step}</span></span>
            </Fragment>
          ))}
        </div>
      ) : <div className="v2-work-flow__line">{children}</div>}
    </div>
  );
}

export function WorkEvidence({ label, children }: { label: string; children: React.ReactNode }) {
  const items = typeof children === "string" ? children.split(/\s*·\s*/).map((item) => item.trim()).filter(Boolean) : null;

  return (
    <aside className="v2-work-evidence">
      <span className="v2-label">{label}</span>
      {items ? (
        <div className="v2-work-evidence__items">
          {items.map((item, index) => {
            const match = item.match(/^(\d+)\s+(.+)$/);
            return <span className="v2-work-evidence__item" style={{ "--evidence-delay": `${index * 55}ms` } as CSSProperties} key={item}>{match ? <><strong>{match[1]}</strong><span>{match[2]}</span></> : item}</span>;
          })}
        </div>
      ) : <p>{children}</p>}
    </aside>
  );
}

export const mdxComponents = { Callout, ProjectImage, WorkFlow, WorkEvidence };
