import { Request, Response } from 'express';
import { commentRepository } from '../database/repositories/comment.repository';
import { StatusCodes } from 'http-status-codes';

class CommentController {
   async create(req: Request, res: Response) {
      try {
         const post_id = parseInt(req.params.id); // eslint-disable-line camelcase
         const { name, email, url, comment } = req.body;

         const newComment = await commentRepository.create({
            name,
            email,
            url,
            comment,
            post_id, // eslint-disable-line camelcase
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
