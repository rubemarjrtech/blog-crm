import { CommentRepository } from '../database/repositories/comment.repository';
import { CommentEntity } from '../entities/comment.entity';

export class CommentService {
   constructor(private commentRepository: CommentRepository) {} //eslint-disable-line

   public async create({
      name,
      email,
      url,
      comment,
      postId,
   }: CommentEntity): Promise<string> {
      const newComment = new CommentEntity({
         name,
         email,
         url,
         comment,
         postId,
      });

      await this.commentRepository.create(newComment);

      return 'Comment added successfully!';
   }
}
