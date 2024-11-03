import { appDataSource } from '../../data-source';
import { Post, Status } from '../models/post.model';
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
         .where('status = :status', { status: Status.APPROVED })
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
         .andWhere({ status: Status.APPROVED })
         .orderBy('createdAt', 'DESC')
         .offset((page - 1) * perPage)
         .limit(perPage)
         .getMany();

      return memberPosts;
   }

   public async loadPostDetails(
      id: number,
      page: number,
   ): Promise<Post | null> {
      const postDetails = await this.postModel
         .createQueryBuilder('post')
         .leftJoinAndSelect('post.member', 'member')
         .leftJoinAndSelect('post.comments', 'comments')
         .where('post.id = :id', { id })
         .andWhere('post.status = :status', { status: Status.APPROVED })
         .limit(30)
         .skip((page - 1) * 30)
         .getOne();

      if (!postDetails || postDetails.status === Status.AWAITING) {
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
         .where({ status: Status.APPROVED })
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
         .andWhere({ status: Status.APPROVED })
         .orderBy('createdAt', 'DESC')
         .limit(10)
         .getMany();

      return posts;
   }

   public async loadPostsForApproval(): Promise<Post[]> {
      const posts = await this.postModel.find({
         where: {
            status: Status.AWAITING,
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
         .update({ status: Status.APPROVED })
         .where('id = :id', { id })
         .execute();

      return Status.APPROVED;
   }

   public async deletePost(id: number): Promise<boolean | null> {
      const post = await this.postModel.findOneBy({ id });

      if (!post) {
         return null;
      }

      await this.postModel.delete({ id });

      return true;
   }
}
