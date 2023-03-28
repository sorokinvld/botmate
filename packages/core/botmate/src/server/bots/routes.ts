import { Router } from 'express';
import { botsControllers } from './controllers';

const botsRoutes = Router();

botsRoutes.get('/', botsControllers.find);

export { botsRoutes };
