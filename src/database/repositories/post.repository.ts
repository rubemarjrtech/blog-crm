import { appDataSource } from '../../data-source';
import { Post } from '../models/post.model';
import { PostEntity } from '../../entities/post.entity';
import { Repository } from 'typeorm';

export const postModel = appDataSource.getRepository(Post);

export class PostRepository {
   constructor(private postModel: Repository<Post>) {} // eslint-disable-line

   public async create({
      title,
      body,
      thumbnail,
   }: PostEntity): Promise<PostEntity> {
      const newPost = this.postModel.create({
         title,
         body,
         thumbnail,
         memberId: 1,
      });

      const createdPost = await this.postModel.save(newPost);

      return createdPost;
   }
}
