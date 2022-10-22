import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "experimental-edge",
};

export default function WTF(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const avatar = searchParams.get("avatar");
  if (!avatar) return;
  return new ImageResponse(
    (
      <div
        style={{
          background:
            "url(https://media.discordapp.net/attachments/1009291538733482055/1033325639589171200/bounty_champion.jpg?width=1000&height=572)",
          backgroundPosition: "center",
          backgroundSize: "cover",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <img
          width="160"
          height="160"
          src={avatar}
          style={{
            borderRadius: "50%",
            position: "absolute",
            top: 145,
            left: 600,
          }}
        />
      </div>
    ),
    { width: 1000, height: 572 }
  );
}
