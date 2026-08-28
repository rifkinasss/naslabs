import { ImageResponse } from "next/og";

export const alt = "NasLabs — Independent Software Development Studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ background: "#f4f5ef", color: "#17201d", width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "70px 80px", fontFamily: "Arial" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 30, fontWeight: 700 }}><div style={{ width: 46, height: 46, borderRadius: 23, background: "#17201d", color: "#c9f269", display: "flex", alignItems: "center", justifyContent: "center" }}><span>N</span></div><span>NasLabs</span></div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}><div style={{ display: "flex", color: "#768b36", fontSize: 18, letterSpacing: 3, textTransform: "uppercase" }}><span>Independent software development studio</span></div><div style={{ display: "flex", fontSize: 72, lineHeight: 1, letterSpacing: -4, fontWeight: 700 }}><span>Reliable software for<br />real business needs.</span></div></div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, color: "#64706a" }}><span>Build. Experiment. Ship.</span><span>naslabs.my.id</span></div>
    </div>,
    { ...size },
  );
}
