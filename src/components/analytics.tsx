"use client";

import Script from "next/script";
import { useEffect } from "react";

declare global {
  interface Window { dataLayer: unknown[]; gtag: (...args: unknown[]) => void; }
}

export function Analytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  useEffect(() => {
    if (!measurementId) return;
    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const element = target.closest<HTMLElement>("[data-analytics-event]");
      if (!element || typeof window.gtag !== "function") return;
      window.gtag("event", element.dataset.analyticsEvent, { event_category: element.dataset.analyticsCategory ?? "engagement" });
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [measurementId]);

  if (!measurementId) return null;

  return <><Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" /><Script id="google-analytics" strategy="afterInteractive">{`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${measurementId}', { anonymize_ip: true });`}</Script></>;
}
