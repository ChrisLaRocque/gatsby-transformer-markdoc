import React from "react";
import "prismjs";
import "prismjs/themes/prism.css";

import Prism from "react-prism";

export function Fence({ children, language }) {
  return (
    <Prism key={language} component="pre" className={`language-${language}`}>
      {children}
    </Prism>
  );
}
