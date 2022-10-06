const Markdoc = require("@markdoc/markdoc");
const functions = require("./functions");
const tags = require("./tags");
const nodes = require("./nodes");
module.exports = {
  partials: {
    "header.md": Markdoc.parse(`# My header`),
  },
  variables: {
    someGlobalVariable:
      "I'm passed to all Markdoc files as $someGlobalVariable",
  },
  functions,
  tags,
  nodes,
};
