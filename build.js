#!/usr/bin/env node

const path = require('path');

const emoji = require('node-emoji');
const chalk = require('chalk');
const Bundler = require('parcel-bundler');

const entryFile = path.join(__dirname, 'src', 'style.css');

const defaultOptions = {
  sourceMaps: false,
  logLevel: 0
};

const targets = {
  safari: {
    ...defaultOptions,
  },
  user: {
    ...defaultOptions,
  },
};

console.log();
console.log(`${emoji.get('package')} ${chalk.yellow.bold(process.env.NODE_ENV.toUpperCase())} build`);
console.log();

(async () => {
  for (const [target, options] of Object.entries(targets)) {

    const outFile = `style.${target}.css`;
    const bundler = new Bundler(entryFile, {
      ...options,
      outFile,
    })

    bundler.on('bundled', (bundle) => {
      console.log(chalk.green(`${emoji.get('tada')} ${chalk.bold(target)} [${chalk.white(outFile)}] bundled`))
    });

    bundler.on('buildStart', () => console.log(chalk.grey(`${emoji.get('hammer_and_wrench')}  Building ${target}...`)))
    bundler.on('buildError', err => {
      console.error();
      console.error(emoji.get('red_circle'), chalk.red('Build Failed! '), chalk.bold.white(err.message))
      console.error(`in file: ${chalk.bold(err.file)}`);
      console.error(`on line: ${chalk.bold(err.line)}`);
      console.error(`at column: ${chalk.bold(err.column)}`);
      console.error(chalk.grey(err.stack));
    });

    await bundler.bundle();
  }
})();
