import { Router } from 'express';
import CommentController from '../controllers/comment.controller';

export const commentRoutes = Router();

commentRoutes.post('/:id', CommentController.create);
