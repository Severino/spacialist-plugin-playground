# Spacialist Plugin Playground

Adds a frontend playground for a spacialist plugin.

## Installation

Add via npm to your plugin:
```bash
npm i https://github.com/Severino/spacialist-plugin-playground
```

Deploy the index.html to your plugin root.*

```bash
npx playground
```

* This is a bit tedious, but vite does require your application to have the index.html in the project root. 
And using the playground as a dependency requires the plugin to somehow write the index.html to the project root itself


## Startup Script

By default the `index.html` points to a `playground.js` at your root. You may of course adjust that t your needs.


## Vite config

To use the playground call the `usePlayground(options)` function in your startup script. 
You may use the default vite configuration like this:

```js
export default defineConfig({
    ...
    server: useViteServer(),
    ...
})
```