import { appDataSource } from '../../data-source';
import { Post } from '../models/post.model';

export const postRepository = appDataSource.getRepository(Post);
