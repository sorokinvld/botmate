import { Request, Response } from 'express';
import { findBots } from './services';

type AppController = {
  [key: string]: (req: Request, res: Response, next?: Function) => Promise<void>;
};

export const botsControllers: AppController = {
  find: async (req, res) => {
    const bots = await findBots();
    res.json(bots);
  },
};
