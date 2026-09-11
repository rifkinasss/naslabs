import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="not-found section-shell">
      <span className="not-found-code">404</span>
      <div>
        <p className="eyebrow">
          <span className="eyebrow-dot" /> Page not found
        </p>
        <h1>
          This page took
          <br />
          <em>a wrong turn.</em>
        </h1>
        <p>The page you are looking for does not exist or may have moved.</p>
        <Button asChild className="button button-dark">
          <Link href="/">
            <ArrowLeft aria-hidden="true" /> Back to home
          </Link>
        </Button>
      </div>
    </main>
  );
}
