import { appDataSource } from '../../data-source';
import { CommentEntity } from '../../entities/comment.entity';
import { Comment } from '../models/comment.model';

const commentRepository = appDataSource.getRepository(Comment);

export class CommentRepository {
   constructor(private commentModel = commentRepository) {} // eslint-disable-line

   public async create(comment: CommentEntity): Promise<string> {
      await this.commentModel.save(comment);

      return 'Comment added successfully!';
   }
}
