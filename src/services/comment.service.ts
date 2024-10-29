import { Comment } from '../database/models/comment.model';
import { CommentRepository } from '../database/repositories/comment.repository';
import { CommentEntity } from '../entities/comment.entity';

export class CommentService {
   constructor(private commentRepository: CommentRepository) {}

   public async create({
      name,
      email,
      url,
      comment,
      postId,
   }: CommentEntity): Promise<string | null> {
      const newComment = new CommentEntity({
         name,
         email,
         url,
         comment,
         postId,
      });

      const message = await this.commentRepository.create(newComment);

      return message;
   }

   public async loadCommentsForPost(
      postId: number,
      page: number,
   ): Promise<Comment[]> {
      const comments = await this.commentRepository.loadCommentsForPost(
         postId,
         page,
      );

      return comments;
   }

   public async loadCommentsForApproval(): Promise<Comment[]> {
      const comments = await this.commentRepository.loadCommentsForApproval();

      return comments;
   }

   public async updateCommentStatus(id: string): Promise<string | null> {
      const status = await this.commentRepository.updateCommentStatus(id);

      return status;
   }

   public async deleteComment(id: string): Promise<string | null> {
      const deletedComment = await this.commentRepository.deleteComment(id);

      return deletedComment;
   }
}
