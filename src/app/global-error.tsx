"use client";

import Link from "next/link";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#f8fafc", color: "#0f172a", fontFamily: '"IBM Plex Sans", ui-sans-serif, system-ui, sans-serif' }}>
        <main style={{ boxSizing: "border-box", minHeight: "100vh", padding: "clamp(2rem, 8vw, 7rem) clamp(1rem, 6vw, 4rem)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.3fr) minmax(12rem, .7fr)", gap: "clamp(2rem, 8vw, 8rem)", maxWidth: "76rem", margin: "0 auto" }}>
            <section>
              <p style={{ margin: 0, color: "#475569", fontSize: ".75rem", fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase" }}>SYSTEM ERROR</p>
              <h1 style={{ maxWidth: "14ch", margin: "1.5rem 0 0", fontSize: "clamp(2.5rem, 5vw, 4.75rem)", lineHeight: 1.02, letterSpacing: "-.05em" }}>Something did not go as planned.</h1>
              <p style={{ maxWidth: "34rem", margin: "1.5rem 0 0", color: "#475569", fontSize: "1.0625rem", lineHeight: 1.65 }}>The application could not load this part of NasLabs.</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginTop: "2rem" }}>
                <button type="button" onClick={() => reset()} style={{ minHeight: "2.75rem", border: 0, padding: ".75rem 1rem", background: "#2563eb", color: "#fff", font: "inherit", fontWeight: 600, cursor: "pointer" }}>Try again</button>
                <Link href="/" style={{ alignSelf: "center", color: "#2563eb", fontWeight: 600 }}>Back home ↗</Link>
              </div>
            </section>
            <aside style={{ alignSelf: "start", paddingTop: "1rem", borderTop: "1px solid #cbd5e1" }}>
              <span style={{ color: "#64748b", fontSize: ".75rem", fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase" }}>STATUS</span>
              <strong style={{ display: "block", marginTop: ".75rem", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: ".875rem", letterSpacing: ".04em" }}>RUNTIME_ERROR</strong>
            </aside>
          </div>
        </main>
      </body>
    </html>
  );
}
