import { Request, Response } from 'express';
import { postRepository } from '../database/repositories/post.repository';
import statusCodes from 'http-status-codes';

class PostController {
   async create(req: Request, res: Response) {
      try {
         const { title, body } = req.body;

         const newPost = await postRepository.create({
            title,
            body,
         });

         await postRepository.save(newPost);

         return res.status(statusCodes.CREATED).json({
            message: 'Post created!',
         });
      } catch (err) {
         console.log(err);
      }
   }
}

export default new PostController();
