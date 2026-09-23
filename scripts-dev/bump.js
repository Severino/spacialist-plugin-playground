// Bump version of package json and run an npm install
// to update the package.lock file.
import { execSync } from 'child_process';
import parseArguments from 'minimist';

import * as packageJson from '../package.json' with { type: 'json' };

const args = parseArguments(process.argv.slice(2), {
    string: ['type'],
    boolean: ['commit', 'cp', 'help'],
    default: {
        type: 'patch',
        commit: false,
        push: false,
        ["commit-and-push"]: false,
    },
    alias: {
        t: 'type',
        c: 'commit',
        h: 'help',
        p: 'push',
        cp: 'commit-and-push',
    }
});

const currentVersion = packageJson.default.version;

// `npm version` has no real --dry-run (it bumps regardless), so its actual stdout is the only reliable source for the new version.
const bumpVersion = (versionType) => {
    // We need to set --no-git-tag-version to prevent npm from messing with git,
    // which results in braking the application, complaining the working directory 
    // is not clean.
    const output = execSync(`npm version ${versionType} --no-git-tag-version`, { encoding: 'utf-8' }).trim();
    execSync('npm install', { stdio: 'inherit' });
    return output.replace(/^v/, '');
};

const help = `
Usage: node bump.js [options]

Options:
    -h, --help                Show this help message
    -t, --type                Version type to bump (patch, minor, major) (default: "patch")
    -c, --commit              Commit the changes (default: false)
    -p, --push                Push the changes to the remote repository (default: false)
    -cp, --commit-and-push    Commit and push the changes (default: false)
`;

if (args.help) {
    console.log(help);
    process.exit(0);
}

const newVersion = bumpVersion(args.type);
console.log(`Version bumped:${currentVersion} -> ${newVersion}`);

if (args.commit || args.cp) {
    execSync('git add .', { stdio: 'inherit' });
    execSync(`git commit -m "Bump version to ${newVersion}"`, { stdio: 'inherit' });
}


if (args.push || args.cp) {
    execSync('git push', { stdio: 'inherit' });
}