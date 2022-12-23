# simple-palette-generator

## This plugin allows you to:

1. Based on one, two, or three input colors, generate the entire color palette
2. If there are already styles with certain names, update the colors
3. Reassign mockup styles from external to local ones

## Thanks to:

1. [Tom Lowry](https://github.com/thomas-lowry) for [Figsvelte](https://github.com/thomas-lowry/figsvelte)
2. [Chroma.js](https://gka.github.io/chroma.js/)
3. [Coloris color picker](https://coloris.js.org)

## To get started

```bash
npx degit alikimovich/simple-palette-generator color-generator
cd color-generator
npm install
```

_Note that you will need to have [Node.js](https://nodejs.org/) installed._

## Connecting your plugin to Figma

Connecting your plugin to Figma
After installing, go to **Plugins / Development / New Plugin** in the Figma desktop app for Mac OS or Windows and choose the option **"Link existing plugin"**.

_You also can just type "New Plugin" in Figma global search to go there_

From there you need to link a **manifest.json** file located at **public** folder in your directory:

```bash
/color-generator/public/manifest.json
```

Now edit this file to give a new name for your plugin, and you will be able call it from Figma: **Plugins / Development / Your Plugin Name**

## Development

During development, watch your project for changes with the following command.

```bash
npm run dev
```

Start building your plugin UI in `'src/Plugin.svelte'`.

## Build

When ready to package up your final Figma Plugin:

```bash
npm run build
```
