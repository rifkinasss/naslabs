"use client";

import type { ReactNode } from "react";

type BackToTopProps = { children: ReactNode };

export function BackToTop({ children }: BackToTopProps) {
  function handleClick() {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  }

  return <button className="v2-site-footer__back-to-top v2-interactive" type="button" onClick={handleClick}>{children}</button>;
}
