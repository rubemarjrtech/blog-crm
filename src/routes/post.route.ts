import { Router } from 'express';
import { PostController } from '../controllers/posts.controller';

const postController = new PostController();

export const postRoutes = Router();

postRoutes.post('/create', postController.create);
postRoutes.get('/list', postController.loadAllPosts);
postRoutes.get('/details/:id', postController.loadPostDetails);
