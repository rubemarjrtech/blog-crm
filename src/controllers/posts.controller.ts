import { Request, Response } from 'express';
import { postModel } from '../database/repositories/post.repository';
import { StatusCodes } from 'http-status-codes';
import * as memberInfo from '../utils/memberInfo/member.info';
import { BodyRequest } from './types';
import { PostService } from '../services/post.service';
import { PostProps } from '../entities/post.entity';

export class PostController {
   constructor(private postService: PostService) {} // eslint-disable-line

   public create = async (
      req: BodyRequest<PostProps>,
      res: Response,
   ): Promise<void> => {
      try {
         const { title, body, thumbnail } = req.body;

         const createdPost = await this.postService.create({
            title,
            body,
            thumbnail,
         });

         res.status(StatusCodes.CREATED).json({
            createdPost,
         });
      } catch (err) {
         console.log(err);
         res.status(StatusCodes.BAD_REQUEST).send({
            message: 'error creating post',
         });
      }
   };

   public loadAllPosts = async (req: Request, res: Response) => {
      try {
         const page = parseInt(req.query.page as string) || 1;
         const perPage = 12;
         const ct = parseInt(req.query.ct as string);
         const id = ct;

         if (ct) {
            try {
               const data = await this.loadSingleMemberPosts(id, page, perPage);

               return res.status(StatusCodes.OK).json(data);
            } catch (err) {
               return console.log(err);
            }
         }

         const posts = await postModel
            .createQueryBuilder('posts')
            .orderBy('created_at', 'DESC')
            .offset((page - 1) * perPage)
            .limit(perPage)
            .getMany();

         // Retrieve and display all members info

         const membersDetails = await memberInfo.AllMembersInfo();

         res.status(StatusCodes.OK).json({
            posts,
            membersDetails,
         });
      } catch (err) {
         console.log(err);
      }
   };

   private loadSingleMemberPosts = async (
      id: number,
      page: number,
      perPage: number,
   ) => {
      const memberPosts = await postModel.find({
         relations: ['member'],
         where: {
            member: { id },
         },
         order: {
            createdAt: 'DESC',
         },
         skip: (page - 1) * perPage,
         take: perPage,
      });

      const saveInfo = memberPosts[0]['member']; // eslint-disable-line dot-notation

      const blogOwnerInfo = {
         full_name: saveInfo.fullName,
         birthplace: saveInfo.birthplace,
         birthdate: saveInfo.birthdate,
         image_url: saveInfo.imageUrl,
      };

      const posts = memberPosts.map((currentPost) => {
         const post = {
            id: currentPost.id,
            title: currentPost.title,
            body: currentPost.body,
            created_at: currentPost.createdAt,
         };

         return post;
      });

      // Retrieve and display all members info

      const membersDetails = await memberInfo.AllMembersInfo();

      return {
         blogOwnerInfo,
         posts,
         membersDetails,
      };
   };

   async loadPostDetails(req: Request, res: Response) {
      try {
         const id = parseInt(req.params.id);

         const post = await postModel
            .createQueryBuilder('post')
            .leftJoinAndSelect('post.comments', 'comment')
            .where('post.id = :id', { id })
            .getOne();

         if (!post) {
            return res.status(StatusCodes.NOT_FOUND).json({
               message: 'Blog not found.',
            });
         }

         // Retrieve last 10 posts from all members and post owner

         const lastTenPosts = await postModel
            .createQueryBuilder('posts')
            .orderBy('created_at', 'DESC')
            .limit(10)
            .getMany();

         const memberPosts = await postModel.find({
            relations: ['member'],
            where: {
               member: { id: post.memberId },
            },
            order: {
               createdAt: 'DESC',
            },
            take: 10,
         });

         const lastTenBlogOwnerPosts = memberPosts.map((currentPost) => {
            const post = {
               id: currentPost.id,
               title: currentPost.title,
               body: currentPost.body,
               created_at: currentPost.createdAt,
            };

            return post;
         });

         // Retrieve post owner info all members info

         const singleMemberDetails = await memberInfo.PostOwnerInfo(
            post.memberId,
         );

         const membersDetails = await memberInfo.AllMembersInfo();

         res.status(StatusCodes.OK).json({
            post,
            singleMemberDetails,
            lastTenBlogOwnerPosts,
            lastTenPosts,
            membersDetails,
         });
      } catch (err) {
         console.log(err);
      }
   }
}
