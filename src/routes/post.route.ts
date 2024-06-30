import { Router } from 'express';
import { PostController } from '../controllers/posts.controller';
import { PostFactory } from '../factory/post.factory';
import {
   adminAuthMiddleware,
   userAuthMiddleware,
} from '../middlewares/auth.middleware';
import { QueryType, validator } from '../middlewares/validation.middleware';
import { createPostSchema, loadAllPostsSchema } from '../DTOs/post.dto';

const postController = new PostController(PostFactory.getServiceInstance());

export const postRoutes = Router();

postRoutes.post(
   '/create',
   userAuthMiddleware,
   validator({ schema: createPostSchema, type: QueryType.BODY }),
   postController.create,
);
postRoutes.get(
   '/',
   validator({ schema: loadAllPostsSchema, type: QueryType.QUERY }),
   postController.loadAllPosts,
);
postRoutes.get(
   '/pending',
   adminAuthMiddleware,
   postController.loadPostsForApproval,
);
postRoutes.get('/recent', postController.loadMostRecentAll);
postRoutes.put('/pending/:id', adminAuthMiddleware, postController.publishPost);
postRoutes.get('/:id', postController.loadPostDetails);
postRoutes.get('/recent/:id', postController.loadMostRecentSingle);
