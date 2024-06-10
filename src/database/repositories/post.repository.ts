import { appDataSource } from '../../data-source';
import { Post } from '../models/post.model';
import { PostEntity, PostTypes } from '../../entities/post.entity';

const getPostRepository = appDataSource.getRepository(Post);

export interface PartialPost extends Omit<PostTypes, 'body' | 'memberId'> {
   id: number;
   createdAt: Date;
   fullName: string;
}

export class PostRepository {
   constructor(private postModel = getPostRepository) {} // eslint-disable-line

   public async create({
      title,
      body,
      thumbnail,
      memberId,
   }: PostEntity): Promise<Post> {
      const newPost = this.postModel.create({
         title,
         body,
         thumbnail,
         memberId,
      });

      const createdPost = await this.postModel.save(newPost);

      return createdPost;
   }

   public async loadAll(
      page: number,
      perPage: number,
      id?: number,
   ): Promise<Post[]> {
      if (id) {
         const singleMemberPosts = await this.loadSingleMemberPosts(
            page,
            perPage,
            id,
         );

         return singleMemberPosts;
      }

      const posts = await this.postModel
         .createQueryBuilder('posts')
         .orderBy('createdAt', 'DESC')
         .offset((page - 1) * perPage)
         .limit(perPage)
         .getMany();

      return posts;
   }

   private async loadSingleMemberPosts(
      page: number,
      perPage: number,
      id: number,
   ): Promise<Post[]> {
      const memberPosts = await this.postModel.find({
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

      return memberPosts;
   }

   public async loadPostDetails(id: number): Promise<Post | null> {
      const postDetails = await this.postModel
         .createQueryBuilder('post')
         .leftJoinAndSelect('post.member', 'member')
         .where('post.id = :id', { id })
         .getOne();

      if (!postDetails) {
         return null;
      }

      return postDetails;
   }

   public async loadMostRecentAll(): Promise<PartialPost[]> {
      const posts = await this.postModel
         .createQueryBuilder('posts')
         .orderBy('createdAt', 'DESC')
         .leftJoinAndSelect('posts.member', 'member')
         .limit(10)
         .getMany();

      const mostRecentPosts = this.normalizeMostRecentPosts(posts);

      return mostRecentPosts;
   }

   public async loadMostRecentSingle(id: number): Promise<PartialPost[]> {
      const posts = await this.postModel
         .createQueryBuilder('posts')
         .where('memberId = :id', { id })
         .orderBy('createdAt', 'DESC')
         .limit(10)
         .leftJoinAndSelect('posts.member', 'member')
         .getMany();

      const mostRecent = this.normalizeMostRecentPosts(posts);

      return mostRecent;
   }

   private normalizeMostRecentPosts(posts: Post[]): PartialPost[] {
      const mostRecent = posts.map((post) => {
         const normalized = {
            id: post.id,
            title: post.title,
            createdAt: post.createdAt,
            fullName: post.member.fullName,
            thumbnail: post.thumbnail,
         };

         return normalized;
      });

      return mostRecent;
   }
}
