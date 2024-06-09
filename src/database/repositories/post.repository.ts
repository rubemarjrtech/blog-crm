import { appDataSource } from '../../data-source';
import { Post } from '../models/post.model';
import { PostEntity } from '../../entities/post.entity';

const getPostRepository = appDataSource.getRepository(Post);

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

   public async loadMostRecentAll(): Promise<Post[]> {
      const mostRecentPosts = await this.postModel
         .createQueryBuilder('posts')
         .orderBy('createdAt', 'DESC')
         .limit(10)
         .getMany();

      return mostRecentPosts;
   }
}
