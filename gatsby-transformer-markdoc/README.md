# gatsby-transformer-markdoc

Take files utilizing Stripe's [Markdoc](https://markdoc.dev/) format and render as static HTML. Works for standard Markdown as well.

## Installation

This plugin looks to nodes created by `gatsby-source-filesystem`, so that plugin needs to be installed if not already.

```
npm install gatsby-transformer-markdoc
```

or if you need `gatsby-source-filesystem` as well

```
npm install gatsby-transformer-markdoc gatsby-source-filesystem
```

## How to use

```javascript
// In your gatsby-config.js
plugins: [
  {
    resolve: `gatsby-transformer-markdoc`,
    options: {
      // Which file extensions should be parsed by Markdoc? Defaults to 'Markdoc'
      fileExtensions: ["mdoc"],
      // Config object for Markdoc, see example site for usage
      config: {},
    },
  },
  // If you weren't previously using gatsby-source-filesystem the config would look something like this
   {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/path-to-mdoc-files/`,
      },
    },
],
```

## Plugin options

### `fileExtensions`

Array of strings. Nodes created by `gatsby-source-filesystem` include an `extension` field. Tell `gatsby-transformer-markdoc` nodes with a certain file extension should be parsed by Markdoc. For comparison `gatsby-transformer-remark` [transforms all nodes with `md` or `markdown` extensions](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-transformer-remark#parsing-algorithm).

### `config`

Pass an object with config options for Markdoc as outlined here: [https://markdoc.dev/docs/syntax#config](https://markdoc.dev/docs/syntax#config)

## MarkdocReact component

```
import MarkdocReact from "gatsby-transformer-markdoc/components/MarkdocReact"
```

This component allows you to use the Markdoc React renderer, just pass it the usual arguments. `/site/src/pages/using-react-component.tsx` has an example.

### `rawContent`

The Markdown/Markdoc file in string form to be rendered.

### `config`

The Markdoc Config options object as outlined [here](https://markdoc.dev/docs/syntax#config). Ideally in the future this would fallback to the pluginOptions by default.

### `components`

The React components to be used by the renderer. More [here](https://markdoc.dev/docs/render#react).
