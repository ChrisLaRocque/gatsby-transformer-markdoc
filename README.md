# gatsby-transformer-markdoc

Yarn workspace with transformer plugin (`/gatsby-transformer-markdoc`) and example site (`/site`).

## Transformer plugin

### Developing locally

Clone, run `yarn && yarn workspace site develop` to (hopefully) develop locally.

## Example site

These could use a rename but `/site/markdocs` is where the `.md` and `.mdoc` files live that we source via `gatsby-source-filesystem` (see `gatsby-config.js`), while `/markdoc` is attempting to mimic what rough standard for framework configuration was set in the [Next.js plugin](https://markdoc.dev/docs/nextjs#schema-customization).
