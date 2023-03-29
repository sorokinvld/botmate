import { Router } from 'express';
import { controllers } from './controllers';

const botsRoutes = Router();

botsRoutes.get('/', controllers.find);

export { botsRoutes };
