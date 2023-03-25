import express from 'express';
import path from 'path';
import morgan from 'morgan';

const logger = morgan('dev');

const createExpressApp = () => {
  const app = express();

  app.use(logger);
  app.use(express.static('public'));
  app.use(express.static('dist/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'dist', 'build', 'index.html'));
  });

  return app;
};

export { createExpressApp };
