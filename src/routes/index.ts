import { Router } from 'express';
import { baseRoute } from './base.route';
import { postRoutes } from './post.route';
import { commentRoutes } from './comment.route';
import { memberRoutes } from './member.route';
import { imageRoutes } from './image.route';
import { userRoutes } from './user.route';

export const router = Router();

router.use(baseRoute);
router.use('/post', postRoutes);
router.use('/comment', commentRoutes);
router.use('/member', memberRoutes);
router.use('/image', imageRoutes);
router.use('/user', userRoutes);
