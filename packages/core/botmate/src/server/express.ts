import express from 'express';
import path from 'path';
import morgan from 'morgan';

const logger = morgan('dev');

const createExpressApp = () => {
  const app = express();

  app.use(logger);
  app.use(express.static('public'));
  app.use(express.static('dist/build'));

  return app;
};

export { createExpressApp };
