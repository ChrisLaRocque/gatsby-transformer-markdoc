# gatsby-transformer-markdoc

Take files utilizing Stripe's Markdoc format and render as static HTML. Works for standard Markdown as well.

## Plugin options

### `fileExtensions`

Array of strings. Nodes created by `gatsby-source-filesystem` include an `extension` field. Tell `gatsby-transformer-markdoc` nodes with a certain file extension should be parsed by Markdoc.

### `config`

Pass an object with config options for Markdoc as outlined here: [https://markdoc.dev/docs/syntax#config](https://markdoc.dev/docs/syntax#config)

## MarkdocReact component

```
import MarkdocReact from "gatsby-transformer-markdoc/components/MarkdocReact"
```

This component allows you to use the Markdoc React renderer, just pass it the usual arguments.

### `rawContent`

The Markdown/Markdoc file in string form to be renered.

### `config`

The Markdoc Config options object as outlined [here](https://markdoc.dev/docs/syntax#config)

### `components`

The React components to be used by the renderer. More [here](https://markdoc.dev/docs/render#react)
