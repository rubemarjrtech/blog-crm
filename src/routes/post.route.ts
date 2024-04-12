import { Router } from 'express';
import { PostController } from '../controllers/posts.controller';
import multerConfig from '../config/multer/multer.config';
import multer from 'multer';

const postController = new PostController();

export const postRoutes = Router();

const upload = multer(multerConfig);

postRoutes.post(
   '/create-new-post',
   upload.array('files', 5),
   postController.create,
);
postRoutes.get('/list', postController.loadAllPosts);
postRoutes.get('/details/:id', postController.loadPostDetails);
