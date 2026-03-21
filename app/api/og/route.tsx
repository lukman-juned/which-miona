import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");

  const map: Record<string, string> = {
    soft: "Soft Miona 🌸",
    chaotic: "Chaotic Miona 🔥",
    sleepy: "Sleepy Miona 😴",
    cool: "Cool Miona 🖤",
  };

  return new ImageResponse(
    (
      <div
        style={{
          background: "#ffe4e6",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 60,
          fontWeight: "bold",
        }}
      >
        {map[type || ""] || "Which Miona Are You?"}
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}