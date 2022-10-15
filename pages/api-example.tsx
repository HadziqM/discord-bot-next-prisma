import Layout from "../components/layout";
import { useEffect, useState } from "react";

export default function ApiExamplePage() {
  const [discdata, setDiscdata] = useState({} as any);
  useEffect(() => {
    let shit = async () => {
      const data = await (await fetch("/api/examples/jwt")).json();
      if (data) {
        setDiscdata(data);
      } else {
        window.alert("not signed");
      }
    };
    shit();
  }, []);
  return (
    <>
      <Layout>
        <h1>API Example</h1>
        <p>The examples below show responses from the example API endpoints.</p>
        <p>
          <em>You must be signed in to see responses.</em>
        </p>
        <h2>Session</h2>
        <p>/api/examples/session</p>
        <iframe src="/api/examples/session" />
        <h2>JSON Web Token</h2>
        <p>/api/examples/jwt</p>
        <iframe src="/api/examples/jwt" />
        <p>MHFZ DATA</p>
        <iframe src={`/api/discord/${discdata.sub}`} />
      </Layout>
    </>
  );
}
