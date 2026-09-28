import { ImageResponse } from "next/og";

export const alt = "NasLabs — Personal Digital Lab";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ background: "#f8fafc", color: "#0f172a", width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "70px 80px", fontFamily: "IBM Plex Sans, Arial" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 30, fontWeight: 700 }}><div style={{ width: 46, height: 46, borderRadius: 8, background: "#0f172a", color: "#f8fafc", display: "flex", alignItems: "center", justifyContent: "center" }}><span>N</span></div><span>NasLabs</span></div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}><div style={{ display: "flex", color: "#2563eb", fontSize: 18, letterSpacing: 3, textTransform: "uppercase" }}><span>Personal digital lab</span></div><div style={{ display: "flex", fontSize: 72, lineHeight: 1, letterSpacing: -4, fontWeight: 700 }}><span>Build. Learn.<br />Explore.</span></div></div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, color: "#64748b" }}><span>Works · Experiments · Notes</span><span>naslabs.my.id</span></div>
    </div>,
    { ...size },
  );
}
