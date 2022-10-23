import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "experimental-edge",
};

export default function WTF(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const avatar = searchParams.get("url");
  const name = searchParams.get("name");
  if (!avatar) return;
  if (!name) return;
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 30,
          background:
            "url(https://media.discordapp.net/attachments/1009291538733482055/1032957704504877130/bg.png)",
          backgroundPosition: "center",
          backgroundSize: "cover",
          color: "#fff",
          width: "100%",
          height: "100%",
          display: "flex",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            width="140"
            height="140"
            src={avatar}
            style={{
              borderRadius: "10%",
              transform: "translateX(-100px)",
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h1
              style={{
                fontSize: 30,
                textAlign: "center",
                fontWeight: "bold",
                margin: 0,
                padding: 0,
              }}
            >
              Welcome!
            </h1>
            <p
              style={{
                fontSize: 20,
                textAlign: "center",
                margin: 0,
                padding: 0,
              }}
            >
              {name}
            </p>
          </div>
        </div>
      </div>
    ),
    { width: 500, height: 187 }
  );
}
