import { Router } from 'express';
import { baseRoute } from './base.route';
import { adminRouter } from './admin.route';

export const router = Router();

router.use(baseRoute);
router.use('/admin', adminRouter);
