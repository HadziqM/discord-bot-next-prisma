import Header from "./home/header";
import Footer from "./footer";
import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Header />
      <main className="py-4 px-4 bg-blue-800">{children}</main>
      <Footer />
    </>
  );
}
