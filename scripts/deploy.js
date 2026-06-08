#!/usr/bin/env node
import {
    dirname,
    resolve,
    join
} from 'path';

import {
    existsSync,
    mkdirSync,
    copyFileSync,
    readFileSync,
    writeFileSync,
} from 'fs';

import { fileURLToPath } from 'node:url';


function showHelp() {
    console.log('Usage: sp-plugin-playground-deploy [target-dir]');
    console.log('If no target-dir is provided, the current working directory is used.');
}

const args = process.argv.slice(2);
if (args.includes('-h') || args.includes('--help')) {
    showHelp();
    process.exit(0);
}
    
const __dirname = dirname(fileURLToPath(import.meta.url));

const pkgRoot = resolve(__dirname, '..');
const src = join(pkgRoot, 'index.html');
const dest = join(process.cwd(), 'index.html');

if (!existsSync(src)) {
    console.error('Source index.html not found at', src);
    process.exit(1);
}

try {
    copyFileSync(src, dest);
    console.log("Copied index.html to", dest);
    let indexHtml = readFileSync(dest, 'utf-8');
    indexHtml = indexHtml.replace('href="./spacialist_favicon.svg"', 'href="node_modules/spacialist-plugin-playground/spacialist_favicon.svg"');
    writeFileSync(dest, indexHtml, 'utf-8');
} catch (err) {
    console.error('Error deploying index.html:', err.message);
    process.exit(1);
}
