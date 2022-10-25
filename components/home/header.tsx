import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { FaDiscord } from "react-icons/fa";

export default function Header() {
  const { data: session } = useSession();
  const [cls, setcls] = useState("hidden");

  return (
    <header className="t-0 w-screen flex">
      <div className="flex w-full px-4 py-2 justify-between items-center bg-black">
        <div className="flex items-center">
          <img src="/icon-256x256.png" className="h-8 w-8 mx-2" />
          <h1>Rain Server</h1>
        </div>
        {!session && (
          <>
            <a
              href={`/api/auth/signin`}
              className="btn btn-circle btn-primary btn-sm"
              onClick={(e) => {
                e.preventDefault();
                signIn("discord");
              }}
            >
              <FaDiscord className="h-4 w-4" />
            </a>
          </>
        )}
        {session?.user && (
          <div className="w-fit h-fit">
            <div
              style={{
                backgroundImage: `url(${session.user.image})`,
              }}
              className="bg-cover bg-center rounded-full cursor-pointer h-8 w-8 mr-4 active:h-[30px] active:w-[30px]"
              onClick={(e) => {
                e.preventDefault();
                cls === "hidden"
                  ? setcls(
                      "flex flex-col gap-2 px-2 py-2 absolute right-0 top-10 bg-black"
                    )
                  : setcls("hidden");
              }}
            ></div>
            <Menu cls={cls} />
          </div>
        )}
      </div>
    </header>
  );
}
function Menu(props: any) {
  return (
    <div className={props.cls}>
      <a>Profile</a>
      <a>Dashboard</a>
      <a
        className="cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          signOut();
        }}
      >
        Logout
      </a>
    </div>
  );
}
