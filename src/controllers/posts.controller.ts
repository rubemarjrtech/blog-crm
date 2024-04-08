import { Request, Response } from 'express';
import { postRepository } from '../database/repositories/post.repository';
import { StatusCodes } from 'http-status-codes';
import { memberRepository } from '../database/repositories/member.repository';
import { AllMembersInfo, PostOwnerInfo } from '../utils/memberInfo/member.info';

export class PostController {
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

         const members = await memberRepository
            .createQueryBuilder('members')
            .orderBy('full_name', 'ASC')
            .getMany();

         const membersDetails = members.map((currentMember) => {
            const currentMemberDetails = {
               id: currentMember.id,
               full_name: currentMember.full_name,
               image_url: currentMember.image_url,
            };

            return currentMemberDetails;
         });

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
      const [memberPosts, members] = await Promise.all([
         await postRepository.find({
            relations: ['member'],
            where: {
               member: { id },
            },
            order: {
               created_at: 'DESC',
            },
            skip: (page - 1) * perPage,
            take: perPage,
         }),
         await memberRepository
            .createQueryBuilder('members')
            .orderBy('full_name', 'ASC')
            .getMany(),
      ]);

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

      const membersDetails = members.map((currentMember) => {
         const currentMemberDetails = {
            id: currentMember.id,
            full_name: currentMember.full_name,
            image_url: currentMember.image_url,
         };

         return currentMemberDetails;
      });

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

         // Retrieve post owner info

         const singleMemberDetails = await PostOwnerInfo(post.member_id);

         // Retrieve and display all members info

         const membersDetails = await AllMembersInfo();

         res.status(StatusCodes.OK).json({
            post,
            singleMemberDetails,
            membersDetails,
         });
      } catch (err) {
         console.log(err);
      }
   }
}
