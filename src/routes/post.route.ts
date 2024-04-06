import { Router } from 'express';
import PostController from '../controllers/posts.controller';

export const postRoutes = Router();

postRoutes.post('/create-new-post', PostController.create);
postRoutes.get('/list', PostController.loadAllPosts);
postRoutes.get('/details/:id', PostController.loadPostDetails);
