import React from "react";
import Markdoc from "@markdoc/markdoc";

export default function MarkdocReact({ rawContent, config, components }) {
  const ast = Markdoc.parse(rawContent);
  const content = Markdoc.transform(ast, config || {});
  return <>{Markdoc.renderers.react(content, React, { components })}</>;
}
