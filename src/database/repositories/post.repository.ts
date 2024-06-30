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
   ): Promise<Post[] | null> {
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
         .where('status = :status', { status: 'published' })
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
   ): Promise<Post[] | null> {
      const postsWithIdExist = await this.postModel.findOneBy({ memberId: id });

      if (!postsWithIdExist) {
         return null;
      }

      const memberPosts = await this.postModel
         .createQueryBuilder('posts')
         .where('memberId = :id', { id })
         .orderBy('createdAt', 'DESC')
         .offset((page - 1) * perPage)
         .limit(perPage)
         .getMany();

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
      const posts = await this.postModel
         .createQueryBuilder('posts')
         .innerJoin('posts.member', 'member')
         .select([
            'posts.id',
            'posts.title',
            'posts.createdAt',
            'posts.thumbnail',
            'member.fullName',
         ])
         .orderBy('createdAt', 'DESC')
         .limit(10)
         .getMany();

      return posts;
   }

   public async loadMostRecentSingle(id: number): Promise<Post[]> {
      const posts = await this.postModel
         .createQueryBuilder('posts')
         .innerJoin('posts.member', 'member')
         .select([
            'posts.id',
            'posts.title',
            'posts.createdAt',
            'posts.thumbnail',
            'member.fullName',
         ])
         .where('memberId = :id', { id })
         .orderBy('createdAt', 'DESC')
         .limit(10)
         .getMany();

      return posts;
   }

   public async loadPostsForApproval(): Promise<Post[]> {
      const posts = await this.postModel.find({
         where: {
            status: 'Waiting for approval',
         },
      });

      return posts;
   }

   public async publishPost(id: number): Promise<string | null> {
      const post = await this.postModel.findOneBy({ id });

      if (!post) {
         return null;
      }

      await this.postModel
         .createQueryBuilder('post')
         .update({ status: 'published' })
         .where('id = :id', { id })
         .execute();

      return 'published';
   }
}
