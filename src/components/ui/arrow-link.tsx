import { ArrowUpRight } from "lucide-react";
import type { AnchorHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export function ArrowLink({ className, children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={cn("v2-arrow-link v2-interactive", className)} {...props}>
      <span>{children}</span>
      <ArrowUpRight aria-hidden="true" size={16} />
    </a>
  );
}
