import { Router } from 'express';
import { CommentController } from '../controllers/comment.controller';
import { CommentFactory } from '../factory/comment.factory';
import { QueryType, validator } from '../middlewares/validation.middleware';
import { createCommentSchema } from '../DTOs/comment.dto';
import { adminAuthMiddleware } from '../middlewares/auth.middleware';

const commentController = new CommentController(
   CommentFactory.getCommentService(),
);

export const commentRoutes = Router();

commentRoutes.post(
   '/create/:id',
   validator({ schema: createCommentSchema, type: QueryType.BODY }),
   commentController.create,
);
commentRoutes.get(
   '/pending',
   adminAuthMiddleware,
   commentController.loadCommentsForApproval,
);
commentRoutes.get('/:id', commentController.loadCommentsForPost);
commentRoutes.put(
   '/approve/:id',
   adminAuthMiddleware,
   commentController.updateCommentStatus,
);
commentRoutes.delete('/delete/:id', commentController.deleteComment);
