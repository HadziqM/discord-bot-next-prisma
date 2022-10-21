import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "experimental-edge",
};

export default function WTF(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const username = searchParams.get("url");
  const name = searchParams.get("name");
  if (!username) return;
  if (!name) return;
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: "#000",
          color: "#fff",
          width: "100%",
          height: "100%",
          display: "flex",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          width="256"
          height="256"
          src={username}
          style={{
            borderRadius: 128,
          }}
        />
        {name}
      </div>
    ),
    { width: 1200, height: 600 }
  );
}
