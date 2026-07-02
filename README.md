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


## Bootstrap

The app does provide a bootstrap instance at `window.bootstrap` so the implementing plugin does not need to 
add bootstrap itself. This is to prevent the plugin to register a secondary instance of bootstrap, corrupting
the interactions in the process (e.g. clicking a dropdown doesn't open the dropdown, however when inspecting the dev tools you see that attributes on the dropdown do change).

## Vite config

To use the playground call the `usePlayground(options)` function in your startup script. 
You may use the default vite configuration like this:

```js
import useViteServer from 'spacialist-plugin-playground/useViteServer'

export default defineConfig({
    ...
    server: useViteServer(),
    ...
})
```