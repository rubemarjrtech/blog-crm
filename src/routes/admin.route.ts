import { Router } from 'express';
import { AdminController } from '../controllers/admin.controller';
import { QueryType, validator } from '../middlewares/validation.middleware';
import { adminLoginSchema } from '../DTOs/admin.dto';

export const adminRoutes = Router();

const adminController = new AdminController();

adminRoutes.use(
   '/login',
   validator({ schema: adminLoginSchema, type: QueryType.BODY }),
   adminController.login,
);
