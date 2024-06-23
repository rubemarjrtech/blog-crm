import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CommentService } from '../services/comment.service';
import { BodyRequest } from './types';
import { createCommentDTO } from '../DTOs/comment.dto';

export class CommentController {
   constructor(private commentService: CommentService) {} // eslint-disable-line

   public create = async (
      req: BodyRequest<createCommentDTO>,
      res: Response,
   ): Promise<Response> => {
      try {
         const postId = parseInt(req.params.id);
         const { name, email, url, comment } = req.body;

         await this.commentService.create({
            name,
            email,
            url,
            comment,
            postId,
         });

         return res.status(StatusCodes.CREATED).json({
            message: 'Comment submitted!',
         });
      } catch (err) {
         console.log(err);

         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Something went wrong',
         });
      }
   };

   public loadCommentsForPost = async (
      req: Request,
      res: Response,
   ): Promise<Response> => {
      try {
         const postId = parseInt(req.params.id);
         const page = parseInt(req.query.page as string) || 1;

         const comments = await this.commentService.loadCommentsForPost(
            postId,
            page,
         );

         return res.status(StatusCodes.OK).json(comments);
      } catch (err) {
         console.log(err);

         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Something went wrong',
         });
      }
   };

   public deleteComment = async (
      req: Request,
      res: Response,
   ): Promise<Response> => {
      try {
         const id = req.params.id;

         const deletedComment = await this.commentService.deleteComment(id);

         if (!deletedComment) {
            return res.status(StatusCodes.NOT_FOUND).json({
               message: 'Comment not found',
            });
         }

         return res.status(StatusCodes.OK).json({
            message: 'Comment deleted successfully!',
         });
      } catch (err) {
         console.log(err);

         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Something went wrong',
         });
      }
   };
}
