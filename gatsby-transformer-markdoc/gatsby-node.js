const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");
const Markdoc = require("@markdoc/markdoc");
// const { defaultObject } = require("./runtime");
const { getConfig } = require("./getConfig");

function parseFile(content, config) {
  const ast = Markdoc.parse(content);

  // Markdoc is frontmatter format agnostic, defaulted to YAML as its the only option for the Next plugin.
  const frontmatter = ast.attributes.frontmatter
    ? yaml.load(ast.attributes.frontmatter)
    : {};
  const markdocConfig = {
    ...config,
    variables: { ...config?.variables, frontmatter },
  };
  const transform = Markdoc.transform(ast, markdocConfig);
  const html = Markdoc.renderers.html(transform);

  const parsedObj = {
    attributes: ast.attributes,
    raw: content,
    frontmatter,
    html,
  };
  return parsedObj;
}
async function onPreBootstrap({}, options) {
  const config = await getConfig("./markdoc");
  console.log(config);
}
async function onCreateNode(
  { node, actions, loadNodeContent, createNodeId, createContentDigest },
  options
) {
  // Use passed fileExtensions for determining what to create nodes from
  const extensions = options.fileExtensions; // default to mdoc from Joi
  if (extensions.indexOf(node.extension) === -1) {
    return;
  }

  // TODO: compare current config to last
  const content = await loadNodeContent(node);
  const parsedMarkdocData = parseFile(content, options.config);
  const markdocNode = {
    ...parsedMarkdocData,
    id: createNodeId(`markdoc-${node.id}`),
    children: [],
    parent: node.id,
    internal: {
      contentDigest: createContentDigest(content),
      type: "Markdoc",
    },
  };

  const { createNode, createParentChildLink } = actions;

  createNode(markdocNode);
  createParentChildLink({ parent: node, child: markdocNode });
}
exports.onCreateNode = onCreateNode;
exports.onPreBootstrap = onPreBootstrap;
exports.pluginOptionsSchema = ({ Joi }) => {
  return Joi.object({
    schemaPath: Joi.string()
      .description(
        `Pass path of schema folder if not in ./markdoc. See https://markdoc.dev/docs/syntax#config`
      )
      .default("./markdoc"),
    fileExtensions: Joi.array()
      .description(
        "File extensions to look for in File nodes generated from gatsby-source-filesystem"
      )
      .default(["mdoc"]),
  });
};
