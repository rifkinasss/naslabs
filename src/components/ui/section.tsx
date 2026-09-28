import type { ElementType, HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type SectionProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
};

export function Section({ as: Component = "section", className, ...props }: SectionProps) {
  return <Component className={cn("v2-section", className)} {...props} />;
}
