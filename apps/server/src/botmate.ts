#!/usr/bin/env node

import { program } from 'commander';
import { existsSync, writeFileSync, readFileSync } from 'fs';
import { startServer } from './main';
import * as prompts from 'prompts';

program.command('init').action(async () => {
  const cwd = process.cwd();

  if (!existsSync(cwd + '/.env')) {
    console.log('No environment file found. Creating one...');

    const response = await prompts([
      {
        type: 'text',
        name: 'DB_HOST',
        message: 'Enter database host',
      },
      {
        type: 'number',
        name: 'DB_PORT',
        message: 'Enter database port',
        initial: 5432,
      },
      {
        type: 'text',
        name: 'DB_NAME',
        message: 'Enter database name',
      },
      {
        type: 'text',
        name: 'DB_USERNAME',
        message: 'Enter database username',
      },
      {
        type: 'text',
        name: 'DB_PASSWORD',
        message: 'Enter database password',
        mask: '*',
      },
    ]);

    let env = '';

    for (const key of Object.keys(response)) {
      env += `${key}=${response[key]}\n`;
    }

    writeFileSync(cwd + '/.env', env);
  }

  startServer();
});

let version = 'undefined';

if (existsSync(`${__dirname}/package.json`)) {
  const packageJson = JSON.parse(
    readFileSync(`${__dirname}/package.json`, 'utf8'),
  );

  version = packageJson.version;
}

program.version(version);
program.parse();
