import { Router } from 'express';
import { baseRoute } from './base.route';
import { postRoutes } from './post.route';

export const router = Router();

router.use(baseRoute);
router.use('/posts', postRoutes);
