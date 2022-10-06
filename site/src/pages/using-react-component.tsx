import React from "react";
import { graphql } from "gatsby";
import MarkdownReact from "gatsby-transformer-markdoc/components/MarkdocReact";
import config from "../../markdoc/config";
import { Callout } from "../components/Callout";
import { Fence } from "../components/Fence";
const components = {
  Callout,
  Fence,
};
export default function MarkdocPage({ data }) {
  return (
    <>
      <main className="page">
        <MarkdownReact
          rawContent={
            (data.markdoc.raw += `{% callout type="warning" %} This is a warning callout! {% /callout %}`)
          }
          config={config}
          components={components}
        />
      </main>
      <style>
        {`
        :root {
          --top-nav-height: 51px;
          --border-color: #dce6e9;
        }
        
        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }
        
        body {
          font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
            'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif,
            'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
          color: rgba(60, 66, 87, 1);
          margin: 0;
        }
        
        p {
          line-height: 1.5em;
        }
        
        
        h1 {
          font-size: 40px;
        }
        
        h2 {
          margin: 1.5em 0;
        }
        
        a {
          color: rgba(75, 85, 99, 1);
        }
          .page {
            position: fixed; 
            top: var(--top-nav-height);
            display: flex;
            width: 100vw;
            flex-grow: 1;
          }
          main {
            overflow: auto;
            height: calc(100vh - var(--top-nav-height));
            flex-grow: 1;
            font-size: 16px;
            padding: 0 2rem 2rem;
          }
        `}
      </style>
    </>
  );
}
export const query = graphql`
  query {
    markdoc {
      html
      raw
    }
  }
`;
