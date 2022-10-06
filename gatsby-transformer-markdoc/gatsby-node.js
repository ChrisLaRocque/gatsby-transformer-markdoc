const Markdoc = require("@markdoc/markdoc");
const yaml = require("js-yaml");

function parseMarkdoc(content, config) {
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

async function onCreateNode(
  { node, actions, loadNodeContent, createNodeId, createContentDigest },
  options
) {
  // Use passed fileExtensions for determining what to create nodes from
  const extensions = options.fileExtensions; // default to mdoc from Joi
  if (extensions.indexOf(node.extension) === -1) {
    return;
  }

  const content = await loadNodeContent(node);
  const parsedMarkdocData = parseMarkdoc(content, options.config);
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
exports.pluginOptionsSchema = ({ Joi }) => {
  return Joi.object({
    config: Joi.object()
      .description(
        `Pass config object to Markdoc transform() step. See https://markdoc.dev/docs/syntax#config`
      )
      .default({}),
    fileExtensions: Joi.array()
      .description(
        "File extensions to look for in File nodes generated from gatsby-source-filesystem"
      )
      .default(["mdoc"]),
  });
};
