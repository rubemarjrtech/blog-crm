import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { BodyRequest, QueryRequest } from './types';
import { PostService } from '../services/post.service';
import { createPostDTO, loadAllPostsDTO } from '../DTOs/post.dto';

export class PostController {
   constructor(private postService: PostService) {} // eslint-disable-line

   public create = async (
      req: BodyRequest<createPostDTO>,
      res: Response,
   ): Promise<void> => {
      try {
         const { title, body, thumbnail } = req.body;
         const user = req.decodedUser;

         const createdPost = await this.postService.create({
            title,
            body,
            thumbnail,
            memberId: user!.userId,
         });

         const post = {
            id: createdPost.id,
            title: createdPost.title,
            body: createdPost.body,
            thumbnail: createdPost.thumbnail,
            status: createdPost.status,
         };

         res.status(StatusCodes.CREATED).json(post);
      } catch (err) {
         console.log(err);
         res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            message: 'Something went wrong',
         });
      }
   };

   public loadAllPosts = async (
      req: QueryRequest<loadAllPostsDTO>,
      res: Response,
   ): Promise<Response> => {
      try {
         const { ct, page } = req.query;

         const pg = parseInt(page as string) || 1;
         const perPage = 12;

         // filter posts by member
         if (ct) {
            const id = parseInt(ct);

            const singleMemberPosts = await this.postService.loadAll(
               pg,
               perPage,
               id,
            );

            if (!singleMemberPosts) {
               return res.status(StatusCodes.NOT_FOUND).json({
                  message: 'No posts for that member were found',
               });
            }

            return res.status(StatusCodes.OK).json(singleMemberPosts);
         }

         const posts = await this.postService.loadAll(pg, perPage);

         return res.status(StatusCodes.OK).json(posts);
      } catch (err) {
         console.log(err);
         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            message: 'Something went wrong',
         });
      }
   };

   public loadPostDetails = async (
      req: Request,
      res: Response,
   ): Promise<Response> => {
      try {
         const id = parseInt(req.params.id);

         const postDetails = await this.postService.loadPostDetails(id);

         if (!postDetails) {
            return res.status(StatusCodes.NOT_FOUND).json({
               message: 'Post not found',
            });
         }

         return res.status(StatusCodes.OK).json(postDetails);
      } catch (err) {
         console.log(err);
         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            message: 'Something went wrong',
         });
      }
   };

   public loadMostRecentAll = async (
      _: Request,
      res: Response,
   ): Promise<Response> => {
      try {
         const mostRecentPosts = await this.postService.loadMostRecentAll();

         return res.status(StatusCodes.OK).json(mostRecentPosts);
      } catch (err) {
         console.log(err);
         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Something went wrong',
         });
      }
   };

   public loadMostRecentSingle = async (
      req: Request,
      res: Response,
   ): Promise<Response> => {
      try {
         const id = parseInt(req.params.id);

         const mostRecent = await this.postService.loadMostRecentSingle(id);

         return res.status(StatusCodes.OK).json(mostRecent);
      } catch (err) {
         console.log(err);
         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Something went wrong',
         });
      }
   };

   public loadPostsForApproval = async (
      req: Request,
      res: Response,
   ): Promise<void> => {
      try {
         const posts = await this.postService.loadPostsForApproval();

         res.status(StatusCodes.OK).json(posts);
      } catch (err) {
         console.log(err);

         res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Something went wrong',
         });
      }
   };

   public publishPost = async (
      req: Request,
      res: Response,
   ): Promise<Response> => {
      try {
         const id = parseInt(req.params.id);

         const status = await this.postService.publishPost(id);

         if (!status) {
            return res.status(StatusCodes.NOT_FOUND).json({
               message: 'Post not found',
            });
         }

         return res.status(StatusCodes.OK).json({
            message: 'Post published successfully',
         });
      } catch (err) {
         console.log(err);

         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: 'Something went wrong',
         });
      }
   };
}
