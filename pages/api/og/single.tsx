import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "experimental-edge",
};

export default function WTF(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const avatar = searchParams.get("avatar");
  const rarity = searchParams.get("rarity");
  const item = searchParams.get("item");
  if (!avatar) return;
  if (!rarity) return;
  if (!item) return;
  let image;
  switch (rarity) {
    case "ur": {
      image =
        "https://media.discordapp.net/attachments/1009291538733482055/1032987165937909851/ur.jpg?width=772&height=615";
      break;
    }
    case "ssr": {
      image =
        "https://media.discordapp.net/attachments/1009291538733482055/1032987165602369566/ssr.jpg?width=772&height=615";
      break;
    }
    case "sr": {
      image =
        "https://media.discordapp.net/attachments/1009291538733482055/1032987165325537380/sr.jpg?width=772&height=615";
      break;
    }
    case "r": {
      image =
        "https://media.discordapp.net/attachments/1009291538733482055/1032987164943859712/r.jpg?width=772&height=615";
      break;
    }
  }
  return new ImageResponse(
    (
      <div
        style={{
          background: `url(${image})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          color: "#fff",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <img
          width="105"
          height="105"
          src={avatar}
          style={{
            borderRadius: "50%",
            position: "absolute",
            top: 48,
            left: 336,
          }}
        />
        <h2
          style={{
            position: "absolute",
            fontSize: 20,
            color: "white",
            textAlign: "center",
            top: 513,
          }}
        >
          {item}
        </h2>
      </div>
    ),
    { width: 772, height: 615 }
  );
}
