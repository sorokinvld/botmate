import { Injectable } from '@nestjs/common';
import { existsSync, readFileSync } from 'fs';
import * as path from 'path';

@Injectable()
export class BotMateService {
  async getVersion() {
    let version = '0.0.0';
    const packagePath = path.join(__dirname, '../..', 'package.json');

    if (existsSync(packagePath)) {
      const packageJson = JSON.parse(readFileSync(packagePath, 'utf8'));

      version = packageJson.version;
    }

    return version;
  }

  update() {
    return 'Updating BotMate';
  }
}
