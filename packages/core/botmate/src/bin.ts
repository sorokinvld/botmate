#!/usr/bin/env node

import _ from 'lodash';
import path from 'path';
import resolveCwd from 'resolve-cwd';
import { yellow } from 'chalk';
import { Command, Option } from 'commander';
import inquirer from 'inquirer';

const program = new Command();

const checkCwdIsBotMateApp = (name: string) => {
  const logErrorAndExit = () => {
    console.log(
      `You need to run ${yellow(
        `botmate ${name}`
      )} in a BotMate project. Make sure you are in the right directory.`
    );
    process.exit(1);
  };

  try {
    const pkgJSON = require(`${process.cwd()}/package.json`);
    if (!_.has(pkgJSON, 'dependencies.@botmate/core')) {
      logErrorAndExit();
    }
  } catch (err) {
    logErrorAndExit();
  }
};

const getLocalScript =
  (name: string) =>
  async (...args) => {
    checkCwdIsBotMateApp(name);

    const cmdPath = resolveCwd.silent(`@botmate/core/lib/commands/${name}`);

    if (!cmdPath) {
      console.log(
        `Error loading the local ${yellow(
          name
        )} command. BotMate might not be installed in your "node_modules". You may need to run "pnpm install".`
      );
      process.exit(1);
    }

    const script = await import(cmdPath);

    Promise.resolve()
      .then(() => {
        return script.default(...args);
      })
      .catch((error) => {
        console.error(error);
        process.exit(1);
      });
  };

// `$ botmate start`
program
  .command('start')
  .description('Start your botmate application')
  .action(getLocalScript('start'));

// `$ botmate develop`
program
  .command('develop')
  .alias('dev')
  .option('--no-build', 'Disable build')
  .option('--watch-admin', 'Enable watch', false)
  .option('--polling', 'Watch for file changes in network directories', false)
  .option('--browser <name>', 'Open the browser', true)
  .description('Start your BotMate application in development mode')
  .action(getLocalScript('develop'));

program
  .command('build')
  .option('--no-optimization', 'Build the admin app without optimizing assets')
  .description('Build the botmate admin app')
  .action(getLocalScript('build'));

//   `$ botmate watch-admin`
program
  .command('watch-admin')
  .option('--browser <name>', 'Open the browser', true)
  .description('Start the admin development server')
  .action(getLocalScript('watchAdmin'));

function loadVersion() {
  try {
    const pkgJSON = require(path.resolve(__dirname, '../package.json'));
    program.version(pkgJSON.version);
  } catch {}
}

loadVersion();

program.parse();
