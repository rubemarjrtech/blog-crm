import { Router } from 'express';
import { CommentController } from '../controllers/comment.controller';
import { CommentFactory } from '../factory/comment.factory';

const commentController = new CommentController(
   CommentFactory.getCommentService(),
);

export const commentRoutes = Router();

commentRoutes.post('/create/:id', commentController.create);
commentRoutes.get('/:id', commentController.loadCommentsForPost);
commentRoutes.delete('/delete/:id', commentController.deleteComment);
