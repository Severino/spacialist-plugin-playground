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
const pluginRoot = process.cwd();
const dest = join(process.cwd(), 'index.html');

function safeCopy(src, dest, name) {

    if (existsSync(dest)) {
        console.warn(`↷\tSkipping: Destination ${name} already exists at: ${dest}.`);
        return false;
    }

    if (!existsSync(src)) {
        console.error(`Source ${name} not found at: ${src}`);
        return false;
    }

    copyFileSync(src, dest);
}

function printNewLine() {
    console.log('');
}

function printSeparator() {
    console.log('-----');
}

function printInEnclosure(callback) {
    printNewLine();
    printSeparator();
    callback();
    printSeparator();
}

function copyIndexHtml() {

    console.log('Copying index.html from', src, 'to', dest);
    const success = safeCopy(src, dest, 'index.html');
    if (success && existsSync(dest)) {
        let indexHtml = readFileSync(dest, 'utf-8');
        indexHtml = indexHtml.replace('href="./spacialist_favicon.svg"', 'href="node_modules/spacialist-plugin-playground/spacialist_favicon.svg"');
        writeFileSync(dest, indexHtml, 'utf-8');
    }
}

function copyPluginJs() {
    console.log('Copying playground.js from', src, 'to', dest);
    const scriptFile = 'playground.js';
    const srcJs = join(pkgRoot, 'templates', scriptFile);
    const destJs = join(pluginRoot, scriptFile);
    safeCopy(srcJs, destJs, scriptFile);
}

const steps = [copyIndexHtml, copyPluginJs];

try {
    console.log('Starting deployment of Spacialist Plugin Playground...');

    steps.forEach((step) => {
        printInEnclosure(() => {
            step();
        });
    })

    printNewLine();
    console.log('✓\tDeployment completed successfully.');
    printNewLine();
} catch (err) {
    console.error('✖ \tError deploying index.html:', err.message);
    process.exit(1);
}
