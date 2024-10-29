import { appDataSource } from '../../data-source';
import { CommentEntity } from '../../entities/comment.entity';
import { Comment } from '../models/comment.model';
import { Post, Status } from '../models/post.model';

const commentRepository = appDataSource.getRepository(Comment);
const postRepository = appDataSource.getRepository(Post);

export class CommentRepository {
   constructor(
      private commentModel = commentRepository,
      private postModel = postRepository,
   ) {}

   public async create(comment: CommentEntity): Promise<string | null> {
      const post = await this.postModel.findOneBy({
         id: comment.postId,
         status: Status.APPROVED,
      });

      if (!post) {
         return null;
      }

      await this.commentModel.save(comment);

      const message = 'Comment added successfully!';
      return message;
   }

   public async loadCommentsForPost(
      postId: number,
      page: number,
   ): Promise<Comment[]> {
      const perPage = 20;

      const comments = await this.commentModel
         .createQueryBuilder('comments')
         .where('postId = :postId', { postId })
         .andWhere({ status: Status.APPROVED })
         .orderBy('createdAt', 'ASC')
         .take(perPage)
         .skip((page - 1) * perPage)
         .getMany();

      return comments;
   }

   public async loadCommentsForApproval(): Promise<Comment[]> {
      const comments = await this.commentModel.find({
         where: {
            status: Status.AWAITING,
         },
         order: {
            createdAt: 'ASC',
         },
         take: 20,
      });

      return comments;
   }

   public async updateCommentStatus(id: string): Promise<string | null> {
      const comment = await this.commentModel
         .createQueryBuilder('comment')
         .where('id = :id', { id })
         .andWhere({ status: Status.AWAITING })
         .getOne();

      if (!comment) {
         return null;
      }

      await this.commentModel
         .createQueryBuilder('comment')
         .update({ status: Status.APPROVED })
         .where('id = :id', { id })
         .execute();

      return Status.APPROVED;
   }

   public async deleteComment(id: string): Promise<string | null> {
      const comment = await this.commentModel.findOne({
         where: { id },
      });

      if (!comment) {
         return null;
      }

      await this.commentModel.delete(id);

      return 'Comment deleted successfully!';
   }
}
