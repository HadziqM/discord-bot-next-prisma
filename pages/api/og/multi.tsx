import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "experimental-edge",
};

function Child(props: any) {
  let image;
  switch (props.rarity) {
    case "ur": {
      image =
        "https://media.discordapp.net/attachments/1009291538733482055/1032987165937909851/ur.jpg?width=180&height=144";
      break;
    }
    case "ssr": {
      image =
        "https://media.discordapp.net/attachments/1009291538733482055/1032987165602369566/ssr.jpg?width=180&height=144";
      break;
    }
    case "sr": {
      image =
        "https://media.discordapp.net/attachments/1009291538733482055/1032987165325537380/sr.jpg?width=180&height=144";
      break;
    }
    case "r": {
      image =
        "https://media.discordapp.net/attachments/1009291538733482055/1032987164943859712/r.jpg?width=180&height=144";
      break;
    }
  }
  return (
    <div
      style={{
        background: `url(${image})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        color: "#fff",
        width: 180,
        height: 144,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <img
        width="25"
        height="25"
        src={props.avatar}
        style={{
          borderRadius: "50%",
          position: "absolute",
          top: 11,
          left: 78,
        }}
      />
      <h2
        style={{
          position: "absolute",
          fontSize: 8,
          color: "white",
          textAlign: "center",
          top: 107,
        }}
      >
        {props.item}
      </h2>
    </div>
  );
}

export default function WTF(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const avatar = searchParams.get("avatar");
  const rarity1 = searchParams.get("param");
  if (!avatar) return;
  if (!rarity1) return;
  const param = JSON.parse(rarity1);
  return new ImageResponse(
    (
      <div
        style={{
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
          }}
        >
          <Child avatar={avatar} rarity={param[0][1]} item={param[0][0]} />
          <Child avatar={avatar} rarity={param[1][1]} item={param[1][0]} />
          <Child avatar={avatar} rarity={param[2][1]} item={param[2][0]} />
          <Child avatar={avatar} rarity={param[3][1]} item={param[3][0]} />
          <Child avatar={avatar} rarity={param[4][1]} item={param[4][0]} />
        </div>
        <div
          style={{
            display: "flex",
          }}
        >
          <Child avatar={avatar} rarity={param[5][1]} item={param[5][0]} />
          <Child avatar={avatar} rarity={param[6][1]} item={param[6][0]} />
          <Child avatar={avatar} rarity={param[7][1]} item={param[7][0]} />
          <Child avatar={avatar} rarity={param[8][1]} item={param[8][0]} />
          <Child avatar={avatar} rarity={param[9][1]} item={param[9][0]} />
        </div>
      </div>
    ),
    { width: 900, height: 288 }
  );
}
