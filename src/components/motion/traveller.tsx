"use client";

import { useEffect, useRef, useState } from "react";

import { usePathname } from "@/i18n/navigation";

export function Traveller() {
  const pathname = usePathname();
  const previousPathname = useRef(pathname);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (previousPathname.current === pathname) return;

    previousPathname.current = pathname;
    setVisible(true);
    const timeout = window.setTimeout(() => setVisible(false), 520);

    return () => window.clearTimeout(timeout);
  }, [pathname]);

  if (!visible) return null;

  return (
    <div className="v2-traveller" key={pathname} aria-hidden="true">
      <div className="v2-traveller__track" />
      <svg className="v2-traveller__turtle" viewBox="0 0 48 24" role="presentation">
        <path d="M11 7.5c1.8-3.2 5.2-5 10.4-5 6.3 0 10.6 3.2 12.4 8.8-1.8 4.4-6 6.7-12.4 6.7-5.2 0-8.6-1.8-10.4-5.2C9.8 11 9.8 9.4 11 7.5Z" />
        <path d="M33.2 9.5c2.4-1.8 4.8-1.8 6.6-.3 1.5 1.2 1.5 3.5 0 4.7-1.8 1.5-4.2 1.5-6.6-.3M14 6.8 10.8 3.5M14 17.2l-3.2 3.3M24.2 6.5V17.5" />
        <circle cx="38.2" cy="11.5" r=".8" />
      </svg>
    </div>
  );
}
