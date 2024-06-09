import { Post } from '../database/models/post.model';
import { PostRepository } from '../database/repositories/post.repository';
import { PostProps, PostEntity } from '../entities/post.entity';

export class PostService {
   constructor(private postRepository: PostRepository) {} // eslint-disable-line

   public async create({
      title,
      body,
      thumbnail,
      memberId,
   }: PostProps): Promise<Post> {
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

   public async loadMostRecentAll(): Promise<Post[]> {
      const mostRecentPosts = await this.postRepository.loadMostRecentAll();

      return mostRecentPosts;
   }
}
