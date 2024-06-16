import { CommentRepository } from '../database/repositories/comment.repository';
import { CommentService } from '../services/comment.service';

export class CommentFactory {
   private static commentService: CommentService;

   public static getCommentService(): CommentService {
      if (this.commentService) {
         return this.commentService;
      }

      const commentRepository = new CommentRepository();
      const commentService = new CommentService(commentRepository);

      this.commentService = commentService;

      return commentService;
   }
}
