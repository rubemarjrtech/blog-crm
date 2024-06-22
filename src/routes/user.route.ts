import { Router } from 'express';
import { UserController } from '../controllers/users.controller';

export const userRoutes = Router();

const userController = new UserController();

userRoutes.post('/login', userController.login);
