import { Router } from 'express';
import { baseRoute } from './base.route';
import { postRoutes } from './post.route';
import { commentRoutes } from './comment.route';

export const router = Router();

router.use(baseRoute);
router.use('/diary/blog', postRoutes);
router.use('/comment_add', commentRoutes);
