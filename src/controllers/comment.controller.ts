import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CommentService } from '../services/comment.service';

export class CommentController {
   constructor(private commentService: CommentService) {} // eslint-disable-line

   public create = async (req: Request, res: Response): Promise<Response> => {
      try {
         const postId = parseInt(req.params.id);
         const { name, email, url, comment } = req.body;

         const newComment = await this.commentService.create({
            name,
            email,
            url,
            comment,
            postId,
         });

         if (!newComment) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
               message: 'Something went wrong',
            });
         }

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
}
