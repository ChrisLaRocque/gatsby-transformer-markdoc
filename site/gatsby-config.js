const markdocConfig = require("./markdoc/config");

module.exports = {
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/markdocs/`,
      },
    },
    {
      resolve: "gatsby-transformer-markdoc",
      //   options: {},
      options: {
        config: markdocConfig,
        fileExtensions: ["mdoc", "md"], // just 'mdoc' by default
      },
    },
  ],
};
