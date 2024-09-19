import { Router } from 'express';
import { AdminController } from '../controllers/admin.controller';
import { QueryType, validator } from '../middlewares/validation.middleware';
import { adminLoginSchema } from '../DTOs/admin.dto';
import AdminFactory from '../factory/admin.factory';
import { adminAuthMiddleware } from '../middlewares/auth.middleware';

export const adminRoutes = Router();

const adminController = new AdminController(AdminFactory.getAdminService());

adminRoutes.post(
   '/login',
   validator({ schema: adminLoginSchema, type: QueryType.BODY }),
   adminController.login,
);
adminRoutes.get('/logout', adminAuthMiddleware, adminController.logout);
