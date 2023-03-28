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
  app.use(express.static('dist/build'));

  return app;
};

export { createExpressApp };
