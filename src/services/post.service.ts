import { PostRepository } from '../database/repositories/post.repository';
import { PostProps, PostEntity } from '../entities/post.entity';

export class PostService {
   constructor(private postRepository: PostRepository) {} // eslint-disable-line

   public async create({
      title,
      body,
      thumbnail,
   }: PostProps): Promise<PostEntity> {
      const newPost = new PostEntity({ title, body, thumbnail });

      const createdPost = await this.postRepository.create(newPost);

      return createdPost;
   }
}
