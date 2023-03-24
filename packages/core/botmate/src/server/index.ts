import { createExpressApp } from './express';

const createServer = (botmate) => {
	const app = createExpressApp();

	return app;
};

export { createServer };
