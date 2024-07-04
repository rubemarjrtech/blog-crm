import { Router } from 'express';
import { AdminController } from '../controllers/admin.controller';
import { QueryType, validator } from '../middlewares/validation.middleware';
import { adminLoginSchema } from '../DTOs/admin.dto';
import AdminFactory from '../factory/admin.factory';

export const adminRoutes = Router();

const adminController = new AdminController(AdminFactory.getAdminService());

adminRoutes.use(
   '/login',
   validator({ schema: adminLoginSchema, type: QueryType.BODY }),
   adminController.login,
);
