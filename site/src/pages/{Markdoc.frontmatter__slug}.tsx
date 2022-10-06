import React from "react";
import { graphql } from "gatsby";
import MarkdownReact from "gatsby-transformer-markdoc/components/MarkdocReact";
import config from "../../markdoc/config";
import { Callout } from "../components/Callout";

const components = {
  Callout,
};
export default function MarkdocPage({ data }) {
  return (
    <>
      <main dangerouslySetInnerHTML={{ __html: data.markdoc.html }}>{}</main>
      <MarkdownReact
        rawContent={data.markdoc.raw}
        config={config}
        components={components}
      />
    </>
  );
}
export const query = graphql`
  query ($id: String) {
    markdoc(id: { eq: $id }) {
      html
      raw
    }
  }
`;
