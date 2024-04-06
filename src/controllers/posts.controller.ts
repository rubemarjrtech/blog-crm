import { Request, Response } from 'express';
import { postRepository } from '../database/repositories/post.repository';
import { StatusCodes } from 'http-status-codes';
import { Member } from '../database/models/member.model';
import { appDataSource } from '../data-source';
import { memberRepository } from '../database/repositories/member.repository';

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

   async loadAllPosts(req: Request, res: Response) {
      try {
         const page: number = parseInt(req.query.page as string) || 1;
         const perPage: number = 12;
         const ct: number = parseInt(req.query.ct as string);
         const id = ct;

         if (ct) {
            try {
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

               return res.status(StatusCodes.OK).json({
                  blogOwnerInfo,
                  posts,
                  membersDetails,
               });
            } catch (err) {
               console.log(err);
            }
         }

         const posts = await postRepository
            .createQueryBuilder('posts')
            .orderBy('created_at', 'DESC')
            .offset((page - 1) * perPage)
            .limit(perPage)
            .getMany();

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
   }

   async loadMemberPosts() {}

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
