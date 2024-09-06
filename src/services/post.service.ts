import { Post } from '../database/models/post.model';
import { PostRepository } from '../database/repositories/post.repository';
import { PostTypes, PostEntity } from '../entities/post.entity';

export class PostService {
   constructor(private postRepository: PostRepository) {} // eslint-disable-line

   public async create({
      title,
      body,
      thumbnail,
      memberId,
   }: PostTypes): Promise<Post> {
      const newPost = new PostEntity({ title, body, thumbnail, memberId });

      const createdPost = await this.postRepository.create(newPost);

      return createdPost;
   }

   public async loadAll(
      page: number,
      perPage: number,
      id?: number,
   ): Promise<Post[] | null> {
      if (id) {
         const posts = await this.postRepository.loadAll(page, perPage, id);

         if (!posts) {
            return null;
         }

         return posts;
      }

      const posts = await this.postRepository.loadAll(page, perPage);

      return posts;
   }

   public async loadPostDetails(
      id: number,
      page: number,
   ): Promise<Post | null> {
      const postDetails = await this.postRepository.loadPostDetails(id, page);

      return postDetails;
   }

   public async loadMostRecentAll(): Promise<Post[]> {
      const mostRecentPosts = await this.postRepository.loadMostRecentAll();

      return mostRecentPosts;
   }

   public async loadMostRecentSingle(id: number): Promise<Post[]> {
      const mostRecent = await this.postRepository.loadMostRecentSingle(id);

      return mostRecent;
   }

   public async loadPostsForApproval(): Promise<Post[]> {
      const posts = await this.postRepository.loadPostsForApproval();

      return posts;
   }

   public async publishPost(id: number): Promise<string | null> {
      const status = await this.postRepository.publishPost(id);

      return status;
   }

   public async deletePost(id: number): Promise<boolean | null> {
      const post = await this.postRepository.deletePost(id);

      return post;
   }
}
