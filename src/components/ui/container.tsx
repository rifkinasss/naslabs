import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export function Container({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("v2-container", className)} {...props} />;
}
