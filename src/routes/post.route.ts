import { Router } from 'express';
import { PostController } from '../controllers/posts.controller';
import { PostFactory } from '../factories/post.factory';

const postController = new PostController(PostFactory.getServiceInstance());

export const postRoutes = Router();

postRoutes.post('/create', postController.create);
postRoutes.get('/list', postController.loadAllPosts);
postRoutes.get('/details/:id', postController.loadPostDetails);
