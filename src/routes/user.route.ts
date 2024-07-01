import { Router } from 'express';
import { UserController } from '../controllers/users.controller';
import UserFactory from '../factory/user.factory';
import { QueryType, validator } from '../middlewares/validation.middleware';
import { userLoginSchema } from '../DTOs/user.dto';

export const userRoutes = Router();

const userController = new UserController(UserFactory.getUserService());

userRoutes.post(
   '/login',
   validator({ schema: userLoginSchema, type: QueryType.BODY }),
   userController.login,
);
