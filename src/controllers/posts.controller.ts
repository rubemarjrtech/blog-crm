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

         res.status(statusCodes.CREATED).json({
            message: 'Post created!',
         });
      } catch (err) {
         console.log(err);
      }
   }

   async loadAllPosts(req: Request, res: Response) {
      try {
         const allPosts = await postRepository.find();

         res.status(statusCodes.OK).json({
            allPosts,
         });
      } catch (err) {
         console.log(err);
      }
   }

   async loadPostById(req: Request, res: Response) {
      try {
         const id = parseInt(req.params.id);

         const post = await postRepository.findOneBy({
            id,
         });

         res.status(statusCodes.OK).json({
            post,
         });
      } catch (err) {
         console.log(err);
      }
   }
}

export default new PostController();
