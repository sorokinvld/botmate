import path from 'path';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

const logger = morgan('dev');

const createExpressApp = () => {
  const app = express();

  app.use(logger);
  app.use(cors());
  app.use(express.json());
  app.use(express.static('public'));
  const buildDir = path.resolve(botmate.dirs.dist.root, 'build');
  app.use(express.static(buildDir));

  return app;
};

export { createExpressApp };
