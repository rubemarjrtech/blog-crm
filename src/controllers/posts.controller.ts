import { Request, Response } from 'express';
import { postRepository } from '../database/repositories/post.repository';
import { StatusCodes } from 'http-status-codes';
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

         res.status(StatusCodes.CREATED).json({
            message: 'Post created!',
         });
      } catch (err) {
         console.log(err);
      }
   }

   async loadAllPosts(_: Request, res: Response) {
      try {
         const allPosts = await postRepository.find();

         res.status(StatusCodes.OK).json({
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
         res.status(StatusCodes.OK).json({
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

         if (!post) {
            return res.status(StatusCodes.NOT_FOUND).json({
               message: 'Blog not found.',
            });
         }

         // Retrieve member info

         const member = await appDataSource.manager.findOneBy(Member, {
            id: post.member_id, // eslint-disable-line camelcase
         });

         if (!member) {
            return res.status(StatusCodes.NOT_FOUND);
         }
         const memberDetails = {
            id: member.id,
            full_name: member.full_name,
            image_url: member.image_url,
         };

         res.status(StatusCodes.OK).json({
            post,
            memberDetails,
         });
      } catch (err) {
         console.log(err);
      }
   }
}

export default new PostController();
