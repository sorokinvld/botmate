import { BotMateLogger } from '@/common';
import { Injectable } from '@nestjs/common';
import { Context } from 'grammy';
import { NodeVM } from 'vm2';

@Injectable()
export class BotScriptService {
  private readonly logger = new BotMateLogger(BotScriptService.name);

  // constructor() {}

  public runScript(script: string, botCtx: Context) {
    this.logger.debug(`running custom script`);
    const vm = new NodeVM({
      require: {
        external: true,
      },
      sandbox: {
        Bot: botCtx,
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
