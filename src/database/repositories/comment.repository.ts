import { appDataSource } from '../../data-source';
import { Comment } from '../models/comment.model';

export const commentRepository = appDataSource.getRepository(Comment);
