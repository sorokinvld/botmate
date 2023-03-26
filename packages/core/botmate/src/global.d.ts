import { BotMate } from '../BotMate';

declare global {
  namespace BotMate {
    type BotMateInstance = BotMate;
  }
  export const botmate: BotMate;
  export interface Global {
    botmate: BotMate;
  }
}

export {};
