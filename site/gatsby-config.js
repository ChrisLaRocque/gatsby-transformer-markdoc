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
        schemaPath: "./markdoc",
        fileExtensions: ["mdoc", "md"], // just 'mdoc' by default
      },
    },
  ],
};
