import { Router } from 'express';
import { PostController } from '../controllers/posts.controller';
import { PostFactory } from '../factory/post.factory';
import { authMiddleware } from '../middlewares/auth.middleware';
import { QueryType, validator } from '../middlewares/validation.middleware';
import { createPostSchema } from '../DTOs/post.dto';

const postController = new PostController(PostFactory.getServiceInstance());

export const postRoutes = Router();

postRoutes.post(
   '/create',
   authMiddleware,
   validator({ schema: createPostSchema, type: QueryType.BODY }),
   postController.create,
);
postRoutes.get('/', postController.loadAllPosts);
postRoutes.get('/recent', postController.loadMostRecentAll);
postRoutes.get('/:id', postController.loadPostDetails);
postRoutes.get('/recent/:id', postController.loadMostRecentSingle);
