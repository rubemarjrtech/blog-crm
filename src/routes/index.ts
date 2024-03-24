import { Router } from 'express';
import { baseRoute } from './base.route';

export const router = Router();

router.use(baseRoute);
