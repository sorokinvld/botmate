import { Injectable } from '@nestjs/common';
import findUp = require('find-up');
import { readFileSync } from 'fs';

@Injectable()
export class BotMateService {
  async getVersion() {
    const packageJsonPath = await findUp('package.json');
    if (packageJsonPath) {
      const packageJson = readFileSync(packageJsonPath, 'utf8');
      return JSON.parse(packageJson).version;
    }
  }

  update() {
    return 'Updating BotMate';
  }
}
