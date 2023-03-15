import { BotMateLogger } from '@/common';
import { StorageService } from '@/modules/storage/storage.service';
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Context } from 'grammy';

@Injectable()
export class BotSandbox {
  private readonly logger = new BotMateLogger(BotSandbox.name);

  constructor(private readonly storageService: StorageService) {}

  getSandbox(botId: string, Ctx?: Context) {
    return {
      Ctx,
      Axios: axios,
      Storage: {
        get: async (key: string, defaultValue?: any) => {
          this.logger.debug(`getting storage key: ${key}`);
          return this.storageService.get(key, defaultValue);
        },
        set: async (key: string, value: any) => {
          this.logger.debug(`setting storage key: ${key}`);
          return this.storageService.set(key, value);
        },
      },
      // runCommand: async (commandName: string) => {
      //   const command = await this.cmdService.findCommand(botId, commandName);
      //   if (command) this.botScriptService.runScript(command.script, Ctx);
      // },
    };
  }
}
