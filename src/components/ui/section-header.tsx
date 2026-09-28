import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
};

export function SectionHeader({ eyebrow, title, description, action, className }: SectionHeaderProps) {
  return (
    <header className={cn("v2-section-header", className)}>
      {eyebrow && <p className="v2-section-header__eyebrow v2-label">{eyebrow}</p>}
      <h2 className="v2-section-header__title v2-page-title">{title}</h2>
      {description && <p className="v2-section-header__description v2-body-lg">{description}</p>}
      {action && <div className="v2-section-header__action">{action}</div>}
    </header>
  );
}
