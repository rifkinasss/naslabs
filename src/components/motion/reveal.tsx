"use client";

import { useEffect, useLayoutEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  distance?: number;
  revealOnMount?: boolean;
  elementProps?: Record<string, unknown>;
};

export function Reveal({ children, as: Component = "div", className, delay = 0, distance = 16, revealOnMount = false, elementProps }: RevealProps) {
  const elementRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    element.dataset.revealReady = "true";
    if (revealOnMount) element.dataset.revealVisible = "true";
  }, [revealOnMount]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || revealOnMount) return;

    if (!("IntersectionObserver" in window)) {
      element.dataset.revealVisible = "true";
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        element.dataset.revealVisible = "true";
        observer.disconnect();
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [revealOnMount]);

  return <Component ref={elementRef} className={className} data-reveal style={{ "--reveal-delay": `${delay}ms`, "--reveal-distance": `${distance}px` } as CSSProperties} {...elementProps}>{children}</Component>;
}
