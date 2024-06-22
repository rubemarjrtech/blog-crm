import { Router } from 'express';
import { UserController } from '../controllers/users.controller';
import UserFactory from '../factory/user.factory';

export const userRoutes = Router();

const userController = new UserController(UserFactory.getUserService());

userRoutes.post('/login', userController.login);
