import { Router } from 'express';
import { AdminController } from '../controllers/admin.controller';

export const adminRoutes = Router();

const adminController = new AdminController();

adminRoutes.use('/login', adminController.login);
