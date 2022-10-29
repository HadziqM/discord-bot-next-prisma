import Layout from "../components/layout";

export default function IndexPage() {
  return (
    <Layout>
      <iframe
        src="https://discord.com/widget?id=937230168223789066&theme=dark&username=Hertz_IQ"
        width="350"
        height="500"
        allowTransparency={true}
        frameBorder="0"
        sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
      ></iframe>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/P5hlL4VJw7w"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen={true}
      ></iframe>
    </Layout>
  );
}
