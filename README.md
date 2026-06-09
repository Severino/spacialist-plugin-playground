# Spacialist Plugin Playground

Adds a frontend playground for a spacialist plugin.

## Installation

Add via npm to your plugin:
```bash
npm i https://github.com/Severino/spacialist-plugin-playground
```

To deploy the relevant files to the plugin root, run the following command.
This command will be printed in the terminal after you've installed the playground.
This will currently create a playground.js and a index.html* in the root of your plugin**.

```bash
npx playground
```

\* This is a bit tedious, but vite does require your application to have the index.html in the project root. 
And using the playground as a dependency requires the plugin to somehow write the index.html to the project root itself

** if those file don't exist

## Startup Script

By default the `index.html` points to the `playground.js` at your root. Of course this can be adjusted.


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