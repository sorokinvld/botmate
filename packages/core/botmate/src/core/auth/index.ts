import { Router } from 'express';
import { AuthService } from './auth.service';

const authRouter = Router();
const authService = new AuthService();

authRouter.get('/login', (req, res) => {
  res.send('login');
});

export default authRouter;
