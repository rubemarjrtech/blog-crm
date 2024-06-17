import { Router } from 'express';
import { PostController } from '../controllers/posts.controller';
import { PostFactory } from '../factory/post.factory';

const postController = new PostController(PostFactory.getServiceInstance());

export const postRoutes = Router();

postRoutes.post('/create', postController.create);
postRoutes.get('/', postController.loadAllPosts);
postRoutes.get('/recent', postController.loadMostRecentAll);
postRoutes.get('/:id', postController.loadPostDetails);
postRoutes.get('/recent/:id', postController.loadMostRecentSingle);
