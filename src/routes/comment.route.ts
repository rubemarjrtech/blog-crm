import { Router } from 'express';
import { CommentController } from '../controllers/comment.controller';
import { CommentFactory } from '../factory/comment.factory';

const commentController = new CommentController(
   CommentFactory.getCommentService(),
);

export const commentRoutes = Router();

commentRoutes.post('/:id', commentController.create);
