import { Request, Response } from 'express';

type AppController = {
  [key: string]: (req: Request, res: Response, next?: Function) => Promise<void>;
};

export const controllers: AppController = {
  find: async (req, res) => {},
  create: async (req, res) => {},
};
