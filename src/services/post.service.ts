import { Post } from '../database/models/post.model';
import {
   PartialPost,
   PostRepository,
} from '../database/repositories/post.repository';
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
   ): Promise<Post[]> {
      if (id) {
         await this.postRepository.loadAll(page, perPage, id);
      }

      const posts = await this.postRepository.loadAll(page, perPage);

      return posts;
   }

   public async loadPostDetails(id: number): Promise<Post | null> {
      const postDetails = await this.postRepository.loadPostDetails(id);

      return postDetails;
   }

   public async loadMostRecentAll(): Promise<PartialPost[]> {
      const mostRecentPosts = await this.postRepository.loadMostRecentAll();

      return mostRecentPosts;
   }

   public async loadMostRecentSingle(id: number): Promise<PartialPost[]> {
      const mostRecent = await this.postRepository.loadMostRecentSingle(id);

      return mostRecent;
   }
}
