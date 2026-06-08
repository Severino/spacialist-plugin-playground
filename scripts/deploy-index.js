#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function showHelp() {
  console.log('Usage: sp-plugin-playground-deploy [target-dir]');
  console.log('If no target-dir is provided, the current working directory is used.');
}

const args = process.argv.slice(2);
if (args.includes('-h') || args.includes('--help')) {
  showHelp();
  process.exit(0);
}

const pkgRoot = path.resolve(__dirname, '..');
const src = path.join(pkgRoot, 'index.html');
const targetArg = args[0];
const destDir = targetArg ? path.resolve(process.cwd(), targetArg) : process.cwd();
const dest = path.join(destDir, 'index.html');

if (!fs.existsSync(src)) {
  console.error('Source index.html not found at', src);
  process.exit(1);
}

try {
  fs.mkdirSync(destDir, { recursive: true });
  fs.copyFileSync(src, dest);
  // After copying, rewrite script src to reference the installed package under node_modules
  try {
    const pkg = require(path.join(pkgRoot, 'package.json'));
    const pkgName = pkg && pkg.name ? pkg.name : 'sp-plugin-playground';
    // Use forward-slash path for browser
    const nodeRef = `node_modules/${pkgName}/playground.js`;

    let indexHtml = fs.readFileSync(dest, 'utf8');
    // Replace occurrences of playground.js with the node_modules path.
    // Match src="playground.js", src="./playground.js", src="./playground/playground.js" etc.
    const updated = indexHtml.replace(/(<script[^>]*src=["'])(?:\.?\/?)?(?:playground\/?){0,1}playground\.js(["'][^>]*>)/gi, `$1${nodeRef}$2`);

    if (updated !== indexHtml) {
      fs.writeFileSync(dest, updated, 'utf8');
      console.log(`Rewrote script src in deployed index.html to ${nodeRef}`);
    } else {
      console.log('No playground.js reference found to rewrite in deployed index.html.');
    }

    console.log(`Deployed ${src} -> ${dest}`);
  } catch (err) {
    console.warn('Warning: could not rewrite deployed index.html script src:', err.message);
  }
} catch (err) {
  console.error('Error deploying index.html:', err.message);
  process.exit(1);
}
