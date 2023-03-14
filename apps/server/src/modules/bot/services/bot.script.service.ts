import { BotMateLogger } from '@/common';
import { StorageService } from '@/modules/storage/storage.service';
import { Injectable } from '@nestjs/common';
import { Context } from 'grammy';
import { NodeVM } from 'vm2';
import axios from 'axios';
import { CommandService } from '@/modules/command/command.service';

@Injectable()
export class BotScriptService {
  private readonly logger = new BotMateLogger(BotScriptService.name);

  constructor(
    private readonly storageService: StorageService,
    private cmdService: CommandService,
  ) {}

  public runScript(script: string, botCtx: Context) {
    this.logger.debug(`running custom script`);
    const vm = new NodeVM({
      require: {
        external: true,
        builtin: ['fs'],
      },
      sandbox: {
        axios,
        Bot: botCtx,
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
        runCommand: async (commandName: string) => {
          const command = await this.cmdService.findCommand(
            botCtx.me.id.toString(),
            commandName,
          );
          if (command) this.runScript(command.script, botCtx);
        },
      },
    });

    try {
      vm.run(`
      async function main() {
        ${script}
      }
      main()
    `);
    } catch (e) {
      this.logger.log('Error while running script: ');
      this.logger.error(e);
    }
  }
}
