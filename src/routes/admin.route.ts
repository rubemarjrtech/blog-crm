import { Router } from 'express';
import AdminController from '../controllers/admin.controller';

export const adminRouter = Router();

adminRouter.post('/create', AdminController.create);
