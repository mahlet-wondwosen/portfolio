import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Mahlet Wondwosen Tegene, Senior Frontend Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#4b3f8c",
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, color: "#cfc6f2", letterSpacing: 4 }}>
          PORTFOLIO
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 112, fontWeight: 800, lineHeight: 1 }}>
            Mahlet Wondwosen
          </div>
          <div style={{ display: "flex", fontSize: 44, marginTop: 24, color: "#d9cffa" }}>
            Senior Frontend Engineer
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#cfc6f2" }}>
          React · Next.js · TypeScript · Addis Ababa
        </div>
      </div>
    ),
    { ...size }
  );
}
