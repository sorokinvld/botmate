import { BotMateLogger } from '@/common';
import { StorageService } from '@/modules/storage/storage.service';
import { Injectable } from '@nestjs/common';
import { Context } from 'grammy';
import { NodeVM } from 'vm2';

@Injectable()
export class BotScriptService {
  private readonly logger = new BotMateLogger(BotScriptService.name);

  constructor(private readonly storageService: StorageService) {}

  public runScript(script: string, botCtx: Context) {
    this.logger.debug(`running custom script`);
    const vm = new NodeVM({
      require: {
        external: true,
      },
      sandbox: {
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
