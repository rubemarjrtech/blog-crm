import { Request, Response } from 'express';
import { commentRepository } from '../database/repositories/comment.repository';
import { StatusCodes } from 'http-status-codes';

class CommentController {
   async create(req: Request, res: Response) {
      try {
         const { id } = req.params;
         const { name, email, url, comment } = req.body;

         const newComment = await commentRepository.create({
            name,
            email,
            url,
            comment,
            id,
         });

         await commentRepository.save(newComment);

         return res.status(StatusCodes.CREATED).json({
            message: 'Comment submitted!',
         });
      } catch (err) {
         console.log(err);
      }
   }
}

export default new CommentController();
