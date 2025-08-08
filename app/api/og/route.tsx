import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") || "Portfolio";
  const metric = searchParams.get("metric") || "";
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 48,
          background: "white",
        }}
      >
        <div>{title}</div>
        {metric && <div style={{ fontSize: 32 }}>{metric}</div>}
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
