import { Injectable } from '@nestjs/common';
import { Context } from 'grammy';
import { NodeVM } from 'vm2';

@Injectable()
export class BotScriptService {
  public runScript(script: string, botCtx: Context) {
    const vm = new NodeVM({
      require: {
        external: true,
        root: './',
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
    } catch (e) {}
  }
}
