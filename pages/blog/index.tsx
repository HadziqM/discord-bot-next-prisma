import React from "react";

export async function getStaticProps() {
  const res = await fetch("http://localhost:8080/api/blog/1");
  const posts = await res.json();
  return {
    props: {
      posts,
    },
  };
}
export default function Blog(props: any) {
  const title = props.posts.blog.title;
  const body = props.posts.blog.content
    .split("\n")
    .map(
      (
        item:
          | string
          | number
          | boolean
          | React.ReactElement<any, string | React.JSXElementConstructor<any>>
          | React.ReactFragment
          | React.ReactPortal
          | null
          | undefined,
        idx: React.Key | null | undefined
      ) => {
        return (
          <React.Fragment key={idx}>
            {item}
            <br />
          </React.Fragment>
        );
      }
    );
  return (
    <>
      <h1>{title}</h1>
      <p>{body}</p>
    </>
  );
}
