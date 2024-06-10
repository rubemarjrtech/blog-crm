import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { BodyRequest } from './types';
import { PostService } from '../services/post.service';
import { PostTypes } from '../entities/post.entity';

export class PostController {
   constructor(private postService: PostService) {} // eslint-disable-line

   public create = async (
      req: BodyRequest<PostTypes>,
      res: Response,
   ): Promise<void> => {
      try {
         const { title, body, thumbnail, memberId } = req.body;

         const createdPost = await this.postService.create({
            title,
            body,
            thumbnail,
            memberId,
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

   public loadAllPosts = async (
      req: Request,
      res: Response,
   ): Promise<Response> => {
      try {
         const page = parseInt(req.query.page as string) || 1;
         const perPage = 12;
         const ct = parseInt(req.query.ct as string);
         const id = ct;

         // filter posts by member
         if (ct) {
            const singleMemberPosts = await this.postService.loadAll(
               page,
               perPage,
               id,
            );

            return res.status(StatusCodes.OK).json(singleMemberPosts);
         }

         const posts = await this.postService.loadAll(page, perPage);

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
}
