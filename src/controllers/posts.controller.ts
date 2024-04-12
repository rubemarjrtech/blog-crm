import { Request, Response } from 'express';
import { postRepository } from '../database/repositories/post.repository';
import { StatusCodes } from 'http-status-codes';
import { AllMembersInfo, PostOwnerInfo } from '../utils/memberInfo/member.info';
import { imageRepository } from '../database/repositories/image.repository';

export class PostController {
   async create(req: Request, res: Response) {
      try {
         const files = req.files as any[]; // eslint-disable-line
         const { title, body } = req.body;

         const newPost = postRepository.create({
            title,
            body,
            member_id: 6,
         });

         const seePost = await postRepository.save(newPost);

         if (files && files.length > 0) {
            files.map(async (file) => {
               try {
                  const result = imageRepository.create({
                     path: file.path,
                     post_id: seePost.id,
                  });

                  await imageRepository.save(result);
               } catch (err) {
                  return console.log(err);
               }
            });
         }

         res.status(StatusCodes.CREATED).json({
            message: 'Post created!',
         });
      } catch (err) {
         console.log(err);
      }
   }

   loadAllPosts = async (req: Request, res: Response) => {
      try {
         const page: number = parseInt(req.query.page as string) || 1;
         const perPage: number = 12;
         const ct: number = parseInt(req.query.ct as string);
         const id = ct;

         if (ct) {
            try {
               const data = await this.loadSingleMemberPosts(id, page, perPage);

               return res.status(StatusCodes.OK).json(data);
            } catch (err) {
               return console.log(err);
            }
         }

         const posts = await postRepository
            .createQueryBuilder('posts')
            .orderBy('created_at', 'DESC')
            .offset((page - 1) * perPage)
            .limit(perPage)
            .getMany();

         // Retrieve and display all members info

         const membersDetails = await AllMembersInfo();

         res.status(StatusCodes.OK).json({
            posts,
            membersDetails,
         });
      } catch (err) {
         console.log(err);
      }
   };

   loadSingleMemberPosts = async (
      id: number,
      page: number,
      perPage: number,
   ) => {
      const memberPosts = await postRepository.find({
         relations: ['member'],
         where: {
            member: { id },
         },
         order: {
            created_at: 'DESC',
         },
         skip: (page - 1) * perPage,
         take: perPage,
      });

      const saveInfo = memberPosts[0]['member']; // eslint-disable-line dot-notation

      const blogOwnerInfo = {
         full_name: saveInfo.full_name,
         birthplace: saveInfo.birthplace,
         birthdate: saveInfo.birthdate,
         image_url: saveInfo.image_url,
      };

      const posts = memberPosts.map((currentPost) => {
         const post = {
            id: currentPost.id,
            title: currentPost.title,
            body: currentPost.body,
            created_at: currentPost.created_at,
         };

         return post;
      });

      // Retrieve and display all members info

      const membersDetails = await AllMembersInfo();

      return {
         blogOwnerInfo,
         posts,
         membersDetails,
      };
   };

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

         // Retrieve last 10 posts from all members and post owner

         const lastTenPosts = await postRepository
            .createQueryBuilder('posts')
            .orderBy('created_at', 'DESC')
            .limit(10)
            .getMany();

         const memberPosts = await postRepository.find({
            relations: ['member'],
            where: {
               member: { id: post.member_id },
            },
            order: {
               created_at: 'DESC',
            },
            take: 10,
         });

         const lastTenBlogOwnerPosts = memberPosts.map((currentPost) => {
            const post = {
               id: currentPost.id,
               title: currentPost.title,
               body: currentPost.body,
               created_at: currentPost.created_at,
            };

            return post;
         });

         // Retrieve post owner info all members info

         const singleMemberDetails = await PostOwnerInfo(post.member_id);

         const membersDetails = await AllMembersInfo();

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
