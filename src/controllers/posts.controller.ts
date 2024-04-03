import { Request, Response } from 'express';
import { postRepository } from '../database/repositories/post.repository';
import statusCodes from 'http-status-codes';
import { Member } from '../database/models/member.model';
import { appDataSource } from '../data-source';

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

   async loadMemberPosts(req: Request, res: Response) {
      try {
         const id = parseInt(req.params.id);

         const post = await postRepository.find({
            relations: ['member'],
            where: {
               member: { id },
            },
         });
         res.status(statusCodes.OK).json({
            post,
         });
      } catch (err) {
         console.log(err);
      }
   }

   async loadPostDetails(req: Request, res: Response) {
      try {
         const id = parseInt(req.params.id);

         const post = await postRepository
            .createQueryBuilder('post')
            .leftJoinAndSelect('post.comments', 'comment')
            .where('post.id = :id', { id })
            .getOne();

         if (post === null) {
            return res.status(statusCodes.NOT_FOUND).json({
               message: 'Blog not found.',
            });
         }

         // Retrieve member info

         const member_id = post.member_id; // eslint-disable-line camelcase

         const member = await appDataSource.manager.findOneBy(Member, {
            id: member_id, // eslint-disable-line camelcase
         });

         res.status(statusCodes.OK).json({
            post,
            member,
         });
      } catch (err) {
         console.log(err);
      }
   }
}

export default new PostController();
